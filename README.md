# pharma& — Website Clone

A responsive multi-page pharmaceutical company website inspired by the layout and visual style of pharmaand.com. Original placeholder copy throughout — replace with your real content before publishing.

## What's included

```
pharmaand-clone/
├── index.html        Home page (hero, mission, pillars, stats, news, CTA)
├── about.html        About Us
├── products.html     Products / portfolio
├── innovation.html   Innovation / lifecycle work
├── medicines.html    Therapy areas
├── patients.html     For patients
├── news.html         Newsroom listing
├── faqs.html         Frequently asked questions (accordion)
├── contact.html      Contact form + info
├── css/
│   └── styles.css    Compiled stylesheet (use this in browser)
├── scss/
│   └── styles.scss   SCSS source — edit this and recompile
├── js/
│   └── main.js       Sticky header, mobile nav, reveal animations,
│                     animated counters, contact form handler
├── assets/           (drop logos / hero image / videos here)
└── README.md
```

## Design system

| Token | Value |
|---|---|
| Primary purple | `#4B1F6F` (deep) → `#7A3AA5` (mid) → `#9B6AD6` (accent) |
| Background | `#FFFFFF` / `#FAF7FD` (soft) |
| Text | `#1C1024` (ink) / `#4A3A58` (soft) |
| Display & body font | Century Gothic, with Jost / Futura / Trebuchet MS / system-ui as fallbacks |
| Radii | 14px (cards/inputs), 22px (large surfaces), 999px (buttons) |

Century Gothic is shipped as a system font on Windows and most Mac installs. If you'd like a guaranteed-anywhere web font, swap it for [Jost](https://fonts.google.com/specimen/Jost) on Google Fonts — it's a free, geometric-sans alternative.

## Running locally

Double-click `index.html` to open in a browser, or for a smooth dev experience:

```bash
# from inside pharmaand-clone/
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Editing the stylesheet

The plain `css/styles.css` is what the browser loads. The `scss/styles.scss` is the editable source — if you want to use it, install Sass and recompile:

```bash
npm install -g sass
sass scss/styles.scss css/styles.css --watch
```

## Customising

- **Logo**: replace the `<span class="logo-text">pharma&</span>` markup with an `<img>` from `assets/`.
- **Hero background**: the hero uses a CSS gradient — to use a video like the reference site, drop an MP4 into `assets/` and add a `<video autoplay muted loop>` inside `.hero` before `.hero-overlay`.
- **News images**: replace the gradient `style="..."` on `.news-img` with `<img>` tags pointing to `assets/`.
- **Contact form**: the demo handler in `main.js` is front-end only. Wire it to your backend / form service (Formspree, Netlify Forms, etc.) for real submissions.
- **Colors**: edit the `:root` variables at the top of `css/styles.css` (or the SCSS variables in `scss/styles.scss`) to retune the palette globally.

## Notes

This is an original template inspired by the public layout of pharmaand.com. All written copy, images (gradient placeholders), and code are original — replace them with your own approved content, brand assets, and legal pages before going live.
