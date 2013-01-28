Search Box Package
===============
New enhancements for version 1.1.0
See samples.html for usage place under samples folder
 
Summary
-------
1) Validations for search -
		like search shouldn't get triggered for special keys like ctrl + A, ctrl + C etc.
2) Provision for search trigger count - 
		search gets triggered only when specific number of characters are entered (typically 3). 
3) Added optional configuration setting "forceSearchOnEnterKey" to explicity trigger search if terms are less than search trigger count
4) Added optional configuartion setting "raiseTriggerForInsufficientCount" to register a callback when length of the search terms goes below search trigger count 
5) Added optional configuration setting "notifyOnArrowKeySelection" to register a callback on array key press
6) Added optional configuration setting "loaderObject" to register callabck to hold pointers to show and hide loader icon
        

