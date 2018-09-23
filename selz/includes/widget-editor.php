<div class="selz selz-widget-editor">
	<fieldset>
		<legend class="sr-only">Options</legend>
		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<input type="text" class="input-control" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>">
			</div>
		</div>

        <div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id('intro_text'); ?>"><?php _e( 'Intro text', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<textarea name="<?php echo $this->get_field_name( 'intro_text' ); ?>" id="<?php echo $this->get_field_id( 'intro_text' ); ?>" rows="2" class="input-control"><?php echo esc_textarea($instance['intro_text']); ?></textarea>
				<small class="help-block"><?php _e( 'This option will display additional text or HTML <em>before</em> the widget content', $this->lang ); ?></small>
			</div>
		</div>

		<div class="control-group">
			<div class="control-label">
				<label for="<?php echo $this->get_field_id('outro_text'); ?>"><?php _e( 'Outro text', $this->lang ); ?></label>
			</div>
			<div class="controls">
				<textarea name="<?php echo $this->get_field_name( 'outro_text' ); ?>" id="<?php echo $this->get_field_id( 'outro_text' ); ?>" rows="2" class="input-control"><?php echo esc_textarea($instance['outro_text']); ?></textarea>
				<small class="help-block"><?php _e( 'This option will display additional text or HTML <em>after</em> the widget content', $this->lang ); ?></small>
			</div>
		</div>

		<section class="selz-widget-controls">
			<?php include( selz()->dir . '/includes/widget-fields.php' ); ?>
		</section>
	</fieldset>
</div>