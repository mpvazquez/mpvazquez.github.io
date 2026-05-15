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
  var yearEl = document.getElementsByClassName('year');
  if (yearEl.length) {
    for (var i = 0; i < yearEl.length; i++) {
      yearEl[i].textContent = new Date().getFullYear();
    }
  }

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

  // ----- mobile nav overlay -----
  var navToggle  = document.getElementById('navToggle');
  var navOverlay = document.getElementById('navOverlay');
  var navClose   = document.getElementById('navClose');
  if (navToggle && navOverlay) {
    var lastFocus = null;
    var focusables = function () {
      return navOverlay.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    };

    var openNav = function () {
      lastFocus = document.activeElement;
      navOverlay.hidden = false;
      // Force a reflow so the opacity transition runs on first paint.
      void navOverlay.offsetWidth;
      navOverlay.setAttribute('data-state', 'open');
      navOverlay.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-open');
      // Move focus into the overlay (close button) for keyboard users.
      var first = focusables()[0];
      if (first) first.focus();
    };

    var closeNav = function () {
      navOverlay.setAttribute('data-state', 'closed');
      navOverlay.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-open');
      // Wait for the opacity transition to finish before hiding from a11y tree.
      var done = function () {
        navOverlay.hidden = true;
        navOverlay.removeEventListener('transitionend', done);
      };
      navOverlay.addEventListener('transitionend', done);
      // Fallback if no transition fires (e.g. prefers-reduced-motion).
      setTimeout(function () { navOverlay.hidden = true; }, 400);
      if (lastFocus && typeof lastFocus.focus === 'function') {
        lastFocus.focus({ preventScroll: true });
      }
    };

    navToggle.addEventListener('click', function () {
      if (navOverlay.getAttribute('data-state') === 'open') closeNav();
      else openNav();
    });

    if (navClose) navClose.addEventListener('click', closeNav);

    // Any link tagged data-overlay-close closes the menu after navigation.
    navOverlay.querySelectorAll('[data-overlay-close]').forEach(function (el) {
      el.addEventListener('click', function () {
        // Let the anchor jump first, then close.
        setTimeout(closeNav, 60);
      });
    });

    // ESC closes; Tab is trapped inside the overlay while open.
    document.addEventListener('keydown', function (e) {
      if (navOverlay.getAttribute('data-state') !== 'open') return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeNav();
        return;
      }
      if (e.key === 'Tab') {
        var list = focusables();
        if (!list.length) return;
        var first = list[0];
        var last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });

    // Drop overlay state if the viewport grows past the mobile breakpoint
    // (e.g. rotation, devtools resize) so desktop users never see it stuck open.
    var mql = window.matchMedia('(min-width: 821px)');
    var handleMQ = function (ev) {
      if (ev.matches && navOverlay.getAttribute('data-state') === 'open') closeNav();
    };
    if (mql.addEventListener) mql.addEventListener('change', handleMQ);
    else if (mql.addListener) mql.addListener(handleMQ);
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

  // ----- confirmation receipt behaviour on form submit -----
  var form = document.getElementById('contactForm');
  var stage = document.getElementById('formStage');
  if (form && stage) {
    var btn = form.querySelector('.submit');
    var nameInput = document.getElementById('cf-name');
    var emailInput = document.getElementById('cf-email');
    var msgInput = document.getElementById('cf-msg');
    var receiptName = stage.querySelector('[data-receipt-name]');
    var receiptEmail = stage.querySelector('[data-receipt-email]');
    var receiptPurpose = stage.querySelector('[data-receipt-purpose]');
    var receiptTime = stage.querySelector('[data-receipt-time]');
    var receipt = stage.querySelector('.receipt');
    var sendAnother = document.getElementById('sendAnother');
    var purposeRadios = form.querySelectorAll('input[name="entry.633803438"]');
    var purposeField = purposeRadios.length ? purposeRadios[0].closest('.field') : null;
    var purposeErrorEl = null;

    var clearPurposeError = function () {
      if (purposeField) purposeField.classList.remove('has-error');
      if (purposeErrorEl && purposeErrorEl.parentNode) {
        purposeErrorEl.parentNode.removeChild(purposeErrorEl);
      }
      purposeErrorEl = null;
    };
    var showPurposeError = function () {
      if (!purposeField) return;
      purposeField.classList.add('has-error');
      if (!purposeErrorEl) {
        purposeErrorEl = document.createElement('div');
        purposeErrorEl.className = 'field-error';
        purposeErrorEl.setAttribute('role', 'alert');
        purposeErrorEl.textContent = 'Pick select an option to continue.';
        purposeField.appendChild(purposeErrorEl);
      }
    };

    // Native HTML5 validation balloon can fire too, but anchoring to the
    // sr-only radio is awkward. Catch the invalid event for our radios and
    // suppress the balloon in favour of our inline error.
    form.addEventListener('invalid', function (e) {
      if (e.target && e.target.name === 'entry.633803438') {
        e.preventDefault();
        showPurposeError();
      }
    }, true);
    // Clear the error as soon as the user picks one.
    purposeRadios.forEach(function (r) {
      r.addEventListener('change', clearPurposeError);
    });

    var formatTime = function () {
      var d = new Date();
      var h = d.getHours();
      var m = String(d.getMinutes()).padStart(2, '0');
      var ap = h >= 12 ? 'PM' : 'AM';
      var h12 = ((h + 11) % 12) + 1;
      return h12 + ':' + m + ' ' + ap;
    };

    form.addEventListener('submit', function () {
      // Capture values before the form gets reset / iframe submits.
      var name = (nameInput && nameInput.value) || 'friend';
      var firstName = name.trim().split(/\s+/)[0] || 'friend';
      var email = (emailInput && emailInput.value) || '';
      var purposeRadio = form.querySelector('input[name="entry.633803438"]:checked');
      var purpose = purposeRadio ? purposeRadio.value : '—';

      if (receiptName) receiptName.textContent = firstName;
      if (receiptEmail) receiptEmail.textContent = email || '—';
      if (receiptPurpose) receiptPurpose.textContent = purpose;
      if (receiptTime) receiptTime.textContent = formatTime();

      // Optimistic loading state — small spinner so success feels earned.
      stage.setAttribute('data-state', 'sending');
      if (btn) btn.disabled = true;

      // Swap to receipt after the iframe POST has had a moment to fire.
      setTimeout(function () {
        stage.setAttribute('data-state', 'sent');
        if (receipt) receipt.removeAttribute('aria-hidden');
        // Move focus to the receipt heading for screen-reader users.
        var receiptHeading = stage.querySelector('.receipt-title');
        if (receiptHeading) {
          receiptHeading.setAttribute('tabindex', '-1');
          receiptHeading.focus({ preventScroll: true });
        }
      }, 650);
    });

    if (sendAnother) {
      sendAnother.addEventListener('click', function () {
        form.reset();
        clearPurposeError();
        if (receipt) receipt.setAttribute('aria-hidden', 'true');
        stage.setAttribute('data-state', 'idle');
        if (btn) btn.disabled = false;
        // Return focus to the first field.
        var firstField = form.querySelector('input, textarea');
        if (firstField) firstField.focus({ preventScroll: true });
      });
    }
  }
})();
