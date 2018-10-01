($ => {
    class Modal {
        constructor() {
            this.$element = $('.selz-modal');

            if (!this.$element.length) {
                return;
            }

            this.$backdrop = $('.selz-modal-backdrop');
            this.$controls = $('.selz-modal-controls');
            this.$close = $('[data-modal="close"]');

            this.$form = this.$element.find('form');
            this.$submit = this.$form.find(':submit');

            this.loading = false;
            this.shown = false;

            this.listeners();
        }

        enforceFocus() {
            $(document)
                .off('focusin.modal') // guard against infinite focus loop
                .on('focusin.modal', event => {
                    if (this.$element[0] !== event.target && !this.$element.has(event.target).length) {
                        this.$element.trigger('focus');
                    }
                });
        }

        validate() {
            // Because the product list is updated asynchronously, we have to check if there's a checked item manually
            const valid = Boolean(this.$form.get(0).checkValidity() && this.$form.find('[name="link"]:checked').length);

            this.$submit.prop('disabled', !valid);

            return valid;
        }

        setKind(kind) {
            // Add hidden input with the kind
            if (!this.$kind) {
                this.$kind = $('<input>')
                    .attr({
                        type: 'hidden',
                        name: 'kind',
                    })
                    .appendTo(this.$form);
            }

            // Posted when loading the form
            this.$kind.val(kind);
        }

        listeners() {
            this.$form.on('input change click', () => {
                this.validate();
            });

            // Slider output value
            this.$form.on('input change', 'input[type="range"]', event => {
                const $input = $(event.target);
                const $output = $(`output[for="${$input.attr('id')}"]`);
                $output.prop('value', $input.val());
            });

            // Hide on click
            this.$close.on('click', event => {
                event.preventDefault();
                this.hide();
            });

            // Submit form inserts shortcode
            this.$form.on('submit', event => {
                event.preventDefault();
                this.insert();
            });

            // Escape hides
            $(document).on('keyup', event => {
                if (event.keyCode !== 27) {
                    return;
                }

                this.hide();
            });
        }

        load() {
            const { ajaxurl, selzvars } = window;
            const { action, nonce } = selzvars;

            if (this.loading || $.type(ajaxurl) !== 'string' || !ajaxurl.length) {
                return;
            }

            this.loading = true;

            this.$submit.prop('disabled', true);

            $.post(
                ajaxurl,
                {
                    action,
                    nonce,
                    data: this.$form.serialize(),
                },
                data => {
                    this.$controls.html(data);

                    this.loading = false;

                    this.form = new window.SelzForm(this.$form);

                    this.validate();
                },
            );
        }

        hide() {
            if (!this.shown) {
                return;
            }

            this.shown = false;

            this.$backdrop.attr('hidden', !this.shown);
            this.$element.attr('hidden', !this.shown);
        }

        show(kind) {
            if (this.shown || !window.wpActiveEditor) {
                return;
            }

            this.setKind(kind);

            // Inject loader
            $('.selz-modal-controls').html(`
                <div class="text-center padding-6">
                    <span class="loader" aria-hidden="true"></span>
                    <p class="margin-0 margin-top-2">Loading&hellip;</p>
                </div>
            `);

            this.shown = true;

            this.$backdrop.attr('hidden', !this.shown);
            this.$element.attr('hidden', !this.shown);

            this.$close.focus();

            this.load();

            this.enforceFocus();
        }

        insert() {
            if (!window.tinymce || !this.validate()) {
                return;
            }

            // Close modal
            this.hide();

            // Get inputs in
            const inputs = this.$form.serializeArray();

            // Get the selected embed type
            const type = inputs.find(element => element.name === 'type');

            // Fields to ignore
            const ignored = ['kind'];

            // Add fields based on type
            if (type === 'store') {
                ignored.push(
                    'action',
                    'button_text',
                    'show_description',
                    'show_logos',
                    'interact',
                    'link',
                    'width',
                    'auto_width',
                    'fluid_width',
                );
            } else {
                ignored.push('store_link', 'link_color');

                if (type === 'button') {
                    ignored.push('show_description');
                } else if (type === 'widget') {
                    ignored.push('auto_width');
                }
            }

            // Filter out any unneeded fields
            const filtered = inputs.filter(input => !ignored.includes(input.name));

            // Build the props list
            const props = filtered
                .map(input => {
                    let { name, value } = input;

                    if (name === 'fluid_width') {
                        name = 'width';
                        value = '100%';
                    }

                    return `${name}="${value}"`;
                })
                .join(' ');

            // Construct the short code
            const shortcode = `[${window.selzvars.slug} ${props}]`;

            // Get the tiny MCE editor instance
            const editor = window.tinymce.get(window.wpActiveEditor);

            if (editor) {
                window.tinymce.execCommand('mceBeginUndoLevel');
                window.tinymce.execCommand('mceInsertContent', false, shortcode);
                window.tinymce.execCommand('mceEndUndoLevel');
            }

            window.edInsertContent('', shortcode);
        }
    }

    $(() => {
        const $triggers = $('.js-open-modal');

        if ($triggers.length) {
            const modal = new Modal();

            $triggers.each((index, trigger) => {
                const $trigger = $(trigger);

                $trigger.on('click', () => {
                    modal.show($trigger.data('type'));
                });
            });
        }
    });
})(jQuery);
