import eventlet
eventlet.monkey_patch()


import re
import random
import time
import threading
import requests
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from better_profanity import profanity
import wikipedia
from datetime import datetime, timezone



# ------------------------
# Flask + Socket.IO setup
# ------------------------
app = Flask(__name__)
app.config["SECRET_KEY"] = "slippy-secret"
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# ------------------------
# In-memory state
# ------------------------
users = {}  # sid -> {"username": str, "avatar": str}
messages = []  # {"username","avatar","content","timestamp","isSlippyFake": bool}
MAX_MSGS = 200

profanity.load_censor_words()

# ------------------------
# Helpers
# ------------------------
def now_iso_utc():
    return datetime.now(timezone.utc).isoformat()

def pick_keyword(text: str):
    words = re.findall(r"[A-Za-z']+", text.lower())
    words = [w for w in words if len(w) > 3]
    return random.choice(words) if words else None

# def get_urban_sentence(term: str):
#     try:
#         r = requests.get(
#             "https://api.urbandictionary.com/v0/define",
#             params={"term": term},
#             timeout=6,
#         )
#         if r.status_code != 200:
#             return None
#         items = r.json().get("list", [])
#         if not items:
#             return None
#         for entry in random.sample(items[:5], min(len(items), 5)):
#             text = (entry.get("example") or entry.get("definition") or "").strip()
#             if not text:
#                 continue
#             line = text.replace("\r", " ").replace("\n", " ")[:240]
#             if not profanity.contains_profanity(line):
#                 return line
#         return None
#     except Exception:
#         return None


# put this in your app.py (or import it from a helper module)
DEBUG = True

def log(*args, **kwargs):
    if DEBUG:
        print("[slippy:urban]", *args, **kwargs)


# def get_urban_sentence(term: str):
#     if not term:
#         return None

#     url = "https://api.urbandictionary.com/v0/define"
#     params = {"term": term}
#     headers = {"User-Agent": "slippy-bot/0.1 (+https://example.com)"}  # polite UA

#     try:
#         print("requesting", url, "params=", params)
#         r = requests.get(url, params=params, timeout=6, headers=headers)
#         print("response status:", r.status_code)

#         if r.status_code != 200:
#             # show a small slice of body for debugging (avoid giant logs)
#             body_preview = (r.text[:300] + "...") if r.text else "<empty body>"
#             return None

#         # parse JSON safely
#         try:
#             payload = r.json()
#         except ValueError as e:
#             return None

#         items = payload.get("list", [])
#         if not items:
#             return None

#         # sample up to 5 items (random order)
#         n = min(len(items), 5)
#         sample = random.sample(items[:n], n)

#         for idx, entry in enumerate(sample):
#             # prefer example then definition
#             text = (entry.get("example") or entry.get("definition") or "")
#             text = (text or "").strip()

#             if not text:
#                 continue

#             # normalize and truncate
#             line = text.replace("\r", " ").replace("\n", " ").strip()[:240]
#             # profanity check
#             if profanity.contains_profanity(line):
#                 continue
#             return line

#         return None

#     except requests.RequestException as e:
#         print("requests exception:", repr(e))
#         return None
#     except Exception as e:
#         import traceback
#         print("unexpected exception:", repr(e))
#         traceback.print_exc()
#         return None

def get_urban_sentence(term: str):
    """Fetch a short, clean sentence from Urban Dictionary for the given term."""
    if not term:
        return None

    url = "https://api.urbandictionary.com/v0/define"
    params = {"term": term}
    headers = {"User-Agent": "slippy-bot/0.1 (+https://example.com)"}

    try:
        r = requests.get(url, params=params, timeout=6, headers=headers)
        if r.status_code != 200:
            return None

        payload = r.json()
        items = payload.get("list", [])
        if not items:
            return None

        for entry in random.sample(items[:min(len(items), 5)], min(len(items), 5)):
            text = (entry.get("example") or entry.get("definition") or "").strip()
            if not text:
                continue

            # Remove brackets but keep inner words: [word] -> word
            text = re.sub(r"\[(.*?)\]", r"\1", text)

            # Normalize spaces and truncate
            line = text.replace("\r", " ").replace("\n", " ").strip()[:240]

            if not profanity.contains_profanity(line):
                return line

        return None

    except (requests.RequestException, ValueError):
        return None
    except Exception:
        import traceback
        traceback.print_exc()
        return None


