/* ============================================
   HENRI ARDIANTO PORTFOLIO — SCRIPTS
   ============================================ */

// === PARTICLE SYSTEM ===
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.gold = Math.random() > 0.6;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.gold) {
                ctx.fillStyle = `rgba(212, 168, 67, ${this.opacity})`;
            } else {
                ctx.fillStyle = `rgba(240, 220, 160, ${this.opacity * 0.5})`;
            }
            ctx.fill();
        }
    }

    function initParticleArray() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 12000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 168, 67, ${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        raf = requestAnimationFrame(animate);
    }

    resize();
    initParticleArray();
    animate();

    window.addEventListener('resize', () => {
        resize();
        initParticleArray();
    });
})();

// === HEADER SCROLL ===
(function headerScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    });
})();

// === HAMBURGER ===
(function mobileNav() {
    const btn = document.getElementById('hamburger');
    const nav = document.getElementById('navLinks');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const spans = btn.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = btn.querySelectorAll('span');
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });
})();

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// === TYPING EFFECT ===
(function typingEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const texts = [
        'IT Support Specialist',
        'Helpdesk Technician',
        'Hardware Troubleshooting',
        'Software Troubleshooting',
        'Network Troubleshooting',
        'PHP Developer',
        'MySQL Database'
    ];

    let idx = 0, charIdx = 0, deleting = false;

    function type() {
        const full = texts[idx];
        if (!deleting) {
            el.textContent = full.substring(0, ++charIdx);
            if (charIdx === full.length) {
                deleting = true;
                setTimeout(type, 2200);
            } else {
                setTimeout(type, 90);
            }
        } else {
            el.textContent = full.substring(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % texts.length;
                setTimeout(type, 400);
            } else {
                setTimeout(type, 45);
            }
        }
    }

    type();
})();

// === WHATSAPP FORM ===
(function contactForm() {
    const form = document.getElementById('whatsappForm');
    const success = document.getElementById('successAlert');
    const error = document.getElementById('errorAlert');
    if (!form) return;

    function hideAlerts() {
        if (success) success.style.display = 'none';
        if (error) error.style.display = 'none';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nama = document.getElementById('nama').value.trim();
        const email = document.getElementById('email').value.trim();
        const subjek = document.getElementById('subjek').value.trim();
        const pesan = document.getElementById('pesan').value.trim();

        if (!nama || !email || !subjek || !pesan) {
            hideAlerts();
            error.style.display = 'flex';
            setTimeout(() => error.style.display = 'none', 5000);
            return;
        }

        const msg = encodeURIComponent(
            `*Halo Henri Ardianto*,\n\n` +
            `Saya *${nama}* ingin menghubungi Anda.\n\n` +
            `*Email:* ${email}\n` +
            `*Subjek:* ${subjek}\n\n` +
            `*Pesan:*\n${pesan}\n\nTerima kasih.`
        );

        window.open(`https://wa.me/6281389876383?text=${msg}`, '_blank');

        hideAlerts();
        success.style.display = 'flex';
        form.reset();
        setTimeout(() => success.style.display = 'none', 7000);
    });

    ['nama', 'email', 'subjek', 'pesan'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('focus', hideAlerts);
    });
})();

// === SCROLL REVEAL ===
(function scrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const style = document.createElement('style');
    style.textContent = `
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    const revealTargets = [
        '.portfolio-card',
        '.cert-card',
        '.tl-item',
        '.skill-tag',
        '.info-card',
        '.lang-card',
        '.stat'
    ];

    document.querySelectorAll(revealTargets.join(',')).forEach((el, i) => {
        el.classList.add('reveal');
        const delay = i % 3;
        if (delay) el.classList.add(`reveal-delay-${delay}`);
        observer.observe(el);
    });
})();

// === GOLD CURSOR TRAIL ===
(function cursorTrail() {
    if (window.innerWidth < 768) return;
    const trails = [];
    const max = 8;

    for (let i = 0; i < max; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed; border-radius: 50%; pointer-events: none; z-index: 9998;
            transition: transform 0.1s ease; mix-blend-mode: screen;
        `;
        document.body.appendChild(dot);
        trails.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrails() {
        let lx = mouseX, ly = mouseY;
        trails.forEach((trail, i) => {
            const ratio = (max - i) / max;
            const size = ratio * 8;
            const opacity = ratio * 0.5;

            trail.x += (lx - trail.x) * 0.3;
            trail.y += (ly - trail.y) * 0.3;

            trail.el.style.cssText += `
                left: ${trail.x - size / 2}px;
                top: ${trail.y - size / 2}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(212, 168, 67, ${opacity});
            `;

            lx = trail.x;
            ly = trail.y;
        });

        requestAnimationFrame(animateTrails);
    }

    animateTrails();
})();