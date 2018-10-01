<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id('outro_text'); ?>"><?php _e( 'Outro text', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <textarea name="<?php echo $this->get_field_name( 'outro_text' ); ?>" id="<?php echo $this->get_field_id( 'outro_text' ); ?>" rows="2" class="input-control"><?php echo esc_textarea($instance['outro_text']); ?></textarea>
        <small class="help-block"><?php _e( 'This option will display additional text or HTML <em>after</em> the widget content', $this->lang ); ?></small>
    </div>
</div>