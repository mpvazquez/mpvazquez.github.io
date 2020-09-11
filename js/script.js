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
    
    window.addEventListener('DOMContentLoaded', function() {
        // setStickyHeader();

        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });

        // window.addEventListener('resize', setStickyHeader);
    });

})();
