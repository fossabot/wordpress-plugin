<div class="control-group" data-type="button,widget">
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