const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { squareImages, truncateTitles } = attributes;

    return (
        <PanelBody title={__('Settings')} initialOpen={false}>
            <ToggleControl
                label={__('Square Images')}
                help={__('Product images in your embed will be cropped square.')}
                checked={squareImages}
                onChange={() => setAttributes({ squareImages: !squareImages })}
            />
            <ToggleControl
                label={__('Truncate Titles')}
                help={__('Truncate product titles to improve uniformity.')}
                checked={truncateTitles}
                onChange={() => setAttributes({ truncateTitles: !truncateTitles })}
            />
        </PanelBody>
    );
};
