<?php $id = (strlen($this->id) > 0 ? "-" . $this->id : ""); ?>

<?php include(selz()->dir . 'includes/fields/store.php'); ?>

<div class="js-tab-container">
	<?php if ('store' != $instance['kind']) : ?>
		<?php include(selz()->dir . 'includes/fields/tabs.php'); ?>

		<div class="tab-panel" id="<?php echo $this->slug; ?>-general<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this->slug; ?>-tab-general<?php echo $id ?>" aria-hidden="false">
			<?php include(selz()->dir . 'includes/fields/type.php'); ?>

			<?php include(selz()->dir . 'includes/fields/action.php'); ?>

			<?php if ( 'button' == $instance['type'] ) : ?>
				<?php include(selz()->dir . 'includes/fields/style.php'); ?>
			<?php endif; ?>

			<?php include(selz()->dir . 'includes/fields/width.php'); ?>

			<?php include(selz()->dir . 'includes/fields/text.php'); ?>

			<?php if ( 'widget' == $instance['type'] ) : ?>
				<?php include(selz()->dir . 'includes/fields/description.php'); ?>
			<?php endif; ?>

			<?php include(selz()->dir . 'includes/fields/logos.php'); ?>

			<?php include(selz()->dir . 'includes/fields/window.php'); ?>
		</div>

		<div class="tab-panel js-product-list" id="<?php echo $this->slug; ?>-product<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this->slug; ?>-tab-product<?php echo $id ?>" aria-hidden="true" data-input-name="<?php echo $this->get_field_id( 'link' ); ?>">
			<?php include(selz()->dir . 'includes/fields/product.php'); ?>
		</div>
	<?php endif; ?>

	<div class="tab-panel" id="<?php echo $this->slug; ?>-colors<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this->slug; ?>-tab-colors<?php echo $id ?>" aria-hidden="<?php echo ('store' != $instance['kind'] ? 'true' : 'false'); ?>">
		<?php include(selz()->dir . 'includes/fields/colors.php'); ?>
	</div>
</div>
