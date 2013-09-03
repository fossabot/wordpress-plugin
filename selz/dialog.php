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
			'interact'			=> 'modal',
			'position'			=> 'default',
			'link' 				=> '',
			'text_color' 		=> '#ffffff',
			'background_color' 	=> '#241d33',
			'tab_active'		=> array( 0 => true, 1 => false, 2 => false )
		);

		// Merge the user-selected arguments with the defaults.
		$instance = wp_parse_args( (array) $instance, $defaults );

		// Create default tab
		$tabs = array( 
			__( 'General', $this->textdomain ), 
			__( 'Information', $this->textdomain )
		);
		
		$interacts = array( 
			'modal' 	=> __( 'Overlay', $this->textdomain ),  
			'blank'		=> __( 'New tab', $this->textdomain )
		);		
		
		$button_positions = array( 
			'default' 	=> __( 'price on right', $this->textdomain ),  
			'above'		=> __( 'price above', $this->textdomain )
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
							<span class="description"><?php _e( 'The item selz link. Example: http://selz.co/14ufE5G', $this->textdomain ); ?></span>
							<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" value="<?php echo esc_attr( $instance['link'] ); ?>" />
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Position', $this->textdomain ); ?></label> 
							<span class="description"><?php _e( 'The button position.', $this->textdomain ); ?></span>
							<select id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>">
								<?php foreach ( $button_positions as $key => $val ) { ?>
									<option value="<?php echo $key; ?>" <?php selected( $instance['position'], $key ); ?>><?php echo $val; ?></option>
								<?php } ?>
							</select>
						</li>						
						<li>
							<label for="<?php echo $this->get_field_id( 'interact' ); ?>"><?php _e( 'Buyers Interact', $this->textdomain ); ?></label> 								
							<select id="<?php echo $this->get_field_id( 'interact' ); ?>" name="<?php echo $this->get_field_name( 'interact' ); ?>">
								<?php foreach ( $interacts as $k => $v ) { ?>
									<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['interact'], $k ); ?>><?php echo esc_html( $v ); ?></option>
								<?php } ?>
							</select>
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