<div class="control-group" data-type="button">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Style', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <select id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>" class="input-control">
            <?php foreach ( $button_positions as $key => $val ) { ?>
                <option value="<?php echo $key; ?>" <?php selected( $instance['position'], $key ); ?>><?php echo $val; ?></option>
            <?php } ?>
        </select>
    </div>
</div>