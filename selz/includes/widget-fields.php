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

		<div class="control-group widget-type">
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

		<div class="control-group" data-type="store">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'store_link' ); ?>"><?php _e( 'Store URL', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<input type="url" id="<?php echo $this->get_field_id( 'store_link' ); ?>" name="<?php echo $this->get_field_name( 'store_link' ); ?>" value="<?php echo esc_attr( 'https://' . $store->name ); ?>" class="input-control"  disabled="disabled">
				</div>
			</div>

		
		<div class="control-group" data-type="button-widget">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Product', $this->lang ); ?></label>
			</div>
			<div class="controls products">
				<select id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" class="input-control">
					<?php if( $products ) {
						foreach ( $products as $i => $prod ) { 
							$img = $prod->featured_image->icon ? $prod->featured_image->icon : '';
							?>
						<option value="<?php echo $prod->short_url; ?>" data-imagesrc="<?php esc_attr_e( $img ); ?>" <?php selected( $instance['products'], $i ); ?>><?php echo $prod->title; ?></option>
					<?php }
					} ?>
				</select>
			</div>
		</div>

		<script>
			(function ($) {
				$('.products select').ddslick();
			})(jQuery);
		</script>

		<div class="control-group" data-type="button-widget">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'action' ); ?>"><?php _e( 'Action', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<select id="<?php echo $this->get_field_id( 'action' ); ?>" name="<?php echo $this->get_field_name( 'action' ); ?>" class="input-control">
						<?php foreach ( $actions as $key => $val ) { ?>
							<option value="<?php echo $key; ?>" <?php selected( $instance['action'], $key ); ?>><?php echo $val; ?></option>
						<?php } ?>
					</select>
				</div>
			</div>

			<div class="control-group" data-type="button">
				<div class="control-label">
					<label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Button style', $this->lang ); ?></label>
				</div>
				<div class="controls">
					<select id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>" class="input-control">
						<?php foreach ( $button_positions as $key => $val ) { ?>
							<option value="<?php echo $key; ?>" <?php selected( $instance['position'], $key ); ?>><?php echo $val; ?></option>
						<?php } ?>
					</select>
				</div>
			</div>

		<div class="control-group" data-type="button">
			<div class="control-label">
				<p class="faux-label"><?php _e( 'Button text', $this->lang ); ?></p>
			</div>
			<div class="controls">
				<input type="text" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" value="<?php echo esc_attr( $instance['button_text'] ); ?>" class="input-control" placeholder="e.g. Buy it now" required>
			</div>
		</div>

		<div class="control-group" data-type="widget">
			<div class="control-label">
				<p class="faux-label"><?php _e( 'Description', $this->lang ); ?></p>
			</div>
			<div class="controls">
				<label for="<?php echo $this->get_field_id( 'show_description' ); ?>" class="control-checkbox">
					<input type="checkbox" id="<?php echo $this->get_field_id( 'show_description' ); ?>" name="<?php echo $this->get_field_name( 'show_description' ); ?>" value="true" <?php checked( $instance[ 'show_description' ], 'checked' ); ?>>
					<?php _e( 'Show the description', $this->lang ); ?>
				</label>
				<small class="help-block"><?php _e( 'Show the item description', $this->lang ); ?></small>
			</div>
		</div>

		<div class="control-group" data-type="button-widget">
			<div class="control-label">
				<p class="faux-label"><?php _e( 'Logos', $this->lang ); ?></p>
			</div>
			<div class="controls">
				<label for="<?php echo $this->get_field_id( 'show_logos' ); ?>" class="control-checkbox">
					<input type="checkbox" id="<?php echo $this->get_field_id( 'show_logos' ); ?>" name="<?php echo $this->get_field_name( 'show_logos' ); ?>" <?php checked( $instance[ 'show_logos' ], 'on' ); ?>>
					<?php _e( 'Show payment logos', $this->lang ); ?>
				</label>
				<small class="help-block"><?php _e( 'Show payment method logos underneath embed', $this->lang ); ?></small>
			</div>
		</div>

		<div class="control-group" data-type="button-widget">
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

	<div class="tab-panel" id="selz-colors<?php echo $id ?>" role="tabpanel" aria-labelledby="tab-selz-colors<?php echo $id ?>" aria-hidden="true">
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
