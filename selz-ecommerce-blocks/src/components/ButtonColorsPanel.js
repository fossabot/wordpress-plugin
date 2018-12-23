const { ContrastChecker, PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { buttonBackgroundColor, buttonTextColor } = attributes;

    return (
        <PanelColorSettings
            title={__('Button Colors')}
            initialOpen={false}
            colorSettings={[
                {
                    value: buttonBackgroundColor,
                    onChange: buttonBackgroundColor => setAttributes({ buttonBackgroundColor }),
                    label: __('Background Color'),
                },
                {
                    value: buttonTextColor,
                    onChange: buttonTextColor => setAttributes({ buttonTextColor }),
                    label: __('Text Color'),
                },
            ]}
        >
            <ContrastChecker
                backgroundColor={buttonBackgroundColor}
                textColor={buttonTextColor}
            />
        </PanelColorSettings>
    );
};
