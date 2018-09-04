<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}
?>

<div class="wrap">
	<div class="selz-help">
		<div class="selz-help-content">
			<h1>Selz Ecommerce</h1>
			<p>Start selling products online or digital downloads from your WordPress site in minutes. If you don't already have a Selz account, set one up now at <a href="https://selz.com">selz.com</a>.</p>

			<h2>Embed options</h2>
			<p>You can choose from the following options to embed on your WordPress site:</p>

			<ul class="ul-disc">
				<li>Buy button</li>
				<li>Widget</li>
				<li>Store</li>
			</ul>

			<h2>Using the plugin</h2>
			<p>You can use the user interface or short codes to embed your store or items. Using the interface is easiest. If you're in a post or page, you will see a "selz" button in your toolbar, clicking it will show the modal to embed your item or store with options for customisation. This will generate the required shortcode for you.</p>
			<p><img src="<?php echo plugins_url( '../dist/img/png/toolbar.png?v=' . SELZ_VERSION, __FILE__ ); ?>" alt="Selz button in editor toolbar"></p>
			<p><img src="<?php echo plugins_url( '../dist/img/png/dialog.png?v=' . SELZ_VERSION, __FILE__ ); ?>" alt="Selz dialog"></p>
			<p>You can also embed items and your store to your sidebar using the Widgets menu. Simply drag "Selz" into your chose widget container and customize your embed.</p>

			<h2>Embed your store</h2>
			<p>To embed your whole store, you need your selz.com store URL (e.g. https://mystore.selz.com). To find the URL, head to your <a href="https://selz.com/settings/store?tab=domain" target="_blank">store domain settings</a> page and copy the URL ending in ".selz.com" - it may be your primary or secondary depending on whether you have a custom domain. You can then paste this into the form.</p>

			<h2>Embed a buy button or widget</h2>
			<p>To embed a button or widget, you need the URL for your item. To find the URL, head to <a href="https://selz.com/items" target="_blank">items</a>, find the item you want to embed, click "Options" and then "Share". Then click the "Short Link" tab and copy the URL.</p>
			<p><img src="<?php echo plugins_url( '../dist/img/png/share.png?v=' . SELZ_VERSION, __FILE__ ); ?>" alt="Item options"></p>

			<h2>SSL/HTTPS Security</h2>
			<p>You don't need an SSL certificate on your site to use the Selz embeds since all the overlays and store embed use SSL. However, it is recommend to help with buyer confidence. Contact your hosting provider for more information.</p>
			<p>If you need help setting up HTTPS on your WordPress site, check out the <a href="http://wordpress.org/plugins/wordpress-https/" target="_blank">WordPress HTTPS Plugin</a> that can help.</p>
		</div>
		<aside id="selz-settings-sidebar">
			<?php include( SELZ_DIR . '/views/help-sidebar.php' ); ?>
		</aside>
	</div>
</div>
