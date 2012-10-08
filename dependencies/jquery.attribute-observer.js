/*!
 * Attribute Observer
 * Code based on stackoverflow thread:
 * http://stackoverflow.com/questions/10868104/can-you-have-a-javascript-hook-trigger-after-a-dom-elements-style-object-change
 * 
 * by Alan Kendall
 */
;(function($, window, document, undefined) {
    // Chrome and FF provide a real implementation, so try to use it!
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    // This event is supported in IE9, FF, Opera
    var isDOMAttrModifiedSupported = function() {
        // Note that this test never inserts anything into the DOM
        var p = document.createElement('p'), flag = false;
        if (p.addEventListener) {
            p.addEventListener('DOMAttrModified', function() {
                flag = true;
            }, false);
        }
        else if (p.attachEvent) {
            p.attachEvent('onDOMAttrModified', function() {
                flag = true;
            });
        }
        else {
            return false;
        }
        p.setAttribute('id', 'target');
        return flag;
    }

    $.fn.attrObserver = function(callback) {
        if (MutationObserver) {
            var options = {
                subtree: false,
                attributes: true
            };
            
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(e) {
                    callback.call(e.target, e.attributeName);
                });
            });
            
            return this.each(function() {
                observer.observe(this, options);
            });
        }
        else if (isDOMAttrModifiedSupported()) {
            return this.on('DOMAttrModified', function(e) {
                callback.call(this, e.attrName);
            });
        }
        else if ('onpropertychange' in document.body) {
            // Supported in IE7, IE8
            return this.on('propertychange', function(e) {
                callback.call(this, window.event.propertyName);
            });
        }
    };
})(jQuery, window, document);