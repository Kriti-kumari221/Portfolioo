# Kriti Kumari — AI & ML Developer Portfolio

A modern, animated personal portfolio built with **React + TypeScript + Vite**, featuring GSAP scroll animations, a 3D hero background, a Classic / Quantum theme switch, and sections for story, skills, projects, certificates, coding profiles, resume and contact.

## Features

- **Hero** — GSAP scroll-pinned intro with a lazy-loaded Three.js background
- **Story So Far** — scrollytelling timeline with a pinned image panel
- **Skills** — animated marquee and categorised skill cards
- **Projects & Certificates** — expandable cards (keyboard accessible, `Esc` to close)
- **Code Intelligence** — LeetCode / GitHub / CodeChef / GFG cards and a live GitHub contribution graph
- **Resume** — education and achievements tabs plus a PDF download button
- **Contact** — working form (Formspree, or opens the visitor's mail app as a fallback)
- **Two themes** — Classic (light) and Quantum (dark), remembered between visits
- **Responsive**, respects `prefers-reduced-motion`, active-section highlighting in the navbar

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui (Radix) · GSAP · Framer Motion · Three.js (`@react-three/fiber`, `drei`) · React Router

## Getting started

**Requirements:** [Node.js](https://nodejs.org) v18 or newer (v20+ recommended).

```bash
# 1. Go into the project folder
cd Portfolio-main

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Other commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the development server                  |
| `npm run build`   | Create the production build in `dist/`        |
| `npm run preview` | Serve the production build locally            |
| `npm run lint`    | Check the code with ESLint                    |
| `npm run test`    | Run tests (Vitest)                            |

## Before you publish — checklist

1. **Add your resume:** put your PDF at `public/Kriti_Kumari_Resume.pdf` (exact name) so the *Download Full Resume* button works.
2. **Enable the contact form (optional):** create a free form at [formspree.io](https://formspree.io), copy `.env.example` to `.env`, and set `VITE_FORMSPREE_ID`. Without it, the form opens the visitor's email app instead.
3. **Update your coding-profile numbers** in `src/components/GitHubSection.tsx` (LeetCode, GitHub, CodeChef, GFG stats are typed in by hand).
4. **Project links:** *CrimeIntel* has no live demo yet — add one in `src/components/ProjectsSection.tsx` (`demo`) and the button will appear automatically.

## Customising

| What                 | Where                                                       |
| -------------------- | ----------------------------------------------------------- |
| Name / title / bio   | `src/components/HeroSection.tsx`                            |
| Profile photo        | `src/assets/profile-photo.jpg`                              |
| Story chapters       | `chapters` in `src/components/StorytellingSection.tsx`      |
| Skills               | `skillCategories` in `src/components/SkillsSection.tsx`     |
| Projects             | `projects` in `src/components/ProjectsSection.tsx`          |
| Certificates         | `certificates` in `src/components/CertificatesSection.tsx`  |
| Education / awards   | `resumeData` in `src/components/ResumeSection.tsx`          |
| Colours / themes     | CSS variables in `src/index.css`                            |

## Deploying

The site is a static build, so any static host works.

**Vercel / Netlify:** import the repository, build command `npm run build`, output directory `dist`.

## Project structure

```
Portfolio-main/
├── public/              # Static files (favicon, images, resume PDF)
├── src/
│   ├── assets/          # Profile photo
│   ├── components/      # Page sections + shadcn/ui primitives
│   ├── hooks/           # use-modal (Esc / scroll lock), use-toast, use-mobile
│   ├── pages/           # Index (assembles all sections), NotFound
│   └── index.css        # Theme variables and global styles
├── index.html
├── tailwind.config.ts
└── vite.config.ts
```

## License

Personal portfolio — feel free to fork and adapt it for your own.
