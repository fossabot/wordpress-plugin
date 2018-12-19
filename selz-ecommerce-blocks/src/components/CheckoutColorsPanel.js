const { ContrastChecker, PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default props => (
    <PanelColorSettings
        title={'Checkout'}
        initialOpen={false}
        colorSettings={[
            {
                value: props.attributes.checkoutBg,
                onChange: color => props.setAttributes({ checkoutBg: color }),
                label: __('Header Background Color'),
            },
            {
                value: props.attributes.checkoutText,
                onChange: color => props.setAttributes({ checkoutText: color }),
                label: __('Header Text Color'),
            }
        ]}
    >
        <ContrastChecker
            {...{
                btnBg: props.attributes.checkoutBg,
                btnText: props.attributes.checkoutText,
                fallbackTextColor: 'blue',
                fallbackBackgroundColor: 'red',
            }}
        // fontSize={fontSize.size}
        />
    </PanelColorSettings>
);
