(function($) {
    'use strict';
    /* global wpActiveEditor, edInsertContent, tinymce, selzvars, jQuery, ajaxurl */

    function Modal(type) {

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

    // Toggle element visibility
    function toggle($element, toggle) {
        if (toggle) {
            $element.removeAttr('hidden');
        } else {
            $element.attr('hidden', '');
        }
    }

    Modal.prototype.enforceFocus = function() {
        $(document)
            .off('focusin.modal') // guard against infinite focus loop
            .on(
                'focusin.modal',
                $.proxy(function(event) {
                    if (this.$element[0] !== event.target && !this.$element.has(event.target).length) {
                        this.$element.trigger('focus');
                    }
                }, this)
            );
    };

    Modal.prototype.hide = function() {
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
    };

    Modal.prototype.show = function(type) {
        if (!wpActiveEditor) {
            return;
        }

        if (this.shown) {
            return;
        }

        $('.selz-modal-controls .js-tab-container').html();
        $('.selz-modal-controls').html( selzvars.spinner );
        
        // add hidden input with the kind
        $('<input>').attr({
            type: 'hidden',
            name: 'kind',
        }).appendTo(this.$form);

        this.shown = true;
        toggle(this.$backdrop, this.shown);
        toggle(this.$element, this.shown);
        this.$close.focus();

        $('input[name="kind"]').val(type);
        this.update();

        this.$close.on(
            'click.hide.modal',
            $.proxy(function(event) {
                event.preventDefault();
                this.hide();
            }, this)
        );

        this.$form.on(
            'change.type.modal',
            'select[name="type"]',
            $.proxy(function() {
                this.update();
            }, this)
        );

        this.$form.on(
            'submit.modal',
            $.proxy(function(event) {
                event.preventDefault();
                this.insert();
            }, this)
        );

        $(document).on(
            'keyup.hide.modal',
            $.proxy(function(event) {
                if (event.keyCode === 27) {
                    this.hide();
                    
                }
            }, this)
        );

        this.enforceFocus();

    };

    Modal.prototype.insert = function() {
        if (!tinymce) {
            return;
        }

        var ed = tinymce.get(wpActiveEditor);
        var fields = '';

        this.hide();

        $('input', this.$form).each(function() {
            if ($(this).attr('id') && $(this).is(':checkbox')) {
                fields += ' ' + $(this).attr('id') + '="' + $(this).prop('checked') + '"';
            } else if ($(this).attr('id') && $(this).not(':checkbox') && $(this).val()) {
                fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
            }
        });

        $('select', this.$form).each(function() {
            if ($(this).attr('id') && $(this).val()) {
                fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
            }
        });

        $('textarea', this.$form).each(function() {
            if ($(this).attr('id') && $(this).val()) {
                fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
            }
        });

        var shortcode = '[' + selzvars.slug + fields + ']';

        if (ed) {
            tinymce.execCommand('mceBeginUndoLevel');
            tinymce.execCommand('mceInsertContent', false, shortcode);
            tinymce.execCommand('mceEndUndoLevel');
        }

        edInsertContent('', shortcode);
    };

    Modal.prototype.update = function() {
        if (!this.loading && typeof ajaxurl === 'string' && ajaxurl.length) {
            this.loading = true;

            this.$submit.prop('disabled', true);

            $.post(
                ajaxurl,
                {
                    action: selzvars.action,
                    nonce: selzvars.nonce,
                    data: this.$form.serialize(),
                },
                $.proxy(function(data) {
                    this.$submit.prop('disabled', false);

                    this.$controls.html(data);

                    this.loading = false;
                }, this)
            );
        }
    };

    window.SelzModal = Modal;

})(jQuery);
