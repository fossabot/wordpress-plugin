<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input type="text" class="input-control" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>">
    </div>
</div>