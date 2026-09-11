# Hansaka Bandara Portfolio V2 — Project Specification

This is the source of truth for the rebuild on `portfolio-v2`. Later explicit user approvals may revise it. Implement only the milestone the user authorizes; stop at its boundary.

## Identity and concept
- Visual wordmark: **HΞNSKΛ**.
- Accessible, semantic and SEO name: **Hansaka Bandara**. Never substitute the stylized wordmark for the human-readable name everywhere.
- Primary role: **UI/UX Designer × Frontend Developer**.
- Core concept: **The Island** — a journey through the software industry.

| Story element | Meaning |
| --- | --- |
| Explorer | Hansaka |
| Unknown island / ocean | Software industry |
| Storms, cliffs, difficult routes | Challenges |
| Expeditions and discoveries | Projects |
| Tools carried | Skills |
| Trail travelled | Experience |
| Signal | Contact and the next opportunity |
| Horizon | Footer; the journey continues |

## Visual system
Primary mode: dark storm / deep navy. Secondary concept: **After the Storm**, with weathered sand, fog, stone and muted ocean tones. Do not use pure white as the main light background. Both modes are now authorized for the full structural version. Final cinematic polish is deferred.

| Token | Hex |
| --- | --- |
| Deep Ocean | #06131E |
| Storm Navy | #0A1C2A |
| Surface | #0D2232 |
| Raised Surface | #112B3D |
| Primary Fog Text | #EAF0F4 |
| Muted Text | #9FB0BC |
| Border | #274154 |
| Horizon Blue | #9FB8CC |
| Signal / Lighthouse Accent | #D1AA6E |

Display: **Cormorant Garamond**. UI/body: **Manrope**.
Cinematic, editorial, atmospheric, premium and minimal. Strong typography, restrained interfaces, low border radius, minimal shadows and almost no glow. Warm gold is reserved for meaningful signals and direction.

Do not use spider themes, particles, random neon, generic SaaS styling, excessive glassmorphism, bouncing, fake skill percentages, meaningless badges, heavy glow or scroll hijacking.

## Motion and accessibility
Interaction inspiration: the behaviour of the Eraf portfolio, not its visual design. This is conceptual direction, not a claim that a reference implementation was inspected.
Use scroll-driven storytelling, layered parallax, meaningful pinned moments, text-mask reveals, appropriate horizontal project transitions, subtle environmental movement and cinematic section transitions. Motion must explain progress; it must never obstruct reading or navigation.
Use semantic HTML, keyboard navigation, meaningful accessible labels, readable contrast and `prefers-reduced-motion`. No animation traps. Native scrolling remains available. Motion is progressive enhancement; essential content must be readable without JavaScript.
Design primarily around 1440px desktop, support tablet and approximately 390px mobile. Mobile may simplify animation and must use a vertical project sequence.

## Navigation and language
| Visible navigation | Accessible label | Existing target |
| --- | --- | --- |
| HΞNSKΛ | Hansaka Bandara | #home |
| EXPEDITIONS | Selected Work and Projects | #work |
| THE EXPLORER | About Hansaka | #about |
| THE TRAIL | Experience and Education | #trail |
| THE SIGNAL | Contact Hansaka | #contact |

Mobile toggle: **MAP**, accessible label **Open navigation menu**. Open-menu subtitles: Selected Work, About Me, Experience & Education, Contact.

| Area | Themed language |
| --- | --- |
| Splash action | ENTER THE ISLAND |
| Projects | EXPEDITIONS |
| Case studies | FIELD NOTES |
| About | THE EXPLORER |
| Capabilities | SURVIVAL SKILLS |
| Experience | THE TRAIL |
| Tech stack | TOOLS I CARRY |
| Contact | THE SIGNAL |
| Footer | THE HORIZON |

CTA vocabulary: EXPLORE EXPEDITIONS, OPEN FIELD NOTES, MEET THE EXPLORER, FOLLOW THE TRAIL, SEND A SIGNAL. Do not add CTAs to unauthorized sections.

## Approved foundation — preserve
Approved: Splash concept, HΞNSKΛ brand, Navbar, Hero structure, themed navigation, dark island environment, basic splash-to-hero interaction, basic parallax and current Hero copy.
Splash is visitor-controlled: darkness, centered wordmark, emerging horizon/fog/ocean/island/lighthouse, one restrained beam sweep, then ENTER THE ISLAND at approximately 1.5–2 seconds. Click/tap, Enter and native scrolling enter; Skip remains available. Reduced motion shows the entry state immediately. No fake loading indicators, percentages, autoplay audio or automatic forced entry. The same environment and wordmark carry into Hero.
Hero copy stays:
- UI/UX DESIGNER × FRONTEND DEVELOPER
- Turning / Challenges / Into Solutions.
- I design and build digital experiences that bring clarity to complex problems — through thoughtful interfaces and clean code.
- EXPLORE EXPEDITIONS; FOLLOW THE TRAIL
- Different paths. Same purpose.

## Current scope: complete structure in both themes

The latest user instruction supersedes the earlier stop-after-About boundary. Build all eleven areas in this order: Splash, Hero, Story Transition, EXPEDITIONS, FIELD NOTES, THE EXPLORER, SURVIVAL SKILLS, THE TRAIL, TOOLS I CARRY, THE SIGNAL, THE HORIZON. Do not begin final visual/motion polishing.

### Light palette — After the Storm
| Token | Hex |
| --- | --- |
| Main background | #D8D1C3 |
| Secondary background | #E4DED2 |
| Raised surface | #EAE4D9 |
| Secondary surface | #D0C8B9 |
| Primary text | #10222F |
| Muted text | #526674 |
| Border | #A8A090 |
| Horizon / ocean | #4F6C80 |
| Signal | #A97B43 |

