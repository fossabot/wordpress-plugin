<?php
/*
    Plugin Name: Selz WordPress Ecommerce
    Plugin URI: https://selz.com/features/wordpress-ecommerce
    Description: Easily add ecommerce and a smooth shopping cart to your WordPress site. The most powerful way to sell physical products, digital items and services.
    Version: 1.7.2
    Author: selz.com
    Author URI: https://selz.com/features/wordpress-ecommerce
    License: MIT
*/

/**
 * Exit if accessed directly
 * @since 0.0.1
 */
if (!defined('ABSPATH'))
	exit;

/**
 * Define constants
 * @since 0.0.1
 */
define('SELZ', true);
define('SELZ_VERSION', '1.7.2');
define('SELZ_DIR', plugin_dir_path(__FILE__));
define('SELZ_URL', plugin_dir_url(__FILE__));
define('SELZ_NAME', 'Selz');
define('SELZ_SLUG', 'selz');
define('SELZ_LANG', 'selz-ecommerce');

// Launch the plugin
register_activation_hook( __FILE__, 'selz_activation_hook' );
add_action( 'plugins_loaded', 'selz_plugin_loaded', 9 );
add_action( 'admin_menu', 'selz_admin_menu' );

function selz_admin_menu() {
    add_menu_page(
        'Selz Help',
        SELZ_NAME,
        'manage_options',
        SELZ_SLUG,
        'selz_menu_page',
        plugins_url('dist/img/png/icon.png', __FILE__ )
    );
}

/**
 * Save plugin version on activation
 * @since 0.0.1
 */
function selz_activation_hook() {
	add_option('selz_version', SELZ_VERSION);
}

/**
 * Initializes the plugin and it's features
 * Load necessary plugin files and add action to widget init
 * @since 0.0.1
 */
function selz_plugin_loaded() {
	// Include base library
	require_once(SELZ_DIR . 'shortcode.php');

	// New instance
	new Selz_Shortcode();

	// Load plugin translation
	load_plugin_textdomain('selz', false, SELZ_DIR . 'lang/');

	// Initialize widgets
	add_action('widgets_init', 'selz_widgets_init');

	// Load styles
	wp_enqueue_style('selz', plugins_url( 'dist/css/styles.css?v=' . SELZ_VERSION, __FILE__ ), SELZ_VERSION);
	wp_enqueue_style('wp-color-picker');

	// Scripts
	wp_enqueue_script('selz', plugins_url('dist/js/scripts.js?v=' . SELZ_VERSION, __FILE__ ), array('jquery', 'wp-color-picker'), SELZ_VERSION);
}

/**
 * Load widget files and register
 * @since 0.0.1
 */
function selz_widgets_init() {
	require(SELZ_DIR . 'widget.php');
	register_widget('Selz_Widget');
}

/**
 * Generate the selz button with custom arguments
 * Set up the default form values
 * @param $instance, see $defaults for complete parameters
 * @since 0.0.1
 */
