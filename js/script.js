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

    // Temp testing script for confirmationModal
    window.go = openModal; // temp
    openModal();

    document.getElementById('iframe').addEventListener('load', function(event) {
      contactForm.reset();
      openModal();
    });

    // document.getElementById('iframe').addEventListener('load', function(event) {
    //   event.preventDefault();
    //   console.log('event loaded', event);
    // });
    //
    // contactForm.addEventListener('submit', function(event) {
    //   if ('fetch' in window) {
    //     event.preventDefault();
    //
    //     var data = {};
    //     var formData = new FormData(event.currentTarget);
    //     var request = window.fetch();
    //   }
    // });
    //
    // contactForm.addEventListener('submit', function(event) {
    //   event.preventDefault();
    //   var data = {};
    //   var formData = new FormData(event.currentTarget);
    //   var request = new XMLHttpRequest();
    //   var url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSda5h6UlLjP7DiMPvDMFIF4ZpgA1OY3TbwMEwsYZHao9wF7Zg/formResponse?embedded=true';
    //
    //   data['entry.633803438'] = formData.get('entry.633803438');
    //   data['entry.610708785'] = formData.get('entry.610708785');
    //   data['entry.1719665273'] = formData.get('entry.1719665273');
    //   data['entry.1633536652'] = formData.get('entry.1633536652');
    //
    //   request.addEventListener('load', function(success) {
    //     console.log('Success submitting form: ', success);
    //     contactForm.reset();
    //     alert('Thank you for contacting me. Your message has successfully been sent!');
    //   });
    //   request.addEventListener('error', function(error) {
    //     console.error('Error submiting form: ', error);
    //   });
    //
    //   request.open('POST', url, true);
    //   request.setRequestHeader('Access-Control-Allow-Origin', '*');
    //   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //   request.send(formData);
    // });

    window.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });
    });

})();
