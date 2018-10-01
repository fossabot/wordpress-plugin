<?php
/**
 * Shortcode admin form interface
 * @since 1.8.0
**/
class Selz_Form {

	// Setup class variables
	var $slug;
	var $version;
	var $url;
	var $textdomain;
	var $name;

	function __construct( $instance = array(), $number = null, $ids = array(), $names = array() ) {

		$this->slug = selz()->slug;
		$this->version = selz()->version;
		$this->lang = selz()->lang;
		$this->url = selz()->url;
		$this->name = selz()->name;

		// Merge the user-selected arguments with the defaults.
		$instance = wp_parse_args( (array) $instance, selz()->default_args() );

		$kind = array(
			'product' 	=> __( 'Product', $this->lang ),
			'store'		=> __( 'Store', $this->lang ),
		);

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

		// Only call the API once modal is opened
		if ( is_admin() && defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			// Only fetch store when necessary
			if ( $instance['kind'] == 'store' ) {
				$store = selz()->api->get_store();
			}
		}

		?>

		<fieldset>
			<legend class="sr-only"><?php echo $kind[$instance['kind']]; ?></legend>
			<?php include( selz()->dir . 'includes/fields-modal.php' ); ?>
		</fieldset>

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