Use localStorage for explicit theme choice. On a first visit respect an explicit system light preference; otherwise dark is the default. Apply the theme before first paint. The accessible toggle works throughout the page, including adapted environment colours. No pure-white site background.

## Section requirements
### 1. Story transition
Label: **01 / THE JOURNEY**.
Headline: **From surviving / to thriving.**
Copy: The software world is vast, competitive and constantly moving. Every storm becomes a lesson. Every obstacle becomes a new skill.
Subtle keywords: STORMS, OBSTACLES, LEARNING, PERSISTENCE, GROWTH.
Use a strong vertical composition, a cliff/path explorer, differentiated environmental depths and gradual scroll-linked text. Pinning is optional; avoid overanimation.

### 2. Expeditions / featured work
Label: **02 / EXPEDITIONS**.
Headline: **Real projects. / Real impact.**
Copy: Each expedition began with a real problem — and became something researched, designed and built with purpose.
The primary projects are exactly: 01 - MUC Digital, 02 - Finance Manager, 03 - Estate Agent SPA. Preserve this order in projects and Field Notes. Never invent results.
Each large visual project presentation includes number, title, category, problem/value statement, image or clearly identified placeholder, technologies, OPEN FIELD NOTES, and real available repository/live links. Desktop may stage projects naturally; mobile is vertical, with no forced horizontal scrolling.
Content audit: all three repositories were accessible through the GitHub API. Estate Agent SPA is a React/Vite client-side property-search application with detail pages and favourites, per its README. Its repository link is https://github.com/Hansaka-co/estate-agent-spa.git. NextGreen is replaced in the featured selection. Symbols: MUC Digital beacon, Finance Manager compass, Estate Agent SPA map; use existing theme tokens and accessible labels.
Keep Flight Analyzer and Smart Campus API records available for later curation (existing Git history retains their content). Do not invent public deployment URLs.

### 3. Case-study entry structure
Visible title: **FIELD NOTES**. Create one reusable record structure supporting Problem, Research, Design Decisions, Development and Result. Do not build full case studies yet. Use HealthHub only if sufficient evidence exists; otherwise use Finance Manager as the first supported record.
Opening a record should feel deliberate and accessible. Missing research, contributions, outcomes and visuals belong in clearly marked TODO code comments; never manufacture achievements. Real evidence can progressively fill the template.

### 4. About
Label: **03 / THE EXPLORER**.
Headline: **A curious mind. / A resilient builder.**
Position Hansaka as a UI/UX-focused Frontend Developer who turns complex problems into clear, useful digital experiences. Communicate curiosity, continuous learning, design thinking, frontend building, problem solving and willingness to explore unfamiliar challenges. Keep copy brief, personal and professional. No invented statistics.
Visual: a calmer cliff/rest point, horizon and restrained atmospheric movement. CTA: MEET THE EXPLORER, linked to the existing CV as the available personal introduction.

## Technical and scope rules
- Explain any necessary integration change to approved sections before making the smallest required change.
- Preserve approved Hero/Splash functionality; keep the repository working after every milestone.
- Reuse dark tokens; scope section-specific CSS and avoid repetitive markup.
- Complete both themes and all requested sections. Only basic motion; no final cinematic polish.
- Rebuild legacy Experience/Contact using known records, not invented companies or achievements. Retain legacy files/assets for a later cleanup review.
- Do not delete old assets unless confirmed unused and safe.
- Keep IDs and working anchors stable. No unnecessary libraries or WebGL.

## Verification and completion
Check desktop, tablet/mobile, horizontal overflow, anchors, keyboard access, reduced motion and JavaScript errors. Verify actual localhost DOM and fresh assets; never infer a live update from a file write alone.
Report all eleven sections under Finished and Still needs final polish, followed by Dark mode, Light mode, Mobile, Files created/modified and Legacy items to review. Stop after the full structure audit.

## Remaining structural sections
- **SURVIVAL SKILLS**: UI/UX Design, Frontend Development, Prototyping, Product Thinking, Problem Solving. Brief capability descriptions; no percentages.
- **THE TRAIL**: use the documented IIT degree (2024–present), Network Support Assistant Intern at People’s Leasing and Finance PLC (July 2025–January 2026), and Customer Service Representative at Gamma Pizza Craft Lanka (May 2024–April 2025). Do not invent milestones or outcomes.
- **TOOLS I CARRY**: group known tools into Design, Frontend, Programming and Tools. Figma; HTML/CSS/JavaScript/React/Tailwind; Java/Python; Git/GitHub/Supabase. Axure, Dart/Flutter, VS Code and Node are not verified personal skills here and should not be claimed merely because suggested.
- **THE SIGNAL**: “A signal can / change the journey.” Copy: “Have a project, opportunity or idea? Send a signal. The next route might start here.” Include actual email, GitHub and LinkedIn; a semantic form with a future API endpoint, validation, status/error handling and an explicit unconnected state. No mailto-only form; no false sent confirmations.
- **THE HORIZON**: “Still exploring. / Always building.” Include brand, themed navigation, social links, copyright and back-to-top.
- **FIELD NOTES**: its own entry area between projects and About. Reuse the native record template and show clearly identified content gaps for structural review. Project links target their specific records.

## Integration and audit status
The legacy stylesheet `css/style.css` and script `js/main.js` are retained for review but are no longer required by the V2 entry page after full structure integration. Older Home/About pages and assets remain on disk. No aggressive asset deletion.
