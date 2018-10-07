<?php $hidden = $instance['type'] != 'store'; ?>

<div class="tab-panel" id="<?php echo $this->slug; ?>-options<?php echo $id ?>" role="tabpanel" aria-labelledby="tab-<?php echo $this->slug; ?>-options<?php echo $id ?>" aria-hidden="<?php echo ($hidden ? "true" : "false"); ?>">
    <?php include(izettle()->dir . 'includes/fields/title.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/type.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/action.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/window.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/text.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/style.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/description.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/logos.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/intro.php'); ?>

    <?php include(izettle()->dir . 'includes/fields/outro.php'); ?>
</div>