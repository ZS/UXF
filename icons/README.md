Icons Package
=============

Summary
-------
The icons package is a set of the most general and commonly-used ZS icons.  They are broadly applicable to any product or domain area.  These icons are used in every Javelin application for brand and look-and-feel consistency.

Icons have several use cases:
*   **Push-button actions** - Clicking these icons will perform an action.  For example, ``delete``, ``close``, ``duplicate``, or ``preview``.
    
*   **Static icons** - These icons are displayed as-is, or optionally with a tooltip.  For example, ``error``, ``warning``, or ``info``.
    
*   **Toggle icons** - Clicking these icons toggles the icon "on" and "off".  For example, you may want to use the ``lock`` or ``star`` icons as toggles.

    **Note:** You will need to write your own toggle behavior logic; only the icon graphics are provided in this package.

Usage
-----
The icons are implemented in a single sprite sheet for efficiency.  As a result, you will not reference an individual icon directly, but instead add an icon class to your appropriate DOM element.

### Getting started
1.  Link to ``icons.css`` in your page header.
```html
<link rel="stylesheet" type="text/css" href="[your UXF base URL]/icons/1.0.0/css/icons.css">
```

2.  Add the icon class to your desired DOM element.
```html
<a class="icon-delete" title="Delete" href="javascript:void(0)">Delete</a>
<div class="icon-error" title="Error">Error</div>
```

### Best practices
*   Include descriptive text inside your icon DOM element.  This text will not be displayed on the screen, but text- and e-readers will pick it up.  For example, this icon will be displayed as "purple monkey dishwasher" in an e-reader:
```html
<a class="icon-delete" href="javascript:void(0)">purple monkey dishwasher</a>
```

*   Add a descriptive tooltip over the icon.  This gives a hint to the user about what clicking the icon will do, if anything.  You can add the "title" attribute to get the native browser tooltip, or you can use the UXF Tooltip package to get a more iPad-friendly tooltip with advanced formatting options.
```html
<a class="icon-delete" title="Click to delete this row" href="javascript:void(0)">Delete</a>
```

*   If you are using an ``a`` element that does not link to anything with the href attribute, do not set href to "#".  Instead, use "javascript:void(0)".
```html
<a href="javascript:void(0)" class="icon-ok">Ok</a>
```

### Icons and classes provided by this package
*   ``icon-add``
*   ``icon-calendar``
*   ``icon-duplicate``
*   ``icon-close``
*   ``icon-delete``
*   ``icon-download``
*   ``icon-edit``
*   ``icon-error``
*   ``icon-error-nohover``
*   ``icon-folder-close``
*   ``icon-folder-open``
*   ``icon-group``
*   ``icon-info``
*   ``icon-info-nohover``
*   ``icon-lock``
*   ``icon-ok``
*   ``icon-ok-nohover``
*   ``icon-search``
*   ``icon-star``
*   ``icon-preview``
*   ``icon-printer``
*   ``icon-help``
*   ``icon-upload``
*   ``icon-user``
*   ``icon-warning``
*   ``icon-warning-nohover``
*   ``icon-minimize``
*   ``icon-expand``