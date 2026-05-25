/* ============================================
   CodeShield — Main JavaScript
   ============================================ */

'use strict';

/* ── 1. MATRIX RAIN BACKGROUND ─────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;<>?,./アイウエオカキクケコ';
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = '13px JetBrains Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 60);
})();


/* ── 2. NAVBAR ──────────────────────────────── */
(function initNavbar() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    // animate hamburger
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('active');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  // navbar shadow on scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0,0,0,0.4)'
        : 'none';
    }
  });
})();


/* ── 3. SCROLL REVEAL ───────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ── 4. ANIMATED COUNTERS (home page) ──────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur    = 1000;
      const step   = Math.ceil(dur / target);
      let cur = 0;
      const timer = setInterval(() => {
        cur += 1;
        el.textContent = cur;
        if (cur >= target) { el.textContent = target; clearInterval(timer); }
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ── 5. REPORT DATE ─────────────────────────── */
(function setReportDate() {
  const el = document.getElementById('report-date');
  if (!el) return;
  const d = new Date();
  el.textContent = d.toISOString().split('T')[0];
})();


/* ── 6. QUIZ ENGINE ─────────────────────────── */
(function initQuiz() {
  if (!document.getElementById('quiz-card')) return;

  /* ── Question Bank ── */
  const questions = [
    {
      category: 'SQL Injection',
      categoryClass: 'badge-critical',
      question: 'What vulnerability exists in the following code?',
      code: `const query = "SELECT * FROM users\n  WHERE username = '" + req.body.user + "'\n  AND password = '" + req.body.pass + "'";`,
      options: [
        'Cross-Site Scripting (XSS)',
        'SQL Injection',
        'Weak Password Policy',
        'Insecure Deserialization'
      ],
      correct: 1,
      explanation: '✓ Correct! Concatenating user input directly into a SQL string allows attackers to manipulate the query — for example, entering <code style="font-family:var(--font-code);font-size:0.82rem;">\' OR \'1\'=\'1</code> to bypass authentication entirely.'
    },
    {
      category: 'XSS',
      categoryClass: 'badge-high',
      question: 'Which line of code below introduces a Cross-Site Scripting (XSS) vulnerability?',
      code: `// Option A\ndiv.textContent = userInput;\n\n// Option B\ndiv.innerHTML = userInput;\n\n// Option C\ndiv.setAttribute('data-val', userInput);`,
      options: [
        'div.textContent = userInput',
        'div.setAttribute("data-val", userInput)',
        'div.innerHTML = userInput',
        'None of the above'
      ],
      correct: 2,
      explanation: '✓ Correct! <code style="font-family:var(--font-code);font-size:0.82rem;">innerHTML</code> renders HTML and executes embedded scripts. Always use <code style="font-family:var(--font-code);font-size:0.82rem;">textContent</code> for plain text, or sanitize with DOMPurify if HTML is needed.'
    },
    {
      category: 'Secrets',
      categoryClass: 'badge-critical',
      question: 'A developer pushes this code to a public GitHub repository. What is the main security risk?',
      code: `const config = {\n  db_host: 'prod.db.example.com',\n  db_pass: 'SuperSecret#99',\n  api_key: 'sk-live-abc123xyz'\n};`,
      options: [
        'The code will crash at runtime',
        'The database password is too short',
        'Credentials are hardcoded and exposed in source control',
        'The variable name "config" is reserved'
      ],
      correct: 2,
      explanation: '✓ Correct! Hardcoded credentials in public repositories are immediately visible to anyone. Attackers regularly scan GitHub for leaked API keys and passwords. Always use environment variables.'
    },
    {
      category: 'Passwords',
      categoryClass: 'badge-high',
      question: 'Which of the following is the MOST secure way to store a user\'s password in a database?',
      options: [
        'Store it as plain text for easy retrieval',
        'Encode it with Base64',
        'Hash it with MD5',
        'Hash it with bcrypt and a unique salt'
      ],
      correct: 3,
      explanation: '✓ Correct! bcrypt is purpose-built for password hashing. It includes salting (to prevent rainbow table attacks) and has a configurable cost factor that makes brute-forcing slow and expensive.'
    },
    {
      category: 'Input Validation',
      categoryClass: 'badge-medium',
      question: 'A registration form validates user email in JavaScript before submitting. Why is this NOT enough?',
      options: [
        'JavaScript validation is always accurate',
        'Attackers can bypass client-side validation and send raw HTTP requests directly to the server',
        'Email validation is not necessary for security',
        'Browsers automatically validate all form inputs'
      ],
      correct: 1,
      explanation: '✓ Correct! Client-side validation can be completely bypassed using tools like Postman, curl, or browser developer tools. Server-side validation is always required as the authoritative check.'
    },
    {
      category: 'Best Practices',
      categoryClass: 'badge-low',
      question: 'What does the Principle of Least Privilege mean in software security?',
      options: [
        'All users should have administrator access for convenience',
        'Users and systems should only have the minimum permissions needed to perform their tasks',
        'Developers should write as little code as possible',
        'Privileges should be granted based on seniority'
      ],
      correct: 1,
      explanation: '✓ Correct! The Principle of Least Privilege (PoLP) limits the damage an attacker can do by ensuring that compromised accounts or components only have the minimum access required — not full admin rights.'
    },
    {
      category: 'MFA',
      categoryClass: 'badge-high',
      question: 'Which Multi-Factor Authentication (MFA) method is considered LEAST secure?',
      options: [
        'Hardware security keys (FIDO2/WebAuthn)',
        'Time-based One-Time Passwords (TOTP) via authenticator app',
        'SMS-based one-time codes',
        'Push notifications via a dedicated auth app'
      ],
      correct: 2,
      explanation: '✓ Correct! SMS-based MFA is vulnerable to SIM-swapping attacks, where an attacker convinces a mobile carrier to transfer your phone number to their SIM card, intercepting your verification codes.'
    },
    {
      category: 'XSS Prevention',
      categoryClass: 'badge-high',
      question: 'Which HTTP security header helps mitigate Cross-Site Scripting (XSS) attacks by controlling which scripts can execute?',
      options: [
        'X-Frame-Options',
        'Strict-Transport-Security',
        'Content-Security-Policy (CSP)',
        'X-Content-Type-Options'
      ],
      correct: 2,
      explanation: '✓ Correct! The Content-Security-Policy (CSP) header lets you define which sources are trusted for scripts, styles, and other resources. A strict CSP can block most XSS attacks even if an attacker manages to inject a script tag.'
    }
  ];

  /* ── State ── */
  let currentQ  = 0;
  let score     = 0;
  let answered  = false;
  let userAnswers = [];

  /* ── DOM refs ── */
  const qNum        = document.getElementById('q-num');
  const qCat        = document.getElementById('q-category');
  const qText       = document.getElementById('quiz-question');
  const qCodeWrap   = document.getElementById('quiz-code-wrap');
  const qCodeBlock  = document.getElementById('quiz-code-block');
  const qOptions    = document.getElementById('quiz-options');
  const qFeedback   = document.getElementById('quiz-feedback');
  const nextBtn     = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const progressInfo= document.getElementById('progress-info');
  const scoreDisp   = document.getElementById('score-display');
  const quizCard    = document.getElementById('quiz-card');
  const quizResult  = document.getElementById('quiz-result');
  const resultNum   = document.getElementById('result-num');
  const resultTitle = document.getElementById('result-title');
  const resultMsg   = document.getElementById('result-msg');

  /* ── Load question ── */
  function loadQuestion() {
    if (currentQ >= questions.length) { showResult(); return; }

    answered = false;
    const q  = questions[currentQ];
    const letters = ['A', 'B', 'C', 'D'];

    // header
    qNum.textContent = `Question ${String(currentQ + 1).padStart(2, '0')}`;
    qCat.className   = `badge ${q.categoryClass}`;
    qCat.textContent = q.category;

    // question text
    qText.textContent = q.question;

    // code snippet
    if (q.code) {
      qCodeWrap.style.display = 'block';
      qCodeBlock.textContent  = q.code;
    } else {
      qCodeWrap.style.display = 'none';
    }

    // options
    qOptions.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.id        = `option-${i}`;
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => selectAnswer(i));
      qOptions.appendChild(btn);
    });

    // feedback + next
    qFeedback.className = 'quiz-feedback';
    qFeedback.innerHTML = '';
    nextBtn.style.display = 'none';

    // progress
    const pct = ((currentQ) / questions.length) * 100;
    progressBar.style.width   = `${pct}%`;
    progressInfo.textContent  = `Question ${currentQ + 1} of ${questions.length}`;
    scoreDisp.textContent     = `Score: ${score}`;
  }

  /* ── Select answer ── */
  function selectAnswer(idx) {
    if (answered) return;
    answered = true;

    const q       = questions[currentQ];
    const correct = q.correct;
    const opts    = qOptions.querySelectorAll('.quiz-option');

    opts.forEach(o => o.disabled = true);

    userAnswers.push({ q: currentQ, selected: idx, correct: correct });

    if (idx === correct) {
      score++;
      opts[idx].classList.add('correct');
      qFeedback.className = 'quiz-feedback correct-fb show';
      qFeedback.innerHTML = `<strong>✅ Correct!</strong> ${q.explanation}`;
    } else {
      opts[idx].classList.add('wrong');
      opts[correct].classList.add('correct');
      qFeedback.className = 'quiz-feedback wrong-fb show';
      qFeedback.innerHTML = `<strong>❌ Incorrect.</strong> ${q.explanation}`;
    }

    nextBtn.style.display = 'inline-flex';
    scoreDisp.textContent = `Score: ${score}`;
  }

  /* ── Next question ── */
  window.nextQuestion = function () {
    currentQ++;
    if (currentQ >= questions.length) {
      showResult();
    } else {
      loadQuestion();
    }
  };

  /* ── Show result ── */
  function showResult() {
    quizCard.style.display = 'none';
    document.getElementById('quiz-progress').style.display = 'none';
    quizResult.classList.add('show');

    resultNum.textContent = score;

    const pct = Math.round((score / questions.length) * 100);

    let title, msg;
    if (pct === 100) {
      title = '🏆 Perfect Score!';
      msg   = 'Outstanding! You have a solid understanding of secure coding principles. You\'re well on your way to becoming a security-conscious developer.';
    } else if (pct >= 75) {
      title = '🎉 Great Job!';
      msg   = 'You have a good grasp of secure coding concepts. Review the questions you missed and check out the Vulnerabilities and Best Practices pages to strengthen your knowledge.';
    } else if (pct >= 50) {
      title = '📚 Keep Learning!';
      msg   = 'You\'re on the right track! Revisit the Code Review and Best Practices sections to brush up on the topics you found tricky.';
    } else {
      title = '🔍 Room to Grow!';
      msg   = 'Don\'t worry — security is a journey, not a destination. Explore the Vulnerabilities and Code Review pages, then try the quiz again!';
    }

    resultTitle.textContent = title;
    resultMsg.textContent   = msg;

    // Breakdown
    const bd = document.getElementById('result-breakdown');
    if (bd) {
      bd.innerHTML = `
        <div style="border-top:1px solid var(--border-color);padding-top:1.5rem;margin-top:1rem;">
          <h4 style="font-family:var(--font-heading);font-size:0.8rem;color:var(--text-muted);letter-spacing:1px;margin-bottom:1rem;">QUESTION BREAKDOWN</h4>
          ${userAnswers.map((a, i) => `
            <div style="display:flex;align-items:center;gap:0.8rem;padding:0.6rem 0;border-bottom:1px solid rgba(30,30,58,0.5);">
              <span style="width:24px;height:24px;border-radius:50%;background:${a.selected === a.correct ? 'rgba(0,255,65,0.15)' : 'rgba(255,56,96,0.15)'};border:1px solid ${a.selected === a.correct ? 'rgba(0,255,65,0.4)' : 'rgba(255,56,96,0.4)'};display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:${a.selected === a.correct ? 'var(--neon-green)' : 'var(--accent-red)'};flex-shrink:0;">${a.selected === a.correct ? '✓' : '✗'}</span>
              <span style="font-size:0.82rem;color:var(--text-secondary);">Q${i + 1}: ${questions[a.q].category}</span>
              <span style="margin-left:auto;font-size:0.75rem;color:${a.selected === a.correct ? 'var(--neon-green)' : 'var(--accent-red)'};">${a.selected === a.correct ? 'Correct' : 'Wrong'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  /* ── Restart ── */
  window.restartQuiz = function () {
    currentQ    = 0;
    score       = 0;
    answered    = false;
    userAnswers = [];

    quizResult.classList.remove('show');
    quizCard.style.display = '';
    document.getElementById('quiz-progress').style.display = '';
    progressBar.style.width = '12.5%';

    loadQuestion();
  };

  // Boot
  loadQuestion();
})();


/* ── 7. TYPING EFFECT (hero title) ─────────── */
(function initTyping() {
  // subtle blinking cursor on hero subtitle
  const sub = document.querySelector('.hero-subtitle');
  if (!sub) return;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'color:var(--neon-green);animation:blink 1s infinite;margin-left:2px;';
  sub.appendChild(cursor);
})();


/* ── 8. SMOOTH ENTRANCE ANIMATIONS ─────────── */
(function initEntrances() {
  const items = document.querySelectorAll('.animate-up');
  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80 + i * 100);
  });
})();
