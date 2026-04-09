document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio initialized 🎉");

    // EmailJS
    if (window.emailjs) { emailjs.init("if9_6Iro_hJ8oAdXj"); }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    const navLinks  = document.querySelectorAll('.nav-link');

    hamburger?.addEventListener('click', () => {
        const open = navMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity   = open ? '0' : '1';
        spans[2].style.transform = open ? 'rotate(-45deg) translate(7px, -6px)' : '';
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }));

    // Active nav
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 160) current = sec.id; });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab)?.classList.add('active');
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!window.emailjs) return;
        const submitBtn = contactForm.querySelector('button[type=submit]');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
        const data = new FormData(contactForm);
        emailjs.send("service_iwi8x85", "template_29lo2rm", {
            from_name: data.get("name"), from_email: data.get("email"),
            message: data.get("message"), time: new Date().toLocaleString()
        }).then(() => {
            if (formMessage) { formMessage.textContent = "Message sent! I'll be in touch soon."; formMessage.className = "form-message success"; }
            contactForm.reset();
        }).catch(() => {
            if (formMessage) { formMessage.textContent = "Failed to send. Please email directly."; formMessage.className = "form-message error"; }
        }).finally(() => {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send Message"; }
            setTimeout(() => { if (formMessage) formMessage.style.display = "none"; }, 6000);
        });
    });

    // Scroll Reveal
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    document.querySelectorAll("section, .service-card, .project-card, .skill-item, .info-card, .cert-card, .testimonial-card, .timeline-item, .contact-link").forEach(el => {
        el.classList.add('reveal');
        revealObs.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    console.log("Portfolio loaded ✅");
});