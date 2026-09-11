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
Primary mode: dark storm / deep navy. Secondary concept: **After the Storm**, with weathered sand, fog, stone and muted ocean tones. Do not use pure white as the main light background. Light mode is not authorized for this milestone.

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
| THE TRAIL | Experience and Education | Existing experience block; current #about fallback |
| THE SIGNAL | Contact Hansaka | #contact |

Mobile toggle: **MAP**, accessible label **Open navigation menu**. Open-menu subtitles: Selected Work, About Me, Experience & Education, Contact.

| Area | Themed language |
| --- | --- |
| Splash action | ENTER THE UNKNOWN |
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
Splash is visitor-controlled: darkness, centered wordmark, emerging horizon/fog/ocean/island/lighthouse, one restrained beam sweep, then ENTER THE UNKNOWN at approximately 1.5–2 seconds. Click/tap, Enter and native scrolling enter; Skip remains available. Reduced motion shows the entry state immediately. No fake loading indicators, percentages, autoplay audio or automatic forced entry. The same environment and wordmark carry into Hero.
Hero copy stays:
- UI/UX DESIGNER × FRONTEND DEVELOPER
- Turning / Challenges / Into Solutions.
- I design and build digital experiences that bring clarity to complex problems — through thoughtful interfaces and clean code.
- EXPLORE EXPEDITIONS; FOLLOW THE TRAIL
- Different paths. Same purpose.

## Authorized milestone: stop after About
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
Prioritize HealthHub, Estate Agent SPA, then Finance Manager if sufficient real content exists. Never invent data or client results.
Each large visual project presentation includes number, title, category, problem/value statement, image or clearly identified placeholder, technologies, OPEN FIELD NOTES, and real available repository/live links. Desktop may stage projects naturally; mobile is vertical, with no forced horizontal scrolling.
Repository audit for this milestone: no HealthHub or Estate Agent SPA content was found. Use **Finance Manager**, **MUC Digital**, and **NextGreen** as the supported selection. Finance Manager is listed as in progress; MUC Digital and NextGreen are listed as completed in existing content. Repository links and descriptions are inherited records, not independently audited delivery claims.
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
- No light mode, Contact, Experience, Tech Stack or further sections in this milestone.
- Leave existing legacy Experience/Contact content operational, without redesigning it. The boundary remains visibly unfinished until a future approval.
- Do not delete old assets unless confirmed unused and safe.
- Keep IDs and working anchors stable. No unnecessary libraries or WebGL.

## Verification and completion
Check desktop, tablet/mobile, horizontal overflow, anchors, keyboard access, reduced motion and JavaScript errors. Verify actual localhost DOM and fresh assets; never infer a live update from a file write alone.
Report each of the four sections under Finished and Still needs later polish, followed by Created / Modified / Left untouched files. Stop after About.
