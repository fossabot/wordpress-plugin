import { debounce } from 'lodash';
import { actionOptions } from '../config';

const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class OptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.debouncedSetText = debounce(this.setText, 500);
    }

    handleActionChange(action) {
        const {
            attributes: { textWasSet },
            setAttributes,
        } = this.props;
        const attributes = { action };

        if (textWasSet === false) {
            const { label } = actionOptions.find(option => option.value === action);
            attributes._text = label;
            attributes.text = label;
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
        const {
            attributes: { _text, action, description, logos, modal, squareImages, type },
            setAttributes,
        } = this.props;

        return (
            <PanelBody title={__('Options')} initialOpen={type === 'store'}>
                <SelectControl
                    label={__('Action')}
                    value={action}
                    options={actionOptions}
                    onChange={action => this.handleActionChange(action)}
                />

                {action !== 'add-to-cart' && (
                    <SelectControl
                        label={__('Window Type')}
                        value={modal}
                        options={[{ label: __('Overlay'), value: true }, { label: __('New Tab'), value: false }]}
                        onChange={modal => setAttributes({ modal })}
                    />
                )}

                {type === 'store' && (
                    <ToggleControl
                        label={__('Square Images')}
                        checked={squareImages}
                        onChange={() => setAttributes({ squareImages: !squareImages })}
                    />
                )}

                {type !== 'store' && (
                    <TextControl label={__('Text')} value={_text} onChange={text => this.handleTextChange(text)} />
                )}

                {type === 'widget' && (
                    <ToggleControl
                        label={__('Show Description')}
                        checked={description}
                        onChange={() => setAttributes({ description: !description })}
                    />
                )}

                {type !== 'store' && (
                    <ToggleControl
                        label={__('Show Payment Logos')}
                        checked={logos}
                        onChange={() => setAttributes({ logos: !logos })}
                    />
                )}
            </PanelBody>
        );
    }
}
