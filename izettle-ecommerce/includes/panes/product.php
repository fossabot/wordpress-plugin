<?php $hidden = $instance['type'] == 'store'; ?>

<div class="tab-panel js-product-list" id="<?php echo $this->slug; ?>-product<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this->slug; ?>-tab-product<?php echo $id ?>" aria-hidden="<?php echo ($hidden ? "true" : "false"); ?>" data-input-name="<?php echo $this->get_field_name( 'link' ); ?>" data-selected="<?php echo $instance['link']; ?>" data-default-image="<?php echo plugins_url( '../../dist/img/svg/product.svg?v=' . izettle()->version, __FILE__ ); ?>">
    <?php include(izettle()->dir . 'includes/fields/product.php'); ?>
</div>