<?php
/*
	Shortcode
	@since 0.0.1
    http://Selz.com
    
	Copyright 2013 selz.com (email: engineer@selz.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
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
		$atts = shortcode_atts( array(
			'interact' 			=> 'overlay',
			'link' 				=> '#',
			'text_color' 		=> '#ffffff',
			'background_color' 	=> '#241d33',
			'intro_text' 		=> '',
			'outro_text' 		=> ''		
		), $atts );		
		
		return selz_button($atts);
	}


	/**
	 * PHP shortcode function for using in template file
	 * @params $id	: the widget option id
	 * 		   $echo: echo the HTML or return
	 * @return HTML.
	 * @since 1.5
	**/
	function super_post_search_shortcode( $id, $echo = true ) {
		$options = get_option( 'widget_selz' );	
		$args = $options[$id]; 	// overwrite
		$args['id'] = $id;		// add the id for load more post link
		
		if( $echo )
			echo super_post( $args );
		else
			return super_post( $args );
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
	function print_dialog() { ?>
		<div style="display:none;">
			<form id="selz-dialog" tabindex="-1">
				<div class="total-shortcode" style="padding: 12px 12px 10px;">
					<div id="selz-dialog-options">
						<?php
							require_once( SELZ_DIR . 'dialog.php' );
							new Selz_Form();
						?>
					</div>
					<div class="submitbox" style="height:29px;overflow:auto;padding: 5px 0;">
						<div id="selz-dialog-update" style=" float: right;line-height: 23px;">
							<span class="spinner" style="display: none;float: left;"></span>
							<input type="submit" value="<?php esc_attr_e( 'Add Shortcode', SELZ_LANG ); ?>" class="button-primary selz-dialog-submit">					
						</div>
						<div id="selz-dialog-cancel" style="float:left;line-height: 25px;">
							<a class="submitdelete deletion" href="#"><?php _e( 'Cancel', SELZ_LANG ); ?></a>
						</div>
					</div>
				</div>
			</form>
		</div><?php
	}

	function admin_footer() {
		wp_enqueue_script( 'wpdialogs-popup' );
		wp_enqueue_style( 'wp-jquery-ui-dialog' );
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
		$plugin_array['selz'] = SELZ_URL . 'js/editor_plugin.js';	
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

		wp_enqueue_style( 'total-dialog' );
		wp_enqueue_script( 'total-dialog' );	
		wp_enqueue_script( 'selz-shortcode', SELZ_URL . 'js/jquery.shortcode.js', array( 'jquery' ), SELZ_VERSION );		
		wp_localize_script( 'selz-shortcode', 'selzvars', array(
			'nonce'		=> wp_create_nonce( 'selz' ),
			'action'	=> 'selz_form'
		));	
	}
	
	
	function enqueue_styles() {
		?><style type="text/css">
		.wp_themeSkin .mce_selz span {
			background: url("<?php echo SELZ_URL . 'img/shortcode.png'; ?>") no-repeat scroll 0 0 transparent;
		}
		.wp_themeSkin .mce_selz:hover span {
			background-position: 0 -28px;
		}</style><?php
	}
	


	function quicktag_button() { 
		if ( wp_script_is( 'quicktags' ) ) { ?>
			<script type="text/javascript">
				QTags.addButton( 'qt_selz', 'selz', selz_dialog, '', 'selz', 'Paragraph tag' );
				function selz_dialog() { selzShortcode.open(); }
			</script><?php
		}
	}
}
?>