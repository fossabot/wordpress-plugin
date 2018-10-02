<?php $id = (strlen($this->id) > 0 ? "-" . $this->id : ""); ?>

<?php include(selz()->dir . 'includes/fields/store.php'); ?>

<input type="hidden" name="<?php echo $this->get_field_name( 'fluid_width' ); ?>" value="true">

<div class="<?php echo $this->slug; ?> <?php echo $this->slug; ?>-widget-controls js-tab-container">
	<?php include(selz()->dir . 'includes/tabs.php'); ?>

	<?php include(selz()->dir . 'includes/panes/product.php'); ?>

	<?php include(selz()->dir . 'includes/panes/options-widget.php'); ?>

	<?php include(selz()->dir . 'includes/panes/colors.php'); ?>
</div>