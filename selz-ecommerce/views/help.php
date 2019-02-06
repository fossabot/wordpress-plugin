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
                <h1><?php _e('Selz Ecommerce', selz()->lang); ?></h1>
                <p><?php printf(__('Start selling products online or digital downloads from your WordPress site in minutes. If you don\'t already have a %s account, you can %s.', selz()->lang), selz()->name, '<a href="' . esc_url(selz()->signup) . '" target="_blank">' . __('open an account', selz()->lang) . '</a>'); ?></p>

                <h2><?php _e('Gutenberg blocks', selz()->lang); ?></h2>
                <p><?php _e('You can choose from the following blocks to embed on your WordPress site:', selz()->lang); ?></p>

                <ul class="ul-disc">
                    <li><?php _e('Selz Button', selz()->lang); ?></li>
                    <li><?php _e('Selz Widget', selz()->lang); ?></li>
                    <li><?php _e('Selz Store', selz()->lang); ?></li>
                </ul>

                <h2><?php _e('Shopping cart', selz()->lang); ?></h2>
                <p><?php printf(__('By default, the shopping cart will only show on pages containing a %s block that you\'ve added. You can also enable a global shopping cart on all pages by enabling it in <a href="?page=%s">settings</a>.', selz()->lang), selz()->name, selz()->slug); ?></p>

                <h2><?php _e('Widgets', selz()->lang); ?></h2>
                <p><?php _e('To embed any of our blocks from the Widgets menu, we recommend installing <a href="https://wordpress.org/plugins/reusable-gutenberg-blocks-widget/" target="_blank">Reusable Gutenberg Blocks Widget</a>.', selz()->lang); ?></p>

                <h2><?php _e('Additional settings', selz()->lang); ?></h2>
                <p><?php printf(__('More configuration options (e.g., store logo, display mode) are available within the %s.', selz()->lang), '<a href="' . esc_url(selz()->embeds) . '" target="_blank">' . __('Embed Editor', selz()->lang) . '</a>'); ?></p>

                <h2><?php _e('SSL/HTTPS Security', selz()->lang); ?></h2>
                <p><?php printf(__('You don\'t need an SSL certificate on your site to use the %s embeds since all the overlays and store embed use SSL. However, it is recommend to help with buyer confidence. Contact your hosting provider for more information.', selz()->lang), selz()->name); ?></p>
                <p><?php _e('If you need help setting up HTTPS on your WordPress site, check out the <a href="http://wordpress.org/plugins/wordpress-https/" target="_blank">WordPress HTTPS Plugin</a> that can help.', selz()->lang); ?></p>
            </div>

            <aside class="padding-4">
                <?php include(selz()->dir . '/views/help-sidebar.php'); ?>
            </aside>
        </div>

        <?php include(selz()->dir . '/includes/version.php'); ?>
    </div>
</div>
