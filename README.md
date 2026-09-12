# Hansaka Bandara — Portfolio V2

Portfolio for Hansaka Bandara, a UI/UX Designer and Frontend Developer. “The Island” presents the work as a cinematic journey through a storm coast in dark mode and the same landscape after the storm in light mode.

## Features

- Responsive Splash, Hero, Story, Expeditions, Field Notes, Explorer, capabilities, Trail, tools, Signal, and Horizon sections
- Three primary projects in fixed order: MUC Digital, Finance Manager, and Estate Agent SPA
- Native scroll choreography with a pinned desktop story and a vertical mobile flow
- Dark and light themes with saved preference and system-preference fallback
- Keyboard navigation, visible focus states, semantic landmarks, and reduced-motion support
- Responsive WebP artwork with lazy loading below the opening experience

## Run locally

Serve the repository root over HTTP. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

No build step or JavaScript framework is required. `index.html` is the production entry point and can be deployed as a static site.

## Structure

```text
index.html             Portfolio V2 page and metadata
css/                   Theme, layout, cinematic world, and choreography styles
js/                    Theme, splash, section, and scroll behavior
assets/world/          Responsive cinematic WebP artwork
assets/profile.jpg     Explorer portrait
assets/Hansaka_Bandara_CV.pdf
```

The Contact / Signal form is intentionally unconnected and directs visitors to the visible email link. Configure a real endpoint in `data-endpoint` before enabling message delivery.

## Contact

- [Email](mailto:hansakarbandara@gmail.com)
- [GitHub](https://github.com/Hansaka-co)
- [LinkedIn](https://www.linkedin.com/in/hansaka-r-bandara-408642409)
