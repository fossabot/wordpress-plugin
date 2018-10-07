($ => {
    const openWidget = () => {
        $('.widgets-sortables > div').each((index, element) => {
            const $widget = $(element);
            const id = $widget.attr('id');

            if (id !== undefined && id.indexOf('izettle') !== -1) {
                $widget.izettleForm = new window.iZettleForm($widget.find('form'));
            }
        });
    };

    $(document).on('ready widget-added widget-updated', () => {
        openWidget();
    });
})(jQuery);
