# import eventlet
# eventlet.monkey_patch()


# import re
# import random
# import time
# import threading
# import requests
# from flask import Flask, request
# from flask_cors import CORS
# from flask_socketio import SocketIO, emit
# from better_profanity import profanity
# import wikipedia
# from datetime import datetime, timezone


# app = Flask(__name__)
# app.config["SECRET_KEY"] = "slippy-secret"
# CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# users = {}  
# messages = []  
# MAX_MSGS = 200

# profanity.load_censor_words()

# def now_iso_utc():
#     return datetime.now(timezone.utc).isoformat()

# def pick_keyword(text: str):
#     words = re.findall(r"[A-Za-z']+", text.lower())
#     words = [w for w in words if len(w) > 5]
#     return random.choice(words) if words else None


# DEBUG = True

# def log(*args, **kwargs):
#     if DEBUG:
#         print("[slippy:urban]", *args, **kwargs)



# def get_urban_sentence(term: str):
#     """Fetch a short, clean sentence from Urban Dictionary for the given term."""
#     if not term:
#         return None

#     url = "https://api.urbandictionary.com/v0/define"
#     params = {"term": term}
#     headers = {"User-Agent": "slippy-bot/0.1 (+https://example.com)"}

#     try:
#         r = requests.get(url, params=params, timeout=6, headers=headers)
#         if r.status_code != 200:
#             return None

#         payload = r.json()
#         items = payload.get("list", [])
#         if not items:
#             return None

#         for entry in random.sample(items[:min(len(items), 5)], min(len(items), 5)):
#             text = (entry.get("example") or entry.get("definition") or "").strip()
#             if not text:
#                 continue

#             text = re.sub(r"\[(.*?)\]", r"\1", text)

#             line = text.replace("\r", " ").replace("\n", " ").strip()[:240]

#             if not profanity.contains_profanity(line):
#                 return line

#         return None

#     except (requests.RequestException, ValueError):
#         return None
#     except Exception:
#         import traceback
#         traceback.print_exc()
#         return None


# def get_wiki_sentence(term: str):
#     try:
#         summary = wikipedia.summary(term, sentences=1)
#         if not profanity.contains_profanity(summary):
#             return summary[:240]
#     except Exception:
#         return None

# def slippy_loop():
#     while True:
#         time.sleep(random.randint(25, 40))
#         if len(users) < 1 or len(messages) < 2:
#             continue

#         # recent_pool = [m for m in messages[-min(30, len(messages)):] if not m.get("isSlippyFake")]
#         recent_pool = [
#             m for m in messages[-min(30, len(messages)):]
#             if not m.get("isSlippyFake")
#             and m.get("username", "").lower() != "system"
#             and not re.search(r"\b(joined|left) the room\b", m.get("content", ""), re.IGNORECASE)
#         ]


#         if not recent_pool:
#             continue
#         picked = random.choice(recent_pool)

#         term = pick_keyword(picked["content"])
#         if not term:
#             continue

#         line = get_urban_sentence(term) or get_wiki_sentence(term)
#         if not line or profanity.contains_profanity(line):
#             continue

#         candidates = [u for u in users.values() if u["username"] != picked["username"]]
#         if not candidates:
#             continue
#         actor = random.choice(candidates)

#         chaos_msg = {
#             "username": actor["username"],
#             "avatar": actor.get("avatar", ""),
#             "content": f"{line}-🎭",
#             "timestamp": now_iso_utc(),
#             "isSlippyFake": True
#         }
#         messages.append(chaos_msg)
#         if len(messages) > MAX_MSGS:
#             del messages[:-MAX_MSGS]
#         socketio.emit("chat", chaos_msg) 

# @app.route("/")
# def health():
#     return "Slippy backend running."

# @socketio.on("join")
# def on_join(data):
#     username = (data or {}).get("username", "Anonymous")[:24]
#     avatar = (data or {}).get("avatar", "")
#     users[request.sid] = {"username": username, "avatar": avatar}

