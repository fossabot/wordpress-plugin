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
            if (this.loading) {
                return;
            }

            // Inject loader
            $(`.${this.namespace}-modal-controls`).html(`
                <div class="text-center padding-6">
                    <span class="loader" aria-hidden="true"></span>
                    <p class="margin-0 margin-top-2">Loading&hellip;</p>
                </div>
            `);

            const { ajaxurl } = window;

            if ($.type(ajaxurl) !== 'string' || !ajaxurl.length) {
                return;
            }

            const { action, nonce } = window[`${this.namespace}_globals`];

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

                    this.form = new window.PluginForm(this.$form, this.namespace, true);

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

            // Get current editor and selection values
            const editor = window.tinyMCE.get(window.wpActiveEditor);
            let update = false;
            const values = {};

            // If using tinyMCE we can get the selected node
            if (editor) {
                const node = editor.selection.getNode();

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

                        // Get input keys
                        const keys = Object.keys(values);

                        // If width or fluid_width is set, the auto width needs to be off
                        if (keys.includes('width') || keys.includes('fluid_width')) {
                            values.auto_width = 'false';
                        }
                    }
                }
            }

            // Update UI and flag
            this.setUpdateMode(update);

            this.shown = true;

            this.$backdrop.attr('hidden', !this.shown);
            this.$element.attr('hidden', !this.shown);

            this.$close.focus();

            this.load(values);

            this.enforceFocus();
        }

        insertShortcode(shortcode) {
            const activeEditor = window.wpActiveEditor;

            // Try and get the tiny MCE editor instance
            const editor = window.tinyMCE.get(activeEditor);

            // If tinyMCE (visual editor)
            if (editor) {
                editor.execCommand('mceBeginUndoLevel');

                // Replace or insert
                if (this.updating) {
                    editor.selection.getNode().innerHTML = shortcode;
                } else {
                    editor.execCommand('mceInsertContent', false, shortcode);
                }

                editor.execCommand('mceEndUndoLevel');
            }
            // Basic text editor (just insert at caret position)
            else {
                const $textarea = $(`[name='${window.wpActiveEditor}']`);
                const content = $textarea.val();

                const cursorPosStart = $textarea.prop('selectionStart');
                const cursorPosEnd = $textarea.prop('selectionEnd');

                const textBefore = content.substring(0, cursorPosStart);
                const textAfter = content.substring(cursorPosEnd, content.length);

                $textarea.val(`${textBefore}${shortcode}${textAfter}`);
            }
        }

        insert() {
            // Validate form
            if (!this.validate()) {
                return;
            }

            // Close modal
            this.hide();

            // Get inputs and filter out any ignored
            const inputs = this.$form.serializeArray().filter(i => !['kind'].includes(i.name));

            // Build the props list
            const props = inputs.map(i => `${i.name}="${i.value}"`).join(' ');

            // Construct the short code
            const { slug } = window[`${this.namespace}_globals`];
            const shortcode = `[${slug} ${props}]`;

            // Insert code
            this.insertShortcode(shortcode);
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
