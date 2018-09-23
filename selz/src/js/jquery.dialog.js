($ => {
    function setupColorPicker() {
        $('.js-color-picker:not(.has-colorpicker)')
            .addClass('has-colorpicker')
            .wpColorPicker()
            .removeClass('wp-color-picker');
    }

    function showTabPanel($tab) {
        const $container = $tab.parents('.js-tab-container');
        const $tabpanel = $(`#${$tab.attr('aria-controls')}`);

        // Deselect all the tabs
        $("[role='tab']", $container).attr('aria-selected', 'false');

        // Select this tab
        $tab.attr('aria-selected', 'true');

        // Hide all the panels
        $("[role='tabpanel']", $container).attr('aria-hidden', 'true');

        // Show our panel
        $tabpanel.attr('aria-hidden', 'false');
    }

    function handleClick(event) {
        // Prevent default
        event.preventDefault();

        // Show the tab
        showTabPanel($(this));
    }

    function handleKey(event) {
        if (![37, 39].includes(event.which)) {
            return;
        }

        const $current = $(this);
        const isSelected = $current.attr('aria-selected') === 'true';

        // If focused element is selected
        if (isSelected) {
            const $item = $current
                .parent('li')
                [event.which === 39 ? 'next' : 'prev']('li');
            const $target = $item.find("[role='tab']");

            if ($target) {
                // Shift focus
                $target.focus();

                // Show the tab
                showTabPanel($target);
            }
        }
    }

    function setupTabs() {
        $(".js-tab-container [role='tab']")
            .on('click', handleClick)
            .on('keydown', handleKey);
    }

    $(document)
        .ready(setupColorPicker)
        .ready(setupTabs)
        .ajaxComplete(setupColorPicker)
        .ajaxComplete(setupTabs);
})(jQuery);
