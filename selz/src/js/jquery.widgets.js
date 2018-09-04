(function($) {
    'use strict';

    function Widget(id) {

        this.$element = $( '#' + id );
        this.$controls = $('.selz-widget-controls');

        this.$form = this.$element.find('form');
        this.$type = this.$form.find('.widget-type select');

        this.loading = false;

        this.show();

    }

    Widget.prototype.show = function() {

        this.update( this.$type.val() );

        this.$type.on(
            'change',
            $.proxy(function(evt) {
                this.update(this.$type.val());
            }, this)
        );

    };

    Widget.prototype.update = function(val) {

        this.$form.find('.control-group').each(function (index, el){
            
            var type = $( el ).data('type');
            
            if( type !== undefined && type.indexOf( val ) !== -1 ) {
                $( el ).show();
            } else {
                $( el ).hide();
            }

            if( type == undefined )
                $( el ).show();
            
        });

    };

    // Widget.prototype.update = function() {
    //     if (!this.loading && typeof ajaxurl === 'string' && ajaxurl.length) {
    //         this.loading = true;

    //         //this.$submit.prop('disabled', true);
    //         console.log(this.$form);
    //         $.post(
    //             ajaxurl,
    //             {
    //                 action: selzvars.action,
    //                 nonce: selzvars.nonce,
    //                 data: this.$form.serialize(),
    //             },
    //             $.proxy(function(data) {
    //                 //this.$submit.prop('disabled', false);

    //                 this.$controls.html(data);
    //                 console.log('sent');
    //                 this.loading = false;
    //             }, this)
    //         );
    //     }
    // };

    //jQuery(document).ready(function(){
    // $(document)
    //     .ready(Widget);
        // /Widget('button');
    window.SelzWidget = Widget;
    //})

    $(document).ready(function(){
        openSelzWidget();
    });

    function openSelzWidget(evt) { 

        $('.widgets-sortables > div').each(function (index, value){
            var widgetId = $(value).attr('id');
            //console.log(widgetId)
            if( widgetId !== undefined && widgetId.indexOf('selz') != -1 ) {
                new SelzWidget( widgetId ); 
            }
        });
    }

    $(document).on('widget-added widget-updated', function(event, widget){
        openSelzWidget();
    });


})(jQuery);
