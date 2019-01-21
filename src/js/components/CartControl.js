const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { showCart } = attributes;

    return (
        <ToggleControl
            label={__('Show Cart')}
            help={__('Preview your shopping cart.')}
            checked={showCart}
            onChange={() => {
                setAttributes({ showCart: !showCart });
                document.body.classList.toggle('cart-visible');
            }}
        />
    );
};
