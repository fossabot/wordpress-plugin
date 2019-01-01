<?php
/*
    Plugin Name: Selz WordPress Ecommerce
    Plugin URI: https://features.selz.com/wordpress-ecommerce
    Description: Easily add ecommerce and a smooth shopping cart to your WordPress site. The most powerful way to sell physical products, digital items and services.
    Version: 2.0.0
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
 *
 */
final class Selz {

	public $version = '2.0.0';
	public $dir 	= '';
	public $url 	= '';
	public $name 	= 'Selz';
	public $slug 	= 'selz';
	public $lang 	= 'selz-ecommerce';
	public $home 	= 'https://selz.com/';
	public $signup 	= 'https://selz.com/account/signup';
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
		require_once( $this->dir . 'lib/class-api.php' );
	}

	private function init_hooks() {
		register_activation_hook( __FILE__, array( $this, 'activation_hook' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivation_hook' ) );

		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ), 9 );
		add_action( 'widgets_init', array( $this, 'widgets_init' ) );

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_footer', array( $this, 'admin_footer' ) );
		add_action( 'admin_init', array( $this, 'init_settings' ) );
		add_action( 'wp_footer', array( $this, 'show_cart' ) );

		add_filter( 'plugin_action_links', array( $this, 'plugin_action_links' ), 10, 2 );
		add_filter( 'block_categories', array( $this, 'block_categories' ), 10, 2 );
		add_filter( 'script_loader_tag', array( $this, 'script_loader_tag' ), 10, 3 );

		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );
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
	        plugins_url('dist/img/svg/icon.svg', __FILE__ ),
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
	 * Append the Selz gradient to the DOM -- to be referenced by block icons, etc.
	 *
	 * @example `<Path fill="url(#logo-gradient-a)" />`
	 * @since 2.0.0
	 */
	public function admin_footer() {
		?>
		<svg xmlns="http://www.w3.org/2000/svg" width="720" height="409" viewBox="0 0 720 409">
			<defs>
				<linearGradient id="logo-gradient-a" x1="100%" x2="0%" y1="100%" y2="0%">
					<stop offset="0%" stop-color="#C8318C"/>
					<stop offset="100%" stop-color="#602BC6"/>
				</linearGradient>
			</defs>
		</svg>
		<?php
	}

	/**
	 * Enqueue scripts and styles
	 * @since 1.7.2
	 */
	public function enqueue_scripts() {
		// Load styles
		wp_enqueue_style( $this->slug . '-main', plugins_url( 'dist/css/styles.css', __FILE__ ), null, $this->version);
		wp_enqueue_style('wp-color-picker');

		// Scripts
		wp_enqueue_script( $this->slug . '-main', plugins_url('dist/js/scripts.js', __FILE__ ), array('jquery', 'wp-color-picker'), $this->version);
	}

	public function asset_path( $asset ) {
		return plugins_url( '../selz-ecommerce-blocks/dist/' . $asset, __FILE__ );
	}

	/**
	 * Enqueue block editor assets
	 * @since 2.0.0
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_style( $this->slug . '-blocks', $this->asset_path( 'blocks.style.build.css' ), array( 'wp-edit-blocks' ), $this->version );
		wp_enqueue_script( $this->slug . '-blocks', $this->asset_path( 'blocks.build.js' ), array(
			'wp-blocks',
			'wp-editor',
			'wp-element',
			'wp-i18n',
		), $this->version );

		// Load the embed loader
		wp_enqueue_script( $this->slug . '-loader', $this->embed );

		wp_localize_script( $this->slug . '-blocks', selz()->slug . '_globals', array(
			'nonce'     => wp_create_nonce( $this->slug ),
			'resources' => $this->resources(),
			'slug'      => $this->slug,
			'store'     => get_option( $this->slug . '_store' ),
		) );
	}

	public function settings_page() {
		include($this->dir .  '/views/settings.php');
	}

	public function help_page() {
		include($this->dir .  '/views/help.php');
	}

	// Register our settings. Add the settings section, and settings fields
	public function init_settings() {
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

		if ('store' == $args['type'] || $args['type'] == '') {
			$store = get_option( $this->slug . '_store' );

 			if ( ! $store || ! $store->name )
			{
				return '';
			}

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
			        "url": "' . esc_url_raw( $store->name ) . '"
			    }
			    </script>
			</div>
			<script async src="' . esc_url( $this->embed ) . '"></script>
			<noscript><a href="' . esc_url_raw( $store->name ) . '" target="_blank">'. __('View store', $this->lang) .'</a></noscript>';

		} elseif ('button' == $args['type']) {
			if (!$args['link']) {
				return '';
			}

			if ($args['fluid_width']) {
				$args['width'] = '100%';
			}

			$html = '<div data-embed="button">
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
			if (!$args['link']) {
				return '';
			}

			if ($args['fluid_width']) {
				$args['width'] = '100%';
			}

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
			'text_color' 		=> '#ffffff',
			'background_color' 	=> '#7959c7',
			'link_color' 		=> '#7959c7',
			'chbg_color' 		=> '#7959c7',
			'chtx_color' 		=> '#ffffff',
			'tab_active'		=> array(0 => true, 1 => false, 2 => false),
	        'show_logos'        => '',
	        'show_description'  => 'true',
			'intro_text' 		=> '',
			'outro_text' 		=> '',
		);

		return $defaults;
	}

	/**
	 * Get localized resources
	 */
	public function resources() {
		return array(
			'add_to_cart' => __( 'Add to cart', $this->lang ),
			'buy' => __( 'Buy now', $this->lang ),
			'view' => __( 'View', $this->lang ),
		);
	}

	/**
     * Show row meta on the plugin screen.
     *
     */
    public function plugin_action_links( $links, $file ) {
        $settings_link = '<a href="' . admin_url( 'admin.php?page=' . $this->slug ) . '">' . esc_html__( 'Settings', $this->lang ) . '</a>';

		if ( $file == $this->slug . '-ecommerce/index.php' ) {
			array_unshift( $links, $settings_link );
		}

 		return $links;
	}

	/**
	 * Add a block category for ecommerce blocks
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
		if ( $handle == $this->slug . '-loader' ) {
			$tag = '<script async src="' . esc_url( $src ) . '"></script>';
		}

		return $tag;
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

