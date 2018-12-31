<?php
/**
 * Shortcode
 * @since 0.0.1
**/

class Selz_Shortcode {
	var $shortcode;

	/**
	 * class constructor.
	 * @since 1.5
	**/
	function __construct() {
		$this->shortcode = selz()->slug;

		// Always render shortcode
		add_shortcode( selz()->slug, array( &$this, 'add_shortcode' ) );

		if ( ! selz()->api->is_connected() ) {
			add_action( 'admin_notices', array( &$this, 'not_connected' ), 11 );
		} else {
			add_action( 'media_buttons', array( &$this, 'add_buttons' ), 11 );
			add_action( 'admin_print_footer_scripts', array( &$this, 'print_dialog'), 50 );
			add_action( 'admin_footer', array( &$this, 'admin_footer' ), 1 );
			add_action( 'wp_ajax_selz_form', array( &$this, 'modal_ajax' ) );
			add_action( 'wp_enqueue_scripts', array( &$this, 'shortcode_head' ), 1 );
			add_action( 'admin_print_styles', array( $this, 'enqueue_styles' ) );

			add_action( 'wp_ajax_' . selz()->slug . '_search_products', array( &$this, 'search_products' ) );
			add_action( 'wp_ajax_' . selz()->slug . '_get_products', array( &$this, 'get_products' ) );
		}
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
		        <p><?php printf( __( 'Please %s', selz()->lang ), '<a href="' . admin_url( 'admin.php?page=' . selz()->slug ) . '">connect your ' . selz()->name . ' account</a>' ); ?></p>
		    </div>
		    <?php
		}
	}

	/**
	 * Shortcode function
	 * Uses add_shortcode
	 * @return HTML
	 * @since 1.5
	**/
	function add_shortcode( $atts, $content ) {
		$atts = shortcode_atts( selz()->default_args(), $atts );
		return selz()->embed( $atts );
	}

	/*
	 * Check if the post has a shortcode(s) used in the current post content with stripos PHP function
	 * Add !empty($cur_post->post_content) if the post has no content
	 * @return bool true, default false
	 * @since 1.8.0
	*/
	function has_shortcode() {
		global $post;
		$cur_post = get_post($post->ID);

		// Check the post content if has shortcode
		if (!empty($cur_post->post_content) && stripos($cur_post->post_content, '[' . $this->shortcode) !== false)
		{
			return true;
		}

		return false;
	}

	/**
	 * Print additional styles and script to the header after wp_enqueue_scripts
	 * the 'the_coundown_pro_enqueue_scripts_shortcode' funtion to avoid wrong arrangement
	 * @since 1.3
	 * @return JavaScript and CSS
	 **/
	function shortcode_head() {
		if ($this->has_shortcode()) {
			global $post;
			$cur_post = get_post($post->ID);

			// Let's extract the shortcode arguments by delimiter ="
			preg_match_all("/\[" . $this->shortcode . ".*?\]/", $cur_post->post_content, $matches);

			if ($matches) {
				$shortcode = array();

				foreach ($matches[0] as $match) {
					preg_match_all('/([^\s]*?)="([^"]*?)"/',$match, $arr);
					$array = array();
					$count = count($arr[1]);

					for ($i = 0; $i < $count; ++$i){
						$array[$arr[1][$i]] = $arr[2][$i];
					}
				}
			}
		}
	}

	/**
	 * Dialog for internal linking.
	 * @since 1.1
	 **/
	function print_dialog() {
		include_once( selz()->dir . '/includes/modal.php' );
	}

	function admin_footer() {
		wp_enqueue_script('wpdialogs-popup');
		wp_enqueue_style('wp-jquery-ui-dialog');
	}

	function modal_ajax() {
		// Check the nonce and if not isset the id, just die.
		$nonce = $_POST['nonce'];
		if ( ! wp_verify_nonce( $nonce, selz()->slug ) && ! isset( $_POST['data'] ) )
			die();

		// Set up the default form values and parse
		parse_str( $_POST['data'], $instance );
		require_once( selz()->dir . 'modal.php' );
		new Selz_Form( $instance );
		exit;
	}

	function add_buttons() {
		global $pagenow, $typenow;
		$output = '';

		/** Only run in post/page creation and edit screens */
		if (in_array($pagenow, array('post.php', 'page.php', 'post-new.php', 'post-edit.php'))) {
			// Product button
			$output .= '<button type="button" class="button js-open-modal" data-type="product" data-namespace="' . selz()->slug . '" style="padding-left: .2em;">' .
							'<span class="wp-media-buttons-icon dashicons dashicons-tag" style="padding-right:.2em;font-size:18px"></span>' .
							'<span class="button-label" data-label-add="' . __( 'Add Product', selz()->lang ) . '" data-label-update="' . __( 'Update Product', selz()->lang ) . '">' .
								__( 'Add Product', selz()->lang ) .
							'</span>' .
						'</button>';

			// Store button
			$output .= '<button type="button" class="button js-open-modal" data-type="store" data-namespace="' . selz()->slug . '" style="padding-left: .2em;">' .
							'<span class="wp-media-buttons-icon dashicons dashicons-store" style="padding-right:.2em;font-size:16px"></span>' .
							'<span class="button-label" data-label-add="' . __( 'Add Store', selz()->lang ) . '" data-label-update="' . __( 'Update Store', selz()->lang ) . '">' .
								__( 'Add Store', selz()->lang ) .
							'</span>' .
						'</button>';
		}

		echo $output;
	}

	function enqueue_styles() {
		global $hook_suffix;

		if (!in_array($hook_suffix, array('post-new.php', 'post.php'))) {
			return;
		}
	}
}
?>
