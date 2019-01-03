($ => {
    const disable = ($element, toggle) => {
        $element.attr('hidden', toggle);
        $element.find(':input').prop('disabled', toggle);
    };

    const replaceAll = (input, find, replace) => input.replace(new RegExp(find, 'g'), replace);

    class Form {
        constructor($form, namespace, force = false) {
            this.$form = $form;

            // Don't bind twice
            if (!force && this.$form.isSetup) return;
            this.$form.isSetup = true;

            this.namespace = namespace;

            this.selectors = {
                colorPicker: '.js-color-picker',
                productList: '.js-product-list',
            };

            this.init();

            this.listeners();
        }

        get(name) {
            return this.$form.serializeArray().find(i => i.name === name || i.name.endsWith(`[${name}]`));
        }

        getValue(name) {
            const input = this.get(name);
            return input ? input.value : null;
        }

        listeners() {
            this.$form.on('input', () => this.handleInput());
        }

        handleInput() {
            const type = this.getValue('type');

            if (!type) {
                return;
            }

            // Update type
            this.$form.find('[data-type]').each((index, element) => {
                const $element = $(element);
                const types = $element.data('type').split(',');

                disable($element, !types.includes(type));
            });

            // Update width options (modal only)
            const $auto = this.$form.find('[name="auto_width"]');
            const isAuto = type === 'button' && $auto.is(':checked');

            const $fluid = this.$form.find('[name="fluid_width"]');
            const isFluid = $fluid.is(':checked');

            const $input = this.$form.find('[name="width"]');

            disable($fluid.parent('.control'), isAuto);
            disable($input.parent('.control'), isAuto || isFluid);

            // Update the window type
            const action = this.getValue('action');
            const $window = this.$form.find(`[name="${this.get('interact').name}"]`).parents('.control-group');
            $window.attr('hidden', action === 'add-to-cart');

            // Update the text based on action
            const text = this.getValue('button_text');
            const { resources } = window[`${this.namespace}_main_globals`];

            // Update the text if it's not default
            if (Object.values(resources).includes(text)) {
                const { name } = this.get('button_text');
                const $input = this.$form.find(`[name="${name}"]`);
                const resource = resources[replaceAll(action, '-', '_')];

                if (resource) {
                    $input.val(resource);
                }
            }
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
                const list = new window.PluginProductList($list, this.namespace);
                list.fetch();
            }
        }

        init() {
            this.handleInput();
            this.setupColorPickers();
            this.setupProductList();
        }
    }

    window.PluginForm = Form;
})(jQuery);
