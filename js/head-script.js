(function() {
    'use strict';

    var SECURE_PROTOCOL = 'https:';
    var UNSECURE_PROTOCOL = 'http:';

    if (location.protocol === UNSECURE_PROTOCOL) {
      location.replace(SECURE_PROTOCOL + location.hostname);
    }

    // Google tag (gtag.js) - GA4
    window.dataLayer = window.dataLayer || [];

	  function gtag() {
			dataLayer.push(arguments);
		}

	  gtag('js', new Date());
	  gtag('config', 'G-DBXQ2GR719');
})();
