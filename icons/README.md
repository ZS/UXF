Icons Package
=============

Summary
-------
The icons package is a set of the most general and commonly-used ZS icons.  They are broadly applicable to any product or domain area.  These icons are used in every Javelin application for brand and look-and-feel consistency.

Usage
-----
The icons are implemented in a single sprite sheet for efficiency.  As a result, you will not reference an individual icon directly, but instead add an icon class to your appropriate DOM element.  For example, if you need a "delete" action in your page:
```html
<a href="#" class="icon-delete" title="Delete">Delete</a>
```

Icons have several use cases:
*   **Push-button actions** - Clicking these icons will perform an action.  For example, ``delete``, ``close``, ``duplicate``, or ``preview``.
    
*   **Static icons** - These icons are displayed as-is, or optionally with a tooltip.  For example, ``error``, ``warning``, or ``info``.
    
*   **Toggle icons** - Clicking these icons toggles the icon "on" and "off".  For example, you may want to use the ``lock`` or ``star`` icons as toggles.

    **Note:** You will need to write your own toggle behavior logic; it is not provided by this package.
