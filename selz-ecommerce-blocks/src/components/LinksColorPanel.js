const { PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { linksColor } = attributes;

    return (
        <PanelColorSettings
            title={__('Links Color')}
            initialOpen={false}
            colorSettings={[
                {
                    value: linksColor,
                    onChange: linksColor => setAttributes({ linksColor }),
                    label: __('Color'),
                },
            ]}
        />
    );
};
