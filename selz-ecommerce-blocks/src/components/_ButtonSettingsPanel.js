export default () => (
    <PanelBody title={__('Button Settings')} opened={false}>
        <TextControl
            label={__('Text')}
            onChange={text => setAttributes({ text })}
            value={text}
        />

        <SelectControl
            label={__('Action')}
            value={action}
            options={[
                { label: 'Add to cart', value: 'add-to-cart' },
                { label: 'Buy now', value: 'buy-now' },
                { label: 'View', value: 'view' }
            ]}
            onChange={action => setAttributes({ action })}
        />

        {action !== 'add-to-cart' &&
            <SelectControl
                label={__('Window type')}
                options={[
                    { label: 'Overlay', value: 'modal' },
                    { label: 'New tab', value: 'blank' }
                ]}
                onChange={() => setAttributes({ logos: !logos })}
            />
        }

        <ToggleControl
            label={__('Show payment logos')}
            checked={logos}
            onChange={() => setAttributes({ logos: !logos })}
        />
    </PanelBody>
);
