modules.define(
    'jquery__ui',
    ['loader_type_js', 'jquery'],
    function(provide, loader, jQuery) {
        typeof jQuery.ui !== 'undefined'?
            provide(jQuery.ui) :
            loader(
                //'//yastatic.net/jquery-ui/1.11.1/jquery-ui.min.js',
            	'../../assets/jquery-ui/jquery-ui.min.js',
                function() { provide(jQuery.ui); });
});