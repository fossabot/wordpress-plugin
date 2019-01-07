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
		add_action( 'admin_footer', array( $this, 'admin_footer' ) );

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
	 * @since 0.0.1
	 */
	public function plugin_loaded() {
		$this->api = new Selz_API();

		if ( ! $this->api->is_connected() ) {
			add_action( 'admin_notices', array( &$this, 'not_connected' ), 11 );
		} else {
			add_action( 'wp_ajax_' . $this->slug . '_search_products', array( &$this, 'search_products' ) );
			add_action( 'wp_ajax_' . $this->slug . '_get_products', array( &$this, 'get_products' ) );
		}
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
	 * Return common colors
	 * TODO: Should be gotten from Selz
	 * @since 2.0.0
	 */
	public function colors() {
		return array(
			'primary' => '#7959c7',
			'white'   => '#fff',
		);
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

	public function not_connected() {
		$screen = get_current_screen();
		if ($screen->base === 'post') {
		    ?>
		    <div class="notice notice-info">
		        <p><?php printf( __( 'Please %s', $this->lang ), '<a href="' . admin_url( 'admin.php?page=' . $this->slug ) . '">connect your ' . $this->name . ' account</a>' ); ?></p>
		    </div>
		    <?php
		}
	}

	/**
	 * Enqueue block editor assets
	 * @since 2.0.0
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_style( $this->slug . '-blocks', plugins_url( 'dist/css/block-editor.css', __FILE__ ), array( 'wp-edit-blocks' ), $this->version );
		wp_enqueue_script( $this->slug . '-blocks', plugins_url( 'dist/js/blocks.js', __FILE__ ), array(
			'wp-blocks',
			'wp-editor',
			'wp-element',
			'wp-i18n',
		), $this->version );

		// Load the embed loader
		wp_enqueue_script( $this->slug . '-loader', $this->embed );

		wp_localize_script( $this->slug . '-blocks', $this->slug . '_block_globals', array(
			'colors'    => $this->colors(),
			'embed'     => $this->embed,
			'nonce'     => wp_create_nonce( $this->slug ),
			'resources' => $this->resources(),
			'slug'      => $this->slug,
			'store'     => get_option( $this->slug . '_store' ),
		) );
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
		if ( $handle == $this->slug . '-loader' ) {
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

