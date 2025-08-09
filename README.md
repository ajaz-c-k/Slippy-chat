![WhatsApp Image 2025-08-09 at 03 49 36_cca1d95a](https://github.com/user-attachments/assets/07c8f575-647e-4b89-b730-bd9f0047e27e)

# Slippy Bot 🎯

## Team Bitwise Operators

**Team Lead:** AJAZ AHAMMED C K — School of Engineering, CUSAT

**Member 2:** AJAY SHYAM SUNDAR — School of Engineering, CUSAT

---

## Project Description

Welcome to **Slippy Chat** — a fun, quirky, and slightly chaotic chatroom inspired by the legendary Microsoft Office Clippy. You remember Clippy, right? The little paperclip that popped up with helpful tips? Well, Slippy Bot is like Clippy’s mischievous cousin who loves jumping into your chats and stirring things up.

Slippy Bot randomly picks words from your messages, swaps them out with hilarious Urban Dictionary definitions, and even pretends to be other users just to mix things up. Here, nothing is quite what it seems, and the fun never ends.

> "വാക്ക് ഉണ്ട്. അർത്ഥമില്ല. കാഴ്ച ഉണ്ട്. സത്യമില്ല."

---

## The Problem (that doesn't exist)

Chats today are just... normal. Too normal, maybe? People talk, others reply, everything makes sense — which can get boring! Online conversations miss the joy of silly, random, and weird interruptions. People secretly want a little confusion, surprise, and fun messiness.

---

## The Solution (that nobody asked for)

**Slippy Chat** is a chatroom where your messages don’t always mean what you think they do. Our troublemaker, Slippy Bot, intercepts messages randomly, grabs a random word, messes it up using funny Urban Dictionary meanings, and then drops the altered message back into the chat — pretending someone else said it.

The result? A hilarious mix-up that leads to silly confusion and tons of laughs. You might read something wild and wonder, “Did I really say that?” Well… maybe not!

---

## Technologies & Tools

### Languages

- Python  
- TypeScript  
- JavaScript  
- HTML  
- CSS  

### Frameworks & Libraries

- React.js  
- Flask  
- React Router  
- Shadcn/ui  
- Tailwind CSS  
- Socket.IO Client  
- Flask-SocketIO  
- Flask-CORS  
- Lucide-React  
- Gunicorn  
- Eventlet  

### Tools

- Vite  
- npm  
- yarn  
- Git  
- Vercel  
- Render  

---

## Installation & Setup

### Frontend

```bash
npm install
npm run start
````

### Backend

```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
pip install -r requirements.txt

# To run backend
gunicorn --worker-class eventlet -w 1 app:app
# (Assumes app.py with Flask instance named 'app')
```

---

## How It Works — User & Slippy Bot Workflow

* User enters the chat and joins by choosing a name and avatar.
* User types a message, for example: "This is a totally normal sentence."
* The message is sent into the chat stream.
* There is a random chance that Slippy Bot will intercept the message.
* Slippy Bot randomly selects a word from the message (e.g., "normal").
* Slippy Bot queries the Urban Dictionary API for a quirky definition of that word.
* Slippy Bot creates a "Chaos Message" by replacing the word with the fetched definition.
* The chaos message is sent, pretending to be from another random user.
* Both the original and chaos messages are broadcast to all users in real time.

---

### Workflow Diagram

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                 👋 User Enters the Arena! 👋                 ║
║               (Clicks "Join Chat" button!)                   ║
║                                                              ║
╚═══════════════════════════════════╦══════════════════════════╝
                                     ║
                                     ║  📨 User Types a Message...
                                     ║     "This is a totally normal sentence."
                                     ▼
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           🚀 Message BLASTS into the Chat Stream! 🚀          ║
║                            ║
║                                                              ║
╚═══════════════════════════════════╦══════════════════════════╝
                                     ║
                                     ║
                                     ║  🎲 RANDOM CHANCE ENCOUNTER! 🎲
                                     ║  (Will Slippy Bot Awaken?)
                                     ▼
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║      🤖 Slippy Bot: "Hmm, what's a fun word today?" 🤖       ║
║            (Intercepts message ~sometimes~)                 ║
║                                                              ║
╚═══════════════════════════════════╦══════════════════════════╝
                                     ║  👇 Grabs a **RANDOM WORD** from the message!
                                     ║     (e.g., "normal" 🧐)
                                     ▼
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           🔍 "Time for some Urban Wisdom!" 🔍                 ║
║       (Slippy Bot consults the Urban Dictionary API)         ║
║                                                              ║
╚═══════════════════════════════════╦══════════════════════════╝
                                     ║  ✨ Fetches a truly... *unique* definition!
                                     ▼
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║             🤯 Generates a "Chaos Message"! 🤯               ║
║   (Picks a **RANDOM USER** in the chat to blame it on!)      ║
║   "UserX: [Original sentence with 'normal' replaced by       ║
║            its bizarre Urban Dictionary definition!]"        ║
║                                                              ║
╚═══════════════════════════════════╦══════════════════════════╝
                                     ║
                                     ║  📢 Both messages (original & chaos) become...
                                     ▼
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║          📡 "Broadcast Time! Everyone gets a show!" 📡       ║
║              (Socket.IO sends messages to ALL clients!)      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Project Demo

Watch the full Slippy Chat experience here:  
[![Slippy Chat Demo](https://img.youtube.com/vi/3mTemYivpwQ/0.jpg)](https://youtu.be/3mTemYivpwQ?si=bGNi_h2AI-Bss8Hw)

Additional Demo:  
[![Additional Demo Video](https://img.youtube.com/vi/5SRniPi9gHQ/0.jpg)](https://youtu.be/5SRniPi9gHQ?si=02AVf-2QCo0_oDmg)

---

## Screenshots

| ![Login Page](https://github.com/user-attachments/assets/ae6fab4e-f52a-4c07-b880-f1fd8f043473) | ![Main Chat Interface](https://github.com/user-attachments/assets/5b137c90-7b12-4f8e-9e67-898581d371e7) | ![Slippy Bot Chaos Message](https://github.com/user-attachments/assets/d50a8ff0-1c84-4cd3-b8ad-fab7eb8f72f0) |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Welcome/login page with avatar select and warning: "Slippy bot is watching..."                 | Chat interface with active users and real-time messages                                                 | Slippy Bot injects Urban Dictionary definitions, causing chaos!                                              |

---

## Project Repositories & Contributions

* [Slippy Chat Repository](https://github.com/ajaz-c-k/Slippy-chat)

**Team Members GitHub Profiles:**

* AJAZ AHAMMED C K: [https://github.com/ajaz-c-k](https://github.com/ajaz-c-k)
* AJAY SHYAM SUNDAR: [https://github.com/ajaypushparaj5](https://github.com/ajaypushparaj5)

---

Feel free to reach out if you want to contribute or have questions. Happy chatting — but watch out for Slippy Bot! 😜

```
```
## Live Demo

Try out Slippy Chat live on Render:  
[https://slippy-chat-1.onrender.com](https://slippy-chat-1.onrender.com)

```
