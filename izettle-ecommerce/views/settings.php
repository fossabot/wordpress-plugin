<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="izettle izettle-settings">
    <div class="container container--narrow">
        <div class="panel margin-top-4 margin-bottom-2">
            <div class="padding-6">
                <div class="text-center padding-4">
                    <img class="align-middle" src="<?php echo plugins_url( '../dist/img/svg/logo.svg?v=' . izettle()->version, __FILE__ ); ?>" alt="iZettle logo">

                    <?php if (!izettle()->api->is_connected()) { ?>

                        <h4 class="margin-top-4"><?php printf( __( 'Connect your %s account to WordPress', izettle()->lang ), izettle()->name ); ?></h4>

                        <a href="<?php echo esc_url( izettle()->api->connect_url() ); ?>" class="btn btn-primary padding-left-4 padding-right-4">
                            <?php _e( 'Connect', izettle()->lang ); ?>
                        </a>

                        <small class="help-block margin-top-4">
                            <?php printf( __( 'You will be redirected to sign into your %s account and accept permissions to allow WordPress to access your %s account', izettle()->lang ), izettle()->name, izettle()->name ); ?>
                        </small>

                    <?php } else {
                        $store = izettle()->api->get_store();
                        ?>

                        <p><?php printf(
                            __( 'Connected to %s. %s', izettle()->lang ),
                            '<strong>' . $store->display_name . '</strong>',
                            '<a href="' . esc_url( izettle()->api->disconnect_url() ) . '">' . __( 'Disconnect', izettle()->lang ) . '</a>'
                        ); ?></p>

                        <a href="<?php echo esc_url( izettle()->dashboard ); ?>" target="_blank" class="btn"><?php _e( 'Go to dashboard', izettle()->lang ); ?></a>
                    <?php } ?>
                </div>

                <?php if (izettle()->api->is_connected()) { ?>
                    <form action="options.php" method="post" id="settings" class="padding-top-4">
                        <?php
                        settings_fields( izettle()->slug . '_settings' );
                        $options = get_option( izettle()->slug . '_settings');
                        ?>

                        <label for="<?php echo izettle()->slug . "_display_cart" ?>">
                            <?php
                            $checked = '';
                            if ( isset( $options['display_cart'] ) && $options['display_cart'] == 'on' ) {
                                $checked = 'checked';
                            }
                            echo "<input type='checkbox' id='" . izettle()->slug . "_display_cart' name='" . izettle()->slug . "_settings[display_cart]' ".$checked." onchange='document.forms.settings.submit()'>";
                            ?>
                            <?php _e( 'Shopping Cart', izettle()->lang ); ?>
                            <small class="help-block"><?php _e( 'Display the shopping cart on all pages of your website.', izettle()->lang ); ?></small>
                        </label>
                    </form>

                    <div class="alert margin-top-4 padding-top-3 padding-bottom-3 padding-left-4 padding-right-4 text-center">
                        <?php printf(
                            __( 'Read our %s on how to get the best out of your %s WordPress plugin.', izettle()->lang ),
                            '<a href="' . admin_url() . 'admin.php?page=' . izettle()->slug . '_help">' . __( 'guide', izettle()->lang ) . '</a>',
                            izettle()->name
                        ); ?>
                    </div>
                <?php } else { ?>
                    <aside class="padding-top-4">
                        <div>
                            <h4 class="margin-bottom-1"><?php printf( __( 'Need an %s account?', izettle()->lang ), izettle()->name ); ?></h4>
                            <p class="margin-0"><?php printf( __( 'Try %s free for 14 days.', izettle()->lang ), izettle()->name ); ?></p>
                        </div>
                        <a href="<?php echo esc_url( izettle()->signup ); ?>" target="_blank" class="btn btn-primary"><?php _e( 'Start free trial', izettle()->lang ); ?></a>
                    </aside>
                <?php } ?>
            </div>
        </div>

        <?php include( izettle()->dir . '/includes/version.php' ); ?>
    </div>
</div>
