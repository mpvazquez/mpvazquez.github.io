(function() {
    'use strict';

    var SECURE_PROTOCOL = 'https:';
    var UNSECURE_PROTOCOL = 'http:';

    if (location.protocol === UNSECURE_PROTOCOL) {
      location.replace(SECURE_PROTOCOL + location.hostname);
    }
})();
