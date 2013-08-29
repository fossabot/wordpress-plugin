<?php
/*
    Selz Widget
	@since 0.0.1
    http://Selz.com
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
			'description' => esc_html__( 'Integrate your Selz in a sidebar.', $this->textdomain )
		);

		// Set up the widget control options
		$control_options = array(
			'width' => 430,
			'height' => 350,
			'id_base' => $this->slug
		);

		// Create the widget
		$this->WP_Widget( $this->slug, esc_attr__( 'Selz', $this->textdomain ), $widget_options, $control_options );
		
		// Load the widget stylesheet for the widgets admin screen
		add_action( 'load-widgets.php', array(&$this, 'load_widgets') );
		
		// Print the user costum style sheet and active widget styles/scripts
		if ( is_active_widget(false, false, $this->id_base, false ) ) {
			add_action( 'wp_head', array( &$this, 'print_script') );
		}
	}

	
	/**
	 * Push the widget stylesheet widget.css into widget admin page
	 * @since 0.0.1
	 */
	function load_widgets() { 	
		wp_enqueue_media();
		wp_enqueue_style( 'total-dialog' );
		wp_enqueue_script( 'total-dialog' );
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

		// Set up the arguments for wp_list_categories()
		$args = array(
			'title'					=> $instance['title'],
			'modal' 				=> ! empty( $instance['modal'] ) ? true : false,
			'link' 					=> $instance['link'],
			'text_color' 			=> $instance['text_color'],
			'background_color' 		=> $instance['background_color'],
			'tab_active'			=> $instance['tab_active'],
			'intro_text' 			=> $instance['intro_text'],
			'outro_text' 			=> $instance['outro_text'],
			'customstylescript'		=> $instance['customstylescript']
		);

		// Output the theme's widget wrapper
		echo $before_widget;
		
		// If a title was input by the user, display it.
		if ( !empty( $instance['title_icon'] ) )
			$titleIcon = '<img class="titleIcon" alt="" src="' . $instance['title_icon'] . '" />';
		else
			$titleIcon = '';		

		// If a title was input by the user, display it
		if ( !empty( $instance['title'] ) )
			echo $before_title . $titleIcon . apply_filters( 'widget_title',  $instance['title'], $instance, $this->id_base ) . $after_title;

		// Print intro text if exist
		if ( !empty( $instance['intro_text'] ) )
			echo '<p class="'. $this->id . '-intro-text intro-text">' . $instance['intro_text'] . '</p>';
			
		echo '<p>' . selz_button($instance) . '</p>';
		
		// Print outro text if exist
		if ( !empty( $instance['outro_text'] ) )
			echo '<p class="'. $this->id . '-outro-text outro_text">' . $instance['outro_text'] . '</p>';

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
		$instance['modal'] 				= ( isset( $new_instance['modal'] ) ? 1 : 0 );
		$instance['link'] 				= $new_instance['link'];
		$instance['text_color'] 		= $new_instance['text_color'];
		$instance['background_color'] 	= $new_instance['background_color'];
		$instance['tab_active'] 		= $new_instance['tab_active'];
		$instance['intro_text'] 		= $new_instance['intro_text'];
		$instance['outro_text'] 		= $new_instance['outro_text'];
		$instance['customstylescript']	= $new_instance['customstylescript'];
		
		return $instance;
	}

	
	/**
	 * Displays the widget control options in the Widgets admin screen.
	 * @since 0.0.1
	 */
	function form( $instance ) {
		// Set up the default form values
		$defaults = array(
			'title'				=> esc_attr__( 'Selz Widget', $this->textdomain ),
			'link'				=> '',
			'modal' 			=> false,
			'text_color' 		=> '#ffffff',
			'background_color' 	=> '#241d33',
			'tab_active'		=> array( 0 => true, 1 => false, 2 => false ),
			'intro_text' 		=> '',
			'outro_text' 		=> '',
			'customstylescript'	=> ''
		);

		// Merge the user-selected arguments with the defaults.
		$instance = wp_parse_args( (array) $instance, $defaults );

		// Create default tab
		$tabs = array( 
			__( 'General', $this->textdomain ),  
			__( 'Advanced', $this->textdomain ),
			__( 'Information', $this->textdomain )
		);
		?>

		<div class="pluginName"><?php echo $this->name; ?><span class="pluginVersion"><?php echo $this->version; ?></span></div>
		<div id="tcp-<?php echo $this->id ; ?>" class="total-options tabbable tabs-left">
			<ul class="nav nav-tabs">
				<?php foreach ($tabs as $key => $tab ) : ?>
					<li class="<?php echo $instance['tab_active'][$key] ? 'active' : '' ; ?>"><?php echo $tab; ?><input type="hidden" name="<?php echo $this->get_field_name( 'tab_active' ); ?>[]" value="<?php echo $instance['tab_active'][$key]; ?>" /></li>
				<?php endforeach; ?>							
			</ul>
			
			<ul class="tab-content">
				<li class="tab-pane <?php if ( $instance['tab_active'][0] ) : ?>active<?php endif; ?>">
					<ul>
						<li>
							<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', $this->textdomain ); ?></label>
							<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Item Link', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'The item selz link. Example: http://selz.co/14ufE5G', $this->textdomain ); ?></span>
							<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" value="<?php echo esc_attr( $instance['link'] ); ?>" />
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'modal' ); ?>">
							<input class="checkbox" type="checkbox" <?php checked( $instance['modal'], true ); ?> id="<?php echo $this->get_field_id( 'modal' ); ?>" name="<?php echo $this->get_field_name( 'modal' ); ?>" /><?php _e( 'Modal', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'Use overlay modal popup.', $this->textdomain ); ?></span>
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Text Color', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'Button text color.', $this->textdomain ); ?></span>
							<input class="color-picker" type="text" id="<?php echo $this->get_field_id( 'text_color' ); ?>" name="<?php echo $this->get_field_name( 'text_color' ); ?>" value="<?php echo esc_attr( $instance['text_color'] ); ?>">
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'background_color' ); ?>"><?php _e( 'Background Color', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'Button background color.', $this->textdomain ); ?></span>
							<input class="color-picker" type="text" id="<?php echo $this->get_field_id( 'background_color' ); ?>" name="<?php echo $this->get_field_name( 'background_color' ); ?>" value="<?php echo esc_attr( $instance['background_color'] ); ?>">
						</li>
					</ul>
				</li>
				<li class="tab-pane <?php if ( $instance['tab_active'][1] ) : ?>active<?php endif; ?>">
					<ul>
						<li>
							<label for="<?php echo $this->get_field_id('intro_text'); ?>"><?php _e( 'Intro Text', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'This option will display addtional text before the widget content and HTML supports.', $this->textdomain ); ?></span>
							<textarea name="<?php echo $this->get_field_name( 'intro_text' ); ?>" id="<?php echo $this->get_field_id( 'intro_text' ); ?>" rows="2" class="widefat"><?php echo esc_textarea($instance['intro_text']); ?></textarea>
						</li>
						<li>
							<label for="<?php echo $this->get_field_id('outro_text'); ?>"><?php _e( 'Outro Text', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'This option will display addtional text after widget and HTML supports.', $this->textdomain ); ?></span>
							<textarea name="<?php echo $this->get_field_name( 'outro_text' ); ?>" id="<?php echo $this->get_field_id( 'outro_text' ); ?>" rows="2" class="widefat"><?php echo esc_textarea($instance['outro_text']); ?></textarea>
							
						</li>				
						<li>
							<label for="<?php echo $this->get_field_id('customstylescript'); ?>"><?php _e( 'Custom Script & Stylesheet', $this->textdomain ) ; ?></label>
							<span class="description"><?php _e( 'Use this box for additional widget CSS style of custom javascript. Current widget selector: ', $this->textdomain ); ?><?php echo '<tt>#' . $this->id . '</tt>'; ?></span>
							<textarea name="<?php echo $this->get_field_name( 'customstylescript' ); ?>" id="<?php echo $this->get_field_id( 'customstylescript' ); ?>" rows="3" class="widefat code"><?php echo htmlentities($instance['customstylescript']); ?></textarea>
						</li>
					</ul>
				</li>
				<li class="tab-pane <?php if ( $instance['tab_active'][2] ) : ?>active<?php endif; ?>">
					<ul>
						<li>
							<h3>About Selz</h3>
							<p>Seriously Simple Selling</p>	
							<p>Selz allows you to sell products or digital downloads easily from your blog, website or social networks.</p>
							
							<ul>
								<li>No merchant account needed</li>
								<li>No integration or programming</li>
								<li>Free setup. No contracts</li>
								<li>A simple FREE online store.</li>
							</ul>
							
							<p>Build a business with your audience. Selz is ideal for startups, entrepreneurs, small businesses, bloggers or individuals who want to sell their digital or physical products.</p>
							<p>Find out more at <a target="_blank" href="http://selz.com">selz.com</a></p>							
						</li>
					</ul>
				</li>
			</ul>
		</div>
	<?php
	}
}
?>