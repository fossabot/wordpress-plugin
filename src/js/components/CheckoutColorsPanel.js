const { ContrastChecker, PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { checkoutBackgroundColor, checkoutTextColor } = attributes;

    return (
        <PanelColorSettings
            title={__('Checkout Colors')}
            initialOpen={false}
            colorSettings={[
                {
                    value: checkoutBackgroundColor,
                    onChange: checkoutBackgroundColor => setAttributes({ checkoutBackgroundColor }),
                    label: __('Background Color'),
                },
                {
                    value: checkoutTextColor,
                    onChange: checkoutTextColor => setAttributes({ checkoutTextColor }),
                    label: __('Text Color'),
                },
            ]}
        >
            <ContrastChecker
                backgroundColor={checkoutBackgroundColor}
                textColor={checkoutTextColor}
            />
        </PanelColorSettings>
    );
};
