<?php $id = (strlen($this->id) > 0 ? "-" . $this->id : ""); ?>

<?php if ('store' == $instance['kind']) : ?>
	<input type="hidden" id="<?php echo $this->get_field_id( 'store_link' ); ?>" name="<?php echo $this->get_field_name( 'store_link' ); ?>" value="<?php echo esc_attr( 'https://' . $store->name ); ?>">
<?php endif; ?>

<div class="js-tab-container">
	<?php if ('store' != $instance['kind']) : ?>
		<nav class="nav-tabs">
			<ul role="tablist">
				<li class="active">
					<a href="#<?php echo $this-slug; ?>-general" id="<?php echo $this-slug; ?>-tab-general" role="tab" aria-controls="<?php echo $this-slug; ?>-general<?php echo $id ?>" aria-selected="true">
						<?php _e( 'General', $this->lang ); ?>
					</a>
				</li>
				<li>
					<a href="#<?php echo $this-slug; ?>-product" id="<?php echo $this-slug; ?>-tab-product" role="tab" aria-controls="<?php echo $this-slug; ?>-product<?php echo $id ?>" aria-selected="false">
						<?php _e( 'Product', $this->lang ); ?>
					</a>
				</li>
				<li>
					<a href="#<?php echo $this-slug; ?>-colors" id="<?php echo $this-slug; ?>-tab-colors" role="tab" aria-controls="<?php echo $this-slug; ?>-colors<?php echo $id ?>" aria-selected="false">
						<?php _e( 'Colors', $this->lang ); ?>
					</a>
				</li>
			</ul>
		</nav>

		<div class="tab-panel" id="<?php echo $this-slug; ?>-general<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this-slug; ?>-tab-general<?php echo $id ?>" aria-hidden="false">
			<div class="control-group">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Widget type', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<select id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>" class="input-control">
						<?php foreach ( $types as $k => $v ) {
							if( 'product' == $instance['kind'] && $v == 'Store' )
								continue;
							?>
							<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['type'], $k ); ?>><?php echo esc_html( $v ); ?></option>
						<?php } ?>
					</select>
				</div>
			</div>

			<div class="control-group">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'action' ); ?>"><?php _e( 'Action', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<select id="<?php echo $this->get_field_id( 'action' ); ?>" name="<?php echo $this->get_field_name( 'action' ); ?>" class="input-control">
						<?php foreach ( $actions as $key => $val ) { ?>
							<option value="<?php esc_attr_e( $key ); ?>" <?php selected( $instance['action'], $key ); ?>><?php esc_attr_e( $val ); ?></option>
						<?php } ?>
					</select>
				</div>
			</div>

			<?php if( ( 'button' == $instance['type'] ) ) : ?>
				<div class="control-group">
					<div class="control-label">
						<label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Button style', $this->lang ); ?></label>
					</div>
					<div class="controls">
						<select id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>" class="input-control">
							<?php foreach ( $button_positions as $key => $val ) { ?>
								<option value="<?php esc_attr_e( $key ); ?>" <?php selected( $instance['position'], $key ); ?>><?php esc_attr_e( $val ); ?></option>
							<?php } ?>
						</select>
					</div>
				</div>
			<?php endif; ?>

			<div class="control-group">
				<div class="control-label">
					<p class="faux-label"><?php _e( 'Button text', $this->lang ); ?></p>
				</div>
				<div class="controls">
					<input type="text" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" value="<?php echo esc_attr( $instance['button_text'] ); ?>" class="input-control" placeholder="e.g. Buy it now" required>
				</div>
			</div>

			<?php if( ( 'widget' == $instance['type'] ) ) : ?>
				<div class="control-group">
					<div class="control-label">
						<p class="faux-label"><?php _e( 'Description', $this->lang ); ?></p>
					</div>
					<div class="controls">
						<label for="<?php echo $this->get_field_id( 'show_description' ); ?>" class="control-checkbox">
							<input type="checkbox" id="<?php echo $this->get_field_id( 'show_description' ); ?>" name="<?php echo $this->get_field_name( 'show_description' ); ?>" value="true">
							<?php _e( 'Show the description', $this->lang ); ?>
						</label>
						<small class="help-block"><?php _e( 'Show the item description', $this->lang ); ?></small>
					</div>
				</div>
			<?php endif; ?>

			<?php $min = 'widget' == $instance['type'] ? '240' : '160'; ?>
			<div class="control-group">
				<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'width' ); ?>"><?php _e( 'Width', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<div class="control-range">
						<input type="range" max="1000" min="<?php esc_html_e( $min ); ?>" step="5" value="0" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>" oninput="outputUpdate(value)">
						<span class="control-range-value">
							<output for="<?php echo $this->get_field_id( 'width' ); ?>" id="the-width"><?php esc_html_e( $min ); ?></output>px
						</span>
					</div>

					<label for="<?php echo $this->get_field_id( 'auto_width' ); ?>" class="control-checkbox">
						<input type="checkbox" id="<?php echo $this->get_field_id( 'auto_width' ); ?>" name="<?php echo $this->get_field_name( 'auto_width' ); ?>" value="true">
						<?php _e( 'Automatic', $this->lang ); ?>
					</label>
					<small class="help-block"><?php _e( 'Set the maximum width or choose automatic width', $this->lang ); ?></small>
				</div>
			</div>
			<script>function outputUpdate(width) {document.querySelector('#the-width').value = width;}</script>

			<div class="control-group">
				<div class="control-label">
					<p class="faux-label"><?php _e( 'Logos', $this->lang ); ?></p>
				</div>
				<div class="controls">
					<label for="<?php echo $this->get_field_id( 'show_logos' ); ?>" class="control-checkbox">
						<input type="checkbox" id="<?php echo $this->get_field_id( 'show_logos' ); ?>" name="<?php echo $this->get_field_name( 'show_logos' ); ?>" value="true">
						<?php _e( 'Show payment logos', $this->lang ); ?>
					</label>
					<small class="help-block"><?php _e( 'Show payment method logos underneath embed', $this->lang ); ?></small>
				</div>
			</div>
			<div class="control-group">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'interact' ); ?>"><?php _e( 'Window type', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<select id="<?php echo $this->get_field_id( 'interact' ); ?>" name="<?php echo $this->get_field_name( 'interact' ); ?>" class="input-control">
						<?php foreach ( $interacts as $k => $v ) { ?>
							<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['interact'], $k ); ?>><?php echo esc_html( $v ); ?></option>
						<?php } ?>
					</select>
				</div>
			</div>
		</div>

		<div class="tab-panel js-product-list" id="<?php echo $this-slug; ?>-product<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this-slug; ?>-tab-product<?php echo $id ?>" aria-hidden="true" data-input-name="<?php echo $this->get_field_id( 'link' ); ?>">
			<form class="search-form product-search">
				<label for="search" class="sr-only">Query</label>
				<span class="search-control">
					<?php echo file_get_contents(plugins_url( '../dist/img/svg/zoom.svg?v=' . selz()->version, __FILE__ )); ?>
					<input type="search" id="<?php echo $this-slug; ?>-search-products" name="search" class="input-control input-control--search input-control--small" placeholder="<?php _e( 'Search', $this->lang ); ?>">
				</span>
			</form>
			<ul class="product-list"></ul>
			<div class="product-pager" hidden>
				<button type="button" class="btn-faux-link product-pager__control" data-page="previous" disabled>
					<span>
						<?php echo file_get_contents(plugins_url( '../dist/img/svg/arrow-left.svg?v=' . selz()->version, __FILE__ )); ?>
						<?php _e( 'Previous', $this->lang ); ?>
					</span>
				</button>
				<button type="button" class="btn-faux-link product-pager__control" data-page="next" disabled>
					<span>
						<?php _e( 'Next', $this->lang ); ?>
						<?php echo file_get_contents(plugins_url( '../dist/img/svg/arrow-right.svg?v=' . selz()->version, __FILE__ )); ?>
					</span>
				</button>
			</div>
		</div>
	<?php endif; ?>

	<div class="tab-panel" id="<?php echo $this-slug; ?>-colors<?php echo $id ?>" role="tabpanel" aria-labelledby="<?php echo $this-slug; ?>-tab-colors<?php echo $id ?>" aria-hidden="<?php echo ('store' != $instance['kind'] ? 'true' : 'false'); ?>">
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'background_color' ); ?>"><?php _e( 'Button background', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'background_color' ); ?>" name="<?php echo $this->get_field_name( 'background_color' ); ?>" value="<?php echo esc_attr( $instance['background_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['background_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Button text', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'text_color' ); ?>" name="<?php echo $this->get_field_name( 'text_color' ); ?>" value="<?php echo esc_attr( $instance['text_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['text_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'link_color' ); ?>"><?php _e( 'Links', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'link_color' ); ?>" name="<?php echo $this->get_field_name( 'link_color' ); ?>" value="<?php echo esc_attr( $instance['link_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['link_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'chbg_color' ); ?>"><?php _e( 'Checkout header background', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'chbg_color' ); ?>" name="<?php echo $this->get_field_name( 'chbg_color' ); ?>" value="<?php echo esc_attr( $instance['chbg_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['chbg_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'chtx_color' ); ?>"><?php _e( 'Checkout header text', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'chtx_color' ); ?>" name="<?php echo $this->get_field_name( 'chtx_color' ); ?>" value="<?php echo esc_attr( $instance['chtx_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['chtx_color'] ); ?>">
			</div>
		</div>
	</div>
</div>
