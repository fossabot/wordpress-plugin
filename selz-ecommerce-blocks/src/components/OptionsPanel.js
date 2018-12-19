import { debounce } from 'lodash';

const { Component } = wp.element;
const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default class OptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.debouncedSetText = debounce(this.setText, 500);
    }

    handleActionChange(action) {
        const { attributes: { textWasSet }, setAttributes } = this.props;
        const attributes = { action };

        if (!textWasSet) {
            attributes._text = action;
            attributes.text = action;
        }

        setAttributes(attributes);
    }

    handleTextChange(text) {
        this.props.setAttributes({ _text: text, textWasSet: true });
        this.debouncedSetText(text);
    }

    setText(text) {
        this.props.setAttributes({ text });
    }

    render() {
        const { attributes: { _text, action, description, logos, modal, type }, setAttributes } = this.props;

        return (
            <PanelBody title={__('Options')} initialOpen={false}>
                <SelectControl
                    label={__('Action')}
                    value={action}
                    options={[
                        { label: 'Add to Cart', value: 'add-to-cart' },
                        { label: 'Buy Now', value: 'buy-now' },
                        { label: 'View', value: 'view' },
                    ]}
                    onChange={action => this.handleActionChange(action)}
                />

                {action !== 'add-to-cart' && (
                    <SelectControl
                        label={__('Window Type')}
                        value={modal}
                        options={[
                            { label: 'Overlay', value: true },
                            { label: 'New Tab', value: false },
                        ]}
                        onChange={modal => setAttributes({ modal })}
                    />
                )}

                <TextControl
                    label={__('Text')}
                    value={_text}
                    onChange={text => this.handleTextChange(text)}
                />

                {type === 'widget' && (
                    <ToggleControl
                        label={__('Show Description')}
                        checked={description}
                        onChange={() => setAttributes({ description: !description })}
                    />
                )}

                <ToggleControl
                    label={__('Show Payment Logos')}
                    checked={logos}
                    onChange={() => setAttributes({ logos: !logos })}
                />
            </PanelBody>
        );
    }
};
