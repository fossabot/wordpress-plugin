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

		$this->slug = 'selz';
		$this->version = SELZ_VERSION;
		$this->textdomain = SELZ_LANG;
		$this->url = SELZ_URL;
		$this->name = SELZ_NAME;

		// Merge the user-selected arguments with the defaults.
		$instance = wp_parse_args( (array) $instance, selz_default_args() );

		$kind = array(
			'product' 	=> __( 'Product', $this->textdomain ),
			'store'		=> __( 'store', $this->textdomain ),
		);

		$types = array(
			'button' 	=> __( 'Button', $this->textdomain ),
			'widget'	=> __( 'Widget', $this->textdomain ),
			'store'		=> __( 'Store', $this->textdomain ) // since 1.5.1
		);

		$actions = array(
			'add-to-cart' 	=> __( 'Add to cart', $this->textdomain ),
			'buy'			=> __( 'Buy now', $this->textdomain ),
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
		?>

		<fieldset>
			<legend class="sr-only">Widget Options</legend>
			<?php include( SELZ_DIR . 'includes/fields.php' ); ?>
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
