# Vexel Studios

**Vexel Studios** is a premium web design and digital infrastructure agency. We specialize in high-performance, custom-coded web architectures for brands that demand precision and aesthetics.

## Project Overview

This repository contains the source code for the Vexel Studios official portfolio and operations platform. It features a technical, dark-mode aesthetic inspired by hardware interfaces and cyber-security dashboards.

### Tech Stack

*   **Core:** React 19 & TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Typography:** Chakra Petch (Headers), Rajdhani (Technical), Inter (Body)
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
Open GitHub Desktop (or use CLI) and commit the changes. Ensure the `docs/` folder is included in your commit.

```bash
git add .
git commit -m "Deploy: Update production build"
git push origin main
```

### 3. DNS & Hosting Configuration
*   **GitHub Repository Settings:**
    *   Go to **Settings > Pages**.
    *   **Source:** Deploy from a branch.
    *   **Branch:** `main` | **Folder:** `/docs`.
    *   **Custom Domain:** `vexelstudios.xyz`.
    *   **Enforce HTTPS:** Enable this once the certificate provisions.

## Local Development

1.  Install dependencies: `npm install`
2.  Start development server: `npm run dev`

---
© Vexel Studios. All Systems Operational.