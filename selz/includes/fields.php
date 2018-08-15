<?php $id = (strlen($this->id) > 0 ? "-" . $this->id : ""); ?>

<div class="js-tab-container">
	<nav class="nav-tabs">
		<ul role="tablist">
			<li class="active">
				<a href="#selz-general" id="tab-selz-general" role="tab" aria-controls="selz-general<?php echo $id ?>" aria-selected="true">General</a>
			</li>
			<li>
				<a href="#selz-colors" id="tab-selz-colors" role="tab" aria-controls="selz-colors<?php echo $id ?>" aria-selected="false">Colors</a>
			</li>
		</ul>
	</nav>

	<div class="tab-panel" id="selz-general<?php echo $id ?>" role="tabpanel" aria-labelledby="tab-selz-general<?php echo $id ?>" aria-hidden="false">
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Widget type', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<select id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>" class="input-control">
					<?php foreach ( $types as $k => $v ) { ?>
						<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['type'], $k ); ?>><?php echo esc_html( $v ); ?></option>
					<?php } ?>
				</select>
			</div>
		</div>

		<?php if( ( 'store' == $instance['type'] ) ) : ?>
			<div class="control-group">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'store_link' ); ?>"><?php _e( 'Store URL', $this->textdomain ); ?></label>
				</div>
				<div class="controls">
					<input type="url" placeholder="e.g. https://mystore.selz.com" id="<?php echo $this->get_field_id( 'store_link' ); ?>" name="<?php echo $this->get_field_name( 'store_link' ); ?>" value="<?php echo esc_attr( $instance['store_link'] ); ?>" class="input-control" required>
					<small class="help-block">
						<?php _e( 'Go to <a href="https://selz.com/settings/store?tab=domain" target="_blank">domain settings</a> and copy the URL ending in ".selz.com", for example "https://mystore.selz.com"', $this->textdomain ); ?>
					</small>
				</div>
			</div>
		<?php else : ?>
			<div class="control-group">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Item URL', $this->textdomain ); ?></label>
				</div>
				<div class="controls">
					<input type="text" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" value="<?php echo esc_attr( $instance['link'] ); ?>" class="input-control" placeholder="e.g. http://selz.co/123abc4" required>
					<small class="help-block"><?php _e( 'Go to "Options" > "Share" on one of your <a href="https://selz.com/items" target="_blank">item tiles</a> and copy the short link', $this->textdomain ); ?></small>
				</div>
			</div>
			<?php if( ( 'button' == $instance['type'] ) ) : ?>
				<div class="control-group">
					<div class="control-label">
						<label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Button style', $this->textdomain ); ?></label>
					</div>
					<div class="controls">
						<select id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>" class="input-control">
							<?php foreach ( $button_positions as $key => $val ) { ?>
								<option value="<?php echo $key; ?>" <?php selected( $instance['position'], $key ); ?>><?php echo $val; ?></option>
							<?php } ?>
						</select>
					</div>
				</div>
			<?php endif; ?>
			<div class="control-group">
				<div class="control-label">
					<p class="faux-label"><?php _e( 'Button text', $this->textdomain ); ?></p>
				</div>
				<div class="controls">
					<input type="text" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" value="<?php echo esc_attr( $instance['button_text'] ); ?>" class="input-control" placeholder="e.g. Buy it now" required>
				</div>
			</div>
			<div class="control-group">
				<div class="control-label">
					<p class="faux-label"><?php _e( 'Logos', $this->textdomain ); ?></p>
				</div>
				<div class="controls">
					<label for="<?php echo $this->get_field_id( 'show_logos' ); ?>" class="control-checkbox">
						<input type="checkbox" id="<?php echo $this->get_field_id( 'show_logos' ); ?>" name="<?php echo $this->get_field_name( 'show_logos' ); ?>" value="true">
						<?php _e( 'Show payment logos', $this->textdomain ); ?>
					</label>
					<small class="help-block"><?php _e( 'Show payment method logos underneath embed', $this->textdomain ); ?></small>
				</div>
			</div>
			<div class="control-group">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'interact' ); ?>"><?php _e( 'Window type', $this->textdomain ); ?></label>
				</div>
				<div class="controls">
					<select id="<?php echo $this->get_field_id( 'interact' ); ?>" name="<?php echo $this->get_field_name( 'interact' ); ?>" class="input-control">
						<?php foreach ( $interacts as $k => $v ) { ?>
							<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['interact'], $k ); ?>><?php echo esc_html( $v ); ?></option>
						<?php } ?>
					</select>
				</div>
			</div>
		<?php endif; ?>
	</div>

	<div class="tab-panel" id="selz-colors<?php echo $id ?>" role="tabpanel" aria-labelledby="tab-selz-colors<?php echo $id ?>" aria-hidden="true">
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'background_color' ); ?>"><?php _e( 'Button background', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'background_color' ); ?>" name="<?php echo $this->get_field_name( 'background_color' ); ?>" value="<?php echo esc_attr( $instance['background_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['background_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Button text', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'text_color' ); ?>" name="<?php echo $this->get_field_name( 'text_color' ); ?>" value="<?php echo esc_attr( $instance['text_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['text_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'link_color' ); ?>"><?php _e( 'Links', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'link_color' ); ?>" name="<?php echo $this->get_field_name( 'link_color' ); ?>" value="<?php echo esc_attr( $instance['link_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['link_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'chbg_color' ); ?>"><?php _e( 'Checkout header background', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'chbg_color' ); ?>" name="<?php echo $this->get_field_name( 'chbg_color' ); ?>" value="<?php echo esc_attr( $instance['chbg_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['chbg_color'] ); ?>">
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'chtx_color' ); ?>"><?php _e( 'Checkout header text', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'chtx_color' ); ?>" name="<?php echo $this->get_field_name( 'chtx_color' ); ?>" value="<?php echo esc_attr( $instance['chtx_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['chtx_color'] ); ?>">
			</div>
		</div>
	</div>
</div>
