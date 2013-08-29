var selzShortcode;

(function($){
	var inputs = {}, ed;
	selzShortcode = {
		init : function() {
			inputs.dialog = $('#selz-dialog');
			inputs.options = $('#selz-dialog-options');
			inputs.submit = $('.selz-dialog-submit');
			inputs.spinner = $('#selz-dialog-update').find('.spinner');
			inputs.loading = false;
			inputs.submit.click( function(e){
				e.preventDefault();
				selzShortcode.insert();
			});			
			$('#selz-dialog-cancel').click( function(e){
				e.preventDefault();
				selzShortcode.close();
			});
		},		
		open : function() {
			if ( !wpActiveEditor )
				return;

			// Initialize the dialog if necessary (html mode).
			if ( ! inputs.dialog.data('wpdialog') ) {
				inputs.dialog.wpdialog({
					title: 'Selz Shortcode Generator',
					width: 430,
					height: 'auto',
					modal: true,
					dialogClass: 'wp-dialog',
					//zIndex: 300000
				});
			}

			inputs.dialog.wpdialog('open');
		},
		close : function() {
			inputs.dialog.wpdialog('close');
		},
		insert : function() {
			var ed = tinyMCEPopup.editor, e, b, fields = '';
			
			$('input', inputs.dialog).each(function(){				
				if ( $(this).attr('id') && $(this).is(':checkbox') )
					fields += ' ' + $(this).attr('id') + '="' + $(this).prop("checked") + '"';
			
				else if ( $(this).attr('id') && $(this).not(':checkbox') && $(this).val() )
					fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
			});

			$('select', inputs.dialog).each(function(){
				if ( $(this).attr('id') && $(this).val())
					fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
			});
			
			$('textarea', inputs.dialog).each(function(){
				if ( $(this).attr('id') && $(this).val())
					fields += ' ' + $(this).attr('id') + '="' + $(this).val() + '"';
			});
			
			shortcode = "[selz " + fields + "]";			

			tinyMCEPopup.restoreSelection();
			tinyMCEPopup.execCommand("mceBeginUndoLevel");
			tinyMCEPopup.execCommand('mceInsertContent', false, shortcode);
			tinyMCEPopup.execCommand("mceEndUndoLevel");
			selzShortcode.close();
		},
		update : function() {
			if ( ! inputs.loading ) {
				inputs.loading = true;
				inputs.spinner.show();
				$.post( ajaxurl, { action: spscvars.action, nonce: spscvars.nonce, data:$(inputs.dialog).serialize() }, function( data ){
					inputs.spinner.hide();
					inputs.options.html(data);
					inputs.loading = false;
				});
			}
		},		
	}
	$(document).ready( selzShortcode.init );
})(jQuery);