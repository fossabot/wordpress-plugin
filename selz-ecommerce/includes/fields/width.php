<div class="control-group" data-type="button,widget">
    <div class="control-label">
        <p class="faux-label"><?php _e( 'Width', $this->lang ); ?></p>
    </div>
    <div class="controls">
        <label class="control control-checkbox" data-type="button">
            <input type="checkbox" name="<?php echo $this->get_field_name( 'auto_width' ); ?>" value="true" <?php checked( $instance['auto_width'], 'true' ); ?>>
            <?php _e( 'Automatic', $this->lang ); ?>
        </label>
    </div>
    <div class="controls">
        <label class="control control-checkbox">
            <input type="checkbox" name="<?php echo $this->get_field_name( 'fluid_width' ); ?>" value="true" <?php checked( $instance['fluid_width'], 'true' ); ?>>
            <?php _e( 'Fluid (100%)', $this->lang ); ?>
        </label>
    </div>
    <div class="controls">
        <div class="control control-range">
            <label for="<?php echo $this->get_field_id( 'width' ); ?>" class="sr-only"><?php _e( 'Width', $this->lang ); ?></label>
            <input type="range" max="1000" min="160" step="5" value="<?php echo( $instance['width'] ); ?>" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>">
            <span class="control-range-value">
                <output for="<?php echo $this->get_field_id( 'width' ); ?>"><?php echo( $instance['width'] ); ?></output>px
            </span>
        </div>
    </div>
</div>
