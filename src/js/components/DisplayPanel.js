import CartControl from './CartControl';

const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { description, logos, type } = attributes;

    return (
        <PanelBody title={__('Display')} initialOpen={false}>
            {type === 'widget' && (
                <ToggleControl
                    label={__('Show Description')}
                    checked={description}
                    onChange={() => setAttributes({ description: !description })}
                />
            )}

            <ToggleControl
                label={__('Show Payment Logos')}
                checked={logos}
                onChange={() => setAttributes({ logos: !logos })}
            />
            <CartControl {...{ ...attributes, setAttributes }} />
        </PanelBody>
    );
};
