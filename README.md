# Sri Ramya & Pavan Choudary — Wedding Invitation

A premium animated single-page wedding invitation web app for the Telugu wedding of **Sri Ramya** and **Pavan Choudary**, taking place on **27 August 2026** at The Grand Celebration Hall, Rajahmundry, Andhra Pradesh.

🌸 Live: [ramya-pavan-wedding.vercel.app](https://ramya-pavan-wedding.vercel.app)

## Tech Stack

- **HTML / CSS / JavaScript** — vanilla, no build step
- **GSAP + ScrollTrigger** — animation choreography
- **Lenis** — smooth scrolling
- **Lottie-web** — animated vector illustrations
- **Hosted on Vercel** — auto-deploys from GitHub

## Project Structure

```
ramya-pavan-wedding/
├── index.html              ← main page
├── vercel.json             ← deployment config
├── styles/
│   └── main.css            ← all styling
├── scripts/
│   ├── envelope.js         ← envelope opening logic
│   ├── countdown.js        ← timer to wedding date
│   ├── animations.js       ← GSAP timelines + Lenis smooth scroll
│   └── main.js             ← music toggle
└── assets/
    ├── images/             ← peacocks, leaves, garlands (Phase 2)
    ├── lottie/             ← .json animations
    └── audio/              ← optional ambient music
```

## Sections

1. **Envelope cover** — wax-seal opening with SP monogram
2. **Hero** — names + date inside a cream temple arch with banana-leaf framing
3. **Events** — Haldi, Mehendi & Sangeet, Wedding Ceremony, Reception
4. **Countdown** — live timer to 27 August 2026, 11:00 AM IST
5. **Message** — couple's note to guests
6. **Footer** — final blessings

## Phases

- **Phase 1** — foundation (current)
- **Phase 2** — integrate Freepik visual assets (peacocks, coconut trees, marigold garlands, kalasham, diya)
- **Phase 3** — Lottie animations + advanced GSAP choreography
- **Phase 4** — final polish & SEO

## Local Development

Just open `index.html` in a browser. No build step needed.

For a local server (recommended for testing):

```bash
# Python 3
python3 -m http.server 8000

# Or Node
npx serve .
```

Visit `http://localhost:8000`.

## License

Personal project — not for redistribution.
