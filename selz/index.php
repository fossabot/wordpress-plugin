<?php
/*
    Plugin Name: Selz WordPress Ecommerce
    Plugin URI: https://selz.com/features/wordpress-ecommerce
    Description: Easily add ecommerce and a smooth shopping cart to your WordPress site. The most powerful way to sell physical products, digital items and services.
    Version: 1.8.2
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
define('SELZ_VERSION', '1.8.1');
define('SELZ_DIR', plugin_dir_path(__FILE__));
define('SELZ_URL', plugin_dir_url(__FILE__));
define('SELZ_NAME', 'Selz');
define('SELZ_SLUG', 'selz');
define('SELZ_LANG', 'selz-ecommerce');

// Launch the plugin
register_activation_hook( __FILE__, 'selz_activation_hook' );
add_action( 'plugins_loaded', 'selz_plugin_loaded', 9 );
add_action( 'admin_enqueue_scripts', 'selz_enqueue_scripts', 10 );
add_action( 'admin_menu', 'selz_admin_menu' );
add_action( 'admin_init', 'selz_init_settings' );
add_action( 'wp_footer', 'selz_show_cart' );

function selz_admin_menu() {
    add_menu_page(
        'Selz Settings',
        SELZ_NAME,
        'manage_options',
        SELZ_SLUG,
        'selz_settings_page',
        plugins_url('dist/img/png/icon.png', __FILE__ ),
        2
    );

    add_submenu_page(
        SELZ_SLUG,
        __( 'Selz Settings', SELZ_LANG ),
        __( 'Settings', SELZ_LANG ),
        'manage_options',
        SELZ_SLUG
   	);

    add_submenu_page(
        SELZ_SLUG,
        __( 'Selz Help', SELZ_LANG ),
        __( 'Help', SELZ_LANG ),
        'manage_options',
        'selz_help',
        'selz_help_page'
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
}

/**
 * Enqueue scripts and styles
 * @since 1.7.2
 */
