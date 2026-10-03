# Satish Kumar — Award-Level Personal Portfolio

An award-winning, "design-flex" personal portfolio built for **Satish Kumar**, 4th-Year B.Tech CSIT student at **SIRT Bhopal** (2023–2027).

Designed with a cinematic dark aesthetic, obsidian-to-charcoal gradients (`#0b0b0f` to `#161722`), electric coral red accent (`#ff3b30`), Lenis smooth scrolling, GSAP ScrollTrigger animations, custom interactive cursor, procedural generative crimson canvas, 3D project cards, and strict adherence to verified resume credentials.

---

## ⚡ Highlights & Design Features

1. **Preloader Experience**:
   - Dynamic 0 to 100 counter with realistic easing.
   - Spaced-out typography: `S A T I S H   K U M A R`.
   - Glowing crimson progress bar with smooth curtain-lift transition into the Hero.

2. **Hero Section (100vh)**:
   - Tagline pill: *"Turning data and ideas into products"*.
   - Academic badge: *4th-Year B.Tech CSIT // SIRT Bhopal*.
   - Centerpiece giant typography: **SATISH** — each letter begins as a sleek outline and transforms into a bold, solid white 3D-depth letter.
   - Ambient red blur blob tracking mouse movement with smooth lerping.
   - Bottom control bar with verified roles (**Data Analytics & Data Science // Full Stack Developer // Machine Learning & AI**), animated scroll mouse hint, and magnetic CTA buttons.

3. **The Philosophy Section**:
   - Header: *THE PHILOSOPHY*.
   - Canvas-based generative fluid artwork with radiant crimson/coral particle ribbons.
   - Word-by-word scroll reveal powered by GSAP ScrollTrigger.
   - 3 Frosted trait cards: *Data-Driven Precision*, *Full-Stack Execution*, *Continuous Curiosity*.

4. **Selected Work Showcase (Exact Resume Projects & Bullets)**:
   - **CodeGuardian AI**: Autonomous Security Engineer for Modern Development | AI, Software Security (Python, AST code graphs, automated vulnerability remediation).
   - **Data Analytics & Data Science Project**: Comprehensive data cleaning, Python + SQL analysis, Power BI and Advanced Excel dynamic dashboards.
   - **Zuvo**: Full-Stack E-Commerce Marketplace (React, Node.js, Express, MongoDB, RESTful APIs, cart state management).
   - Dynamic 3D tilt tracking cursor coordinates (`perspective` + `rotateX`/`rotateY`) with radial hover glows.

5. **Infinite Skills Marquee**:
   - Seamless ticker strip cycling through verified skills: `DATA ANALYTICS ✦ DATA SCIENCE ✦ PYTHON ✦ SQL ✦ POWER BI ✦ ADVANCED EXCEL ✦ MACHINE LEARNING ✦ ARTIFICIAL INTELLIGENCE ✦ REACT.JS ✦ NODE.JS & EXPRESS ✦ MONGODB ✦ GIT & GITHUB`.

6. **The Trajectory, Technical Arsenal & Verified Milestones**:
   - **Milestone Timeline**:
     - *2023 — 2027*: B.Tech CSIT at SIRT Bhopal (4th Year, In Progress).
     - *Self-Taught Curriculum*: Full Stack Web Engineering (React, Node, Express, MongoDB).
     - *Specialized Coursework*: Data Analytics by CodeWithHarry (Python, SQL, Advanced Excel, Power BI).
   - **Exact Categorized Skills**:
     - *Data & Analytics*: Data Analytics, Data Science, Excel, Advanced Excel, Power BI, Python, SQL, Data Cleaning.
     - *AI & Development*: Artificial Intelligence, Machine Learning, Web Development, Full Stack Development, Software Security.
     - *Full Stack*: React, Node.js, Express, MongoDB.
     - *Technical Foundations*: Python, JavaScript, HTML, CSS, SQL, Machine Learning.
     - *Tools & Workflow*: Git, GitHub, Collaborative Workflow.
   - **Resume Achievements & Accolades**:
     - Multi-disciplinary project delivery across Data Analytics, Data Science, AI, and Full-Stack web development.
     - Hands-on applied toolchain in production-style workflows.
     - Completed structured learning paths (CodeWithHarry + Self-directed).
     - Collaborative Git/GitHub version control foundation.

7. **Contact & Footer**:
   - Giant statement: *"Let's create something great together."*
   - Direct visible text with 1-click clipboard copy for **Email** (`satishkumar86367@gmail.com`) and **Phone** (`+91 9798545934`).
   - Verified profile links for **GitHub** (`github.com/satish-dev-git`) and **LinkedIn** (`linkedin.com/in/satish-kumar-995140294`).
   - Real-time live IST clock for Bhopal, India.
   - Quick inquiry form with instant mailto generation.
   - Fullscreen luxury navigation overlay with stagger reveal and haptic Web Audio FX.

---

## 🚀 How to Run Locally

You can run this project locally using Python's built-in HTTP server:

```bash
# In the project directory:
python -m http.server 8080
```

Then open your browser and navigate to:
```
http://localhost:8080
```

Alternatively, you can use VS Code's **Live Server** extension by right-clicking `index.html` and choosing **"Open with Live Server"**.

---

## 🌐 How to Deploy to Vercel (Step-by-Step)

This project is already pre-configured with `vercel.json` for zero-configuration, production-grade deployment with clean URLs, security headers, and caching.

### Option 1: Deploy via GitHub (Recommended & Easiest)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: award-level personal portfolio for Satish Kumar"
   git branch -M main
   # Create a repository on github.com/satish-dev-git/portfolio
   git remote add origin https://github.com/satish-dev-git/portfolio.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click on **"Add New..."** → **"Project"**.
   - Select your `portfolio` repository from the list.
   - Under **Framework Preset**, keep it as **"Other"** (static site).
   - Root directory is `./` (leave default).
   - Click **"Deploy"**.

3. **Live in 10 seconds**:
   - Vercel will instantly generate a free global HTTPS URL like `satish-kumar-portfolio.vercel.app`.
   - Any time you push a change to GitHub, Vercel will automatically redeploy!

---

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI (when disk space allows):
   ```bash
   npm i -g vercel
   ```
2. In the project folder, run:
   ```bash
   vercel
   ```
3. Follow the quick prompts in your terminal:
   - Set up and deploy? **Y**
   - Which scope? (Select your personal account)
   - Link to existing project? **N**
   - Project name? **satish-portfolio**
   - Directory located? `./`
4. For production deployment:
   ```bash
   vercel --prod
   ```

---

## 📁 File Structure

```
├── index.html          # Semantic HTML5, SEO meta tags, OpenGraph, accessibility
├── vercel.json         # Vercel routing, cache policies, and HTTP security headers
├── README.md           # Documentation and deployment instructions
├── css/
│   └── style.css       # Design tokens, custom animations, typography, responsive queries
├── js/
│   └── main.js         # Lenis smooth scroll, GSAP ScrollTrigger, canvas, audio, tilt
└── assets/
    └── favicon.svg     # Custom SVG monogram favicon
```

---

## 🛡️ Integrity & Resume Compliance

- **No fabricated metrics**: All statistics, skills, education percentages, and project names are strictly derived from Satish Kumar's authentic resume.
- **Responsive**: Fully tested across mobile, tablet, and widescreen viewports (360px to 2560px).
- **Accessible**: Semantic elements, `prefers-reduced-motion` compliance, ARIA roles, and high-contrast focus rings.
