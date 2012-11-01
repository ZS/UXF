/*!
* UXF Calndar
* Author: Mike Amara
* Version: 1.0.0
* Dependencies:
*    jquery-1.7.2.js
*    jquery.ui.core.js
*    jquery.ui.datepicker.js
*    jquery.uxf.calendar.js
*    jquery.uxf.calendar.css
*    jquery.ui.core.css
*    jquery.ui.datepicker.css
*    jquery.ui.theme.css
*    jquery.uxf.calendar.css
*/
;
jQuery.extend({
    isMobile: function () {
        return (navigator.platform.indexOf("iPad") != -1) ||
                (navigator.platform.indexOf("iPhone") != -1) ||
                (navigator.platform.indexOf("iPod") != -1) ? true : false;
    }
});

(function ($, window, document, undefined) {
    var UXFLang = [];

    UXFLang[''] = { // Default regional settings
        closeText: 'Done', // Display text for close link
        prevText: 'Prev', // Display text for previous month link
        nextText: 'Next', // Display text for next month link
        currentText: 'Today', // Display text for current month link
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // Names of months for drop-down and formatting
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Column headings for days starting at Sunday
        weekHeader: 'Wk', // Column header for week of the year
        dateFormat: 'mm/dd/yy', // See format options on parseDate
        firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
        isRTL: false, // True if right-to-left language, false if left-to-right
        showMonthAfterYear: false, // True if the year select precedes month, false for month then year
        yearSuffix: '' // Additional text to append to the year in the month headers
    };

    UXFLang['en-GB'] = {
        closeText: 'Done',
        prevText: 'Prev',
        nextText: 'Next',
        currentText: 'Today',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        weekHeader: 'Wk',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    UXFLang['fr'] = {
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    UXFLang['it'] = {
        closeText: 'Chiudi',
        prevText: '&#x3C;Prec',
        nextText: 'Succ&#x3E;',
        currentText: 'Oggi',
        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    UXFLang['de'] = {
        closeText: 'schließen',
        prevText: '&#x3C;zurück',
        nextText: 'Vor&#x3E;',
        currentText: 'heute',
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        weekHeader: 'KW',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    UXFLang['es'] = {
        closeText: 'Cerrar',
        prevText: '&#x3C;Ant',
        nextText: 'Sig&#x3E;',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    UXFLang['ja'] = {
        closeText: '???',
        prevText: '&#x3C;?',
        nextText: '?&#x3E;',
        currentText: '??',
        monthNames: ['1?', '2?', '3?', '4?', '5?', '6?', '7?', '8?', '9?', '10?', '11?', '12?'],
        monthNamesShort: ['1?', '2?', '3?', '4?', '5?', '6?', '7?', '8?', '9?', '10?', '11?', '12?'],
        dayNames: ['???', '???', '???', '???', '???', '???', '???'],
        dayNamesShort: ['?', '?', '?', '?', '?', '?', '?'],
        dayNamesMin: ['?', '?', '?', '?', '?', '?', '?'],
        weekHeader: '?',
        dateFormat: 'yy/mm/dd',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '?'
    };

    UXFLang['zh-CN'] = {
        closeText: '??',
        prevText: '&#x3C;??',
        nextText: '??&#x3E;',
        currentText: '??',
        monthNames: ['??', '??', '??', '??', '??', '??',
    '??', '??', '??', '??', '???', '???'],
        monthNamesShort: ['??', '??', '??', '??', '??', '??',
    '??', '??', '??', '??', '???', '???'],
        dayNames: ['???', '???', '???', '???', '???', '???', '???'],
        dayNamesShort: ['??', '??', '??', '??', '??', '??', '??'],
        dayNamesMin: ['?', '?', '?', '?', '?', '?', '?'],
        weekHeader: '?',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '?'
    };

    var settings = {
        datePickerid: "#ui-datepicker-div",
        setTimeoutCounter: 0,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        autoSize: true
        //todo: Add all of other options with their default values
    };

    var defaults = {
        width: 95,
        lang: '',
        monthyearOnly: false,
        rangOptions: false,
        fromTarget: null,
        toTarget: null,
        minDate: null,
        maxDate: null,
        numberOfMonths: 1,
        defaultDate: null,
        disabled: false,
        beforeShow: function () {
            $('body').removeClass('hideDays');
            new fixWidthForMobile(250);
        },
        onChangeMonthYear: function () {
            new fixWidthForMobile(0);
        }
    };

    var monthyearOnly_options = {
        dateFormat: 'mm yy',
        onChangeMonthYear: function (year, month) {
            $(this).val($.datepicker.formatDate('mm/yy', new Date(year, month - 1)));
            new fixWidthForMobile(0);
        },
        beforeShow: function (input, inst) {
            $('body').addClass('hideDays');
            if ((datestr = $(this).val()).length > 0) {
                var year = datestr.substring(3, datestr.length);
                var month = datestr.substring(0, 2);
                $(this).datepicker('option', 'defaultDate', new Date(year, month - 1));
                $(this).find('input').datepicker('setDate', new Date(year, month - 1));
                $(this).val($.datepicker.formatDate('mm/yy', new Date(year, month - 1)));
            }
            new fixWidthForMobile(250);
        }
    };

    var rang_options = {
        to: {
            defaultDate: "+1w",
            numberOfMonths: 3
        },
        from: {
            defaultDate: "+1w",
            numberOfMonths: 3
        }
    };

    var fixWidthForMobile = function (tm) {
        this._counter = 0;
        this._interval = 1; //in milliseconds
        this._maxRecursions = 3000; //3 seconds
        this._timer = tm;
        this._execute();
    }

    fixWidthForMobile.prototype._execute = function () {
        if (jQuery.isMobile()) {
            var w = 0;
            var that = this;
            if ((this._counter * this._interval) >= this._maxRecursions) return;
            if ($(settings.datePickerid).length >= 1 && $(settings.datePickerid).is(":visible")) {
                //
                setTimeout(function () {
                    $(settings.datePickerid).find('table.ui-datepicker-calendar').each(function (indx) { w = w + 300; });
                    $(settings.datePickerid).css({ 'width': (w) + 'px' });
                }, this._timer);
            }
            else {
                this._counter++;
                setTimeout(function () { that._execute() }, this._interval);
            }
        }
    }

    var checkVersion = function () {
        var agent = window.navigator.userAgent,
            start = agent.indexOf('OS ');

        if ((agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) && start > -1) {
            return window.Number(agent.substr(start + 3, 3).replace('_', '.'));
        }
        return 0;
    }

    $.fn.UXFCalendar = function (options) {
        return this.each(function () {
            var elem = $(this);
            var html = "";
            var calbodyWidth = options.width || 115;
            var calinputWidth = null;
            var lang = options.lang || '';
            var myoptions = {};
            var disabled_attr = '';
            var onClick_event = 'onclick="$(this).parent().find(\'input.calinput\').trigger(\'focus\');"';

            options = $.extend({}, defaults, options);
            calinputWidth = jQuery.isMobile() ? (calbodyWidth - 43) : (calbodyWidth - 37);

            if (options.disabled === true) {
                disabled_attr = 'disabled="disabled"';
                onClick_event = '';
            }

            if ((jQuery.isMobile()) &&
            (options.minDate === null &&
            options.maxDate === null &&
            options.monthyearOnly === false &&
            options.rangOptions === false) &&
            checkVersion() >= 5) {//Mobile device with default view options
                var mobileview = options.monthyearOnly === true ? 'month' : 'date';
                html += '<span class="calbody" style="width:' + calbodyWidth + 'px;">';
                html += '<input type="' + mobileview + '" ' + disabled_attr + ' class="calinput" style="width:' + calbodyWidth + 'px;"/>';
                html += '<a class="calbtta" href="javascript:;" ' + onClick_event + '>';
                html += '</a>';
                html += '</span>';
                elem.html(html);
            }
            else {//desktop browser
                if (options.rangOptions === true) {
                    if (options.fromTarget !== null) {
                        rang_options.to.onSelect = function (selectedDate) {
                            $(options.fromTarget).find('input').datepicker("option", "minDate", selectedDate);
                        };
                        myoptions = $.extend(myoptions, rang_options.to);
                    }
                    else if (options.toTarget !== null) {
                        rang_options.from.onSelect = function (selectedDate) {
                            $(options.toTarget).find('input').datepicker("option", "maxDate", selectedDate);
                        }
                        myoptions = $.extend(myoptions, rang_options.from);
                    }
                }
                if (options.monthyearOnly === true) {
                    myoptions = $.extend(myoptions, monthyearOnly_options);
                }

                options = $.extend({}, defaults, options, myoptions, settings);

                html += '<span class="calbody" style="width:' + calbodyWidth + 'px;">';
                html += '<input type="text" ' + disabled_attr + ' class="calinput" style="width:' + calinputWidth + 'px;"/>';
                html += '<a class="calbtta" href="javascript:;" ' + onClick_event + '>';
                html += '<span class="calbttspan ui-icon"></span>';
                html += '</a>';
                html += '</span>';
                elem.html(html);
                var lanobj = (typeof UXFLang[lang] === 'undefined') ? UXFLang[''] : UXFLang[lang];
                elem.find('input').datepicker(options).datepicker('option', lanobj);
                if (jQuery.isMobile()) {
                    elem.parents().mouseover(function () { });

                    $(settings.datePickerid).click(function (event) {
                        elem.find('input').blur().trigger('blur');
                        event.stopPropagation();
                    });

                    elem.click(function (event) {
                        elem.find('input').blur();
                        elem.find('input').trigger('blur');
                        event.stopPropagation();
                    });
                }
            }
        });
    };

})(jQuery, window, document);