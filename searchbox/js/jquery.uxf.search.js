/*!
 * UXF Search Box
 * Author: Chinmay Bokil
 * Version: 1.0.0
 * Dependencies:
 *    jquery.zs.search.css
 *    icons.css 
 *    javelin.css
 */
;(function ($, window, document, undefined) {
    var defaults = {
        searchCallback: null,
        isLiveSearch: false,
        placeholder: "Search",
        width: 250,
        intervalDelay: 200,
        searchButtonTitle: "Search" // provision to override in case of i18n
        
    };
    
    var settings = { 
        getWidgetHtml:  function() {
                        return '<div class="uxf-search-box"> \
                        <div class="search-icon-container"> \
                            <a href="javascript:void(0);" class="icon-search  search-icon"></a> \
                        </div> \
                        <input class="search-input" type="text" placeholder="'+defaults.placeholder+'" /> \
                        <div class="clear-container"> \
                            <a href="javascript:void(0);" class="icon-close" ></a> \
                        </div> \
                        <a href="javascript:void(0);" class="search-button linkbutton" >'+defaults.searchButtonTitle+'</a> \
                    </div>'
                    },
        spinnerDelay: 500            
           
    
    }; // private

    

    $.fn.UXFSearchBox = function (options) {
        var timerId = 0;
        var lastSearchedTerm =''; 
        options = $.extend({}, defaults, options);
        
                
        return this.each(function () {
            var elem = $(this);
            
            $(elem).html(settings.getWidgetHtml());
            
            
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
                   
                    target.addClass("clear-invisible")
                
            });
            
            clearIcon.addClass("clear-invisible");
            
            searchInput.keyup(function(e){
                var searchString = $(e.target).val().toLowerCase();
                
                if (searchString === "") {
                    
                    clearIcon.addClass("clear-invisible");
                } else {
                    clearIcon.removeClass("clear-invisible");
                   
                    
                }
                // check if the key pressed is "enter" key
                if(options.isLiveSearch || e.keyCode === 13){
                    if(timerId > 0){
                        clearTimeout(timerId);
                        timerId = 0;
                        triggerSearch();
                            
                    }else{
                        timerId = setTimeout(triggerSearch,options.intervalDelay);
                    }
                        
                }
            });
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
                setTimeout(search,settings.spinnerDelay);
                
            };
            var search = function (){
                try{
                
                    if(options.isLiveSearch){
                            if( lastSearchedTerm !== $(searchInput).val()){
                            
                                if(options.searchCallback){
                                    options.searchCallback.call(this,$(searchInput).val());
                                }
                                lastSearchedTerm = $(searchInput).val();
                            }   
                        }else{
                            if (!clearIcon.hasClass("clear-invisible") && options.searchCallback) {
                                
                                options.searchCallback.call(this,$(searchInput).val());
                                
                            }
                        }
                    hideLoader();
                }catch(e){
                    hideLoader();
                }        
            }
            var showLoader = function (){
                
                clearIcon.addClass("search-spinning");        
            }
            var hideLoader = function (){
                clearIcon.removeClass("search-spinning");
                clearIcon.addClass("icon-close");
            }    
        });
    };

    
})( jQuery, window, document );