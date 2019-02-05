import { debounce } from 'lodash';
import { actionOptions } from '../config';

const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class BehaviorPanel extends Component {
    constructor(props) {
        super(props);
        this.debouncedSetText = debounce(this.setText, 500);
    }

    getActionText(action) {
        const { label, text } = actionOptions.find(({ value }) => value === action);
        return text || label;
    }

    handleActionChange(action) {
        const {
            attributes: { textWasSet, useDefaultText },
            setAttributes,
        } = this.props;
        const text = this.getActionText(action);
        const attributes = { action };

        if (textWasSet === false) {
            attributes._text = text;
        }

        if (textWasSet === false || useDefaultText) {
            attributes.text = text;
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
            attributes: { _text, action, modal, useDefaultText },
            setAttributes,
        } = this.props;

        return (
            <PanelBody title={__('Behavior')} initialOpen={false}>
                <SelectControl
                    label={__('Action')}
                    value={action}
                    options={actionOptions}
                    onChange={action => this.handleActionChange(action)}
                />
                <SelectControl
                    label={__('Window Type')}
                    value={modal}
                    options={[{ label: __('Overlay'), value: true }, { label: __('New Tab'), value: false }]}
                    onChange={modal => setAttributes({ modal: modal === 'true' })}
                />
                <TextControl
                    label={__('Text')}
                    value={_text}
                    onChange={text => this.handleTextChange(text)}
                    disabled={useDefaultText}
                />
                <ToggleControl
                    label={__('Use Default Text')}
                    checked={useDefaultText}
                    onChange={() =>
                        setAttributes({
                            useDefaultText: !useDefaultText,
                            text: useDefaultText ? _text : this.getActionText(action),
                        })
                    }
                />
            </PanelBody>
        );
    }
}
