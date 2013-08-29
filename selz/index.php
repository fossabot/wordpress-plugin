<?php
/*
    Plugin Name: Selz
    Plugin URI: http://selz.com
    Description: Embed your Selz items directly into your wordpress site. 1) Choose to embed a button or widget for your items. 2) Customize your button or widget colours. 3) Choose to display your item within an overlay or new tab
    Version: 0.0.1
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


// Set constant
define( 'SELZ', true );
define( 'SELZ_VERSION', '0.0.1' );
define( 'SELZ_DIR', plugin_dir_path( __FILE__ ) );
define( 'SELZ_URL', plugin_dir_url( __FILE__ ) );
define( 'SELZ_NAME', 'Selz' );
define( 'SELZ_SLUG', 'selz' );
define( 'SELZ_LANG', 'selz' );
	

// Launch the plugin
register_activation_hook( __FILE__, 'selz_activation_hook' );
add_action( 'plugins_loaded', 'selz_plugin_loaded', 9 );


/**
 * Save plugin version on activation
 * @since 0.0.1
 */
function selz_activation_hook() {
	add_option( 'selz', SELZ_VERSION );
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
		
	load_plugin_textdomain( 'selz', false, SELZ_DIR . 'lang/' );	
		
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
function selz_button($instance) {
	$defaults = array(
		'link'				=> '',
		'modal' 			=> false,
		'text_color' 		=> '#ffffff',
		'background_color' 	=> '#241d33'
	);

	// merge the user-selected arguments with the defaults.
	$args = wp_parse_args( (array) $instance, $defaults );

	// overwrite "true" to 1, "false" to 0
	foreach( $args as $k => $v )
		$args[$k] = str_replace( array('true', 'false'), array(true, false), $v );

	// modify modal value
	$args['modal'] = $args['modal'] ? 'modal' : '';
	
	// remove the # for hexcolor
	$args['text_color'] = str_replace( '#', '', $args['text_color'] );
	$args['background_color'] = str_replace( '#', '', $args['background_color'] );
	
	return 
	'<script data-selz-t="_selz-btn-top" data-selz-a="'.$args['modal'].'" data-selz-ct="'.$args['text_color'].'" data-selz-cb="'.$args['background_color'].'" data-selz-b="'.$args['link'].'">
		if (typeof _$elz === "undefined") { var _$elz = {}; }
		if (typeof _$elz.b === "undefined") {
			_$elz.b = { e: document.createElement("script") };
			_$elz.b.e.src = "https://selz.com/embed/button";
			document.body.appendChild(_$elz.b.e);
		}
	</script>';
}
?>