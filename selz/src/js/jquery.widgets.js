($ => {
    class Widget {
        constructor(id) {
            this.$element = $(`#${id}`);
            this.$controls = $('.selz-widget-controls');

            this.$form = this.$element.find('form');
            this.$type = this.$form.find('.widget-type select');

            this.loading = false;

            this.show();
        }

        show() {
            this.update(this.$type.val());

            this.$type.on('change', () => {
                this.update(this.$type.val());
            });
        }

        update(val) {
            this.$form.find('.control-group').each((index, element) => {
                const type = $(element).data('type');
                $(element).toggle(!type || type.indexOf(val) !== -1);
            });
        }
    }

    window.SelzWidget = Widget;

    function openWidget() {
        $('.widgets-sortables > div').each((index, value) => {
            const widgetId = $(value).attr('id');
            let widget;

            if (widgetId !== undefined && widgetId.indexOf('selz') !== -1) {
                widget = new Widget(widgetId);
            }
        });
    }

    $(document).ready(() => {
        openWidget();
    });

    $(document).on('widget-added widget-updated', () => {
        openWidget();
    });
})(jQuery);