function selz_button($instance) {
	// Merge the user-selected arguments with the defaults.
	$args = wp_parse_args((array) $instance, selz_default_args());

	// Overwrite "true" to 1, "false" to 0
	foreach ($args as $k => $v) {
		$args[$k] = str_replace(array('true', 'false'), array(true, false), $v);
	}

	// Remove the # for hexcolor
	$args['link_color'] = str_replace('#', '', $args['link_color']);
	$args['text_color'] = str_replace('#', '', $args['text_color']);
	$args['background_color'] = str_replace('#', '', $args['background_color']);
	$args['chbg_color'] = str_replace('#', '', $args['chbg_color']);
	$args['chtx_color'] = str_replace('#', '', $args['chtx_color']);

	if ('store' == $args['type']) {
		if (!$args['store_link']) {
			return __('Store URL is empty', SELZ_LANG);
		}

		$parseurl = parse_url($args['store_link']);
		$host = explode(".", $parseurl['host']);
		$store_domain = $host[0];

		$html = '<script data-selz-cb="'.$args['background_color'].'" data-selz-cbt="'.$args['text_color'].'" data-selz-cl="'.$args['link_color'].'" data-selz-s="'.$store_domain.'" data-selz-chbg="'.$args['chbg_color'].'" data-selz-chtx="'.$args['chtx_color'].'">
			if (typeof _$elz === "undefined") { var _$elz = {}; }
			if (typeof _$elz.s === "undefined") {
				_$elz.s = { e: document.createElement("script") };
				_$elz.s.e.src = "https://selz.com/embed/store/'.$store_domain.'";
				document.body.appendChild(_$elz.s.e);
			}
		</script>
		<noscript><a href="'.$args['link'].'" target="_blank">'. __('View store', SELZ_LANG) .'</a><a href="https://selz.com/" target="_blank">'. __('Powered by Selz Ecommerce', SELZ_LANG) .'</a></noscript>';

	} elseif ( 'button' == $args['type']) {
		$html = '<script data-selz-t="_selz-btn-'.$args['position'].'" data-selz-a="'.$args['interact'].'" data-selz-ct="'.$args['text_color'].'" data-selz-cb="'.$args['background_color'].'" data-selz-b="'.trim($args['link']).'"'.($args['show_logos'] ? ' data-selz-lg="true"' : '').'  data-selz-chbg="'.$args['chbg_color'].'" data-selz-chtx="'.$args['chtx_color'].'" data-text="'.$args['button_text'].'">
			if (typeof _$elz === "undefined") { var _$elz = {}; }
			if (typeof _$elz.b === "undefined") {
				_$elz.b = { e: document.createElement("script") };
				_$elz.b.e.src = "https://selz.com/embed/button";
				document.body.appendChild(_$elz.b.e);
			}
		</script>
		<noscript><a href="'.$args['link'].'" target="_blank">'.$args['button_text'].'</a><a href="https://selz.com/" target="_blank">'. __('Powered by Selz Ecommerce', SELZ_LANG) .'</a></noscript>';

	} else {
		$html = '<script data-selz-a="'.$args['interact'].'" data-selz-ct="'.$args['text_color'].'" data-selz-cb="'.$args['background_color'].'" data-selz-w="'.trim($args['link']).'"'.($args['show_logos'] ? ' data-selz-lg="true"' : '').' data-selz-chbg="'.$args['chbg_color'].'" data-selz-chtx="'.$args['chtx_color'].'" data-text="'.$args['button_text'].'">
			if (typeof _$elz === "undefined") { var _$elz = {}; }
			if (typeof _$elz.w === "undefined") {
				_$elz.w = { e: document.createElement("script") };
				_$elz.w.e.src = "https://selz.com/embed/widget";
				document.body.appendChild(_$elz.w.e);
			}
		</script>
		<noscript><a href="'.$args['link'].'" target="_blank">'.$args['button_text'].'</a><a href="https://selz.com/" target="_blank">'. __('Powered by Selz Ecommerce', SELZ_LANG) .'</a></noscript>';
	}

	return $html;
}


/**
 * Return default arguments for widgets or shortcodes
 * @since 1.5.1
 */
function selz_default_args() {
	$defaults = array(
		'title'				=> esc_attr__('Selz Widget', SELZ_LANG),
		'link'				=> '',
		'store_link'		=> '',
		'type'				=> 'button',
		'interact' 			=> 'modal',
		'position' 			=> 'default',
		'button_text'		=> 'Buy it now',
		'text_color' 		=> '#ffffff',
		'background_color' 	=> '#7959c7',
		'link_color' 		=> '#7959c7',
		'chbg_color' 		=> '#7959c7',
		'chtx_color' 		=> '#ffffff',
		'tab_active'		=> array( 0 => true, 1 => false, 2 => false ),
		'show_logos'        => 'false',
		'intro_text' 		=> '',
		'outro_text' 		=> '',
		'customstylescript'	=> ''
	);

	return $defaults;
}

function selz_menu_page() {
	// Load styles
	wp_enqueue_style('selz', plugins_url('dist/css/styles.css?v=' . SELZ_VERSION, __FILE__), SELZ_VERSION);

	include(SELZ_DIR .  '/views/admin.php');
}
?>