#     # send full users list to everyone
#     socketio.emit("users", list(users.values()))

#     # send history to the joining user only
#     for msg in messages:
#         emit("chat", msg, to=request.sid)

#     # broadcast join notice
#     join_msg = {
#         "username": "System",
#         "avatar": "",
#         "content": f"{username} joined the room.",
#         "timestamp": now_iso_utc(),
#         "isSlippyFake": False
#     }
#     messages.append(join_msg)
#     socketio.emit("chat", join_msg)

# @socketio.on("send")
# def on_send(data):
#     me = users.get(request.sid, {"username": "Anonymous", "avatar": ""})
#     content = (data or {}).get("content", "")[:500]
#     if not content:
#         return
#     msg = {
#         "username": me["username"],
#         "avatar": me["avatar"],
#         "content": content,
#         "timestamp": now_iso_utc(),
#         "isSlippyFake": False
#     }
#     messages.append(msg)
#     if len(messages) > MAX_MSGS:
#         del messages[:-MAX_MSGS]
#     socketio.emit("chat", msg)

# @socketio.on("disconnect")
# def on_disconnect():
#     u = users.pop(request.sid, None)
#     if u:
#         socketio.emit("users", list(users.values()))
#         leave_msg = {
#             "username": "System",
#             "avatar": "",
#             "content": f"{u['username']} left the room.",
#             "timestamp": now_iso_utc(),
#             "isSlippyFake": False
#         }
#         messages.append(leave_msg)
#         socketio.emit("chat", leave_msg)
#         socketio.emit("user_left", u["username"])


# if __name__ == "__main__":
#     threading.Thread(target=slippy_loop, daemon=True).start()
#     socketio.run(app, host="0.0.0.0", port=5000)


import eventlet
eventlet.monkey_patch() # Must be called at the very beginning, before other imports that might use standard blocking I/O

import re
import random
import time
import threading
import requests
import os # Import the os module to access environment variables
from flask import Flask, request, jsonify # Import jsonify for potential API endpoints
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from better_profanity import profanity
import wikipedia
from datetime import datetime, timezone

# Initialize Flask app
app = Flask(__name__)

# Use an environment variable for the secret key in production
# Fallback to a default for local development, but change this in production!
app.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY", "your-super-secret-key-default-for-dev")

# Configure CORS: Allow specific frontend URL from environment variable
# In production, FRONTEND_URL will be set to your Render frontend's URL (e.g., https://your-frontend.onrender.com)
# For local development, it will default to http://localhost:5173 (Vite's default)
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
CORS(app, resources={r"/*": {"origins": frontend_url}})

# Initialize SocketIO
# - cors_allowed_origins: Crucial for allowing your frontend to connect
# - message_queue: Essential for scaling across multiple backend instances on Render.
#                  Use a Redis URL from environment variables (e.g., REDIS_URL from a Render Redis service).
#                  If not using Redis, remove this line, but it limits scalability.
redis_url = os.environ.get("REDIS_URL")
if redis_url:
    socketio = SocketIO(app,
                        cors_allowed_origins=frontend_url,
                        async_mode="eventlet",
                        message_queue=redis_url)
else:
    # Fallback for local testing or if Redis is not used (not recommended for production scaling)
    socketio = SocketIO(app,
                        cors_allowed_origins=frontend_url,
                        async_mode="eventlet")


# In-memory storage for users and messages (for demonstration).
# For a production application, these would typically be stored in a database.
users = {}  # Stores connected users by their session ID
messages = []  # Stores chat message history
MAX_MSGS = 200 # Maximum number of messages to keep in history

# Load profanity words for content filtering
profanity.load_censor_words()

def now_iso_utc():
    """Returns the current UTC time in ISO format."""
    return datetime.now(timezone.utc).isoformat()

def pick_keyword(text: str):
    """
    Picks a random word (longer than 5 characters) from the given text
    to use as a search term for Slippy Bot.
    """
    words = re.findall(r"[A-Za-z']+", text.lower())
    words = [w for w in words if len(w) > 5] # Filter for words longer than 5 chars
    return random.choice(words) if words else None # Return a random word or None


