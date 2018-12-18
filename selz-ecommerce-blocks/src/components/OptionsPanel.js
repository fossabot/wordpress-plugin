const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { action, logos, text } = attributes;

    return (
        <PanelBody title={__('Options')} initialOpen={false}>
            <TextControl
                label={__('Text')}
                value={text}
                onChange={text => setAttributes({ text })}
            />
            <SelectControl
                label={__('Action')}
                value={action}
                options={[
                    { label: 'Add to cart', value: 'add-to-cart' },
                    { label: 'Buy now', value: 'buy-now' },
                    { label: 'View', value: 'view' },
                ]}
                onChange={action => setAttributes({ action })}
            />

            {action !== 'add-to-cart' && (
                <SelectControl
                    label={__('Window type')}
                    options={[
                        { label: 'Overlay', value: 'modal' },
                        { label: 'New tab', value: 'blank' },
                    ]}
                    onChange={() => setAttributes({ logos: !logos })}
                />
            )}

            <ToggleControl
                label={__('Show payment logos')}
                checked={logos}
                onChange={() => setAttributes({ logos: !logos })}
            />
        </PanelBody>
    );
};
