<div class="control-group" data-type="button,widget">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'button_text' ); ?>"><?php _e( 'Text', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input type="text" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" value="<?php echo esc_attr( $instance['button_text'] ); ?>" class="input-control" placeholder="e.g. Buy it now" required>
    </div>
</div>