<<<<<<< HEAD
# Sahil Bundela — Portfolio

A premium, fully responsive portfolio website built with **Vite + React**, featuring Framer Motion animations, dark/light mode, a custom cursor, and a deep ocean blue design system.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 18 + Vite 5                   |
| Animations  | Framer Motion                       |
| Styling     | CSS Modules + CSS custom properties |
| Icons       | Lucide React                        |
| Scroll hooks| react-intersection-observer         |
| Fonts       | Syne · DM Sans · Space Mono         |

---

## Features

- ⚡ Vite-powered dev server & build
- 🌗 Dark / Light mode toggle (persisted to localStorage)
- 🖱️ Custom lerp-animated cursor (hides on touch devices)
- ✍️ Animated typing effect cycling through roles
- 🎬 Framer Motion scroll-reveal on every section
- 🔀 Filterable skills grid with animated progress bars
- 📅 Alternating timeline layout for the journey section
- 📬 Contact form with sending state feedback
- 📱 Fully responsive — mobile, tablet, desktop
- 🎨 CSS variable design system (theme tokens)

---

## Project Structure

```
sahil-portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js                     ← All content lives here
    ├── styles/
    │   └── globals.css             ← Design system + theme tokens
    ├── context/
    │   └── ThemeContext.jsx        ← Dark/Light state
    ├── hooks/
    │   └── useTyping.js            ← Typing animation hook
    └── components/
        ├── CustomCursor.jsx + .module.css
        ├── Navbar.jsx + .module.css
        ├── Hero.jsx + .module.css
        ├── About.jsx + .module.css
        ├── Skills.jsx + .module.css
        ├── Projects.jsx + .module.css
        ├── Journey.jsx + .module.css
        ├── Contact.jsx + .module.css
        └── Footer.jsx + .module.css
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Customisation

All personal content (name, links, skills, projects, timeline) lives in **`src/data.js`**. Edit that file to update your portfolio without touching any component code.

Colors and theme tokens are defined as CSS custom properties in **`src/styles/globals.css`** under `:root[data-theme="dark"]` and `:root[data-theme="light"]`.

---

## Deployment

Works out of the box with **Vercel**, **Netlify**, or **GitHub Pages**:

```bash
npm run build
# deploy the /dist folder
```

---

© 2025 Sahil Bundela · bundelasahil634@gmail.com
=======
# sahil-portfolio
My Portfolio
>>>>>>> 0d74a6aba79045c2ac8a7fb14256b5c67e1c6f26
