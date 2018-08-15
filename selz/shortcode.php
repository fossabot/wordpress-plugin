<?php
/*
	Shortcode
	@since 0.0.1
	http://Selz.com

	Copyright 2013 selz.com (email: engineer@selz.com)
*/

class Selz_Shortcode {
	var $shortcode;
	/**
	 * class constructor.
	 * @since 1.5
	**/
	function __construct() {
		$this->shortcode = 'selz';
		add_filter( 'tiny_mce_version', array( &$this, 'tiny_mce_version' ) );		// Modified the version when TinyMCE plugins are changed
		add_action( 'init', array( &$this, 'add_buttons' ) );						// Add action to the WordPress init
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
		add_action( 'admin_print_footer_scripts', array( &$this, 'print_dialog'), 50 );
		add_action( 'admin_footer', array( &$this, 'admin_footer' ), 1 );
		add_action( 'wp_ajax_selz_form', array( &$this, 'dialog_ajax' ) );
		add_action( 'wp_enqueue_scripts', array( &$this, 'shortcode_head' ), 1 );
		add_action( 'admin_print_styles', array( $this, 'enqueue_styles' ) );
		add_shortcode( 'selz', array( &$this, 'add_shortcode' ) );
		add_action( 'admin_print_footer_scripts', array( &$this, 'quicktag_button' ) );
	}

	/**
	 * Shortcode function
	 * Uses add_shortcode
	 * @return HTML.
	 * @since 1.5
	**/
	function add_shortcode( $atts, $content ) {
		$atts = shortcode_atts( selz_default_args(), $atts );
		return selz_button( $atts );
	}


	/*
	 * Check if the post has a shortcode(s) used in the current post content with stripos PHP function
	 * Add !empty($cur_post->post_content) if the post has no content
	 * @return bool true, default false
	 * @since 2.0.4
	*/
	function has_shortcode() {
		global $post;
		$cur_post = get_post($post->ID);

		// Check the post content if has shortcode
		if ( ! empty( $cur_post->post_content ) && stripos( $cur_post->post_content, '[' . $this->shortcode ) !== false )
			return true;

		return false;
	}

	/*
	 * Print additional styles and script to the header after wp_enqueue_scripts
	 * the 'the_coundown_pro_enqueue_scripts_shortcode' funtion to avoid wrong arrangement
	 * @param no parameter
	 * @since 1.3
	 * @return javascript and CSS
	 */
	function shortcode_head() {
		if ( $this->has_shortcode() ) {

			global $post;
			$cur_post = get_post($post->ID);

			// Let's extract the shortcode arguments by delimiter ="
			preg_match_all("/\[" . $this->shortcode . ".*?\]/", $cur_post->post_content, $matches);

			if ($matches) {
				$shortcode = array();

				foreach( $matches[0] as $match ) {
					preg_match_all('/([^\s]*?)="([^"]*?)"/',$match, $arr);
					$array = array();
					$count = count($arr[1]);
					for($i=0;$i<$count;++$i){
						$array[$arr[1][$i]] = $arr[2][$i];
					}
					//print_r( $array );
					//wp_enqueue_script('selz', SELZ_URL . 'js/jquery.selz.js', array('jquery') );
					//wp_localize_script( 'selz', $array['id'], $array );
				}
			}
		}
	}

	/**
	 * Dialog for internal linking.
	 * @since 3.1.0
	 */
	function print_dialog() {
		include_once( SELZ_DIR . '/includes/modal.php' );
	}

	function admin_footer() {
		wp_enqueue_script('wpdialogs-popup');
		wp_enqueue_style('wp-jquery-ui-dialog');
	}

	function dialog_ajax() {
		// Check the nonce and if not isset the id, just die.
		$nonce = $_POST['nonce'];
		if ( ! wp_verify_nonce( $nonce, 'selz' ) && ! isset( $_POST['data'] ) )
			die();

		// Set up the default form values and parse
		parse_str( $_POST['data'], $instance );
		require_once( SELZ_DIR . 'dialog.php' );
		new Selz_Form( $instance );
		exit;
	}

	function add_buttons() {
		if ( get_user_option('rich_editing') == 'true') {
			add_filter('mce_external_plugins',  array( &$this, 'mce_external_plugins'), 5);
			add_filter('mce_buttons',  array( &$this, 'mce_buttons'), 5);
		}
	}

	function mce_buttons( $buttons ) {
		array_push($buttons, 'separator', 'selz');
		return $buttons;
	}

	function mce_external_plugins( $plugin_array ) {
		$plugin_array['selz'] = SELZ_URL . 'dist/js/plugin.js';
		return $plugin_array;
	}

	function tiny_mce_version($version) {
		return ++$version;
	}

	/**
	 * Load custom style or script to the current page admin
	 * Enqueue the jQuery library including UI, colorpicker,
	 * the popup window and some custom styles/scripts
	 * @param string $hook.
	 * @since 1.1
	**/
	function admin_enqueue_scripts($hook) {
		if( 'post.php' != $hook && 'post-new.php' != $hook )
			return;

		wp_enqueue_script('selz', plugins_url('dist/js/scripts.js?v=' . SELZ_VERSION, __FILE__ ), array('jquery', 'wp-color-picker'), SELZ_VERSION);

		wp_localize_script('selz', 'selzvars', array(
			'nonce'		=> wp_create_nonce('selz'),
			'action'	=> 'selz_form'
		));
	}

	function enqueue_styles() {
		global $hook_suffix;

		if (!in_array($hook_suffix, array('post-new.php', 'post.php'))) {
			return;
		}
	}

	function quicktag_button() {
		if (wp_script_is('quicktags')) { ?>
			<script>
				QTags.addButton('qt_selz', 'selz', openSelzModal, '', 'selz', 'Paragraph tag');
				function openSelzModal() { new SelzModel(); }
			</script><?php
		}
	}
}
?>
