<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<?php if (selz()->developer) { ?>
    <div style="float: left;">
        <label for="<?php echo selz()->slug . "_env" ?>" style="float: left;">
            <span class="sr-only"><?php _e('Environment', selz()->lang); ?></span>
            <input type="text" id="<?php echo selz()->slug; ?>_env" name="<?php echo selz()->slug; ?>_settings[env]" class="input-control input-control--small" placeholder="selz.com" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="<?php echo $options['env']; ?>">
        </label>
        <button type="submit" class="btn btn-small btn-secondary">Save</button>
    </div>
<?php } ?>