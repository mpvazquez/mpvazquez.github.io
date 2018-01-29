(function() {
    'use strict';

    function animatedScroll(event) {
        var hash = event.currentTarget.hash.slice(1);

        if (hash) {
            event.preventDefault();

            var target = document.querySelector('[name=' + hash + ']');
            var offset = target.getBoundingClientRect().top + window.scrollY;

            Velocity(document.body, 'scroll', {
                offset: offset - 20,
                duration: 'slow'
            });
        }

        return false;
    }

    function setStickyHeader() {
        var navBar = document.getElementById('nav-bar');
        var topSection = document.getElementById('top-section');

        window.addEventListener('scroll', function() {
            var headerHeight = document.getElementById('header').offsetHeight;
            var navBarHeight = document.getElementById('nav-links').offsetHeight;

            if (window.scrollY > headerHeight) {
                navBar.classList.add('fixed');
                topSection.style.paddingTop = navBarHeight + 'px';
            } else {
                navBar.classList.remove('fixed');
                topSection.style.paddingTop = 0;
            }
        });
    };

    window.addEventListener('DOMContentLoaded', function() {
        setStickyHeader();

        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });

        window.addEventListener('resize', setStickyHeader);
    });

})();
