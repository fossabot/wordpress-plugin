<div class="control-group" data-type="widget">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'show_description' ); ?>"><?php _e( 'Description', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <label for="<?php echo $this->get_field_id( 'show_description' ); ?>" class="control-checkbox">
            <input type="checkbox" id="<?php echo $this->get_field_id( 'show_description' ); ?>" name="<?php echo $this->get_field_name( 'show_description' ); ?>" value="true" <?php checked( $instance['show_description'], 'true' ); ?>>
            <?php _e( 'Show product description', $this->lang ); ?>
        </label>
    </div>
</div>