DEBUG = False # Set to False for production unless needed for specific debugging
def log(*args, **kwargs):
    """Simple logging function that prints if DEBUG is True."""
    if DEBUG:
        print("[slippy:urban]", *args, **kwargs)


def get_urban_sentence(term: str):
    """
    Fetches a short, clean example sentence or definition from Urban Dictionary
    for the given term.
    """
    if not term:
        return None

    url = "https://api.urbandictionary.com/v0/define"
    params = {"term": term}
    headers = {"User-Agent": "slippy-bot/0.1 (+https://example.com)"} # Good practice to identify your bot

    try:
        r = requests.get(url, params=params, timeout=6, headers=headers)
        if r.status_code != 200:
            log(f"Urban Dictionary API error: {r.status_code}")
            return None

        payload = r.json()
        items = payload.get("list", [])
        if not items:
            log(f"No Urban Dictionary results for '{term}'")
            return None

        # Try up to 5 random entries to find a clean, suitable one
        for entry in random.sample(items[:min(len(items), 5)], min(len(items), 5)):
            text = (entry.get("example") or entry.get("definition") or "").strip()
            if not text:
                continue

            # Remove square brackets often found in Urban Dictionary examples
            line = re.sub(r"\[(.*?)\]", r"\1", text)
            line = line.replace("\r", " ").replace("\n", " ").strip()[:240] # Truncate to 240 chars

            if not profanity.contains_profanity(line):
                log(f"Found clean urban definition for '{term}': {line}")
                return line

        log(f"No clean urban definition found for '{term}' after checking multiple entries.")
        return None

    except (requests.RequestException, ValueError) as e:
        log(f"Request/Parsing error for Urban Dictionary: {e}")
        return None
    except Exception as e:
        # Catch any other unexpected errors and log them
        import traceback
        log("An unexpected error occurred in get_urban_sentence:")
        traceback.print_exc()
        return None

def get_wiki_sentence(term: str):
    """
    Fetches a short, clean summary sentence from Wikipedia for the given term.
    """
    try:
        summary = wikipedia.summary(term, sentences=1) # Get first sentence
        if not profanity.contains_profanity(summary):
            return summary[:240] # Truncate and return if clean
        log(f"Wikipedia summary for '{term}' contains profanity.")
        return None
    except wikipedia.exceptions.DisambiguationError as e:
        log(f"Wikipedia disambiguation error for '{term}': {e.options}")
        return None
    except wikipedia.exceptions.PageError:
        log(f"Wikipedia page not found for '{term}'.")
        return None
    except Exception as e:
        log(f"An unexpected error occurred in get_wiki_sentence for '{term}': {e}")
        return None

def slippy_loop():
    """
    The main loop for the Slippy bot. It periodically picks a message,
    finds a keyword, fetches info, and sends a "meddled" message.
    """
    while True:
        # Wait a random interval before checking for new messages
        time.sleep(random.randint(25, 40)) # Sleeps between 25 and 40 seconds

        # Only run if there's at least one user and some chat history
        if len(users) < 1 or len(messages) < 2:
            continue

        # Get recent messages from the pool, excluding Slippy's own fakes and system messages
        recent_pool = [
            m for m in messages[-min(30, len(messages)):] # Look at up to last 30 messages
            if not m.get("isSlippyFake") # Exclude Slippy's own previous fakes
            and m.get("username", "").lower() != "system" # Exclude system messages
            and not re.search(r"\b(joined|left) the room\b", m.get("content", ""), re.IGNORECASE) # Exclude join/leave notices
        ]

        if not recent_pool:
            continue # No suitable messages to pick from

        picked = random.choice(recent_pool) # Pick a random message from the filtered pool

        term = pick_keyword(picked["content"]) # Extract a keyword from the picked message
        if not term:
            continue # No suitable keyword found

        # Try to get a sentence from Urban Dictionary, then fallback to Wikipedia
        line = get_urban_sentence(term) or get_wiki_sentence(term)
        if not line or profanity.contains_profanity(line): # Ensure the fetched line is not empty or profane
            continue

        # Choose a random "actor" (user) to send the "meddled" message as
        candidates = [u for u in users.values() if u["username"] != picked["username"]]
        if not candidates:
            continue # No other users available to impersonate
        actor = random.choice(candidates)

        # Construct the "chaos" message from Slippy
        chaos_msg = {
            "username": actor["username"],
            "avatar": actor.get("avatar", ""),
            "content": f"{line} — Slippy meddled 🎭", # Added "— Slippy meddled 🎭" to the end
            "timestamp": now_iso_utc(), # UTC timestamp
            "isSlippyFake": True # Mark as a fake message from Slippy
        }
        messages.append(chaos_msg) # Add to history
        if len(messages) > MAX_MSGS:
            del messages[:-MAX_MSGS] # Trim history if it exceeds max limit
        socketio.emit("chat", chaos_msg) # Emit the message to all connected clients

