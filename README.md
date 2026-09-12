<div align="center">

# HΞNSKΛ

### The Island — Portfolio V2

*Turning Challenges Into Solutions.*

![Portfolio](https://img.shields.io/badge/Portfolio-V2-0A1C2A?style=flat-square)
![UI/UX](https://img.shields.io/badge/UI%2FUX-Design-D1AA6E?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-Development-274154?style=flat-square)
![Responsive](https://img.shields.io/badge/Layout-Responsive-9FB8CC?style=flat-square)
![Dark and Light Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-112B3D?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel)

A cinematic portfolio for **Hansaka Bandara**, UI/UX Designer and Frontend Developer.

</div>

## Live Demo

> **Production URL:** Not stored in the repository configuration. Add the confirmed Vercel deployment URL here.

## Preview

| The Storm — Dark Mode | After the Storm — Light Mode |
| --- | --- |
| Screenshot pending: `docs/screenshots/dark-mode.png` | Screenshot pending: `docs/screenshots/light-mode.png` |

The existing `assets/preview.png` represents the retired portfolio design and is deliberately not used here.

## About the Project

**The Island** presents a career in software and design as a journey through an uncertain landscape. The storm represents challenge and ambiguity; the island is the path forward; the explorer represents Hansaka; the lighthouse is opportunity and connection; and the horizon stands for continued growth.

The interface connects this narrative to a practical portfolio: visitors move from the opening environment into selected work, project Field Notes, background, capabilities, experience, tools, and contact information.

## Experience / Story Flow

```text
ENTER THE ISLAND
        ↓
      Hero
        ↓
  The Journey
        ↓
  Expeditions
        ↓
   Field Notes
        ↓
 The Explorer
        ↓
Survival Skills
        ↓
   The Trail
        ↓
Tools I Carry
        ↓
  The Signal
        ↓
  The Horizon
```

## Featured Projects

| Project | Purpose | Role / Focus | Repository / Demo |
| --- | --- | --- | --- |
| **01 — MUC Digital** | Presents urban council services through focused mobile booking flows and accessible module interfaces. | Service design and mobile interface | [Repository](https://github.com/Hansaka-co/muc-digital) · Demo not listed |
| **02 — Finance Manager** | Brings income, expenses, budgets, savings goals, and analytics into one personal finance workspace. | Product interface and web application | [Repository](https://github.com/Hansaka-co/finance-manager) · Demo not listed |
| **03 — Estate Agent SPA** | Supports property search, listing details, galleries, and saved favourites in a client-side application. | Frontend development and property search | [Repository](https://github.com/Hansaka-co/estate-agent-spa) · Demo not listed |

## Key Features

- Two distinct cinematic environments: **The Storm** and **After the Storm**
- Persistent theme preference with system-theme fallback
- Immersive, native-scroll storytelling with layered parallax
- Pinned and staged desktop sequences with a streamlined mobile flow
- Responsive project covers and environmental artwork
- Three-project Expeditions sequence in a fixed narrative order
- Expandable Field Notes for problem, process, development, and outcomes
- Accessible navigation, focus states, semantic landmarks, and form feedback
- Direct email and social contact routes; the on-page form awaits a configured endpoint
- SEO metadata, structured person data, responsive WebP assets, and viewport-aware scene loading

## Tech Stack

### Frontend

- HTML5
- CSS3, including custom properties, responsive layouts, and theme-specific scene systems
- Vanilla JavaScript

### Animation

- CSS transforms, transitions, and keyframe animation
- Native scrolling and `requestAnimationFrame`
- Intersection Observer API
- View Transitions API with a CSS fallback for theme changes

### Design

- Figma
- Cormorant Garamond and Manrope via Google Fonts
- Responsive WebP environmental and project artwork

### Development / Deployment

- Git
- GitHub
- Static-site deployment suitable for Vercel; the production URL is not committed

The project does not use a package manager, framework runtime, or build step. GSAP and ScrollTrigger are not present in the production page.

## Running Locally

```bash
git clone https://github.com/Hansaka-co/Portfolio.git
cd Portfolio
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Serve the repository over HTTP so asset loading, navigation, and browser APIs behave consistently; opening `index.html` through `file://` is not recommended.

## Accessibility & Performance

- `prefers-reduced-motion` removes or simplifies cinematic movement and staged transitions.
- Semantic `nav`, `main`, `section`, `article`, `details`, `form`, and `footer` elements define the page structure.
- Navigation and theme controls expose descriptive accessible labels and keyboard interactions.
- Responsive layouts support desktop and compact viewports without changing the story order.
- Scene and project artwork uses optimized WebP variants, responsive sources, lazy loading, and viewport-aware loading.
- Continuous atmospheric work pauses when relevant sections or the document are not visible.

## Repository Structure

```text
Portfolio/
├── index.html                 # Portfolio V2 entry point and metadata
├── css/                       # Theme, section, world, and choreography styles
├── js/                        # Splash, theme, content, and scroll interactions
├── assets/
│   ├── world/                 # Hero, project, explorer, and foreground artwork
│   ├── scenes/                # Dark/light Story, Explorer, Signal, and Horizon scenes
│   ├── icons/                 # Technology icons
│   ├── profile.jpg            # Author portrait
│   └── Hansaka_Bandara_CV.pdf
├── docs/screenshots/          # README preview images
├── templates/field-notes.html # Reusable Field Notes structure
├── UI desighn/                # Dark and light design-reference boards
├── About/ and Home/           # Retained legacy page files
├── PORTFOLIO_V2_SPEC.md       # V2 content and implementation specification
└── LEGACY_REVIEW.md           # Legacy-code audit record
```

## Design Philosophy

Dark mode is not simply a recolor of light mode. Both represent two environmental states of the same journey.

**The Storm** uses rough water, dark cliffs, fog, cold light, and a distant lighthouse to express uncertainty. **After the Storm** returns to the same world at dawn, with calmer water, warmer terrain, softer mist, and clearer visibility. The structure stays consistent while the emotional conditions change.

## Author

**Hansaka Bandara**<br>
UI/UX Designer & Frontend Developer

- Portfolio: production URL pending confirmation
- [GitHub](https://github.com/Hansaka-co)
- [LinkedIn](https://www.linkedin.com/in/hansaka-r-bandara-408642409)
- [Email](mailto:hansakarbandara@gmail.com)

<div align="center">

*“Still exploring. Always building.”*

</div>
