# Seed of Nature

A deep psychological reflection tool built on the Seed of Nature framework.

## Stack
- React + Vite (frontend)
- Vercel (hosting + serverless API proxy)
- Anthropic Claude (AI coherence + synthesis)

## Local Development

```bash
npm install
npm run dev
```

For AI features locally, create `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
```

Then update the API URL in QuestionFlow.jsx and Synthesis.jsx to use the proxy:
```js
const ANTHROPIC_API_URL = "/api/claude";
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Add environment variable: `ANTHROPIC_API_KEY` = your Anthropic API key
4. Deploy

That's it. The `api/claude.js` file handles the API proxy server-side — your key never touches the browser.

## Architecture

```
src/
  App.jsx              — Phase manager (map → questions → synthesis)
  data/framework.js    — All 15 nodes, questions, inputs, exercises
  components/
    FrameworkMap.jsx   — Visual overview + progress
    QuestionFlow.jsx   — Question-by-question reflection + AI coherence
    Synthesis.jsx      — Big picture AI synthesis + 90-day strategic plan
api/
  claude.js            — Vercel serverless proxy (keeps API key server-side)
```

## Framework Structure

15 nodes across 3 axes, read bottom-up:

**Present** (Clarity → Discernment → Patterns [×4] → Framing → Presence)  
**Methods** (Understanding → Growth through Tension → Structures → Stable Character → Elevation)  
**Will** (Insight → Execution → Leadership → Influence → Creation)
