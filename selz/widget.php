<?php
/*
    Selz Widget
	@since 0.0.1
    http://Selz.com
    License: GPL2

	Copyright 2013 selz.com (email: engineer@selz.com)
*/

class Selz_Widget extends WP_Widget {

	// Setup class variables
	var $slug;
	var $version;
	var $url;
	var $textdomain;
	var $name;

	/**
	 * Set up the widget's unique name, ID, class, description, and other options.
	 * @since 0.0.1
	 */
	function __construct() {

		$this->slug = 'selz';
		$this->version = SELZ_VERSION;
		$this->textdomain = SELZ_LANG;
		$this->url = SELZ_URL;
		$this->name = SELZ_NAME;

		// Set up the widget options
		$widget_options = array(
			'classname' => 'selz',
			'description' => esc_html__( 'Add Selz items to your sidebar', $this->textdomain )
		);

		// Set up the widget control options
		$control_options = array(
			//'width' => 430,
			//'height' => 350,
			'id_base' => $this->slug
		);

		// Create the widget
		parent::__construct( $this->slug, esc_attr__( 'Selz', $this->textdomain ), $widget_options, $control_options );

		// Load the widget stylesheet for the widgets admin screen
		add_action( 'load-widgets.php', array(&$this, 'load_widgets') );

		// Print the user costum style sheet and active widget styles/scripts
		if ( is_active_widget(false, false, $this->id_base, false ) ) {
			add_action( 'wp_head', array( &$this, 'print_script') );
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
		//add_action( 'wp_ajax_selz_widget_form', array( &$this, 'dialog_ajax' ) );

	}

	/**
	 * Push the widget stylesheet widget.css into widget admin page
	 * @since 0.0.1
	 */
	function load_widgets() {
		wp_enqueue_media();
	}

	/**
	 * Print the custom style and script
	 * @since 0.0.1
	 */
	function print_script() {
		$settings = $this->get_settings();
		foreach ( $settings as $key => $setting ){
			if ( ! empty( $setting['customstylescript'] ) )
				echo $setting['customstylescript'];
		}
	}

	/**
	 * Outputs the widget based on the arguments input through the widget controls.
	 * @since 0.0.1
	 */
	function widget( $args, $instance ) {
		extract( $args );

		// Set up the arguments for
		$instance = wp_parse_args( (array) $instance, selz_default_args() );

		
		// Output the theme's widget wrapper
		echo $before_widget;

		// If a title was input by the user, display it
		if ( ! empty( $instance['title'] ) )
			echo $before_title . $titleIcon . apply_filters( 'widget_title',  $instance['title'], $instance, $this->id_base ) . $after_title;

		// Print intro text if exist
		if ( ! empty( $instance['intro_text'] ) )
			echo '<p class="'. $this->id . '-intro-text intro-text">' . $instance['intro_text'] . '</p>';

		echo selz_button($instance);

		// Print outro text if exist
		if ( !empty( $instance['outro_text'] ) )
			echo '<p class="'. $this->id . '-outro-text outro-text">' . $instance['outro_text'] . '</p>';

		// Close the theme's widget wrapper
		echo $after_widget;
	}


	/**
	 * Updates the widget control options for the particular instance of the widget.
	 * @since 0.0.1
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		//update_option( 'test333', time() );
		// Set the instance to the new instance.
		$instance = $new_instance;

		$instance['title'] 				= strip_tags( $new_instance['title'] );
		$instance['interact']			= $new_instance['interact'];
		$instance['position']			= $new_instance['position'];
		$instance['link'] 				= $new_instance['link'];
		$instance['store_link'] 		= $new_instance['store_link'];
		$instance['action'] 			= $new_instance['action'];
		$instance['type'] 				= $new_instance['type'];
		$instance['button_text'] 		= $new_instance['button_text'];
		$instance['show_description'] 	= $new_instance['show_description'];
		$instance['width'] 				= $new_instance['width'];
		$instance['auto_width'] 		= $new_instance['auto_width'];
		$instance['text_color'] 		= $new_instance['text_color'];
		$instance['background_color'] 	= $new_instance['background_color'];
		$instance['chbg_color'] 		= $new_instance['chbg_color'];
		$instance['chtx_color'] 		= $new_instance['chtx_color'];
		$instance['show_logos'] 	    = $new_instance['show_logos'];
		$instance['tab_active'] 		= $new_instance['tab_active'];
		$instance['intro_text'] 		= $new_instance['intro_text'];
		$instance['outro_text'] 		= $new_instance['outro_text'];

		return $instance;
	}


	/**
	 * Displays the widget control options in the Widgets admin screen.
	 * @since 0.0.1
	 */
	function form( $instance ) {

		// Merge the user-selected arguments with the defaults.
		$instance = wp_parse_args( (array) $instance, selz_default_args() );

		// Drop down select options for type
		$types = array(
			'button' 	=> __( 'Button', $this->textdomain ),
			'widget'	=> __( 'Widget', $this->textdomain ),
			'store'		=> __( 'Store', $this->textdomain ) // since 1.5.1
		);

		$actions = array(
			'add-to-cart' 	=> __( 'Add To Cart', $this->textdomain ),
			'buy-now'		=> __( 'Buy Now', $this->textdomain ),
			'view'			=> __( 'View', $this->textdomain )
		);

		$interacts = array(
			'modal' 	=> __( 'Overlay', $this->textdomain ),
			'blank'		=> __( 'New tab', $this->textdomain )
		);

		$button_positions = array(
			'price-right' 	=> __( 'Price on right', $this->textdomain ),
			'price-left' 	=> __( 'Price on left', $this->textdomain ),
			'price-above'	=> __( 'Price above', $this->textdomain ),
			'price-below'	=> __( 'Price below', $this->textdomain )
		);

		$onchange = "wpWidgets.save(jQuery(this).closest('div.widget'),0,1,0);";

		include( SELZ_DIR . '/includes/widget-editor.php' );
	}

	function admin_enqueue_scripts($hook) {
		if( 'widgets.php' != $hook )
			return;

		wp_localize_script('selz', 'selzvars', array(
			'nonce'		=> wp_create_nonce('selz'),
			'action'	=> 'selz_widget_form'
		));
	}

	// function dialog_ajax() {

	// 	// Check the nonce and if not isset the id, just die.
	// 	$nonce = $_POST['nonce'];
	// 	if ( ! wp_verify_nonce( $nonce, 'selz' ) && ! isset( $_POST['data'] ) )
	// 		die();
		
	// 	// Set up the default form values and parse
	// 	parse_str( $_POST['data'], $instance );
	// 	//require_once( SELZ_DIR . 'dialog.php' );
	// 	$this->form( $instance );
	// 	//new Selz_Form( $instance );
	// 	exit;
	// }

}
?>
