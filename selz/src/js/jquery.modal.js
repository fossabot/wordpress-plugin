($ => {
    // Toggle element visibility
    function toggle($element, toggle) {
        if (toggle) {
            $element.removeAttr('hidden');
        } else {
            $element.attr('hidden', '');
        }
    }

    class Modal {
        constructor(type) {
            this.$element = $('.selz-modal');
            this.$backdrop = $('.selz-modal-backdrop');
            this.$controls = $('.selz-modal-controls');
            this.$close = $('[data-modal="close"]');

            this.$form = this.$element.find('form');
            this.$submit = this.$form.find(':submit');

            this.loading = false;
            this.shown = false;

            this.show(type);
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

        hide() {
            if (!this.shown) {
                return;
            }

            this.shown = false;
            toggle(this.$backdrop, this.shown);
            toggle(this.$element, this.shown);

            $(document)
                .off('focusin.modal')
                .off('keyup.hide.modal');

            this.$form.off('change.type.modal').off('submit.modal');

            this.$element.trigger('hidden.modal');
        }

        show(type) {
            if (!window.wpActiveEditor) {
                return;
            }

            if (this.shown) {
                return;
            }

            $('.selz-modal-controls .js-tab-container').html();
            $('.selz-modal-controls').html(window.selzvars.spinner);

            // add hidden input with the kind
            $('<input>')
                .attr({
                    type: 'hidden',
                    name: 'kind',
                })
                .appendTo(this.$form);

            this.shown = true;
            toggle(this.$backdrop, this.shown);
            toggle(this.$element, this.shown);
            this.$close.focus();

            $('input[name="kind"]').val(type);

            this.update();

            this.$close.on('click.hide.modal', event => {
                event.preventDefault();
                this.hide();
            });

            this.$form.on('change.type.modal', 'select[name="type"]', () => {
                this.update();
            });

            this.$form.on('submit.modal', event => {
                event.preventDefault();
                this.insert();
            });

            $(document).on('keyup.hide.modal', event => {
                if (event.keyCode === 27) {
                    this.hide();
                }
            });

            this.$element.trigger('shown.modal');

            this.enforceFocus();
        }

        insert() {
            if (!window.tinymce) {
                return;
            }

            const editor = window.tinymce.get(window.wpActiveEditor);
            let fields = '';

            this.hide();

            const getFields = (index, element) => {
                const $input = $(element);
                const id = $input.attr('id');
                const value = $input.val();

                if (!id) {
                    return;
                }

                if ($input.is(':checkbox')) {
                    const checked = $input.prop('checked');
                    fields += ` ${id}="${checked}"`;
                } else if (value) {
                    fields += ` ${id}="${value}"`;
                }
            };

            $('input, select, textarea', this.$form).each(getFields);

            const shortcode = `[${window.selzvars.slug}${fields}]`;

            if (editor) {
                window.tinymce.execCommand('mceBeginUndoLevel');
                window.tinymce.execCommand('mceInsertContent', false, shortcode);
                window.tinymce.execCommand('mceEndUndoLevel');
            }

            window.edInsertContent('', shortcode);
        }

        update() {
            if (!this.loading && typeof window.ajaxurl === 'string' && window.ajaxurl.length) {
                this.loading = true;

                this.$submit.prop('disabled', true);

                $.post(
                    window.ajaxurl,
                    {
                        action: window.selzvars.action,
                        nonce: window.selzvars.nonce,
                        data: this.$form.serialize(),
                    },
                    data => {
                        this.$submit.prop('disabled', false);
                        this.$controls.html(data);
                        this.loading = false;

                        this.$element.trigger('updated.modal');
                    },
                );
            }
        }
    }

    window.SelzModal = Modal;
})(jQuery);
