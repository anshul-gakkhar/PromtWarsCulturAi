# CulturAI

> An intelligent, AI-powered cultural travel companion that turns any destination into an immersive journey — generating dynamic cultural trails, evocative place summaries, hidden gems, and live regional events on the fly.

Built for the **PromptWars** hackathon (Google Antigravity, in-person, individual entry, 2–3 hour build window). Challenge track: **Destination Discovery & Cultural Experiences**.

## The challenge, and how CulturAI answers it

The brief asks for a GenAI platform that helps travelers discover destinations and engage with local culture in meaningful ways — using AI to **recommend attractions, uncover hidden gems, generate immersive storytelling, promote heritage, suggest local events, and connect visitors with authentic cultural experiences.**

CulturAI delivers all six in one seamless web experience:

| Challenge requirement | Where it lives in CulturAI |
|---|---|
| **Recommend attractions** | Every destination search generates a dynamic, live 6-stop cultural trail with exact GPS coordinates for map plotting. |
| **Uncover hidden gems** | The trail enforces 2 lesser-known hidden gems (out of 6). Plus, the Place page dynamically calculates Euclidean distance to surface the top 3 physically closest hidden gems in the region. |
| **Immersive storytelling** | Every landmark features a deep historical and cultural summary (the "Place Summary") complete with a native Text-to-Speech (TTS) narrator to read it aloud. |
| **Promote heritage** | CulturAI generates real-time "Cultural Dimensions" for landmarks, rendered as interactive badges that link directly to Wikipedia search queries to deepen the heritage learning experience. |
| **Suggest local events** | A dedicated Events engine fetches the top 10 live cultural festivals, rituals, and gatherings happening across the destination region. |
| **Authentic cultural experiences** | Connects users with AI-generated local guides based on specific cultural vibes (mystical, art, culinary, etc.) and deep-dive historical timelines. |

## The elegance hook

Zero build steps. Zero dependencies. Total flexibility.
CulturAI is built entirely with Vanilla HTML, CSS, and JavaScript, leveraging browser-native APIs (like `window.speechSynthesis`) to deliver a rich, app-like experience without the bloat of modern frameworks.

The entire AI orchestration layer fits elegantly in a single file (`js/app.js`), which handles prompt engineering, JSON schema validation, and fallback mechanisms if the API fails or rate limits.

```
js/app.js        Core AI engine, Gemini API orchestration, and JSON parsing
js/data.js       Offline curated database for graceful fallbacks
css/styles.css   Global stylesheet with custom design tokens
```

## Live app

- **Production:** Localhost / Offline mode
- **Repo:** https://github.com/kartik-batta/PromptWars

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Vanilla HTML5 / CSS3 / ES6+ | Maximum portability, zero configuration, instant execution in any browser |
| Generative AI | Google Gemini 2.5 Flash | Fast reasoning and "thinking" tokens to parse complex JSON arrays |
| Audio | Native Browser Web Speech API | Provides instant, zero-cost Text-to-Speech narration for place summaries |
| Styling | Pure CSS (Custom properties) | A cohesive, editorial UI using tailored glassmorphism and animations |
| Fonts | Inter & Fraunces | Editorial voice for narrative; clean sans for interface |
