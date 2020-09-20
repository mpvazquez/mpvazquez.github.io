(function() {
    'use strict';

    var SECURE_PROTOCOL = 'https:';
    var UNSECURE_PROTOCOL = 'http:';

    if (location.protocol === UNSECURE_PROTOCOL) {
      location.replace(SECURE_PROTOCOL + location.hostname);
    }

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

    window.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });
    });

})();
