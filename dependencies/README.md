Dependencies
============

Summary
-------
The purpose of ``dependencies`` is to provide a shared area for common libraries and base styles that are very likely to be consumed by other UX Foundation packages.

Good examples of files that belong in the dependency package:
*   jquery.qtip2.js
*   jquery.qtip2.css
*   reset.css

Usage
-----
Though ``dependencies`` is structured like any other package in UX Foundation (with a version directory, then js/css directories), it is not a package that you ever reference directly.

Instead, required dependency files are listed in other package's ``.package`` file.  The ``.package`` file contains a one-file-per-line list of all external script and css dependencies.  Assets from the ``dependencies`` package are typically listed here.