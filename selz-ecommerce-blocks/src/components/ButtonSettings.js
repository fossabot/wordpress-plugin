const { PanelBody, TextControl, ToggleControl, SelectControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes, ...rest }) => {
    return (
        <InspectorControls key="inspector">
            <PanelBody title={__('Button Settings')}>
                <SelectControl
                    label="Action"
                    value={attributes.action}
                    options={[
                        { label: 'Add to cart', value: 'addToCart' },
                        { label: 'Buy now', value: 'buyNow' },
                        { label: 'View', value: 'view' }
                    ]}
                    onChange={value => setAttributes({ action: value })}
                />

                <TextControl
                    label={__('Text')}
                    onChange={value => setAttributes({ text: value })}
                    value={attributes.text}
                />

                <ToggleControl
                    label={__('Show payment logos')}
                    checked={attributes.logos}
                    onChange={() => setAttributes({ logos: !attributes.logos })}
                />
            </PanelBody>
        </InspectorControls>
    );
};
