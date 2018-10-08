($ => {
    const openWidget = () => {
        $('.widgets-sortables > div').each((index, element) => {
            const $widget = $(element);
            const id = $widget.attr('id');
            const hook = 'is-setup';

            if (id !== undefined) {
                if ($widget.hasClass(hook)) {
                    return;
                }

                if (id.indexOf('selz') !== -1) {
                    // eslint-disable-next-line
                    new window.PluginForm($widget.find('form'), 'selz');
                }

                if (id.indexOf('izettle') !== -1) {
                    // eslint-disable-next-line
                    new window.PluginForm($widget.find('form'), 'izettle');
                }

                $widget.addClass(hook);
            }
        });
    };

    $(document).on('ready widget-added widget-updated', () => {
        openWidget();
    });
})(jQuery);
