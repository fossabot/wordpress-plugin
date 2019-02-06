<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="selz-panel">
    <p><?php _e('A short review of our plugin would be awesome. If only a few words.', selz()->lang); ?></p>
    <a href="https://wordpress.org/support/view/plugin-reviews/selz-ecommerce" class="btn btn-primary" target="_blank">
        <?php _e('Submit a review', selz()->lang); ?>
    </a>
</div>

<div class="selz-panel">
    <p><?php printf(__('Read our in-depth guide on how to get the best out of your %s ecommerce WordPress plugin.', selz()->lang), selz()->name); ?></p>
    <a href="https://help.selz.com/article/139-sell-on-a-wordpress-site" class="btn btn-secondary" target="_blank">
        <?php _e('See guide', selz()->lang); ?>
    </a>
</div>

<div class="selz-panel">
    <p><?php _e('Need some help? Have a feature request?', selz()->lang); ?></p>
    <a href="https://wordpress.org/support/plugin/selz-ecommerce" class="btn" target="_blank">
        <?php _e('Visit our Support Forums', selz()->lang); ?>
    </a>
</div>