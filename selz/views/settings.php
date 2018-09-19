<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}
?>

<style>
.selz-settings {
	background: #fff;
	max-width: 700px;
	margin: 70px auto;
	padding: 0px;
	border-radius: 3px;
	border: 1px solid #ddd;
}
.selz-settings .button {
	margin-top: -60px;
	background: #4CB952;
	border-color: #4CB952;
	color: #fff;
	padding: 10px 24px;
	height: auto;
	line-height: 24px;
	font-size: 17px;
	box-shadow: none;
	text-decoration: none;
	display: inline-block;
	border-radius: 3px;
}

.selz-settings .button.connect {
	margin: 10px auto;
	background: #7959C7;
	border-color: #7959C7;
	padding: 12px 40px;
	font-size: 16px;
}
.selz-settings .button.dash {
	margin: 10px auto;
	background: #eee;
	border-color: #eee;
	color: #222;
	padding: 12px 40px;
	font-size: 16px;
}
.selz-settings .button.store {
	margin: 10px auto;
	padding: 12px 40px;
	font-size: 16px;
}
.selz-settings .button.join {
	float: right;
}
.selz-settings-content {
	padding: 30px;
	text-align: center;
}
.selz-settings-content .logo img {
	margin: 0 auto;
	padding: 20px;
	display: block;
}
.selz-settings-footer {
	padding: 30px;
	border-top: 1px solid #ddd;
}

</style>

<div class="wrap">
	<div class="selz-settings">
		<div class="selz-settings-content">

			<a class="logo" href="<?php echo esc_url( selz()->home ); ?>">
				<img width="100" src="<?php echo plugins_url( '../dist/img/svg/logo.svg?v=' . selz()->version, __FILE__ ); ?>" alt="">
			</a>

			<?php if( ! selz()->api->is_connected() ) { ?>

				<h2><?php printf( __( 'Connect your %s account to WordPress', selz()->lang ), selz()->name ); ?></h2>

				<a class="connect button" href="<?php echo esc_url( selz()->api->auth_url() ); ?>"><?php _e( 'Connect', selz()->lang ); ?></a>

				<p><?php printf( __( 'You will be redirected to sign into your %s account and accept permissions to allow WordPress to access your %s account', selz()->lang ), selz()->name, selz()->name ); ?></p>

			<?php } else { 

				$store = selz()->api->get_store(); 
				// $p = selz()->api->get_products();
				// pp($p);
				?>

				<p><?php printf( 
					__( 'Connected to account %s. %s', selz()->lang ), 
					$store->owner->email, 
					'<a class="disconnect" href="' . esc_url( selz()->api->disconnect_url() ) . '">' . __( 'Disconnect', selz()->lang ) . '</a>' 
				); ?></p>

				<p><?php printf(
					__( 'Read our %s on how to get the best out of your %s WordPress plugin.', selz()->lang ), 
					'<a href="' . admin_url() . 'admin.php?page' . selz()->slug . '_help">' . __( 'guide', selz()->lang ) . '</a>', 
					selz()->name 
				); ?></p>
				
				<a class="dash button" target="_blank" href="<?php echo esc_url( selz()->home ); ?>dashboard/"><?php _e( 'Dashboard', selz()->lang ); ?></a>
				<a class="store button" target="_blank" href="<?php echo esc_url( $store->name ); ?>"><?php _e( 'View Store', selz()->lang ); ?></a>

			<?php } ?>

			<form action="options.php" method="post" style="text-align:left">
				<?php
				settings_fields( selz()->slug . '_settings' );
				$options = get_option( selz()->slug . '_settings');
				?>

				<h3><?php _e( 'Shopping Cart', selz()->lang ); ?></h3>
				<p><?php _e( 'Add a shopping cart to all pages of your website. Simply check the option and enter your store URL or domain below.', selz()->lang ); ?></p>
				<table class="form-table">
					<tbody>
						<tr>
							<th scope="row"><?php _e( 'Display cart on all pages?', selz()->lang ); ?></th>
							<td>
								<?php
								$checked = '';
								if ( isset( $options['display_cart'] ) && $options['display_cart'] == 'on' ) {
									$checked = 'checked';
								}
								echo "<input type='checkbox' id='" . selz()->slug . "_display_cart' name='" . selz()->slug . "_settings[display_cart]' ".$checked.">";
								?>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<?php _e( 'Store', selz()->lang ); ?>
							</th>
							<td>
								<?php
								echo "<input type='text' id='" . selz()->slug . "_store_id' name='" . selz()->slug . "_settings[store_id]' value='{$options['store_id']}' class='regular-text code'>";
								?>
								<p class="description"><?php printf( __( 'Enter your %s store URL or domain for use with the shopping cart', selz()->lang ), selz()->name ); ?>.</p>
							</td>
						</tr>
					</tbody>
				</table>

				<p class="submit">
					<button type="submit" class="button-primary"><?php esc_attr_e('Save', selz()->lang); ?></button>
				</p>
			</form>

		</div>

		<footer class="selz-settings-footer">
			<h3><?php printf( __( 'Need a %s account?', selz()->lang ), selz()->name ); ?></h3>
			<p><?php printf( __( 'Try %s free for 14 days. No risk and no credit card required.', selz()->lang ), selz()->name ); ?></p>
			<a href="<?php echo esc_url( selz()->home ); ?>" class="join button" target="_blank"><?php _e( 'Start free trial', selz()->lang ); ?></a>
		</footer>

	</div>
</div>