function selz_enqueue_scripts() {
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
function selz_embed($instance) {
	// Merge the user-selected arguments with the defaults.
	$args = wp_parse_args((array) $instance, selz_default_args());

	// Overwrite "true" to 1, "false" to 0
	foreach ($args as $k => $v) {
		$args[$k] = str_replace(array('true', 'false'), array(true, false), $v);
    }

	if ('store' == $args['type'] || $args['type'] == '') {
		if (!$args['store_link']) {
			return __('Store URL is empty', SELZ_LANG);
		}

		$parseurl = parse_url($args['store_link']);
		$host = explode(".", $parseurl['host']);
		$store_domain = $host[0];

		$html = '<div data-embed="store">
		    <script type="text/props">
		    {
		        "colors": {
		            "buttons": {
		                "background": "' . $args['background_color'] . '",
		                "text": "' . $args['text_color'] . '"
		            },
		            "checkout": {
		                "background": "' . $args['chbg_color'] . '",
		                "text": "' . $args['chtx_color'] . '"
		            },
		            "links": "' . $args['link_color'] . '"
		        },
		        "url": "' . $args['store_link'] . '"
		    }
		    </script>
		</div>
		<script async src="https://embeds.selzstatic.com/1/loader.js"></script>
		<noscript><a href="' . $args['link'] . '" target="_blank">'. __('View store', SELZ_LANG) .'</a></noscript>';

	} elseif ('button' == $args['type']) {

		$html = '<div data-embed="button">
		    <script type="text/props">
		    {
		        "style": "' . $args['position'] . '",
		        "action": "' . $args['action'] . '",
		        "colors": {
		            "buttons": {
		                "background": "' . $args['background_color'] . '",
		                "text": "' . $args['text_color'] . '"
		            },
		            "checkout": {
		                "background": "' . $args['chbg_color'] . '",
		                "text": "' . $args['chtx_color'] . '"
		            }
		        },
		        '. ( !$args['auto_width'] ? '"width": ' . $args['width'] . ',' : '') . '
		        "logos": ' . ( $args['show_logos'] ? 'true' : 'false' ) . ',
                "modal": ' . ( isset( $args['interact'] ) && $args['interact'] == 'modal' ? 'true' : 'false' ) . ',
                "text": "' . trim($args['button_text']) . '",
                "url": "' . trim( $args['link'] ) . '"
		    }
		    </script>
		</div>
		<script async src="https://embeds.selzstatic.com/1/loader.js"></script>
        <noscript><a href="' . $args['link'] . '" target="_blank">'. $args['button_text'] .'</a></noscript>';

	} else {

		$html = '<div data-embed="widget">
		    <script type="text/props">
		    {
		        "action": "' . $args['action'] . '",
		        "colors": {
		            "buttons": {
		                "background": "' . $args['background_color'] . '",
		                "text": "' . $args['text_color'] . '"
		            },
		            "checkout": {
		                "background": "' . $args['chbg_color'] . '",
		                "text": "' . $args['chtx_color'] . '"
		            }
                },
                "description": ' . ( $args['show_description'] ? 'true' : 'false' ) . ',
		        "width": ' . ( $args['auto_width'] ? '"100%"' : $args['width'] ) . ',
		        "logos": ' . ( $args['show_logos'] ? 'true' : 'false' ) . ',
                "modal": ' . ( isset( $args['interact'] ) && $args['interact'] == 'modal' ? 'true' : 'false' ) . ',
                "text": "' . trim($args['button_text']) . '",
		        "url": "' . $args['link'] . '"
		    }
		    </script>
		</div>
		<script async src="https://embeds.selzstatic.com/1/loader.js"></script>
        <noscript><a href="' . $args['link'] . '" target="_blank">'. $args['button_text'] .'</a></noscript>';

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
		'kind'				=> '',
		'type'				=> '',
		'interact' 			=> 'modal',
		'position' 			=> 'default',
		'action' 			=> 'add-to-cart',
		'width' 			=> 240,
		'auto_width' 		=> false,
		'button_text'		=> 'Add to cart',
		'text_color' 		=> '#ffffff',
		'background_color' 	=> '#7959c7',
		'link_color' 		=> '#7959c7',
		'chbg_color' 		=> '#7959c7',
		'chtx_color' 		=> '#ffffff',
		'tab_active'		=> array(0 => true, 1 => false, 2 => false),
        'show_logos'        => 'false',
        'show_description'  => 'true',
		'intro_text' 		=> '',
		'outro_text' 		=> '',
	);

	return $defaults;
}

function selz_settings_page() {
	include(SELZ_DIR .  '/views/settings.php');
}
function selz_help_page() {
	include(SELZ_DIR .  '/views/help.php');
}

// Register our settings. Add the settings section, and settings fields
function selz_init_settings(){
	register_setting( 'selz_settings', 'selz_settings', 'selz_settings_validate' );

	add_settings_field( 'selz_store_id', '', '', __FILE__ );
	add_settings_field( 'selz_display_cart', '', '', __FILE__ );
}

function selz_settings_validate( $input ) {
	$input['store_id'] = trim(sanitize_text_field( $input['store_id'] ));
	$input['display_cart'] = sanitize_text_field( $input['display_cart'] );
	return $input;
}

/*
 * Show the cart if selected
 */
function selz_show_cart() {
	$settings = get_option( 'selz_settings' );

	if (
		( isset( $settings['display_cart'] ) && $settings['display_cart'] == 'on' ) &&
		( isset( $settings['store_id'] ) && $settings['store_id'] != '' )
	) {
        $id = $settings['store_id'];

		$html = '<div data-embed="cart">
		    <script type="text/props">
		    {
		        "store": ' . ( is_numeric($id) ? absint($id) : '"' . trim($id) . '"') . '
		    }
		    </script>
		</div>
		<script async src="https://embeds.selzstatic.com/1/loader.js"></script>';
    }

	echo $html;
}
?>
