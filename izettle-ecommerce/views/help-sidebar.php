<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="izettle-panel">
    <p><?php _e('A short review of our plugin would be awesome. If only a few words.', izettle()->lang); ?></p>
    <a href="https://wordpress.org/support/view/plugin-reviews/izettle-ecommerce" class="btn btn-primary" target="_blank">
        <?php _e('Submit a review', izettle()->lang); ?>
    </a>
</div>

<div class="izettle-panel">
    <p><?php printf(__('Read our in-depth guide on how to get the best out of your %s ecommerce WordPress plugin.', izettle()->lang), izettle()->name); ?></p>
    <a href="https://www.izettle.com/gb/help/mobile/articles/2958235-izettle-e-commerce-wordpress-plugin" class="btn btn-secondary" target="_blank">
        <?php _e('See guide', izettle()->lang); ?>
    </a>
</div>

<div class="izettle-panel">
    <p><?php _e('Need some help? Have a feature request?', izettle()->lang); ?></p>
    <a href="https://wordpress.org/support/plugin/izettle-ecommerce" class="btn" target="_blank">
        <?php _e('Visit our Support Forums', izettle()->lang); ?>
    </a>
</div>