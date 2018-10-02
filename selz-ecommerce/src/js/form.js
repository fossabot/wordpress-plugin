($ => {
    const disable = ($element, toggle) => {
        $element.attr('hidden', toggle);
        $element.find(':input').prop('disabled', toggle);
    };

    class Form {
        constructor($form) {
            this.$form = $form;

            this.selectors = {
                type: '.embed-type select',
                width: '.embed-width :checkbox',
                colorPicker: '.js-color-picker',
                productList: '.js-product-list',
            };

            this.init();

            this.listeners();
        }

        listeners() {
            this.$form.on('input', this.selectors.type, () => this.setType());

            this.$form.on('input', this.selectors.width, () => this.setWidth());
        }

        init() {
            this.setType();

            this.setWidth();

            this.setupColorPickers();

            this.setupProductList();
        }

        getValue(name) {
            const input = this.$form.serializeArray().find(i => i.name === name);
            return input ? input.value : null;
        }

        setupColorPickers() {
            const classHook = 'has-colorpicker';
            const $pickers = this.$form.find(this.selectors.colorPicker);

            $pickers.each((index, element) => {
                const $picker = $(element);

                if ($picker.hasClass(classHook)) {
                    return;
                }

                $picker
                    .addClass(classHook)
                    .wpColorPicker()
                    .removeClass('wp-color-picker');
            });
        }

        setupProductList() {
            const $list = this.$form.find(this.selectors.productList);

            if ($list.length) {
                const list = new window.SelzProductList($list);
                list.fetch();
            }
        }

        setType() {
            const type = this.getValue('type');

            this.$form.find('[data-type]').each((index, element) => {
                const $element = $(element);
                const types = $element.data('type').split(',');

                disable($element, !types.includes(type));
            });

            this.setWidth();
        }

        setWidth() {
            const type = this.getValue('type');

            const $auto = this.$form.find('[name="auto_width"]');
            const isAuto = type === 'button' && $auto.is(':checked');

            const $fluid = this.$form.find('[name="fluid_width"]');
            const isFluid = $fluid.is(':checked');

            const $input = this.$form.find('[name="width"]');

            disable($fluid.parent('.control'), isAuto);
            disable($input.parent('.control'), isAuto || isFluid);
        }
    }

    window.SelzForm = Form;
})(jQuery);
