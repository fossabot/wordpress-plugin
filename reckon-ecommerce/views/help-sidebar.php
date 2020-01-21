<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="reckon-panel">
    <p><?php _e('A short review of our plugin would be awesome. If only a few words.', reckon()->lang); ?></p>
    <a href="https://wordpress.org/support/view/plugin-reviews/reckon-ecommerce" class="btn btn-primary" target="_blank">
        <?php _e('Submit a review', reckon()->lang); ?>
    </a>
</div>

<div class="reckon-panel">
    <p><?php printf(__('Read our in-depth guide on how to get the best out of your %s ecommerce WordPress plugin.', reckon()->lang), reckon()->name); ?></p>
    <a href="#TODO" class="btn btn-secondary" target="_blank">
        <?php _e('See guide', reckon()->lang); ?>
    </a>
</div>

<div class="reckon-panel">
    <p><?php _e('Need some help? Have a feature request?', reckon()->lang); ?></p>
    <a href="https://wordpress.org/support/plugin/reckon-ecommerce" class="btn" target="_blank">
        <?php _e('Visit our Support Forums', reckon()->lang); ?>
    </a>
</div>