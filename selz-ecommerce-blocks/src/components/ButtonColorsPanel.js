const { ContrastChecker, PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default props => (
    <PanelColorSettings
        title={'Color Settings'}
        initialOpen={false}
        colorSettings={[
            {
                value: props.attributes.btnBg,
                onChange: color => props.setAttributes({ btnBg: color }),
                label: __('Background Color'),
            },
            {
                value: props.attributes.btnText,
                onChange: color => props.setAttributes({ btnText: color }),
                label: __('Text Color'),
            }
        ]}
    >
        <ContrastChecker
            {...{
                btnBg: props.attributes.btnBg,
                btnText: props.attributes.btnText,
                fallbackTextColor: 'blue',
                fallbackBackgroundColor: 'red',
            }}
            // fontSize={fontSize.size}
        />
    </PanelColorSettings>
);
