<?php
/*
    Plugin Name: Selz WordPress Ecommerce
    Plugin URI: https://selz.com/features/wordpress-ecommerce
    Description: Easily add ecommerce and a smooth shopping cart to your WordPress site. The most powerful way to sell physical products, digital items and services.
    Version: 1.8.3
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
 * Main Class.
 *
 */
final class Selz {

	public $version = '1.8.1';
	public $dir 	= '';
	public $url 	= '';
	public $name 	= 'Selz';
	public $slug 	= 'selz';
	public $lang 	= 'selz-ecommerce';
	public $home 	= 'https://selz.com/';
	public $home2 	= 'selz.com';
	public $embed 	= 'https://embeds.selzstatic.com/1/loader.js';

	/**
	 * The single instance of the class.
	 *
	 */
	protected static $_instance = null;

	/**
	 * Main Instance.
	 * Ensures only one instance is loaded or can be loaded.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct() {

		$this->dir = plugin_dir_path(__FILE__);
		$this->url = plugin_dir_url(__FILE__);

		$this->includes();
		$this->init_hooks();

		do_action( $this->slug . '_loaded' );
	}

	/**
	 * Include required core files.
	 */
	public function includes() {
		require_once( $this->dir . 'shortcode.php' );
		require_once( $this->dir . 'widget.php' );
		require_once( $this->dir . 'includes/class-api.php' );
	}

	private function init_hooks() {
		register_activation_hook( __FILE__, array( $this, 'activation_hook' ) );

		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ), 9 );
		add_action( 'widgets_init', array( $this, 'widgets_init' ) );

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_init', array( $this, 'init_settings' ) );
		add_action( 'wp_footer', array( $this, 'show_cart' ) );
	}

	/**
	 * Save plugin version on activation
	 * @since 0.0.1
	 */
	public function activation_hook() {
		add_option( $this->slug . '_version', $this->version );
	}

	/**
	 * Initializes the plugin and it's features
	 * Load necessary plugin files and add action to widget init
	 * @since 0.0.1
	 */
	public function plugin_loaded() {

		$this->api = new Selz_API();
		$this->shortcode = new Selz_Shortcode();


		// Load plugin translation
		load_plugin_textdomain($this->slug, false, $this->dir . 'lang/');

	}

	/**
	 * Load widget files and register
	 * @since 0.0.1
	 */
	public function widgets_init() {
		register_widget( $this->name . '_Widget' );
	}

	public function admin_menu() {

	    add_menu_page(
	        __( $this->name . ' Settings', $this->lang ),
	        $this->name,
	        'manage_options',
	        $this->slug,
	        array( $this, 'settings_page' ),
	        plugins_url('dist/img/png/icon.png', __FILE__ ),
	        2
	    );

	    add_submenu_page(
	        $this->slug,
	        __( $this->name . ' Settings', $this->lang ),
	        __( 'Settings', $this->lang ),
	        'manage_options',
	        $this->slug
	   	);

	    add_submenu_page(
	        $this->slug,
	        __( $this->name . ' Help', $this->lang ),
	        __( 'Help', $this->lang ),
	        'manage_options',
	        $this->slug . '_help',
	        array( $this, 'help_page' )
	   	);

	}

	/**
	 * Enqueue scripts and styles
	 * @since 1.7.2
	 */
	public function enqueue_scripts() {
		// Load styles
		wp_enqueue_style( $this->slug, plugins_url( 'dist/css/styles.css?v=' . $this->version, __FILE__ ), $this->version );
		wp_enqueue_style('wp-color-picker');

		// Scripts
		wp_enqueue_script( $this->slug, plugins_url('dist/js/scripts.js?v=' . $this->version, __FILE__ ), array('jquery', 'wp-color-picker'), $this->version);
	}


	public function settings_page() {
		include($this->dir .  '/views/settings.php');
	}

	public function help_page() {
		include($this->dir .  '/views/help.php');
	}

	// Register our settings. Add the settings section, and settings fields
	public function init_settings(){
		register_setting( $this->slug . '_settings', $this->slug . '_settings', array( $this, 'settings_validate' ) );

		add_settings_field( $this->slug . '_store_id', '', '', __FILE__ );
		add_settings_field( $this->slug . '_display_cart', '', '', __FILE__ );
	}

	public function settings_validate( $input ) {
		$input['store_id'] = trim(sanitize_text_field( $input['store_id'] ));
		$input['display_cart'] = sanitize_text_field( $input['display_cart'] );
		return $input;
	}

	/*
	 * Show the cart if selected
	 */
	public function show_cart() {
		$settings = get_option( $this->slug . '_settings' );

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
			<script async src="' . esc_url( $this->embed ) . '"></script>';
	    }

		echo $html;
	}


	/**
	 * Generate the selz button with custom arguments
	 * Set up the default form values
	 * @param $instance, see $defaults for complete parameters
	 * @since 0.0.1
	 */
	public function embed($instance) {
		// Merge the user-selected arguments with the defaults.
		$args = wp_parse_args((array) $instance, $this->default_args());

		// Overwrite "true" to 1, "false" to 0
		foreach ($args as $k => $v) {
			$args[$k] = str_replace(array('true', 'false'), array(true, false), $v);
	    }

		if ('store' == $args['type'] || $args['type'] == '') {
			if (!$args['store_link']) {
				return __('Store URL is empty', $this->lang);
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
			<script async src="' . esc_url( $this->embed ) . '"></script>
			<noscript><a href="' . $args['link'] . '" target="_blank">'. __('View store', $this->lang) .'</a></noscript>';

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
			<script async src="' . esc_url( $this->embed ) . '"></script>
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
			        '. ( !$args['auto_width'] ? '"width": ' . $args['width'] . ',' : '') . '
			        "logos": ' . ( $args['show_logos'] ? 'true' : 'false' ) . ',
	                "modal": ' . ( isset( $args['interact'] ) && $args['interact'] == 'modal' ? 'true' : 'false' ) . ',
	                "text": "' . trim($args['button_text']) . '",
			        "url": "' . $args['link'] . '"
			    }
			    </script>
			</div>
			<script async src="' . esc_url( $this->embed ) . '"></script>
	        <noscript><a href="' . $args['link'] . '" target="_blank">'. $args['button_text'] .'</a></noscript>';

		}

		return $html;
	}


	/**
	 * Return default arguments for widgets or shortcodes
	 * @since 1.5.1
	 */
	public function default_args() {
		$defaults = array(
			'title'				=> esc_attr__( $this->name . ' Widget', $this->lang),
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
}


/*
 * Start the plugin
 */
function selz() {
	return Selz::instance();
}
selz();

/*
 * Pretty print helper function for quick debugging
 */
if (!function_exists('pp')) {
	function pp( $array ) {
		echo '<pre style="white-space:pre-wrap;">';
			print_r( $array );
		echo '</pre>' . "\n";
	}
}

