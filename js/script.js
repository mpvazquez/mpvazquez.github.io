(function() {
    'use strict';

    var ESCAPE_KEYCODE = 27;

    var bodyEl = document.getElementById('body');
    var closeButton = document.getElementById('close-button');
    var confirmationModal = document.getElementById('confirmation-modal');
    var contactForm = document.getElementById('contact-form');
    var modalBackground = document.getElementById('modal-background');

    function animatedScroll(event) {
        var hash = event.currentTarget.hash.slice(1);

        if (hash) {
            event.preventDefault();

            var navBarHeight = document.getElementById('nav-links').offsetHeight;
            var target = document.querySelector('[name=' + hash + ']');
            var offset = target.getBoundingClientRect().top + window.scrollY;

            Velocity(document.body, 'scroll', {
                offset: offset - navBarHeight,
                duration: 'slow'
            });
        }

        return false;
    }

    function addModalEvents() {
      modalBackground.addEventListener('click', closeModal);
      closeButton.addEventListener('click', closeModal);
      closeButton.focus();
      document.addEventListener('keydown', handleEscapePress);
    }

    function closeModal() {
      confirmationModal.classList.add('hidden');
      modalBackground.classList.add('hidden');
      document.getElementById('body').classList.remove('stop-body-scroll');
      document.removeEventListener('keydown', handleEscapePress);
    }

    function openModal() {
      confirmationModal.classList.remove('hidden');
      modalBackground.classList.remove('hidden');
      bodyEl.classList.add('stop-body-scroll');
      addModalEvents();
    }

    function handleEscapePress(event) {
      if (event.keyCode === ESCAPE_KEYCODE) {
        closeModal();
      }
    }

    document.getElementById('iframe').addEventListener('load', function(event) {
      contactForm.reset();
      openModal();
    });

    window.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });
    });

})();
