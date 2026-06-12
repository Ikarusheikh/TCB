/* TCB Legal — Main JS */
(function () {

  /* ── Scroll Reveal ─────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  /* ── Mobile Nav ────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active Nav Link ───────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === currentPage) {
      a.classList.add('active');
    }
  });

  /* ── Contact Form ──────────────────── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitButton = form.querySelector('.form-submit');

      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => response.json()).then(data => {
        if (data.success) {
          const success = document.querySelector('.form-success');
          if (success) {
            form.style.display = 'none';
            success.style.display = 'block';
          }
        } else {
          const fail = document.querySelector('.form-fail');
          if (fail) {
            form.style.display = 'none';
            fail.style.display = 'block';
          }
        }
      }).catch(() => {
        const fail = document.querySelector('.form-fail');
        if (fail) {
          form.style.display = 'none';
          fail.style.display = 'block';
        }
      });
    });
  }

})();
