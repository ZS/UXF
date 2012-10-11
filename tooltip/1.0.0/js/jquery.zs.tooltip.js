/*!
 * ZS Tooltip
 * Author: Alan Kendall
 * Version: 1.0.0
 * Dependencies:
 *    jquery.attribute-observer.js
 *    jquery.qtip2.js
 *    jquery.qtip2.css
 *    jquery.zs.tooltip.css
 *
 * This is a test -- did you get it?
 */
;(function($, window, document, undefined) {
    var ATTR_WARN = 'warning-text';
    var ATTR_ERR = 'error-text';
    var ATTR_TITLE = 'title';
    var ATTR_OLDTITLE = 'oldtitle';
    
    // Private settings that cannot be overridden
    var settings = {
        style: {
            tip: {
                width: 14,
                height: 8
            },
            classes: ''
        },
        show: {
            event: 'click mouseenter'
        },
        hide: {
            event: 'mouseleave'
        },
        events: {
            visible: function(event, api) {
                $(document).one('touchstart', function() {
                    $('.qtip.ui-tooltip').has(':visible').qtip('api').hide();
                });
            }
        }
    };
    
    // Overridable
    var defaults = {
        content: {
            text: function(api) {
                var elem = $(this),
                    attrText;
                // Searches for any of these attributes on the triggering element, and uses the value of the first one it finds.
                // 'oldtitle' is what qtip renames the title attribute to, if it was present.
                $.each([ATTR_ERR, ATTR_WARN, ATTR_OLDTITLE], function(index, value) {
                    if (elem.is('[' + value + ']')) {
                        attrText = elem.attr(value);    // Might need to use elem.prop() for IE7, IE8
                        return false;
                    }
                });
                return attrText;
            },
            title: false
        },
        position: {
            my: 'bottom middle',
            at: 'top middle',
            viewport: $(window),
            adjust: { x: 0, y: 0 }
        }
    };

    $.fn.ZSTooltip = function (options) {
        var localOptions, elem;
        return this.each(function () {
            elem = $(this),
            
            // Users may pass in any combination of params, so do a deep object copy to merge it all together
            // Private settings are always applied last, and override anything the user tried to pass in
            localOptions = $.extend(true, {}, defaults, options, settings);
            localOptions.style.classes = getStyleClasses(elem);
            
            // Listen for the attribute change, and adjust the styles as needed
            elem.attrObserver(function(attrName, attrValue) {
                if (attrName === ATTR_ERR || attrName === ATTR_WARN || attrName === ATTR_TITLE) {
                    var source = $(this);
                    source.qtip('option', 'style.classes', getStyleClasses(source));
                }
            });
            
            elem.qtip(localOptions);
        });
    };
    
    var getStyleClasses = function(elem) {
        // The default style is the 'info' blue
        var cls = 'zs-tooltip-default';
        
        // Check to see if the trigger element for this tooltip instance provided the warn/err attributes,
        // and if so, apply the approviate pre-defined warn/err style
        $.each([{ attr: ATTR_ERR, cls: 'zs-tooltip-error' },
                { attr: ATTR_WARN, cls: 'zs-tooltip-warning' }], function(index, value) {
            if (elem.is('[' + value.attr + ']')) {
                cls = value.cls;
                return false;
            }
        });
        // The base class is always present
        cls += ' zs-tooltip';
        return cls;
    };
    
})(jQuery, window, document);
