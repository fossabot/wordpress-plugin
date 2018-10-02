<?php $id = (strlen($this->id) > 0 ? "-" . $this->id : ""); ?>

<div class="js-tab-container">
	<?php if ('store' != $instance['kind']) : ?>
		<?php include(selz()->dir . 'includes/tabs.php'); ?>

		<?php include(selz()->dir . 'includes/panes/product.php'); ?>

		<?php include(selz()->dir . 'includes/panes/options-modal.php'); ?>
	<?php endif; ?>

	<?php include(selz()->dir . 'includes/panes/colors.php'); ?>
</div>
