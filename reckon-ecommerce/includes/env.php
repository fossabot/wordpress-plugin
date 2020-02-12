<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<?php if (reckon()->developer) { ?>
    <div style="float: left;">
        <label for="<?php echo reckon()->slug . "_env" ?>" style="float: left;">
            <span class="sr-only"><?php _e('Environment', reckon()->lang); ?></span>
            <input type="text" id="<?php echo reckon()->slug; ?>_env" name="<?php echo reckon()->slug; ?>_settings[env]" class="input-control input-control--small" placeholder="selz.com" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="<?php echo $options['env']; ?>">
        </label>
        <button type="submit" class="btn btn-small btn-secondary">Save</button>
    </div>
<?php } ?>