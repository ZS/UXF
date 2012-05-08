/*!
 * ZS Tooltip
 * Author: Alan Kendall
 * Version: 1.0.0
 * Dependencies:
 *    jquery.qtip.js
 *    jquery.qtip.css
 *    jquery.zs.tooltip.css
 */
;(function ($, window, document, undefined) {
    var defaults = {
        content: {
            text: function(api) {
                var elem = $(this),
                    attrText;
                
                // Searches for any of these attributes on the triggering element, and uses the value of the first one it finds.
                // "oldtitle" is what qtip renames the title attribute to, if it was present.
                $.each(["error-text", "warning-text", "oldtitle"], function(index, value) {
                    if (elem.is("[" + value + "]")) {
                        attrText = elem.attr(value);
                        return false;
                    }
                });

                return attrText;
            },
            title: false
        },
        style: {
            tip: {
                width: 14,
                height: 8
            }
        },
        position: {
            my: "bottom middle",
            at: "top middle",
            viewport: $(window),
            adjust: { x: 0, y: 0 }
        },
        show: {
            event: "click mouseenter"
        },
        hide: {
            event: "mouseleave"
        },
        events: {
            visible: function(event, api) {
                $(document).one("touchstart", function() {
                    $(".qtip.ui-tooltip").has(":visible").qtip("api").hide();
                });
            }
        }
    };

    $.fn.ZSTooltip = function (options) {
        var localOptions, elem, classes, cls;

        return this.each(function () {
            elem = $(this),
            
            // Users may pass in any combination of params, so do a deep object copy to merge it all together
            localOptions = $.extend(true, {}, defaults, options);
            classes = localOptions.style.classes || "";
            cls = "zs-tooltip-default";
            
            $.each([{ attr: "error-text", cls: "zs-tooltip-error" },
                    { attr: "warning-text", cls: "zs-tooltip-warning" }], function(index, value) {
                if (elem.is("[" + value.attr + "]")) {
                    cls = value.cls;
                }
            });

            localOptions.style.classes = classes + " zs-tooltip " + cls;

            elem.qtip(localOptions);
        });
    };
    
})( jQuery, window, document );
