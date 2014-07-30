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

		// Merge the user-selected arguments with the defaults.
		$instance = wp_parse_args( (array) $instance, selz_default_args() );

		// Create default tab
		$tabs = array( 
			__( 'General', $this->textdomain ), 
			__( 'Information', $this->textdomain )
		);
		
		$types = array( 
			'button' 	=> __( 'button', $this->textdomain ),  
			'widget'	=> __( 'widget', $this->textdomain ),
			'store'		=> __( 'store', $this->textdomain ) // since 1.5.1
		);
		
		$interacts = array( 
			'modal' 	=> __( 'Overlay', $this->textdomain ),  
			'blank'		=> __( 'New tab', $this->textdomain )
		);		
		
		$themes = array( 
			'light'		=> __( 'light', $this->textdomain ),  
			'dark'		=> __( 'dark', $this->textdomain )
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
							<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Display type', $this->textdomain ); ?></label> 							
							<select onchange="selzShortcode.update();" id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>">
								<?php foreach ( $types as $k => $v ) { ?>
									<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['type'], $k ); ?>><?php echo esc_html( $v ); ?></option>
								<?php } ?>
							</select>
						</li>
						
						<?php if( ( 'store' == $instance['type'] ) ) : ?>
							<li>
								<label for="<?php echo $this->get_field_id( 'store_link' ); ?>"><?php _e( 'Selz store URL', $this->textdomain ); ?></label>
								<span class="description"><?php _e( 'This can be found at <a href="https://selz.com/shop/share" target="_blank">https://selz.com/shop/share</a>', $this->textdomain ); ?></span>
								<input placeholder="e.g. https://demo.selz.com"" type="url" class="widefat" id="<?php echo $this->get_field_id( 'store_link' ); ?>" name="<?php echo $this->get_field_name( 'store_link' ); ?>" value="<?php echo esc_attr( $instance['store_link'] ); ?>" />
							</li>
							
						<?php else : ?>						
							<li>
								<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Item link', $this->textdomain ); ?></label>
								<span class="description"><?php _e( 'The item selz link. Example: http://selz.co/14ufE5G', $this->textdomain ); ?></span>
								<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" value="<?php echo esc_attr( $instance['link'] ); ?>" />
							</li>
							<?php if( ( 'button' == $instance['type'] ) ) : ?>
								<li>
									<label for="<?php echo $this->get_field_id( 'position' ); ?>"><?php _e( 'Button style', $this->textdomain ); ?></label> 
									<span class="description"><?php _e( 'The button layout style.', $this->textdomain ); ?></span>
									<select id="<?php echo $this->get_field_id( 'position' ); ?>" name="<?php echo $this->get_field_name( 'position' ); ?>">
										<?php foreach ( $button_positions as $key => $val ) { ?>
											<option value="<?php echo $key; ?>" <?php selected( $instance['position'], $key ); ?>><?php echo $val; ?></option>
										<?php } ?>
									</select>
								</li>
							<?php else: ?>	
								<li>
									<label for="<?php echo $this->get_field_id( 'theme' ); ?>"><?php _e( 'Widget theme', $this->textdomain ); ?></label> 								
									<select id="<?php echo $this->get_field_id( 'theme' ); ?>" name="<?php echo $this->get_field_name( 'theme' ); ?>">
										<?php foreach ( $themes as $k => $v ) { ?>
											<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['theme'], $k ); ?>><?php echo esc_html( $v ); ?></option>
										<?php } ?>
									</select>
								</li>	
							<?php endif; ?>							
							<li>
								<label for="<?php echo $this->get_field_id( 'show_logos' ); ?>"><input type="checkbox" id="<?php echo $this->get_field_id( 'show_logos' ); ?>" name="<?php echo $this->get_field_name( 'show_logos' ); ?>" value="true"> <?php _e( 'Add payment logos', $this->textdomain ); ?></label> 		
								<span class="description"><?php _e( 'Show the Visa, MasterCard and Norton Secured logos underneath.', $this->textdomain ); ?></span>						
							</li>
							<li>
								<label for="<?php echo $this->get_field_id( 'interact' ); ?>"><?php _e( 'How buyers interact', $this->textdomain ); ?></label> 								
								<select id="<?php echo $this->get_field_id( 'interact' ); ?>" name="<?php echo $this->get_field_name( 'interact' ); ?>">
									<?php foreach ( $interacts as $k => $v ) { ?>
										<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $instance['interact'], $k ); ?>><?php echo esc_html( $v ); ?></option>
									<?php } ?>
								</select>
							</li>
						<?php endif; ?>
						<li>
							<label for="<?php echo $this->get_field_id( 'text_color' ); ?>"><?php _e( 'Button text color', $this->textdomain ); ?></label>
							<input class="color-picker" type="text" id="<?php echo $this->get_field_id( 'text_color' ); ?>" name="<?php echo $this->get_field_name( 'text_color' ); ?>" value="<?php echo esc_attr( $instance['text_color'] ); ?>">
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'background_color' ); ?>"><?php _e( 'Button background color', $this->textdomain ); ?></label>
							<input class="color-picker" type="text" id="<?php echo $this->get_field_id( 'background_color' ); ?>" name="<?php echo $this->get_field_name( 'background_color' ); ?>" value="<?php echo esc_attr( $instance['background_color'] ); ?>">
						</li>
						<li>
							<label for="<?php echo $this->get_field_id( 'link_color' ); ?>"><?php _e( 'Link color', $this->textdomain ); ?></label>
							<input class="color-picker" type="text" id="<?php echo $this->get_field_id( 'link_color' ); ?>" name="<?php echo $this->get_field_name( 'link_color' ); ?>" value="<?php echo esc_attr( $instance['link_color'] ); ?>">
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