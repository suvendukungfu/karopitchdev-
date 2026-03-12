# Karo Pitch Landing Page

Premium one-page marketing experience for **Karo Pitch**, built to showcase startup discovery and investor-founder matching across Bharat.

## Overview

This project is a responsive, animation-rich frontend built with plain HTML, CSS, and JavaScript. It presents the Karo Pitch narrative end-to-end: discovery, curation, investor trust, and conversion CTA.

## Highlights

- Spatial/glassmorphism visual system with animated ambient background
- Interactive startup radar with hover panel and founder spotlight modal
- Scroll-triggered reveal animations and KPI count-up statistics
- Responsive navigation with mobile menu toggle
- Upvote interaction states for featured startup cards
- Clean, dependency-free stack for easy deployment anywhere

## Tech Stack

- HTML5
- CSS3 (custom properties, responsive breakpoints, animations)
- Vanilla JavaScript (DOM interactions, observers, UI state)

## Project Structure

```text
.
├── index.html      # Page structure and content
├── styles.css      # Design system, layout, effects, responsive rules
└── script.js       # Interactions, animations, and UI behavior
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/suvendukungfu/karopitchdev-.git
cd karopitchdev-
```

2. Run locally with any static server:

```bash
python3 -m http.server 8080
```

3. Open:

```text
http://localhost:8080
```

## Deployment

Because this is a static frontend, it can be deployed directly to:

- GitHub Pages
- Netlify
- Vercel
- Any CDN/static hosting provider

## Quality Improvements Included

- Fixed broken JS selectors and ID/class mismatches
- Added robust modal lifecycle (escape key, overlay close, scroll lock)
- Added nav scroll state behavior and mobile menu state management
- Added safer animation/counter guards and accessibility focus styles
- Corrected section anchors and minor content typos

## Future Enhancements

- Integrate real startup/investor data from an API or CMS
- Persist upvote state and leaderboard ordering
- Add form backend for `Apply to Pitch` and `Request Pitch Deck`
- Add analytics and conversion tracking

## License

Proprietary / internal use unless explicitly relicensed by repository owner.
