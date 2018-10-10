($ => {
    class Modal {
        constructor(namespace = '') {
            this.$element = $(`.${namespace}-modal`);

            if (!this.$element.length) {
                return;
            }

            this.namespace = namespace;

            this.$backdrop = $(`.js-${namespace}-modal-backdrop`);
            this.$controls = $(`.js-${namespace}-modal-controls`);
            this.$close = this.$element.find('[data-modal="close"]');

            this.form = null;
            this.$form = this.$element.find('form');
            this.$submit = this.$form.find(':submit');

            this.loading = false;
            this.shown = false;
            this.updating = false;

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

        setUpdateMode(toggle) {
            this.updating = toggle;

            this.$submit.find('.is-update').attr('hidden', !toggle);
            this.$submit.find('.is-new').attr('hidden', toggle);
        }

        validate() {
            // IE11 fires this too early
            if (this.form === null) {
                return false;
            }

            // Check HTML5 validation
            let valid = this.$form.get(0).checkValidity();

            // Get inputs in
            const kind = this.form.getValue('kind');

            // Because the product list is updated asynchronously, we have to check if there's a checked item manually
            if (kind === 'product') {
                valid = valid && this.form.getValue('link') !== null;
            }

            // Toggle the button
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

            this.$element.on('updated.products', () => {
                this.validate();
            });
        }

        load(values = {}) {
            const { ajaxurl } = window;
            const { action, nonce } = window[`${this.namespace}_globals`];

            if (this.loading || $.type(ajaxurl) !== 'string' || !ajaxurl.length) {
                return;
            }

            this.setTitle('Loading...');

            this.loading = true;

            this.$submit.prop('disabled', true);

            // Get the form data and parsed shortcode
            const data = $.extend(
                {},
                this.$form.serializeArray().reduce((m, o) => {
                    m[o.name] = o.value;
                    return m;
                }, {}),
                values,
            );

            $.post(
                ajaxurl,
                {
                    action,
                    nonce,
                    data: $.param(data),
                },
                data => {
                    this.$controls.html(data);

                    this.setTitle(this.$controls.find('legend').html());

                    this.loading = false;

                    this.form = new window.PluginForm(this.$form, this.namespace);

                    this.validate();
                },
            );
        }

        setTitle(title) {
            this.$form.find('header h1').html(title);
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

            // Get current selection
            const editor = window.tinymce.get(window.wpActiveEditor);
            const node = editor.selection.getNode();
            const values = {};
            let update = false;

            if (node) {
                const shortcode = node.innerHTML;
                const { slug } = window[`${this.namespace}_globals`];

                if (shortcode.startsWith(`[${slug}`)) {
                    shortcode.match(/[\w-_]+=".+?"/g).forEach(attribute => {
                        const [, key, value] = attribute.match(/([\w-_]+)="(.+?)"/);
                        values[key] = value;
                    });

                    // Updating rather than insert
                    update = true;
                }
            }

            // Update UI and flag
            this.setUpdateMode(update);

            // Inject loader
            $(`.${this.namespace}-modal-controls`).html(`
                <div class="text-center padding-6">
                    <span class="loader" aria-hidden="true"></span>
                    <p class="margin-0 margin-top-2">Loading&hellip;</p>
                </div>
            `);

            this.shown = true;

            this.$backdrop.attr('hidden', !this.shown);
            this.$element.attr('hidden', !this.shown);

            this.$close.focus();

            this.load(values);

            this.enforceFocus();
        }

        insert() {
            // Get the tiny MCE editor instance
            const editor = window.tinymce.get(window.wpActiveEditor);

            // If no editor or form not valid
            if (!editor || !this.validate()) {
                return;
            }

            // Close modal
            this.hide();

            // Get inputs in
            const inputs = this.$form.serializeArray();

            // Get the selected embed type
            const type = inputs.find(i => i.name === 'type');

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
            const filtered = inputs.filter(i => !ignored.includes(i.name));

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
            const { slug } = window[`${this.namespace}_globals`];
            const shortcode = `[${slug} ${props}]`;

            // Insert code
            editor.execCommand('mceBeginUndoLevel');

            // Replace or insert
            if (this.updating) {
                editor.selection.getNode().innerHTML = shortcode;
            } else {
                editor.execCommand('mceInsertContent', false, shortcode);
            }

            editor.execCommand('mceEndUndoLevel');
        }
    }

    $(() => {
        const triggers = {};

        $('.js-open-modal').each((index, trigger) => {
            const $trigger = $(trigger);
            const namespace = $trigger.data('namespace');

            triggers[namespace] = triggers[namespace] || [];
            triggers[namespace].push($trigger);
        });

        Object.keys(triggers).forEach(namespace => {
            const modal = new Modal(namespace);
            const $triggers = $($.map(triggers[namespace], el => el.get()));
            const hook = 'is-bound';

            $triggers.each((index, element) => {
                const $trigger = $(element);

                if ($trigger.hasClass(hook)) {
                    return;
                }

                $trigger
                    .on('click', event => {
                        modal.show($(event.target).data('type'));
                    })
                    .addClass(hook);
            });
        });
    });
})(jQuery);