# Flask HTTP route for health check (Render will check this)
@app.route("/")
def health():
    """Simple health check endpoint for Render."""
    return "Slippy backend running."

# Socket.IO event handler for user joining
@socketio.on("join")
def on_join(data):
    username = (data or {}).get("username", "Anonymous")[:24] # Get username, truncate to 24 chars
    avatar = (data or {}).get("avatar", "") # Get avatar
    users[request.sid] = {"username": username, "avatar": avatar} # Store user info with their session ID

    # Send the full list of currently online users to everyone
    socketio.emit("users", list(users.values()))

    # Send message history to the joining user only
    for msg in messages:
        emit("chat", msg, to=request.sid)

    # Broadcast a system message about the user joining
    join_msg = {
        "username": "System",
        "avatar": "⚙️", # System avatar
        "content": f"{username} joined the room.",
        "timestamp": now_iso_utc(),
        "isSlippyFake": False
    }
    messages.append(join_msg) # Add to history
    socketio.emit("chat", join_msg) # Emit to all clients

# Socket.IO event handler for sending messages
@socketio.on("send")
def on_send(data):
    me = users.get(request.sid, {"username": "Anonymous", "avatar": ""}) # Get sender's info
    content = (data or {}).get("content", "")[:500] # Get message content, truncate to 500 chars
    if not content:
        return # Don't send empty messages

    # Construct the message object
    msg = {
        "username": me["username"],
        "avatar": me["avatar"],
        "content": content,
        "timestamp": now_iso_utc(),
        "isSlippyFake": False # Not a Slippy fake message
    }
    messages.append(msg) # Add to history
    if len(messages) > MAX_MSGS:
        del messages[:-MAX_MSGS] # Trim history
    socketio.emit("chat", msg) # Emit to all clients

# Socket.IO event handler for user disconnecting
@socketio.on("disconnect")
def on_disconnect():
    u = users.pop(request.sid, None) # Remove user from active users
    if u:
        socketio.emit("users", list(users.values())) # Update user list for everyone
        leave_msg = {
            "username": "System",
            "avatar": "⛔", # System avatar for leaving
            "content": f"{u['username']} left the room.",
            "timestamp": now_iso_utc(),
            "isSlippyFake": False
        }
        messages.append(leave_msg) # Add to history
        socketio.emit("chat", leave_msg) # Emit to all clients
        socketio.emit("user_left", u["username"]) # Emit specific event for frontend to handle user status


if __name__ == "__main__":
    # Start the Slippy bot loop in a separate daemon thread
    threading.Thread(target=slippy_loop, daemon=True).start()
    # For local development: run the SocketIO app on 0.0.0.0:5000
    # This line should NOT be run when deployed on Render, as Gunicorn handles it.
    socketio.run(app, host="0.0.0.0", port=5000, debug=True) # debug=True is for local development only
