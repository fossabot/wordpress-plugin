<?php
/**
 * Selz Widget
 * @since 0.0.1
 * License: GPL2
**/

class Selz_Widget extends WP_Widget {
	// Setup class variables
	var $slug;
	var $version;
	var $url;
	var $lang;
	var $name;

	/**
	 * Set up the widget's unique name, ID, class, description, and other options.
	 * @since 0.0.1
	 */
	function __construct() {

		$this->slug = selz()->slug;
		$this->version = selz()->version;
		$this->lang = selz()->lang;
		$this->url = selz()->url;
		$this->name = selz()->name;

		// Set up the widget options
		$widget_options = array(
			'classname' => $this->slug,
			'description' => sprintf( esc_html__( 'Add %s items to your sidebar', $this->lang ), $this->name )
		);

		// Set up the widget control options
		$control_options = array(
			'id_base' => $this->slug
		);

		// Create the widget
		parent::__construct( $this->slug, esc_attr__( $this->name, $this->lang ), $widget_options, $control_options );

		// Load the widget stylesheet for the widgets admin screen
		add_action( 'load-widgets.php', array(&$this, 'load_widgets') );

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
	}

	/**
	 * Push the widget stylesheet widget.css into widget admin page
	 * @since 0.0.1
	 */
	function load_widgets() {
		wp_enqueue_media();
	}

	/**
	 * Outputs the widget based on the arguments input through the widget controls.
	 * @since 0.0.1
	 */
	function widget( $args, $instance ) {
		extract( $args );

		// Set up the arguments for
		$instance = wp_parse_args( (array) $instance, selz()->default_args() );

		// Output the theme's widget wrapper
		echo $before_widget;

		// If a title was input by the user, display it
		if ( ! empty( $instance['title'] ) )
			echo $before_title . $titleIcon . apply_filters( 'widget_title',  $instance['title'], $instance, $this->id_base ) . $after_title;

		// Print intro text if exist
		if ( ! empty( $instance['intro_text'] ) )
			echo '<p class="'. $this->id . '-intro-text intro-text">' . $instance['intro_text'] . '</p>';

		echo selz()->embed($instance);

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
		//$instance['width'] 				= $new_instance['width'];
		$instance['auto_width'] 		= 'true';
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
		$instance = wp_parse_args( (array) $instance, selz()->default_args() );

		// Drop down select options for type
		$types = array(
			'button' 	=> __( 'Button', $this->lang ),
			'widget'	=> __( 'Widget', $this->lang ),
			'store'		=> __( 'Store', $this->lang ) // since 1.5.1
		);

		$actions = array(
			'add-to-cart' 	=> __( 'Add to cart', $this->lang ),
			'buy'			=> __( 'Buy now', $this->lang ),
			'view'			=> __( 'View', $this->lang )
		);

		$interacts = array(
			'modal' 	=> __( 'Overlay', $this->lang ),
			'blank'		=> __( 'New tab', $this->lang )
		);

		$button_styles = array(
			'price-right' 	=> __( 'Price on right', $this->lang ),
			'price-left' 	=> __( 'Price on left', $this->lang ),
			'price-above'	=> __( 'Price above', $this->lang ),
			'price-below'	=> __( 'Price below', $this->lang )
		);

		$onchange = "wpWidgets.save(jQuery(this).closest('div.widget'),0,1,0);";

		$store = selz()->api->get_store();

		include( selz()->dir . '/includes/fields-widget.php' );
	}

	function admin_enqueue_scripts($hook) {
		if( 'widgets.php' != $hook )
			return;

		wp_localize_script( $this->slug . '-main', $this->slug . '_main_globals', array(
			'nonce'		=> wp_create_nonce( $this->slug ),
			'action'	=> $this->slug . '_widget_form',
			'resources' => selz()->resources(),
		));
	}

}