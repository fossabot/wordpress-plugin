<div class="control-group" data-type="button,widget">
    <div class="control-label">
        <label for="<?php echo $this->get_field_id( 'show_logos' ); ?>"><?php _e( 'Logos', $this->lang ); ?></label>
    </div>
    <div class="controls">
        <label for="<?php echo $this->get_field_id( 'show_logos' ); ?>" class="control-checkbox">
            <input type="checkbox" id="<?php echo $this->get_field_id( 'show_logos' ); ?>" name="<?php echo $this->get_field_name( 'show_logos' ); ?>" value="true" <?php checked( $instance[ 'show_logos' ], 'true' ); ?>>
            <?php _e( 'Show payment logos', $this->lang ); ?>
        </label>
    </div>
</div>