<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}
?>

<div class="selz selz-help">
	<div class="container">
		<div class="panel margin-top-4 margin-bottom-2">
			<div class="padding-4">
				<h1><?php _e( 'Selz Ecommerce', selz()->lang ); ?></h1>
				<p><?php printf( __( 'Start selling products online or digital downloads from your WordPress site in minutes. If you don\'t already have a %s account, you can %s.', selz()->lang ), selz()->name, '<a href="' . esc_url( selz()->signup ) . '" target="_blank">' . __( 'open an account', selz()->lang ) . '</a>' ); ?></p>

				<h2><?php _e( 'Embed options', selz()->lang ); ?></h2>
				<p><?php _e( 'You can choose from the following options to embed on your WordPress site:', selz()->lang ); ?></p>

				<ul class="ul-disc">
					<li><?php _e( 'Buy button', selz()->lang ); ?></li>
					<li><?php _e( 'Widget', selz()->lang ); ?></li>
					<li><?php _e( 'Store', selz()->lang ); ?></li>
				</ul>

				<h2><?php _e( 'Using the plugin', selz()->lang ); ?></h2>
				<p><?php _e( 'You can use the user interface or short codes to embed your store or items. Using the interface is easiest. If you\'re in a post or page, you will see the "Add Product" and "Add Store" buttons above your toolbar, clicking either will show the modal to embed your item or store with options for customisation. This will generate the required shortcode for you.', selz()->lang ); ?></p>

				<p><?php printf( __( 'You can also embed items and your store to your sidebar using the Widgets menu. Simply drag "%s" into your chose widget container and customize your embed.', selz()->lang ), selz()->name ); ?></p>

				<h2><?php _e( 'Shopping cart', selz()->lang ); ?></h2>
				<p><?php printf( __( 'By default, the shopping cart will only show on pages containing a widget, button or store that you\'ve added. You can also enable a global shopping cart on all pages by enabling it in <a href="?page=%s">settings</a>.', selz()->lang ), selz()->slug ); ?></p>

				<h2><?php _e( 'SSL/HTTPS Security', selz()->lang ); ?></h2>
				<p><?php printf( __( 'You don\'t need an SSL certificate on your site to use the %s embeds since all the overlays and store embed use SSL. However, it is recommend to help with buyer confidence. Contact your hosting provider for more information.', selz()->lang ), selz()->name ); ?></p>
				<p><?php _e( 'If you need help setting up HTTPS on your WordPress site, check out the <a href="http://wordpress.org/plugins/wordpress-https/" target="_blank">WordPress HTTPS Plugin</a> that can help.', selz()->lang ); ?></p>
			</div>

			<aside class="padding-4">
				<?php include( selz()->dir . '/views/help-sidebar.php' ); ?>
			</aside>
		</div>

		<?php include( selz()->dir . '/includes/version.php' ); ?>
	</div>
</div>
