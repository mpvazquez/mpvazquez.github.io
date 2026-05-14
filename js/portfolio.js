// =====================================================
// Marco Pretell-Vázquez · Portfolio interactions
// =====================================================
(function () {
  'use strict';

  // Mark ready so the hero animation is allowed to run.
  try { document.body.classList.add('js-ready'); } catch (e) {}

  // Hard safety net for the hero headline.
  setTimeout(function () {
    var spans = document.querySelectorAll('.hero h1 .line > span');
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.transform = 'translateY(0)';
      spans[i].style.opacity = '1';
    }
  }, 1400);

  // ----- evergreen values -----
  // Years shipping = years since 2013 (WDI / first web-dev work), rounded down.
  var careerStart = 2013;
  var years = new Date().getFullYear() - careerStart;
  var yrsEl = document.getElementById('years-num');
  if (yrsEl) yrsEl.innerHTML = years + '<sup>+</sup>';
  var portfolioLabel = document.getElementById('portfolio-label');
  if (portfolioLabel) portfolioLabel.textContent = '\u2460 Portfolio \u00b7 ' + new Date().getFullYear();

  // ----- year -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- theme toggle -----
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('mpv-theme', next); } catch (e) {}
    });
  }

  // ----- nav scroll border -----
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- scroll-spy nav -----
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: a });
  });
  var spy = function () {
    var y = window.scrollY + 120;
    var active = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= y) active = sections[i];
    }
    navLinks.forEach(function (a) { a.classList.remove('active'); });
    if (active) active.link.classList.add('active');
  };
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  // ----- reveal on scroll -----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ----- confirmation modal behaviour on form submit -----
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function () {
      // Let the iframe action happen; optimistically thank the user.
      setTimeout(function () {
        var btn = form.querySelector('.submit');
        if (btn) {
          btn.textContent = 'Thanks, message sent ✓';
          btn.disabled = true;
        }
        form.reset();
        setTimeout(function () {
          if (btn) {
            btn.textContent = 'Send message →';
            btn.disabled = false;
          }
        }, 4200);
      }, 400);
    });
  }
})();
