<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="izettle izettle-help">
    <div class="container">
        <div class="panel margin-top-4 margin-bottom-2">
            <div class="padding-4">
                <h1><?php _e('iZettle Ecommerce', izettle()->lang); ?></h1>
                <p><?php printf(__('Start selling products online or digital downloads from your WordPress site in minutes. If you don\'t already have an %s account, you can %s.', izettle()->lang), izettle()->name, '<a href="' . esc_url(izettle()->signup) . '" target="_blank">' . __('open an account', izettle()->lang) . '</a>'); ?></p>

                <h2><?php _e('Gutenberg blocks', izettle()->lang); ?></h2>
                <p><?php _e('You can choose from the following blocks to embed on your WordPress site:', izettle()->lang); ?></p>

                <ul class="ul-disc">
                    <li><?php _e('iZettle Button', izettle()->lang); ?></li>
                    <li><?php _e('iZettle Widget', izettle()->lang); ?></li>
                    <li><?php _e('iZettle Store', izettle()->lang); ?></li>
                </ul>

                <h2><?php _e('Shopping cart', izettle()->lang); ?></h2>
                <p><?php printf(__('By default, the shopping cart will only show on pages containing an %s block that you\'ve added. You can also enable a global shopping cart on all pages by enabling it in <a href="?page=%s">settings</a>.', izettle()->lang), izettle()->name, izettle()->slug); ?></p>

                <h2><?php _e('Widgets', izettle()->lang); ?></h2>
                <p><?php _e('To embed any of our blocks from the Widgets menu, we recommend installing <a href="https://wordpress.org/plugins/reusable-gutenberg-blocks-widget/" target="_blank">Reusable Gutenberg Blocks Widget</a>.', izettle()->lang); ?></p>

                <h2><?php _e('Additional settings', izettle()->lang); ?></h2>
                <p><?php printf(__('More configuration options (e.g., store logo, display mode) are available within your %s.', izettle()->lang), '<a href="' . esc_url(izettle()->dashboard) . '" target="_blank">' . __('iZettle ecommerce dashboard', izettle()->lang) . '</a>'); ?></p>

                <h2><?php _e('SSL/HTTPS Security', izettle()->lang); ?></h2>
                <p><?php printf(__('You don\'t need an SSL certificate on your site to use the %s embeds since all the overlays and store embed use SSL. However, it is recommend to help with buyer confidence. Contact your hosting provider for more information.', izettle()->lang), izettle()->name); ?></p>
                <p><?php _e('If you need help setting up HTTPS on your WordPress site, check out the <a href="http://wordpress.org/plugins/wordpress-https/" target="_blank">WordPress HTTPS Plugin</a> that can help.', izettle()->lang); ?></p>
            </div>

            <aside class="padding-4">
                <?php include(izettle()->dir . '/views/help-sidebar.php'); ?>
            </aside>
        </div>

        <?php include(izettle()->dir . '/includes/version.php'); ?>
    </div>
</div>
