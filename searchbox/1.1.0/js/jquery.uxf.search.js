/*!
 * UXF Search Box
 * Author: Chinmay Bokil
 * Version: 1.1.0
 * Dependencies:
 *    jquery.uxf.search.css
 *    icons.css 
 *    javelin.css
 */
;(function ($, window, document, undefined) {
    var defaults = {
        searchCallback: null,
        isLiveSearch: false,
        liveSearchTriggerCount:1,
        raiseTriggerForInsufficientCount: null, //raise this function when search terms become less than trigger count
        placeholder: "Search",
        width: 250,
        intervalDelay: 200,
        searchButtonTitle: "Search", // provision to override in case of i18n
        maxLength:255,
        spinnerDelay: 1,
        loaderObject: null,
        forceSearchOnEnterKey: false,
        notifyOnArrowKeySelection:null // callback provision for arrow key press (user may want to select search result)
    };
    
    var settings = { 
        getWidgetHtml:  function() {
                        return '<div class="uxf-search-box"> \
                        <div class="search-icon-container"> \
                            <a href="javascript:void(0);" class="icon-search  search-icon"></a> \
                        </div> \
                        <input class="search-input" type="text" placeholder="'+defaults.placeholder+'" maxlength="'+ defaults.maxLength + '" /> \
                        <div class="clear-container"> \
                            <a href="javascript:void(0);" class="icon-close" ></a> \
                        </div> \
                        <a href="javascript:void(0);" class="search-button linkbutton" >'+defaults.searchButtonTitle+'</a> \
                    </div>'
                    },
         arrowKeySet: {
                        37: "LEFT", 
                        38: "UP", 
                        39: "RIGHT", 
                        40: "DOWN",
                        13: "ENTER" //intentionally putting enter key as arrow key selection is tied with enter          
                    }           
    
    }; // private

    

    $.fn.UXFSearchBox = function (options) {
        var timerId = 0;
        var lastSearchedTerm ='';
        var enterKeyPressed;
        var Cut_or_Paste = false;
        var ctrlPressed = false;
        var printableCharPressed = false;
        options = $.extend({}, defaults, options);
        
                
        return this.each(function () {
            var elem = $(this);
            var showLoader = function (){
                clearIcon.removeClass('clear-invisible');
                clearIcon.addClass("search-spinning");        
            }
            var hideLoader = function (){
                clearIcon.removeClass("search-spinning");
                clearIcon.addClass("icon-close");
            }    
            $(elem).html(settings.getWidgetHtml());
            if(options.loaderObject)
                options.loaderObject.call(this,showLoader,hideLoader);
            
            var searchInput = $(elem).find('.search-input');
            //For non HTML5 complaint browsers
            if ($(searchInput).val() === "" && $(searchInput).attr("placeholder") !== "") {
                $(searchInput).val(options.placeholder);
                if($(searchInput).attr("placeholder")!==options.placeholder)
                    $(searchInput).attr("placeholder",options.placeholder);
                searchInput.addClass("search-overtext");
            }
            //override width of search input
            
            searchInput.css("width",options.width);
            
            var clearIcon = $(elem).find(".icon-close");
            
            clearIcon.click(function(e){
                var target = $(e.target);
                searchInput.val("");
                $(searchInput).val(options.placeholder);
                searchInput.addClass("search-overtext");
                target.addClass("clear-invisible");
                lastSearchedTerm ='';
                if(options.raiseTriggerForInsufficientCount){
                   options.raiseTriggerForInsufficientCount.call(this);
                }
                               
            });
            
            clearIcon.addClass("clear-invisible");
            
            searchInput.keydown(function(e){
                if(options.isLiveSearch){
                    if(e.ctrlKey){
                        ctrlPressed = true;
                        if(e.keyCode === 88 || e.keyCode === 86)
                            Cut_or_Paste = true;
                        
                        // in case of cut reset last searched term
                        if(e.keyCode === 88){
                            lastSearchedTerm ='';
                        }
                   
                        
                    }    
                }
                // raise callback in case of arrow key pressed
                if(settings.arrowKeySet[e.keyCode] && options.notifyOnArrowKeySelection){
                    options.notifyOnArrowKeySelection.call(this,settings.arrowKeySet[e.keyCode],e.keyCode);
                }

            });
            //"e.charCode" doesn't work consistently in all browsers if used in key-up or key-down event. keypress event gives desired result
            searchInput.keypress(function(e){
                if(options.isLiveSearch){
                    if(e.charCode !== 0)
                        printableCharPressed = true;
                }        
            });
            searchInput.keyup(function(e){inputCaptured(e)});
            
            var inputCaptured = function(e){
                enterKeyPressed = (e.keyCode === 13);
                if(options.isLiveSearch){
                    
                    if(!printableCharPressed){
                         // skip for "enter", "backspace" and "del"  
                        if(!( enterKeyPressed || e.keyCode === 8 || e.keyCode === 46)){
                            return;
                        }
                                
                    }        
                    // reset value
                    printableCharPressed = false;   
                    
                    //check for cut & paste 
                    if(ctrlPressed && !Cut_or_Paste)
                       return
                    
                    //reset values
                    Cut_or_Paste = false;
                    ctrlPressed = false;
                    
                   
                }  
                var searchString = $.trim($(e.target).val().toLowerCase());
                     
                if (searchString === "") {
                        lastSearchedTerm="";
                        clearIcon.addClass("clear-invisible");
                } else {
                        clearIcon.removeClass("clear-invisible");
                       
                        
                }    
                // check if the key pressed is "enter" key
                if(options.isLiveSearch || enterKeyPressed){
                    if(searchString.length >= options.liveSearchTriggerCount ){ 
                        setTimer();
                    }else if(options.forceSearchOnEnterKey && enterKeyPressed && searchString.length > 0) {
                        setTimer();
                    }else{
                        if(options.raiseTriggerForInsufficientCount){
                            lastSearchedTerm="";
                            options.raiseTriggerForInsufficientCount.call(this);
                        }
                    }
                                
                }
            };
            var setTimer = function(){
                if(timerId > 0){
                   clearTimeout(timerId);
                   timerId = 0;
                   triggerSearch();                
                }else{
                   timerId = setTimeout(triggerSearch,options.intervalDelay);
                }
            }
            searchInput.focus(function(e){
                var target = $(e.target);
                var filterValue = target.val();

                if (filterValue === options.placeholder && target.hasClass('search-overtext') ) {

                    $(target).val("");
                    target.removeClass("search-overtext");
                }
            });
            
            searchInput.blur(function(e){
                var target = $(e.target);
                var filterValue = target.val();
                if (filterValue === "") {
                    $(target).val(options.placeholder);
                    target.addClass("search-overtext");
                };
            });
            
            if(options.isLiveSearch){
                elem.find('.search-button').hide();
            }else{
                elem.find('.search-button').click(function(){triggerSearch();});    
            }
            var triggerSearch = function () {
                showLoader();
                setTimeout(search,options.spinnerDelay);
                
            };
            var search = function (){
                try{
                    var currentSearchTerm = $(searchInput).val();
                    if(options.isLiveSearch){
                            if( (lastSearchedTerm !== currentSearchTerm) || enterKeyPressed){
                                if(options.searchCallback){
                                        options.searchCallback.call(this,$(searchInput).val());
                                }
                                lastSearchedTerm = $(searchInput).val();
                                
                            }            
                        }else{
                            if (!clearIcon.hasClass("clear-invisible") && options.searchCallback) {
                                
                                options.searchCallback.call(this,currentSearchTerm);
                                
                            }
                        }
                    hideLoader();
                }catch(e){
                    hideLoader();
                }        
            }
           
        });
    };

    
})( jQuery, window, document );