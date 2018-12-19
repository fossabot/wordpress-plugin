const { ContrastChecker, PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { btnBg, btnText } = attributes;

    return (
        <PanelColorSettings
            title={__('Button Colors')}
            initialOpen={false}
            colorSettings={[
                {
                    value: btnBg,
                    onChange: btnBg => setAttributes({ btnBg }),
                    label: __('Background Color'),
                },
                {
                    value: btnText,
                    onChange: btnText => setAttributes({ btnText }),
                    label: __('Text Color'),
                }
            ]}
        >
            <ContrastChecker
                backgroundColor={btnBg}
                textColor={btnText}
            />
        </PanelColorSettings>
    );
};