def get_wiki_sentence(term: str):
    try:
        summary = wikipedia.summary(term, sentences=1)
        if not profanity.contains_profanity(summary):
            return summary[:240]
    except Exception:
        return None

# ------------------------
# Slippy chaos loop
# ------------------------
def slippy_loop():
    while True:
        time.sleep(random.randint(15, 30))
        if len(users) < 1 or len(messages) < 2:
            continue

        # recent_pool = [m for m in messages[-min(30, len(messages)):] if not m.get("isSlippyFake")]
        recent_pool = [
            m for m in messages[-min(30, len(messages)):]
            if not m.get("isSlippyFake")
            and m.get("username", "").lower() != "system"
            and not re.search(r"\b(joined|left) the room\b", m.get("content", ""), re.IGNORECASE)
        ]


        if not recent_pool:
            continue
        picked = random.choice(recent_pool)

        term = pick_keyword(picked["content"])
        if not term:
            continue

        line = get_urban_sentence(term) or get_wiki_sentence(term)
        if not line or profanity.contains_profanity(line):
            continue

        # post "as" a random other user (never the original sender)
        candidates = [u for u in users.values() if u["username"] != picked["username"]]
        if not candidates:
            continue
        actor = random.choice(candidates)

        chaos_msg = {
            "username": actor["username"],
            "avatar": actor.get("avatar", ""),
            "content": f"{line}",
            "timestamp": now_iso_utc(),
            "isSlippyFake": True
        }
        messages.append(chaos_msg)
        if len(messages) > MAX_MSGS:
            del messages[:-MAX_MSGS]
        socketio.emit("chat", chaos_msg)  # broadcast to all by default

# ------------------------
# Routes / Events
# ------------------------
@app.route("/")
def health():
    return "Slippy backend running."

@socketio.on("join")
def on_join(data):
    username = (data or {}).get("username", "Anonymous")[:24]
    avatar = (data or {}).get("avatar", "")
    users[request.sid] = {"username": username, "avatar": avatar}

    # send full users list to everyone
    socketio.emit("users", list(users.values()))

    # send history to the joining user only
    for msg in messages:
        emit("chat", msg, to=request.sid)

    # broadcast join notice
    join_msg = {
        "username": "System",
        "avatar": "",
        "content": f"{username} joined the room.",
        "timestamp": now_iso_utc(),
        "isSlippyFake": False
    }
    messages.append(join_msg)
    socketio.emit("chat", join_msg)

@socketio.on("send")
def on_send(data):
    me = users.get(request.sid, {"username": "Anonymous", "avatar": ""})
    content = (data or {}).get("content", "")[:500]
    if not content:
        return
    msg = {
        "username": me["username"],
        "avatar": me["avatar"],
        "content": content,
        "timestamp": now_iso_utc(),
        "isSlippyFake": False
    }
    messages.append(msg)
    if len(messages) > MAX_MSGS:
        del messages[:-MAX_MSGS]
    socketio.emit("chat", msg)

@socketio.on("disconnect")
def on_disconnect():  # accept reason to match current socketio signature
    u = users.pop(request.sid, None)
    if u:
        socketio.emit("users", list(users.values()))
        leave_msg = {
            "username": "System",
            "avatar": "",
            "content": f"{u['username']} left the room.",
            "timestamp": now_iso_utc(),
            "isSlippyFake": False
        }
        messages.append(leave_msg)
        socketio.emit("chat", leave_msg)
        socketio.emit("user_left", u["username"])

# ------------------------
# Start Slippy Bot
# ------------------------
if __name__ == "__main__":
    threading.Thread(target=slippy_loop, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000)