(function() {
    'use strict';

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

    document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var data = {};
      var formData = new FormData(event.currentTarget);
      var request = new XMLHttpRequest();
      var url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSda5h6UlLjP7DiMPvDMFIF4ZpgA1OY3TbwMEwsYZHao9wF7Zg/formResponse?embedded=true';

      data['entry.633803438'] = formData.get('purpose-field');
      data['entry.610708785'] = formData.get('name-field');
      data['entry.1719665273'] = formData.get('email-field');
      data['entry.1633536652'] = formData.get('message-field');

      request.addEventListener('load', function(success) {
        console.log(success);
      });
      request.addEventListener('error', function(error) {
        console.error(error);
      });
      
      request.open('POST', url, true);
      request.setRequestHeader('Content-Type', 'multipart/form-data; charset=UTF-8');
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.send(data);
    });

    window.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });
    });

})();
