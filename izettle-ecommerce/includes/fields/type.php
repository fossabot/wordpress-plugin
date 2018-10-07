<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Type', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <select id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>" class="input-control">
            <?php foreach ( $types as $k => $v ) {
                if ( 'product' == $instance['kind'] && $v == 'Store' )
                    continue;
                ?>
                <option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['type'], $k ); ?>><?php echo esc_html( $v ); ?></option>
            <?php } ?>
        </select>
    </div>
</div>