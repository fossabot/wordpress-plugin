<?php
/*
    Plugin Name: Selz WordPress Ecommerce
    Plugin URI: https://features.selz.com/wordpress-ecommerce
    Description: Easily add ecommerce and a smooth shopping cart to your WordPress site. The most powerful way to sell physical products, digital items and services.
    Version: 2.0.1
    Author: Selz
    Author URI: https://features.selz.com/wordpress-ecommerce
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
 */
final class Selz {

	public $version = '2.0.1';
	public $dir 	= '';
	public $url 	= '';
	public $name 	= 'Selz';
	public $slug 	= 'selz';
	public $lang 	= 'selz-ecommerce';
	public $home 	= 'https://selz.com/';
	public $signup 	= 'https://selz.com/account/signup';
	public $embeds 	= 'https://selz.com/embeds';
	public $embed 	= 'https://embeds.selzstatic.com/1/loader.js';
	public $developer = false;

	/**
	 * The single instance of the class.
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
		require_once( $this->dir . 'lib/class-api.php' );
	}

	private function init_hooks() {
		register_activation_hook( __FILE__, array( $this, 'activation_hook' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivation_hook' ) );

		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ), 9 );

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_init', array( $this, 'init_settings' ) );
		add_action( 'wp_footer', array( $this, 'show_cart' ) );

		add_filter( 'plugin_action_links', array( $this, 'plugin_action_links' ), 10, 2 );

		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );

		add_filter( 'block_categories', array( $this, 'block_categories' ), 10, 2 );
		add_filter( 'script_loader_tag', array( $this, 'script_loader_tag' ), 10, 3 );
	}

	/**
	 * Save plugin version on activation
	 * @since 0.0.1
	 */
	public function activation_hook() {
		add_option( $this->slug . '_version', $this->version );
	}

	/**
	 * Delete plugin data on activation
	 * @since 1.9.0
	 */
	public function deactivation_hook() {

		$api = new Selz_API();

		$api->remove_tokens();
		$api->remove_client();

		delete_option( $this->slug . '_version' );
	}

	/**
	 * Initializes the plugin and its features
	 * @since 0.0.1
	 */
	public function plugin_loaded() {
		$this->api = new Selz_API();

		if ( $this->api->is_connected() ) {
			add_action( 'wp_ajax_' . $this->slug . '_search_products', array( &$this, 'search_products' ) );
			add_action( 'wp_ajax_' . $this->slug . '_get_products', array( &$this, 'get_products' ) );
		}

		// Always render shortcode
		add_shortcode($this->slug, array(&$this, 'add_shortcode'));
	}

