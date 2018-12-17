<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}
?>

<?php if ( selz()->developer ) { ?>
    <label for="<?php echo selz()->slug . "_env" ?>" style="float: left;">
        <span class="sr-only"><?php _e( 'Environment', selz()->lang ); ?></span>
        <select id="<?php echo selz()->slug; ?>_env" name="<?php echo selz()->slug; ?>_settings[env]" onchange="document.forms.settings.submit()">
            <?php foreach ( selz()->envs as $key => $value ) { ?>
                <option value="<?php echo $key; ?>" <?php if ( isset( $options['env'] ) && $options['env'] == $key ) { echo 'selected'; } ?>>
                    <?php echo $value; ?>
                </option>
            <?php } ?>
        </select>
    </label>
<?php } ?>