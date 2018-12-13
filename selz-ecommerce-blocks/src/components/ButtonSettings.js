const {
    CheckboxControl,
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
    SelectControl
} = wp.components;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { action, width, text, logos, automatic } = attributes;

    return (
        <InspectorControls key="inspector">
            <PanelBody title={__('Button Settings')}>
                <TextControl
                    label={__('Text')}
                    onChange={text => setAttributes({ text })}
                    value={text}
                />

                <SelectControl
                    label="Action"
                    value={action}
                    options={[
                        { label: 'Add to cart', value: 'add-to-cart' },
                        { label: 'Buy now', value: 'buy-now' },
                        { label: 'View', value: 'view' }
                    ]}
                    onChange={action => setAttributes({ action })}
                />

                <ToggleControl
                    label={__('Show payment logos')}
                    checked={logos}
                    onChange={() => setAttributes({ logos: !logos })}
                />
            </PanelBody>
            <PanelBody title={__('Width')}>
                <CheckboxControl
                    label={__('Automatic')}
                    checked={automatic}
                    onChange={() => setAttributes({ automatic: !automatic })}
                />

                {!automatic &&
                    <RangeControl
                        value={Number(width)}
                        onChange={width => setAttributes({ width: width.toString() })}
                        min={160}
                        max={1000}
                    />
                }
            </PanelBody>
        </InspectorControls>
    );
};
