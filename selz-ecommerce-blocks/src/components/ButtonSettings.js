import ProductList from './ProductList';

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

export default class ButtonSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autoWidth: true,
            fluidWidth: false
        };
    }

    handleAutoWidth() {
        this.setState(({ autoWidth }) => ({ autoWidth: !autoWidth }));
    }

    handleFluidWidth() {
        this.setState(({ fluidWidth }) => ({ fluidWidth: !fluidWidth }));
    }

    render() {
        const { attributes, setAttributes } = this.props;
        const { action, width, text, logos, isLoading, products } = attributes;

        return (
            <InspectorControls key="inspector">
                <ProductList
                    isLoading={isLoading}
                    products={products}
                    attributes={attributes}
                    setAttributes={setAttributes}
                />

                <PanelBody title={__('Button Settings')} opened={false}>
                    <TextControl
                        label={__('Text')}
                        onChange={text => setAttributes({ text })}
                        value={text}
                    />

                    <SelectControl
                        label={__('Action')}
                        value={action}
                        options={[
                            { label: 'Add to cart', value: 'add-to-cart' },
                            { label: 'Buy now', value: 'buy-now' },
                            { label: 'View', value: 'view' }
                        ]}
                        onChange={action => setAttributes({ action })}
                    />

                    {action !== 'add-to-cart' &&
                        <SelectControl
                            label={__('Window type')}
                            options={[
                                { label: 'Overlay', value: 'modal' },
                                { label: 'New tab', value: 'blank' }
                            ]}
                            onChange={() => setAttributes({ logos: !logos })}
                        />
                    }

                    <ToggleControl
                        label={__('Show payment logos')}
                        checked={logos}
                        onChange={() => setAttributes({ logos: !logos })}
                    />
                </PanelBody>

                <PanelBody title={__('Width')}>
                    <CheckboxControl
                        label={__('Automatic')}
                        checked={this.state.autoWidth}
                        onChange={() => this.handleAutoWidth()}
                    />

                    {!this.state.autoWidth &&
                        <CheckboxControl
                            label={__('Fluid')}
                            checked={this.state.fluidWidth}
                            onChange={() => this.handleFluidWidth()}
                        />
                    }

                    {!this.state.fluidWidth &&
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
    }
};
