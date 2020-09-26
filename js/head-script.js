(function() {
    'use strict';

    var SECURE_PROTOCOL = 'https:';
    var UNSECURE_PROTOCOL = 'http:';

    if (location.protocol === UNSECURE_PROTOCOL) {
      location.replace(SECURE_PROTOCOL + location.hostname);
    }

    // Global site tag (gtag.js) - Google Analytics
    window.dataLayer = window.dataLayer || [];

	  function gtag() {
			dataLayer.push(arguments);
		}

	  gtag('js', new Date());
	  gtag('config', 'UA-21024248-2');
})();
