<?php
/**
 * Shortcode admin form interface
 * @since 2.0.3
**/	
class Selz_Form {

	// Setup class variables
	var $slug;
	var $version;
	var $url;
	var $textdomain;
	var $name;	
	
	function __construct( $instance = array(), $number = null, $ids = array(), $names = array() ) {

		$this->slug = 'selz';
		$this->version = SELZ_VERSION;
		$this->textdomain = SELZ_LANG;
		$this->url = SELZ_URL;
		$this->name = SELZ_NAME;

		// Set up the default form values
		$defaults = array(
			'modal' 			=> false,
			'link' 				=> '',
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
		<div id="selz-<?php echo $this->id ; ?>" class="total-options tabbable tabs-left">
			<ul class="nav nav-tabs">
				<?php foreach ($tabs as $key => $tab ) : ?>
					<li class="<?php echo $instance['tab_active'][$key] ? 'active' : '' ; ?>"><?php echo $tab; ?><input type="hidden" name="<?php echo $this->get_field_name( 'tab_active' ); ?>[]" value="<?php echo $instance['tab_active'][$key]; ?>" /></li>
				<?php endforeach; ?>							
			</ul>
			
			<ul class="tab-content">
				<li class="tab-pane <?php if ( $instance['tab_active'][0] ) : ?>active<?php endif; ?>">
					<ul>
						<li>
							<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Item Link', $this->textdomain ); ?></label>
							<span class="description"><?php _e( 'The item selz link.', $this->textdomain ); ?></span>
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
	
	
	function get_field_id( $id ) {
		return isset( $this->ids[$id] ) ? $this->ids[$id] : $id;
	}
	
	
	function get_field_name( $name ) {
		return isset( $this->names[$name] ) ? $this->names[$name] : $name;
	}
}
?>	