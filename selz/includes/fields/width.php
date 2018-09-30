<?php $min = 'widget' == $instance['type'] ? '240' : '160'; ?>

<div class="control-group" data-type="button,widget">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'width' ); ?>"><?php _e( 'Width', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <div class="control-range">
            <input type="range" max="1000" min="<?php esc_html_e( $min ); ?>" step="5" value="0" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>">
            <span class="control-range-value">
                <output for="<?php echo $this->get_field_id( 'width' ); ?>"><?php esc_html_e( $min ); ?></output>px
            </span>
        </div>

        <label for="<?php echo $this->get_field_id( 'auto_width' ); ?>" class="control-checkbox">
            <input type="checkbox" id="<?php echo $this->get_field_id( 'auto_width' ); ?>" name="<?php echo $this->get_field_name( 'auto_width' ); ?>" value="true">
            <?php _e( 'Automatic', $this->lang ); ?>
        </label>

        <small class="help-block"><?php _e( 'Set the maximum width or choose automatic width', $this->lang ); ?></small>
    </div>
</div>
