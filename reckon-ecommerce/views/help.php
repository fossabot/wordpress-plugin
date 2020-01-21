<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="reckon reckon-help">
    <div class="container">
        <div class="panel margin-top-4 margin-bottom-2">
            <div class="padding-4">
                <h1><?php _e('Reckon Ecommerce', reckon()->lang); ?></h1>
                <p><?php printf(__('Start selling products online or digital downloads from your WordPress site in minutes. If you don\'t already have an %s account, you can %s.', reckon()->lang), reckon()->name, '<a href="' . esc_url(reckon()->signup) . '" target="_blank">' . __('open an account', reckon()->lang) . '</a>'); ?></p>

                <h2><?php _e('Gutenberg blocks', reckon()->lang); ?></h2>
                <p><?php _e('You can choose from the following blocks to embed on your WordPress site:', reckon()->lang); ?></p>

                <ul class="ul-disc">
                    <li><?php _e('Reckon Button', reckon()->lang); ?></li>
                    <li><?php _e('Reckon Widget', reckon()->lang); ?></li>
                    <li><?php _e('Reckon Store', reckon()->lang); ?></li>
                </ul>

                <h2><?php _e('Shopping cart', reckon()->lang); ?></h2>
                <p><?php printf(__('By default, the shopping cart will only show on pages containing an %s block that you\'ve added. You can also enable a global shopping cart on all pages by enabling it in <a href="?page=%s">settings</a>.', reckon()->lang), reckon()->name, reckon()->slug); ?></p>

                <h2><?php _e('Widgets', reckon()->lang); ?></h2>
                <p><?php _e('To embed any of our blocks from the Widgets menu, we recommend installing <a href="https://wordpress.org/plugins/reusable-gutenberg-blocks-widget/" target="_blank">Reusable Gutenberg Blocks Widget</a>.', reckon()->lang); ?></p>

                <h2><?php _e('Additional settings', reckon()->lang); ?></h2>
                <p><?php printf(__('More configuration options (e.g., store logo, display mode) are available within your %s.', reckon()->lang), '<a href="' . esc_url(reckon()->dashboard) . '" target="_blank">' . __('Reckon ecommerce dashboard', reckon()->lang) . '</a>'); ?></p>

                <h2><?php _e('SSL/HTTPS Security', reckon()->lang); ?></h2>
                <p><?php printf(__('You don\'t need an SSL certificate on your site to use the %s embeds since all the overlays and store embed use SSL. However, it is recommend to help with buyer confidence. Contact your hosting provider for more information.', reckon()->lang), reckon()->name); ?></p>
                <p><?php _e('If you need help setting up HTTPS on your WordPress site, check out the <a href="http://wordpress.org/plugins/wordpress-https/" target="_blank">WordPress HTTPS Plugin</a> that can help.', reckon()->lang); ?></p>
            </div>

            <aside class="padding-4">
                <?php include(reckon()->dir . '/views/help-sidebar.php'); ?>
            </aside>
        </div>

        <?php include(reckon()->dir . '/includes/version.php'); ?>
    </div>
</div>
