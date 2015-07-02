/**
 * Global namespaced registry class
 * @param {String} namespace
 * @returns {Registry}
 */
function Registry(namespace) {
    var namespace = typeof namespace === "undefined" ? '' : "@" + namespace;
    this.isSupported = typeof window.localStorage === "undefined" ? false : true;

    /**
     * Gets a key from the registry, if it does not exist returns NULL
     * @param {String} key
     * @returns {Object}
     */
    this.get = function (key) {
        if (this.isSupported) {
            return false;
        }
        var key = key + namespace;
        if (localStorage.getItem(key) !== null) {
            var expiresDate = localStorage.getItem(key + "&&expires");
            if (expiresDate === null) {
                return null;
            }
            var expires = new Date(expiresDate);
            var now = new Date();
            var isExpired = now.getTime() > expires.getTime() ? true : false;
            if (isExpired) {
                this.remove(key);
                return null;
            }
            var value = window.localStorage.getItem(key);
            return JSON.parse(value);
        } else {
            return null;
        }
    };

    /**
     * Sets a new key to registry
     * @param {String} key
     * @param {Object} value
     * @param {Number} expires
     * @returns {void}
     */
    this.set = function (key, value, expires) {
        if (this.isSupported) {
            return;
        }
        var expires = typeof expires === "undefined" ? 60000000000 : expires * 1000;
        var key = key + namespace;
        if (value === null) {
            localStorage.removeItem(key);
        } else {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
            var expiresTime = ((new Date()).getTime() + expires);
            var expires = new Date();
            expires.setTime(expiresTime);
            localStorage.setItem(key + "&&expires", expires);
        }
    };
    
    /**
     * Remmoves a key from registry
     * @param {String} key
     * @returns {void}
     */
    this.remove = function (key) {
        if (this.isSupported) {
            return false;
        }
        var key = key + namespace;
        localStorage.removeItem(key);
    };
    
    /**
     * Empties the registry
     * @returns {void}
     */
    this.empty = function () {
        if (this.isSupported) {
            return false;
        }
        var keys = Object.keys(localStorage);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key.indexOf(namespace) > -1) {
                localStorage.removeItem(key);
            }
        }
    };
}
