($ => {
    const setup = () => {
        $('.widgets-sortables > div').each((index, element) => {
            const $widget = $(element);
            const id = $widget.attr('id');
            const namespaces = ['selz', 'izettle'];

            if (id !== undefined) {
                namespaces
                    .filter(i => id.includes(i))
                    .forEach(namespace => new window.PluginForm($widget.find('form'), namespace));
            }
        });
    };

    $(document).on('ready widget-added widget-updated', setup);
})(jQuery);
