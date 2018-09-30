<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'background_color' ); ?>"><?php _e( 'Button background', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'background_color' ); ?>" name="<?php echo $this->get_field_name( 'background_color' ); ?>" value="<?php echo esc_attr( $instance['background_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['background_color'] ); ?>">
    </div>
</div>

<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Button text', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'text_color' ); ?>" name="<?php echo $this->get_field_name( 'text_color' ); ?>" value="<?php echo esc_attr( $instance['text_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['text_color'] ); ?>">
    </div>
</div>

<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'link_color' ); ?>"><?php _e( 'Links', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'link_color' ); ?>" name="<?php echo $this->get_field_name( 'link_color' ); ?>" value="<?php echo esc_attr( $instance['link_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['link_color'] ); ?>">
    </div>
</div>

<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'chbg_color' ); ?>"><?php _e( 'Checkout header background', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'chbg_color' ); ?>" name="<?php echo $this->get_field_name( 'chbg_color' ); ?>" value="<?php echo esc_attr( $instance['chbg_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['chbg_color'] ); ?>">
    </div>
</div>

<div class="control-group">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'chtx_color' ); ?>"><?php _e( 'Checkout header text', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <input class="input-control color-picker js-color-picker" type="text" id="<?php echo $this->get_field_id( 'chtx_color' ); ?>" name="<?php echo $this->get_field_name( 'chtx_color' ); ?>" value="<?php echo esc_attr( $instance['chtx_color'] ); ?>" data-default-color="<?php echo esc_attr( $instance['chtx_color'] ); ?>">
    </div>
</div>