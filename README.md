# Professional Developer Portfolio Website

A clean, premium, and fully responsive personal portfolio website built as a college assignment. This project is built using only vanilla web technologies without external libraries or frameworks.

## 🎓 Student Profile
* **Developer Name:** Pankaj Saini
* **Course:** Bachelor of Computer Applications (BCA)
* **Status:** BCA Student & Web Developer

---

## 🛠️ Technology Stack
* **Markup:** HTML5 (Semantic elements)
* **Styling:** CSS3 (Custom Variables, Flexbox, CSS Grid, Keyframe Animations)
* **Interactions:** Vanilla JavaScript (ES6+, DOM Manipulation, Intersection Observer)
* **Fonts & Icons:** Google Fonts (Outfit, Inter), FontAwesome v6.4

---

## ✨ Premium Features

1. **Responsive Navigation & Theme Manager:**
   * Sticky navigation bar with scroll indicators.
   * Solid full-screen mobile menu drawer for clean mobile viewports.
   * Real-time light/dark theme switch with state persistence (`localStorage`).

2. **Hero Section:**
   * Typewriter text effect cycling through roles.
   * Profile picture with active neon glow borders and floating ambient background shapes.

3. **Horizontal Auto-Scrolling Sliders (2-Second Intervals):**
   * **Education Timeline:** Horizontal card layout displaying academic achievements.
   * **Projects Showcase:** Clean horizontal cards demonstrating VZN Architect and Clutchground Games (both built using React.js and Node.js) with touch-friendly pause-on-hover logic.
   * **Technical & Soft Skillset:** Category cards sliding horizontally.

4. **Tabbed Contact Form Controls:**
   * Styled toggle buttons to switch between **Pankaj's Details** and **Contact Form** with custom animations (`fadeInTab`) to reduce vertical page scrolling.

5. **Client-Side Form Validation:**
   * Interactive input checking (email syntax, name length, message check) with live status banners.

---

## 📂 Project Structure
```text
student portfoliyo/
├── assets/
│   └── images/
│       ├── profile.jpg             # Profile Photo
│       ├── project-vzn.png         # VZN Architect Mockup
│       └── project-clutchground.png# Clutchground Games Mockup
├── index.html                      # Main Layout & Semantic Elements
├── style.css                       # Styles, Custom Tokens & Media Queries
├── script.js                       # Sliders, Theme, Navigation & Validations
└── README.md                       # Project Documentation
```

---

## 🚀 How to Run Locally

### Option 1: Using Node.js (npx)
Open a terminal in the project directory and run:
```bash
npx http-server -p 8000 -c-1
```
*Access in browser at:* `http://localhost:8000`

### Option 2: Using Python
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
*Access in browser at:* `http://localhost:8000`

### Option 3: VS Code Live Server
1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Click **Go Live** on the status bar.
