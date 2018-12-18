const { Component, Fragment } = wp.element;
const { PanelColorSettings } = wp.editor;
const { __ } = wp.i18n;

export default class ColorsPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { attributes: { color }, setAttributes } = this.props;

        return (
            <Fragment>
                <PanelColorSettings
                    title={__('Button Background')}
                    initialOpen={false}
                    colorSettings={[{
                        value: color,
                        onChange: color => setAttributes({ color }),
                        label: __('Button Background'),
                    }]}
                />
                <PanelColorSettings
                    title={__('Button Text')}
                    initialOpen={false}
                    colorSettings={[{
                        value: color,
                        onChange: color => setAttributes({ color }),
                        label: __('Button Text'),
                    }]}
                />
                <PanelColorSettings
                    title={__('Checkout Header')}
                    initialOpen={false}
                    colorSettings={[{
                        value: color,
                        onChange: color => setAttributes({ color }),
                        label: __('Checkout Header'),
                    }]}
                />
                <PanelColorSettings
                    title={__('Checkout Header Text')}
                    initialOpen={false}
                    colorSettings={[{
                        value: color,
                        onChange: color => setAttributes({ color }),
                        label: __('Checkout Header Text'),
                    }]}
                />
            </Fragment>
        );
    }
};
