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

## Deployment & DNS Troubleshooting

**If you see "Your connection isn't private" (NET::ERR_CERT_COMMON_NAME_INVALID):**
This is normal for new domains. It means GitHub's SSL certificate is still provisioning.

1.  **Wait 24 Hours:** It can take time for Let's Encrypt to issue the certificate.
2.  **Verify GitHub Settings:**
    *   Go to **Settings > Pages**.
    *   **Build and deployment > Source**: Set to **GitHub Actions** (recommended) or "Deploy from branch" if you are manually building.
    *   **Custom Domain**: Ensure `vexelstudios.xyz` is entered.
    *   **Enforce HTTPS**: Check this box once the DNS check succeeds.
3.  **Verify DNS Records:**
    *   Ensure your domain provider has **A Records** pointing to GitHub's IPs (`185.199.108.153`, etc).

## Local Development

1.  Install dependencies: `npm install`
2.  Start development server: `npm run dev`
3.  Build for production: `npm run build`

---
© Vexel Studios. All Systems Operational.