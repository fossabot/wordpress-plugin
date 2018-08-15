<div class="selz selz-widget-editor">
	<fieldset>
		<legend class="sr-only">Widget Options</legend>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<input type="text" class="input-control" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>">
			</div>
		</div>
        <div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id('intro_text'); ?>"><?php _e( 'Intro text', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<textarea name="<?php echo $this->get_field_name( 'intro_text' ); ?>" id="<?php echo $this->get_field_id( 'intro_text' ); ?>" rows="2" class="input-control"><?php echo esc_textarea($instance['intro_text']); ?></textarea>
				<small class="help-block"><?php _e( 'This option will display additional text or HTML <em>before</em> the widget content', $this->textdomain ); ?></small>
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id('outro_text'); ?>"><?php _e( 'Outro text', $this->textdomain ); ?></label>
			</div>
			<div class="controls">
				<textarea name="<?php echo $this->get_field_name( 'outro_text' ); ?>" id="<?php echo $this->get_field_id( 'outro_text' ); ?>" rows="2" class="input-control"><?php echo esc_textarea($instance['outro_text']); ?></textarea>
				<small class="help-block"><?php _e( 'This option will display additional text or HTML <em>after</em> the widget content', $this->textdomain ); ?></small>
			</div>
		</div>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id('customstylescript'); ?>"><?php _e( 'Custom JavaScript & CSS', $this->textdomain ) ; ?></label>
			</div>
			<div class="controls">
				<textarea name="<?php echo $this->get_field_name( 'customstylescript' ); ?>" id="<?php echo $this->get_field_id( 'customstylescript' ); ?>" rows="3" class="input-control"><?php echo htmlentities($instance['customstylescript']); ?></textarea>
				<small class="help-block"><?php _e( 'Use this for additional widget CSS and/or JavaScript. Current widget selector: ', $this->textdomain ); ?><?php echo '<tt>#' . $this->id . '</tt>'; ?></small>
			</div>
		</div>

		<?php include( SELZ_DIR . '/includes/fields.php' ); ?>
	</fieldset>
</div>