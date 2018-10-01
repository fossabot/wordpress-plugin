<div class="control-group" data-type="button,widget">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'action' ); ?>"><?php _e( 'Action', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <select id="<?php echo $this->get_field_id( 'action' ); ?>" name="<?php echo $this->get_field_name( 'action' ); ?>" class="input-control">
            <?php foreach ( $actions as $key => $val ) { ?>
                <option value="<?php esc_attr_e( $key ); ?>" <?php selected( $instance['action'], $key ); ?>><?php esc_attr_e( $val ); ?></option>
            <?php } ?>
        </select>
    </div>
</div>