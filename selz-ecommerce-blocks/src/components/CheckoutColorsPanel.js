const { ContrastChecker, PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { checkoutHeader, checkoutHeaderText } = attributes;

    return (
        <PanelColorSettings
            title={__('Checkout Colors')}
            initialOpen={false}
            colorSettings={[
                {
                    value: checkoutHeader,
                    onChange: checkoutHeader => setAttributes({ checkoutHeader }),
                    label: __('Background Color'),
                },
                {
                    value: checkoutHeaderText,
                    onChange: checkoutHeaderText => setAttributes({ checkoutHeaderText }),
                    label: __('Text Color'),
                }
            ]}
        >
            <ContrastChecker
                backgroundColor={checkoutHeader}
                textColor={checkoutHeaderText}
            />
        </PanelColorSettings>
    );
};