	public function admin_menu() {
	    add_menu_page(
	        __( 'Selz Settings', $this->lang ),
	        $this->name,
	        'manage_options',
	        $this->slug,
	        array( $this, 'settings_page' ),
	        plugins_url('dist/img/svg/icon.svg', __FILE__ ),
	        2
	    );

	    add_submenu_page(
	        $this->slug,
	        __( 'Selz Settings', $this->lang ),
	        __( 'Settings', $this->lang ),
	        'manage_options',
	        $this->slug
	   	);

	    add_submenu_page(
	        $this->slug,
	        __( 'Selz Help', $this->lang ),
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
		wp_enqueue_style( $this->slug . '-main', plugins_url( 'dist/css/main.css', __FILE__ ), null, $this->version);
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

		if ( $_GET['developer'] == 'true' ) {
			setcookie($this->slug . '_developer', 'true', time() + 315360000);
		}

		if ( $_GET['developer'] == 'true' || $_COOKIE[$this->slug . '_developer'] == 'true' ) {
			$this->developer = true;
		}
	}

	public function settings_validate( $input ) {
		$input['display_cart'] = sanitize_text_field( $input['display_cart'] );

		$env = sanitize_text_field( $input['env'] );

		if ( strpos($env, 'selz.com') !== false ) {
			$input['env'] = $env;
		} else {
			$input['env'] = '';
		}

		// On change of environment, we need to reset the API
		$options = get_option( $this->slug . '_settings' );

		if ( $options['env'] != $input['env'] ) {
			$api = new Selz_API();

			if ( $api->is_connected() ) {
				$api->remove_tokens();
				$api->remove_client();
			}
		}

		return $input;
	}

	/*
	 * Show the cart if selected
	 */
	public function show_cart() {
		$settings 	= get_option( $this->slug . '_settings' );
		$store 		= get_option( $this->slug . '_store' );

 		if ( isset( $settings['display_cart'] ) && $settings['display_cart'] == 'on' ) {
 			if ( ! $store || ! $store->name ) {
				return '';
			}

 			$html = '<div data-embed="cart">
			    <script type="text/props">
			    {
			        "store": "' . $store->name . '"
			    }
			    </script>
			</div>
			<script async src="' . esc_url( $this->embed ) . '"></script>';

 			echo $html;
 	    }
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

		$env = get_option( $this->slug . '_settings' )['env'];

		if ( 'store' == $args['type'] || $args['type'] == '' ) {
			$store = get_option( $this->slug . '_store' );

 			if ( !$store || !$store->name )
			{
				return '';
			}

			$html = '<div data-embed="store">
			    <script type="text/props">
			    {
					' . ( $env != '' ? '"env": "' . $env . '",' : '' ) . '
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
			        "url": "' . esc_url_raw( $store->name ) . '"
			    }
			    </script>
			</div>
			<script async src="' . esc_url( $this->embed ) . '"></script>
			<noscript><a href="' . esc_url_raw( $store->name ) . '" target="_blank">'. __('View store', $this->lang) .'</a></noscript>';

		} elseif ( 'button' == $args['type'] ) {
			if ( !$args['link'] ) {
				return '';
			}

			if ( $args['fluid_width'] ) {
				$args['width'] = '100%';
			}

			$html = '<div data-embed="button">
			    <script type="text/props">
			    {
					' . ( $env != '' ? '"env": "' . $env . '",' : '' ) . '
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
			        '. ( $args['width'] ? '"width": ' . ( is_numeric($args['width']) ? absint($args['width']) : '"' . trim($args['width']) . '"') . ',' : '') . '
			        "logos": ' . ( $args['show_logos'] ? 'true' : 'false' ) . ',
					"modal": ' . ( isset( $args['interact'] ) && $args['interact'] == 'modal' ? 'true' : 'false' ) . ',
					"style": "' . $args['style'] . '",
	                "text": "' . trim($args['button_text']) . '",
	                "url": "' . trim( $args['link'] ) . '"
			    }
			    </script>
			</div>
			<script async src="' . esc_url( $this->embed ) . '"></script>
	        <noscript><a href="' . $args['link'] . '" target="_blank">'. $args['button_text'] .'</a></noscript>';

		} else {
			if ( !$args['link'] ) {
				return '';
			}

			if ( $args['fluid_width'] ) {
				$args['width'] = '100%';
			}

			$html = '<div data-embed="widget">
			    <script type="text/props">
			    {
					' . ( $env != '' ? '"env": "' . $env . '",' : '' ) . '
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
			        "width": ' . ( is_numeric($args['width']) ? absint($args['width']) : '"' . trim($args['width']) . '"') . ',
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
	 * Return common colors
	 * TODO: Along with `default_args`, should be gotten from Selz
	 * @since 2.0.0
	 */
	public function colors() {
		return array(
			'primary' => '#7959c7',
			'white'   => '#fff',
		);
	}

	/**
	 * Return default arguments for widgets or shortcodes
	 * @since 1.5.1
	 */
	public function default_args() {
		// TODO: We should get these from the user defaults on Selz

		$defaults = array(
			'title'				=> esc_attr__( $this->name . ' Widget', $this->lang),
			'link'				=> '',
			'store_link'		=> '',
			'type'				=> '',
			'interact' 			=> 'modal',
			'style' 			=> 'price-right',
			'action' 			=> 'add-to-cart',
			'width' 			=> '320',
			'auto_width' 		=> 'true',
			'fluid_width' 		=> 'false',
			'button_text'		=> __('Add to cart', $this->lang),
			'text_color' 		=> $this->colors['white'],
			'background_color' 	=> $this->colors['primary'],
			'link_color' 		=> $this->colors['primary'],
			'chbg_color' 		=> $this->colors['primary'],
			'chtx_color' 		=> $this->colors['white'],
			'tab_active'		=> array(0 => true, 1 => false, 2 => false),
	        'show_logos'        => '',
	        'show_description'  => 'true',
			'intro_text' 		=> '',
			'outro_text' 		=> '',
		);

		return $defaults;
	}

	/**
     * Show row meta on the plugin screen.
     */
    public function plugin_action_links( $links, $file ) {
        $settings_link = '<a href="' . admin_url( 'admin.php?page=' . $this->slug ) . '">' . esc_html__( 'Settings', $this->lang ) . '</a>';

		if ( $file == $this->slug . '-ecommerce/index.php' ) {
			array_unshift( $links, $settings_link );
		}

 		return $links;
    }

    /**
	 * Load Localisation files.
	 * @since  1.0.0
	 */
	public function load_plugin_textdomain() {
		$locale = apply_filters( 'plugin_locale', get_locale(), $this->lang );

		load_textdomain( $this->lang, WP_LANG_DIR . '/' . $this->lang . '-' . $locale . '.mo' );
		load_plugin_textdomain( $this->lang, false, plugin_basename( dirname( __FILE__ ) ) . '/languages' );
	}

	public function search_products() {
		$api = new Selz_API();
		$results = $api->search_products(sanitize_text_field($_REQUEST['q']), sanitize_text_field($_REQUEST['page']));

		if ( $results ) {
			wp_send_json($results);
		}

		exit;
	}

	public function get_products() {
		$api = new Selz_API();
		$results = $api->get_products(sanitize_text_field($_REQUEST['starting_after']));

		if ( $results ) {
			wp_send_json($results);
		}

		exit;
	}

	/**
	 * Shortcode function
	 * Uses `add_shortcode`
	 * @return HTML
	 * @since 1.5
	 */
	function add_shortcode($atts, $content) {
		$atts = shortcode_atts($this->default_args(), $atts);
		return $this->embed($atts);
	}

	/**
	 * Enqueue block editor assets
	 * @since 2.0.0
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_style( $this->slug . '-block-editor', plugins_url( 'dist/css/block-editor.css', __FILE__ ), array( 'wp-edit-blocks' ), $this->version );
		wp_enqueue_script( $this->slug . '-blocks', plugins_url( 'dist/js/blocks.js', __FILE__ ), array(
			'wp-blocks',
			'wp-editor',
			'wp-element',
			'wp-i18n',
		), $this->version );

		// Load the embed loader
		wp_enqueue_script( $this->slug . '-embed', $this->embed, array(), false, true );

		wp_localize_script( $this->slug . '-blocks', $this->slug . '_globals', array(
			'colors' => $this->colors(),
			'embed'  => $this->embed,
			'env'    => get_option( $this->slug . '_settings' )['env'],
			'nonce'  => wp_create_nonce( $this->slug ),
			'store'  => get_option( $this->slug . '_store' ),
		) );
	}

	/**
	 * Add a block category for Selz blocks
	 * @since 2.0.0
	 */
	public function block_categories( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => $this->slug . '-ecommerce',
					'title' => __( 'Selz Ecommerce', $this->lang ),
				),
			)
		);
	}

	/**
	 * Load the embed loader asynchronously
	 * @since 2.0.0
	 */
	public function script_loader_tag( $tag, $handle, $src ) {
		if ( $handle == $this->slug . '-embed' ) {
			$tag = '<script async src="' . esc_url( $src ) . '"></script>';
		}

		return $tag;
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

