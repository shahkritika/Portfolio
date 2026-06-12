# Kritika Shah — Portfolio with Working Contact Form

This package contains:
- `kritika_shah_portfolio.html` — your portfolio website (frontend)
- `server.js` — backend server that sends contact form messages to your email
- `package.json` — list of required packages
- `.env.example` — template for your secret credentials

---

## How it works (the flow)

1. A visitor fills out the "Send a message" form on your portfolio
2. Their browser sends that data to your backend server (`/api/contact`)
3. The backend server uses **Nodemailer** to log into your Gmail and send
   YOU an email containing their name, email, and message
4. You can hit "Reply" on that email to respond directly to them

---

## Setup Instructions

### Step 1 — Install Node.js
If you don't have it, download from https://nodejs.org (LTS version)

### Step 2 — Install dependencies
Open a terminal in this folder and run:
```bash
npm install
```
This installs: express, cors, nodemailer, dotenv

### Step 3 — Create a Gmail App Password
Your normal Gmail password won't work for security reasons. You need an
"App Password":

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already on)
3. Go to https://myaccount.google.com/apppasswords
4. Select app: "Mail", select device: "Other" → name it "Portfolio"
5. Google gives you a 16-character code like: `abcd efgh ijkl mnop`
6. Copy it (remove spaces): `abcdefghijklmnop`

### Step 4 — Create your `.env` file
1. Duplicate `.env.example` and rename the copy to `.env`
2. Fill it in:
```
EMAIL_USER=shahkritika258@gmail.com
EMAIL_PASS=abcdefghijklmnop
PORT=3000
```

### Step 5 — Run the server
```bash
npm start
```
You should see:
```
🚀 Server running at http://localhost:3000
📩 Contact form messages will be sent to: shahkritika258@gmail.com
```

### Step 6 — Open your portfolio
Go to: **http://localhost:3000/kritika_shah_portfolio.html**

(Important: open it through this URL, NOT by double-clicking the HTML file,
otherwise the contact form can't reach your backend.)

### Step 7 — Test it
Fill out the contact form and click "Send message". Check your Gmail inbox —
you should receive an email within a few seconds!

---

## Deploying online (so it works for everyone, not just your computer)

Free hosting options for the backend:
- **Render** (render.com) — free tier, easy GitHub deploy
- **Railway** (railway.app) — free tier

Steps:
1. Push this whole folder to a GitHub repo
2. Connect the repo to Render/Railway
3. Add your `.env` variables (EMAIL_USER, EMAIL_PASS) in their dashboard
   under "Environment Variables" (don't upload your `.env` file itself!)
4. Deploy — you'll get a URL like `https://your-app.onrender.com`
5. Open `kritika_shah_portfolio.html`, find this line near the bottom:
   ```js
   const API_URL = 'http://localhost:3000/api/contact';
   ```
   Change it to:
   ```js
   const API_URL = 'https://your-app.onrender.com/api/contact';
   ```
6. Host the HTML file itself on Netlify, Vercel, or GitHub Pages

---

## Troubleshooting

**"Could not reach server"**
→ Make sure `npm start` is running and you opened the site via
`http://localhost:3000/...` not by double-clicking the file.

**"Failed to send message"**
→ Double check your `.env` file — especially `EMAIL_PASS` (must be the
16-character App Password, not your Gmail login password).

**Emails not arriving**
→ Check your Spam folder. Also verify 2-Step Verification is enabled on
your Google account (required for App Passwords to work).
