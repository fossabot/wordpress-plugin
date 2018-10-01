<div class="control-group" data-type="button">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'style' ); ?>"><?php _e( 'Style', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <select id="<?php echo $this->get_field_id( 'style' ); ?>" name="<?php echo $this->get_field_name( 'style' ); ?>" class="input-control">
            <?php foreach ( $button_styles as $key => $val ) { ?>
                <option value="<?php echo $key; ?>" <?php selected( $instance['style'], $key ); ?>><?php echo $val; ?></option>
            <?php } ?>
        </select>
    </div>
</div>