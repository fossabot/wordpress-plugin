<?php $id = (strlen($this->id) > 0 ? "-" . $this->id : ""); ?>

<div class="js-tab-container">
	<?php if ('store' != $instance['kind']) : ?>
		<?php include(izettle()->dir . 'includes/tabs.php'); ?>

		<?php include(izettle()->dir . 'includes/panes/product.php'); ?>

		<?php include(izettle()->dir . 'includes/panes/options-modal.php'); ?>
	<?php endif; ?>

	<?php include(izettle()->dir . 'includes/panes/colors.php'); ?>
</div>
