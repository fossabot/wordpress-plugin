<div class="tab-panel js-product-list" id="<?php echo $this->slug; ?>-product<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this->slug; ?>-tab-product<?php echo $id ?>" aria-hidden="false" data-input-name="<?php echo $this->get_field_name( 'link' ); ?>" data-selected="<?php echo $instance['link']; ?>">
    <?php include(selz()->dir . 'includes/fields/product.php'); ?>
</div>