<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id('intro_text'); ?>"><?php _e( 'Intro text', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <textarea name="<?php echo $this->get_field_name( 'intro_text' ); ?>" id="<?php echo $this->get_field_id( 'intro_text' ); ?>" rows="2" class="input-control"><?php echo esc_textarea($instance['intro_text']); ?></textarea>
        <small class="help-block"><?php _e( 'This option will display additional text or HTML <em>before</em> the widget content', $this->lang ); ?></small>
    </div>
</div>