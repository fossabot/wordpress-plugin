<?php $min = 'widget' == $instance['type'] ? '240' : '160'; ?>

<div class="control-group embed-width" data-type="button,widget">
    <div class="control-label">
        <p class="faux-label"><?php _e( 'Width', $this->lang ); ?></p>
    </div>
    <div class="controls">
        <label class="control control-checkbox" data-type="button">
            <input type="checkbox" name="<?php echo $this->get_field_name( 'auto_width' ); ?>" value="true">
            <?php _e( 'Automatic', $this->lang ); ?>
        </label>
    </div>
    <div class="controls">
        <label class="control control-checkbox">
            <input type="checkbox" name="<?php echo $this->get_field_name( 'fluid_width' ); ?>" value="true">
            <?php _e( 'Fluid (100%)', $this->lang ); ?>
        </label>
    </div>
    <div class="controls">
        <div class="control control-range">
            <label for="<?php echo $this->get_field_id( 'width' ); ?>" class="sr-only"><?php _e( 'Width', $this->lang ); ?></label>
            <input type="range" max="1000" min="<?php esc_html_e( $min ); ?>" step="5" value="<?php esc_html_e( $min ); ?>" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>">
            <span class="control-range-value">
                <output for="<?php echo $this->get_field_id( 'width' ); ?>"><?php esc_html_e( $min ); ?></output>px
            </span>
        </div>
    </div>
</div>
