(function() {
    'use strict';

    function animatedScroll(event) {
        var hash = event.currentTarget.hash.slice(1);

        if (hash) {
            var target = document.querySelector('[name=' + hash + ']');
            var newScrollTop = target.getBoundingClientRect().top + window.scrollY;

            $('html, body').animate({
                scrollTop: newScrollTop - 20
            }, 'slow');
        }
    }

    function loadPage() {
        setStickyHeader();

        document.querySelectorAll('.nav-link a').forEach(function(navLink) {
            navLink.addEventListener('click', animatedScroll);
        });

        window.addEventListener('resize', setStickyHeader);
    }

    function setStickyHeader() {
        var navBar = document.getElementById('nav-bar');
        var topSection = document.getElementById('top-section');

        function removeStickyHeader() {
            navBar.classList.remove('fixed');
            topSection.classList.remove('padding-top-50');
        }

        if(window.innerWidth > 600) {
            window.addEventListener('scroll', function() {
                var headerHeight = document.getElementById('header').offsetHeight;

                if (window.scrollY > headerHeight) {
                    navBar.classList.add('fixed');
                    topSection.classList.add('padding-top-50');
                } else {
                    removeStickyHeader();
                }
            });
        } else {
            window.removeEventListener('scroll', removeStickyHeader);
        }
    };

    window.addEventListener('DOMContentLoaded', loadPage);

})();
