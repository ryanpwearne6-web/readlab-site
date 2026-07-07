# Read Lab — Website

A professional storefront for Read Lab. It presents your method, the reading journey, and your resources, then hands checkout off to your existing **Payhip** store. Built to run as a **Render web service** and kept awake 24/7 with a free **UptimeRobot** monitor.

```
readlab-site/
├─ public/
│  └─ index.html     ← the entire website (edit text/links here)
├─ server.js         ← tiny server + /healthz keep-alive endpoint
├─ package.json      ← tells Render how to run it
├─ .gitignore
└─ README.md         ← this file
```

---

## 1. Before you deploy — edit your links (5 minutes)

Open `public/index.html` and scroll to the `CONFIG` block near the bottom (inside `<script>`). Change these to your real links:

- **`STORE`** — your Payhip store (already set to `https://payhip.com/ReadLab`).
- **`LINKS`** — swap each `STORE` for the exact Payhip product link when you have it (e.g. `https://payhip.com/b/abc12`). The site now leads with the **Question Cards**, so the important ones are:
  - `qcards` — your main free Question Cards product page (used by the big "Get the free cards" buttons)
  - `qcards-print` — *FREE - Question Cards Printout*
  - `qcards-full` — *FREE - Question Cards Full*
  - `read-at-home`, `reading-guide`, `store` — the reading-pillar links (guides, the free "Get Reading Right!" guide, and the full store for the letter-sound sets)
  To find a product's link: open the product in Payhip → copy its page URL. Until you do this, **every button safely opens your main store**, so nothing is broken.
- **`SOCIAL`** — paste your Instagram, YouTube and Facebook URLs (TikTok is pre-filled).
- **`CONTACT_EMAIL`** — change to your real email address.

You can also replace the "photo goes here" placeholder in the **About** section and the three testimonial placeholders whenever you're ready. Everything else works as-is.

> **Positioning note:** the homepage now leads with connection/development (the Question Cards) and treats reading as a secondary "when they're ready" pillar — matching where your downloads are actually going.

---

## 2. Put the code on GitHub

1. Create a free account at **github.com** if you don't have one.
2. Click **New repository** → name it `readlab-site` → **Create**.
3. Upload the files: on the new repo page click **uploading an existing file**, drag in `public/`, `server.js`, `package.json`, `.gitignore`, and `README.md`, then **Commit changes**.
   *(Do not upload `node_modules` — Render builds that itself.)*

---

## 3. Deploy to Render

1. Go to **render.com** and sign up (no credit card needed for the free tier).
2. Dashboard → **New +** → **Web Service**.
3. **Connect your GitHub** and pick the `readlab-site` repo.
4. Fill in the settings:
   - **Name:** `readlab` (this becomes your URL: `https://readlab.onrender.com`)
   - **Region:** choose the closest (e.g. Singapore for Australia)
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** **Free**
5. Click **Create Web Service**. Render installs and launches it (first build ≈ 1–2 min).
6. When the log shows **"Read Lab is live on port …"**, open your new URL and click through the whole site. Confirm every **Buy** button opens Payhip.

> **Heads up:** on the free tier the site **sleeps after 15 minutes** with no visitors and takes about a minute to wake on the next visit. Step 4 fixes that.

---

## 4. Keep it awake with UptimeRobot (the "no traffic" fix)

Your `server.js` already exposes a health endpoint at **`/healthz`**. A free monitor pings it every few minutes so Render never spins the site down.

1. Sign up free at **uptimerobot.com**.
2. **Dashboard → + New monitor.**
3. Set it up:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** `Read Lab keep-alive`
   - **URL:** `https://readlab.onrender.com/healthz` *(use your real Render URL)*
   - **Monitoring Interval:** 5 minutes
4. **Create Monitor.** Within a few minutes it shows green/**Up**.
5. Leave the site alone for 20+ minutes, then visit it — it should load instantly with no cold-start delay. Done.

> Free tier gives 750 hours/month — enough to run one service non-stop all month.

---

## 5. Going further (optional, later)

- **Custom domain** (e.g. `readlab.com.au`): buy a domain, then in Render → your service → **Settings → Custom Domains** → add it and follow the DNS steps. Render issues a free HTTPS certificate automatically.
- **Update the site anytime:** edit files on GitHub (or push changes) and Render auto-redeploys.
- **Add real reviews & your photo** as you gather them — social proof lifts conversions more than almost anything else.

---

## Running it locally (optional)

```bash
npm install
npm start
# open http://localhost:3000
```
