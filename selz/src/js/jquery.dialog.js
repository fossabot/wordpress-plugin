(function($) {
    /*global jQuery*/
    'use strict';

    function setupColorPicker() {
        $('.js-color-picker:not(.has-colorpicker)')
            .addClass('has-colorpicker')
            .wpColorPicker()
            .removeClass('wp-color-picker');
    }

    function showTabPanel($tab) {
        var $container = $tab.parents('.js-tab-container');
        var $tabpanel = $('#' + $tab.attr('aria-controls'));

        // Deselect all the tabs
        $("[role='tab']", $container).attr('aria-selected', 'false');

        // Select this tab
        $tab.attr('aria-selected', 'true');

        // Hide all the panels
        $("[role='tabpanel']", $container).attr('aria-hidden', 'true');

        // Show our panel
        $tabpanel.attr('aria-hidden', 'false');
    }

    function setupTabs() {
        $(".js-tab-container [role='tab']")
            .on('click', function(event) {
                // Prevent default
                event.preventDefault();

                // Show the tab
                showTabPanel($(this));
            })
            .on('keydown', function(event) {
                if (event.which === 39 || event.which === 37) {
                    var $current = $(this);
                    var isSelected = $current.attr('aria-selected') === 'true';

                    // If focused element is selected
                    if (isSelected) {
                        var $item = $current.parent('li')[event.which === 39 ? 'next' : 'prev']('li');
                        var $target = $item.find("[role='tab']");

                        if ($target) {
                            // Shift focus
                            $target.focus();

                            // Show the tab
                            showTabPanel($target);
                        }
                    }
                }
            });
    }

    $(document)
        .ready(setupColorPicker)
        .ready(setupTabs)
        .ajaxComplete(setupColorPicker)
        .ajaxComplete(setupTabs);
})(jQuery);
