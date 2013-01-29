Search Box Package
===============
New enhancements for version 1.1.0

 
Summary
-------
1. Validations for search -
		*Like search shouldn't get triggered for special keys like ctrl + A, ctrl + C etc.
2. Provision for search trigger count - 
		*Search gets triggered only when specific number of characters are entered (typically 3). 
3. Added optional configuration setting "forceSearchOnEnterKey" to explicitly trigger search if terms are less than search trigger count
4. Added optional configuration setting "raiseTriggerForInsufficientCount" to register a callback when length of the search terms goes below search trigger count 
5. Added optional configuration setting "notifyOnArrowKeySelection" to register a callback on array key press
6. Added optional configuration setting "loaderObject" to register callback to hold pointers to show and hide loader icon
   
