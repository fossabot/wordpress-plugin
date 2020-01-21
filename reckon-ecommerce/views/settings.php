<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="reckon reckon-settings">
    <div class="container container--narrow">
        <div class="panel margin-top-4 margin-bottom-2">
            <div class="padding-6">
                <div class="text-center padding-4">
                    <img class="align-middle" src="<?php echo plugins_url('../dist/img/svg/logo.svg?v=' . reckon()->version, __FILE__); ?>" alt="Reckon logo">

                    <?php if (!reckon()->api->is_connected()) { ?>
                        <h4 class="margin-top-4"><?php printf(__('Connect your %s account to WordPress', reckon()->lang), reckon()->name); ?></h4>

                        <a href="<?php echo esc_url(reckon()->api->connect_url()); ?>" class="btn btn-primary padding-left-4 padding-right-4">
                            <?php _e('Connect', reckon()->lang); ?>
                        </a>

                        <small class="help-block margin-top-4">
                            <?php printf(__('You will be redirected to sign into your %s account and accept permissions to allow WordPress to access your %s account', reckon()->lang), reckon()->name, reckon()->name); ?>
                        </small>

                    <?php } else {
                        $store = reckon()->api->get_store();
                        ?>

                        <p><?php printf(__('Connected to %s. %s', reckon()->lang), '<strong>' . $store->display_name . '</strong>', '<a href="' . esc_url(reckon()->api->disconnect_url()) . '">' . __('Disconnect', reckon()->lang) . '</a>'); ?></p>

                        <a href="<?php echo esc_url(reckon()->dashboard); ?>" target="_blank" class="btn"><?php _e('Go to dashboard', reckon()->lang); ?></a>
                    <?php } ?>
                </div>

                <?php if (reckon()->api->is_connected()) { ?>
                    <form action="options.php" method="post" id="settings" class="padding-top-4">
                        <?php
                        settings_fields(reckon()->slug . '_settings');
                        $options = get_option(reckon()->slug . '_settings');
                        ?>

                        <label for="<?php echo reckon()->slug . "_display_cart" ?>">
                            <?php
                            $checked = '';
                            if (isset($options['display_cart']) && $options['display_cart'] == 'on') {
                                $checked = 'checked';
                            }
                            echo "<input type='checkbox' id='" . reckon()->slug . "_display_cart' name='" . reckon()->slug . "_settings[display_cart]' ".$checked." onchange='document.forms.settings.submit()'>";
                            ?>
                            <?php _e('Shopping Cart', reckon()->lang); ?>
                            <small class="help-block"><?php _e('Display the shopping cart on all pages of your website.', reckon()->lang); ?></small>
                        </label>
                    </form>

                    <div class="alert margin-top-4 padding-top-3 padding-bottom-3 padding-left-4 padding-right-4 text-center">
                        <?php printf(
                            __('Read our %s on how to get the best out of your %s WordPress plugin.', reckon()->lang),
                            '<a href="' . admin_url() . 'admin.php?page=' . reckon()->slug . '_help">' . __('guide', reckon()->lang) . '</a>',
                            reckon()->name
                        ); ?>
                    </div>
                <?php } else { ?>
                    <aside class="padding-top-4">
                        <div>
                            <h4 class="margin-bottom-1"><?php printf(__('Need a %s account?', reckon()->lang), reckon()->name); ?></h4>
                            <p class="margin-0"><?php printf(__('Try %s free for 14 days.', reckon()->lang), reckon()->name); ?></p>
                        </div>
                        <a href="<?php echo esc_url(reckon()->signup); ?>" target="_blank" class="btn btn-primary"><?php _e('Start free trial', reckon()->lang); ?></a>
                    </aside>
                <?php } ?>
            </div>
        </div>

        <?php include(reckon()->dir . '/includes/version.php'); ?>
    </div>
</div>
