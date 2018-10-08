<div class="selz selz-modal js-selz-modal" hidden role="dialog" aria-labelledby="selz-modal-title" aria-describedby="selz-modal-description">
	<form class="selz-modal-dialog">
		<header class="selz-modal-header">
			<h1 id="selz-modal-title"></h1>

			<p id="selz-modal-description" class="sr-only">
				<?php _e('Configure the options for your embed', selz()->lang ); ?>
			</p>

			<button type="button" class="btn-close-modal" data-modal="close">
				<svg viewBox="0 0 16 16">
					<path d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3
					c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3
					c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"/>
				</svg>
				<span class="sr-only"><?php _e( 'Close', selz()->lang ) ?></span>
			</button>
		</header>

		<section class="selz-modal-controls js-selz-modal-controls">
			<?php if ( is_admin() && defined( 'DOING_AJAX' ) && DOING_AJAX ) {

				require_once( selz()->dir . 'modal.php' );
				new Selz_Form();

			} ?>
		</section>

		<footer class="selz-modal-footer">
			<button type="submit" class="btn btn-primary btn-block" disabled>
				<span class="is-update" hidden>
					<?php esc_attr_e( 'Update Shortcode', selz()->lang ); ?>
				</span>
				<span class="is-new">
					<?php esc_attr_e( 'Add Shortcode', selz()->lang ); ?>
				</span>
			</button>
		</footer>
	</form>
</div>

<div class="selz-modal-backdrop js-selz-modal-backdrop" aria-hidden="true" hidden></div>