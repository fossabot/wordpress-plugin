var selzShortcode;

(function($){
	var inputs = {}, ed;
	selzShortcode = {
		init : function() {
			inputs.wrap = $('#selz-wrap');
			inputs.backdrop = $( '#selz-backdrop' );
			inputs.form = $( '#selz-form' );
			inputs.options = $('#selz-dialog-options');
			inputs.submit = $('.selz-dialog-submit');
			inputs.close = $( '#selz-close' );
			inputs.spinner = $('#selz-dialog-update').find('.spinner');
			inputs.loading = false;
			inputs.submit.click( function(e){
				e.preventDefault();
				selzShortcode.insert();
			});			
			inputs.close.add( inputs.backdrop ).add( '#selz-cancel a' ).click( function( event ) {
				event.preventDefault();
				selzShortcode.close();
			});
		},		
		open : function() {
			if ( !wpActiveEditor )
				return;

			inputs.wrap.show();
			inputs.backdrop.show();
		},
		close : function() {
			inputs.backdrop.hide();
			inputs.wrap.hide();		
		},
		insert : function() {
			var ed = tinymce.get( wpActiveEditor ), fields = '';
			
			$('input', inputs.wrap).each(function(){				
				if ( $(this).attr('id') && $(this).is(':checkbox') )
					fields += ' ' + $(this).attr('id') + '="' + $(this).prop("checked") + '"';
			
				else if ( $(this).attr('id') && $(this).not(':checkbox') && $(this).val() )
					fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
			});

			$('select', inputs.wrap).each(function(){
				if ( $(this).attr('id') && $(this).val())
					fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
			});
			
			$('textarea', inputs.wrap).each(function(){
				if ( $(this).attr('id') && $(this).val())
					fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
			});
			
			shortcode = "[selz " + fields + "]";	

			if ( ed ) {
				tinymce.execCommand("mceBeginUndoLevel");
				tinymce.execCommand('mceInsertContent', false, shortcode);
				tinymce.execCommand("mceEndUndoLevel");
			}
			edInsertContent('', shortcode);
			selzShortcode.close();
		},
		update : function() {
			if ( ! inputs.loading ) {
				inputs.loading = true;
				inputs.spinner.show();
				$.post( ajaxurl, { action: selzvars.action, nonce: selzvars.nonce, data: inputs.form.serialize() }, function( data ){
					inputs.spinner.hide();
					inputs.options.html(data);
					inputs.loading = false;
				});
			}
		},		
	}
	$(document).ready( selzShortcode.init );
})(jQuery);