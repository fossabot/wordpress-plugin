<div class="izettle izettle-modal js-izettle-modal" hidden role="dialog" aria-labelledby="izettle-modal-title" aria-describedby="izettle-modal-description">
	<form class="izettle-modal-dialog">
		<header class="izettle-modal-header">
			<h1 id="izettle-modal-title">&nbsp;</h1>

			<p id="izettle-modal-description" class="sr-only">
				<?php _e('Configure the options for your embed', izettle()->lang ); ?>
			</p>

			<button type="button" class="btn-close-modal" data-modal="close">
				<svg viewBox="0 0 16 16">
					<path d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3
					c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3
					c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"/>
				</svg>
				<span class="sr-only"><?php _e( 'Close', izettle()->lang ) ?></span>
			</button>
		</header>

		<section class="izettle-modal-controls js-izettle-modal-controls">
			<?php if ( is_admin() && defined( 'DOING_AJAX' ) && DOING_AJAX ) {

				require_once( izettle()->dir . 'modal.php' );
				new iZettle_Form();

			} ?>
		</section>

		<footer class="izettle-modal-footer">
			<button type="submit" class="btn btn-primary btn-block" disabled>
				<span class="is-update" hidden>
					<?php esc_attr_e( 'Update Shortcode', izettle()->lang ); ?>
				</span>
				<span class="is-new">
					<?php esc_attr_e( 'Add Shortcode', izettle()->lang ); ?>
				</span>
			</button>
		</footer>
	</form>
</div>

<div class="izettle-modal-backdrop js-izettle-modal-backdrop" aria-hidden="true" hidden></div>