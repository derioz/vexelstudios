# Vexel Studios

**Vexel Studios** is a premium web design and digital infrastructure agency. We specialize in high-performance, custom-coded web architectures for brands that demand precision and aesthetics.

## Project Overview

This repository contains the source code for the Vexel Studios official portfolio and operations platform. The site has been completely revamped to feature a modern, motion-rich design system using advanced UI libraries.

### Key Features
*   **Dynamic Hero:** Canvas-based wave animations and interactive typography.
*   **Bento Grid Portfolio:** A sophisticated grid layout showcasing featured projects.
*   **Service Matrix:** Interactive cards detailing our core offerings (Design, Build, Maintain).
*   **Timeline Process:** A visual journey through our 4-step client engagement model.
*   **Transparent Pricing:** Clear, tiered pricing plans with "Popular" highlights.
*   **New Client Guide:** A staggered-motion guide explaining our workflow and guarantees.

### Tech Stack

*   **Core:** React 19 & TypeScript
*   **Styling:** Tailwind CSS, `framer-motion`, `tailwindcss-animate`
*   **UI Libraries:** `uitripled`, `elevenlabs/ui`, `shadcn/ui`
*   **Icons:** Lucide React
*   **Build System:** Node.js & Vite

## Deployment Instructions (Manual)

We use a local build process to ensure maximum control over the production artifacts. The site is served from the `/docs` folder on the `main` branch.

### 1. Build Protocol
Run the following command in your terminal to generate the production build. This will compile the application and output it to the `docs` directory.

```bash
npm run build
```

*Note: This process also auto-generates the `CNAME` file required for custom domain routing.*

### 2. Version Control
Commit the changes including the updated `docs/` folder.

```bash
git add .
git commit -m "Deploy: Update production build"
git push origin main
```

## Local Development

1.  Install dependencies: `npm install`
2.  Start development server: `npm run dev`

---
© 2026 Vexel Studios. All Systems Operational.
**Author:** Damon