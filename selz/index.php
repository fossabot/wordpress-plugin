<?php
/*
    Plugin Name: Selz
    Plugin URI: http://selz.com
    Description: Embed your Selz items directly into your WordPress site. 1) Choose to embed a button or widget for your items. 2) Customize your button or widget colours. 3) Choose to display your item within an overlay or new tab
    Version: 1.5.1
    Author: selz.com
    Author URI: http://selz.com
    License: GPL2
    
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


/**
 * Exit if accessed directly
 * @since 0.0.1
 */
if ( ! defined( 'ABSPATH' ) )
	exit;


/**
 * Define constants
 * @since 0.0.1
 */
define( 'SELZ', true );
define( 'SELZ_VERSION', '1.5.1' );
define( 'SELZ_DIR', plugin_dir_path( __FILE__ ) );
define( 'SELZ_URL', plugin_dir_url( __FILE__ ) );
define( 'SELZ_NAME', 'Selz' );
define( 'SELZ_SLUG', 'selz' );
define( 'SELZ_LANG', 'selz-ecommerce' );
	

// Launch the plugin
register_activation_hook( __FILE__, 'selz_activation_hook' );
add_action( 'plugins_loaded', 'selz_plugin_loaded', 9 );


/**
 * Save plugin version on activation
 * @since 0.0.1
 */
function selz_activation_hook() {
	add_option( 'selz_version', SELZ_VERSION );
}


/**
 * Initializes the plugin and it's features
 * Load necessary plugin files and add action to widget init
 * @since 0.0.1
 */
function selz_plugin_loaded() {
	require_once( SELZ_DIR . 'lib/total.php' );
	require_once( SELZ_DIR . 'shortcode.php' );

	new Selz_Shortcode();

	// Load plugin translation
	load_plugin_textdomain( 'selz', false, SELZ_DIR . 'lang/' );	

	// Initialize widgets
	add_action( 'widgets_init', 'selz_widgets_init' );
}


/**
 * Load widget files and register
 * @since 0.0.1
 */
function selz_widgets_init() {
	require_once( SELZ_DIR . 'widget.php' );
	register_widget( 'Selz_Widget' );
}


/**
 * Generate the selz button with custom arguments
 * Set up the default form values
 * @param $instance, see $defaults for complete parameters
 * @since 0.0.1
 */
function selz_button( $instance ) {

	// Merge the user-selected arguments with the defaults.
	$args = wp_parse_args( (array) $instance, selz_default_args() );

	// Overwrite "true" to 1, "false" to 0
	foreach( $args as $k => $v )
		$args[$k] = str_replace( array('true', 'false'), array(true, false), $v );
	
	// Remove the # for hexcolor
	$args['link_color'] = str_replace( '#', '', $args['link_color'] );
	$args['text_color'] = str_replace( '#', '', $args['text_color'] );
	$args['background_color'] = str_replace( '#', '', $args['background_color'] );

	if( 'store' == $args['type'] ) {
		if( ! $args['store_link'] )
			return __( 'Selz store URL is empty', SELZ_LANG );
			
		$parseurl = parse_url( $args['store_link'] );
		$host = explode( ".", $parseurl['host'] );
		$store_domain = $host[0];
		
		$html = '<script data-selz-cb="'.$args['background_color'].'" data-selz-cbt="'.$args['text_color'].'" data-selz-cl="'.$args['link_color'].'" data-selz-s="'.$store_domain.'">
			if (typeof _$elz === "undefined") { var _$elz = {}; }
			if (typeof _$elz.s === "undefined") {
				_$elz.s = { e: document.createElement("script") };
				_$elz.s.e.src = "https://selz.com/embed/store/'.$store_domain.'";
				document.body.appendChild(_$elz.s.e);
			}
		</script>
		<a href="'.$args['store_link'].'" target="_blank" class="_selz_nojs_link">'. __('Selz Store', SELZ_LANG) .'</a>
		<a href="https://selz.com" target="_blank" class="_selz_nojs_link">'. __('Sell digital downloads on Selz', SELZ_LANG) .'</a>';
	
	} elseif ( 'button' == $args['type'] ) {	
		$html = '<script data-selz-t="_selz-btn-'.$args['position'].'" data-selz-a="'.$args['interact'].'" data-selz-ct="'.$args['text_color'].'" data-selz-cb="'.$args['background_color'].'" data-selz-b="'.trim($args['link']).'"'.($args['show_logos'] ? ' data-selz-lg="true"' : '').'>
			if (typeof _$elz === "undefined") { var _$elz = {}; }
			if (typeof _$elz.b === "undefined") {
				_$elz.b = { e: document.createElement("script") };
				_$elz.b.e.src = "https://selz.com/embed/button";
				document.body.appendChild(_$elz.b.e);
			}
		</script>
		<a href="'.$args['link'].'" target="_blank" class="_selz_nojs_link">'. __('Buy this on Selz', SELZ_LANG) .'</a>
        <a href="https://selz.com" target="_blank" class="_selz_nojs_link">'. __('Start selling on Selz', SELZ_LANG) .'</a>';
	
	} else {
		$html = '<script data-selz-t="'.$args['theme'].'" data-selz-a="'.$args['interact'].'" data-selz-ct="'.$args['text_color'].'" data-selz-cb="'.$args['background_color'].'" data-selz-w="'.trim($args['link']).'"'.($args['show_logos'] ? ' data-selz-lg="true"' : '').'>
			if (typeof _$elz === "undefined") { var _$elz = {}; }
			if (typeof _$elz.w === "undefined") {
				_$elz.w = { e: document.createElement("script") };
				_$elz.w.e.src = "https://selz.com/embed/widget";
				document.body.appendChild(_$elz.w.e);
			}
		</script>
		<a href="'.$args['link'].'" target="_blank" class="_selz_nojs_link">'. __('Buy this on Selz', SELZ_LANG) .'</a>
        <a href="https://selz.com" target="_blank" class="_selz_nojs_link">'. __('Start selling on Selz', SELZ_LANG) .'</a>';
	}
	
	return $html;
}


/**
 * Return default arguments for widgets or shortcodes
 * @since 1.5.1
 */
function selz_default_args() {
	$defaults = array(
		'title'				=> esc_attr__( 'Selz Widget', SELZ_LANG ),
		'link'				=> '',
		'store_link'		=> '',
		'type'				=> 'button',
		'theme'				=> 'light',
		'interact' 			=> 'modal',
		'position' 			=> 'default',
		'text_color' 		=> '#ffffff',
		'background_color' 	=> '#6d48cc',
		'link_color' 		=> '#6d48cc',
		'tab_active'		=> array( 0 => true, 1 => false, 2 => false ),
		'show_logos'        => 'false',
		'intro_text' 		=> '',
		'outro_text' 		=> '',
		'customstylescript'	=> ''
	);
	
	return $defaults;
}
?>