# 🛡️ CodeShield — Secure Coding Review Project

> A beginner-friendly cybersecurity project exploring common coding vulnerabilities, manual code inspection methods, secure coding best practices, and remediation techniques.

---

## 📋 Project Overview

**CodeShield** is a static web application built as an internship project for a **Secure Coding Review** task. It demonstrates:

- ✅ Selection of a programming language/application to audit (JavaScript / Node.js)
- ✅ Identification of security vulnerabilities through manual code inspection
- ✅ Use of manual inspection methods to review source code
- ✅ Recommendations and best practices for secure development
- ✅ Step-by-step remediation guidance for each vulnerability

---

## 🚀 Tech Stack

| Layer     | Technology                            |
|-----------|---------------------------------------|
| Structure | HTML5 (semantic markup)               |
| Styling   | Vanilla CSS (custom design system)    |
| Logic     | Vanilla JavaScript (ES6+)             |
| Fonts     | Google Fonts — Orbitron, Poppins, JetBrains Mono |
| Icons     | SVG (custom shield icon)              |
| Backend   | None — fully static                   |

---

## 📁 Project Structure

```
CodeShield/
│
├── index.html           ← Home page with hero, stats, overview
├── vulnerabilities.html ← 5 vulnerability cards with severity levels
├── review.html          ← Code review: vulnerable vs secure examples
├── best-practices.html  ← 10 secure coding best practice cards
├── report.html          ← Audit dashboard with findings table & checklist
├── challenge.html       ← 8-question interactive JavaScript quiz
│
├── style.css            ← Complete design system & all page styles
├── script.js            ← Matrix bg, navbar, quiz engine, animations
│
├── assets/
│   └── icons/
│       └── shield.svg   ← Custom neon shield favicon
│
└── README.md            ← This file
```

---

## 🌐 Pages

### 1. Home (`index.html`)
- Animated hero section with **CodeShield** branding
- Live-animated stat counters (vulnerabilities, examples, practices, quiz questions)
- Matrix rain canvas background
- Project overview feature cards
- Glowing neon green typography

### 2. Vulnerabilities (`vulnerabilities.html`)
Five security vulnerabilities with severity badges, code snippets, and prevention tips:

| # | Vulnerability              | Severity |
|---|---------------------------|----------|
| 1 | SQL Injection              | 🔴 Critical |
| 2 | Cross-Site Scripting (XSS) | 🟠 High |
| 3 | Weak Passwords             | 🟠 High |
| 4 | Hardcoded Credentials      | 🔴 Critical |
| 5 | Insecure Input Validation  | 🟡 Medium |

### 3. Code Review (`review.html`)
Manual code inspection examples with side-by-side comparisons:
- **Example 1** — Hardcoded Credentials (`config.js`)
- **Example 2** — Unsafe `innerHTML` / XSS (`search.js`)
- **Example 3** — Weak Input Validation (`register.js`)

Each example includes: vulnerable code → issue explanation → secure version → remediation steps.

### 4. Best Practices (`best-practices.html`)
10 secure coding practice cards:
Strong Passwords · MFA · Input Sanitization · Secure Authentication · Secrets Management · Dependency Security · HTTPS & TLS · Error Handling · Least Privilege · Secure Habits

### 5. Audit Report (`report.html`)
- Report metadata (ID, date, audit type, auditor)
- Summary cards (Critical / High / Medium / Low counts)
- Findings table with location, severity, and status indicators
- Risk level bar chart visualization
- Remediation checklist with status icons (✓ Fixed / ⟳ In Review / ✗ Open)

### 6. Challenge (`challenge.html`)
8-question multiple-choice quiz covering:
- SQL Injection identification
- XSS via `innerHTML`
- Hardcoded credentials risk
- Password hashing best practices
- Client vs server-side validation
- Principle of Least Privilege
- MFA security levels
- Content Security Policy headers

Features: progress bar · score tracking · per-question feedback · result breakdown · restart option

---

## 🎨 Design System

| Token              | Value                          |
|--------------------|-------------------------------|
| Background         | `#0a0a0f` (near black)        |
| Card background    | `#12121f`                     |
| Neon accent        | `#00ff41` (matrix green)      |
| Text primary       | `#e0e0e0`                     |
| Text secondary     | `#9898b2`                     |
| Critical red       | `#ff3860`                     |
| High orange        | `#ff8c42`                     |
| Medium yellow      | `#ffd700`                     |
| Heading font       | Orbitron                      |
| Body font          | Poppins                       |
| Code font          | JetBrains Mono                |

### Visual Features
- 🌧️ Matrix rain canvas background (opacity: 4%)
- ✨ Neon green glow effects on headings and accents
- 🔄 Scroll-triggered reveal animations
- 📊 Animated stat counters
- 🃏 Card hover lift + top border glow effect
- 📱 Fully responsive (mobile navbar hamburger menu)
- 🔍 Scanline animation effect across the page

---

## ▶️ How to Run

Since this is a fully static project, no build step or server is required.

### Option A — Open directly in browser
```bash
# Simply double-click index.html, or:
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

### Option B — Local dev server (recommended for best experience)
```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 8080
# Then visit: http://localhost:8080

# Or using Node.js
npx serve .
# Then visit: http://localhost:3000
```

---

## 🔒 Vulnerabilities Audited

Based on **OWASP Top 10** standards. All identified through **manual code inspection**.

| OWASP ID | Vulnerability              | Method Used          |
|----------|---------------------------|----------------------|
| A02      | Cryptographic Failures     | Manual inspection    |
| A03      | Injection (SQL/XSS)        | Manual code review   |
| A07      | Identification & AuthN     | Manual inspection    |

---

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — Web application security standard
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [NIST Password Guidelines](https://pages.nist.gov/800-63-3/)

---

## 👤 Author

**CodeShield Team**
Secure Coding Review Project — Internship Task 3
Built with HTML · CSS · JavaScript

---

## 📄 License

This project is created for educational and internship portfolio purposes.
Feel free to use it as a reference for learning secure coding concepts.
