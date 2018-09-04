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
.selz-settings-content {
	padding: 30px;
}
.selz-settings-content .logo img {
	margin: 0 auto;
	padding: 20px;
	display: block;
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
.selz-settings-footer .button {
	float: right;
	margin-top: -60px;
	background: #4CB952;
	border-color: #4CB952;
	color: #fff;
	padding: 10px 24px;
	height: auto;
	line-height: 24px;
	font-size: 17px;
	box-shadow: none;
}
</style>
<div class="wrap">
	<div class="selz-settings">

		<div class="selz-settings-content">

			<a class="logo" href="https://selz.com"><img width="100" src="<?php echo plugins_url( '../dist/img/svg/logo.svg?v=' . SELZ_VERSION, __FILE__ ); ?>" alt="" target="_blank"></a>

			<h3><?php _e( 'Get Started', SELZ_LANG ); ?></h3>
			<p><?php printf( __( 'Read our %s on how to add products or a store to your WordPress site.', SELZ_LANG ), '<a href="' . admin_url( 'admin.php?page=selz_help' ) . '">guide</a>' ); ?></p>

			<form action="options.php" method="post">

				<?php 
				settings_fields( 'selz_settings' );
				$options = get_option('selz_settings');
				?>

				<table class="form-table">
					<tbody>
						<tr>
							<th scope="row"><?php _e( 'Display cart on all pages?', SELZ_LANG ); ?></th>
							<td>
								<?php
								$checked = '';
								if( isset( $options['display_cart'] ) && $options['display_cart'] == 'on' ) { 
									$checked = ' checked="checked" '; 
								}
								echo "<input ".$checked." id='selz_display_cart' name='selz_settings[display_cart]' type='checkbox' />";
								?>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php _e( 'Selz Store ID', SELZ_LANG ); ?></th>
							<td>
								<?php
								echo "<input id='selz_store_id' name='selz_settings[store_id]' size='20' type='number' value='{$options['store_id']}' />";
								?>
							</td>
						</tr>
					</tbody>
				</table>

				<p class="submit">
					<input name="Submit" type="submit" class="button-primary" value="<?php esc_attr_e('Save Changes', SELZ_LANG); ?>" />
				</p>

			</form>

		</div>

		<div class="selz-settings-footer">
			<h3><?php _e( 'Need a Selz account?', SELZ_LANG ); ?></h3>
			<p><?php _e( 'Try Selz free for 14 days. No risk and no credit card required.', SELZ_LANG ); ?></p>
			<a href="https://api.selz.com/oauth/account/signup?returnurl=https://selz.com/dashboard" class="button" target="_blank"><?php _e( 'Start free trial', SELZ_LANG ); ?></a>
		</div>

	</div>
</div>
