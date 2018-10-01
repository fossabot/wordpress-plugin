<?php $hidden = $instance['kind'] != 'store'; ?>

<div class="tab-panel" id="<?php echo $this->slug; ?>-colors<?php echo $id ?>" role="tabpanel" aria-labelledby="tab-<?php echo $this->slug; ?>-colors<?php echo $id ?>" aria-hidden="<?php echo ($hidden ? "true" : "false"); ?>">
    <?php include(selz()->dir . 'includes/fields/colors.php'); ?>
</div>