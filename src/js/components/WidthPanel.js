import { debounce } from 'lodash';

const { PanelBody, RangeControl, ToggleControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class Width extends Component {
    constructor(props) {
        super(props);
        this.debouncedSetWidth = debounce(this.setWidth, 200);
    }

    handleWidthChange(width) {
        this.props.setAttributes({ _width: width });
        this.debouncedSetWidth(width);
    }

    setWidth(width) {
        this.props.setAttributes({ width });
    }

    render() {
        const {
            attributes: { _width, autoWidth, fluidWidth, type },
            setAttributes,
        } = this.props;

        return (
            <PanelBody title={__('Width')} initialOpen={false}>
                {type === 'button' && (
                    <ToggleControl
                        label={__('Automatic')}
                        checked={autoWidth}
                        onChange={() =>
                            setAttributes({
                                autoWidth: !autoWidth,
                                width: autoWidth ? _width : null,
                            })
                        }
                    />
                )}

                {!autoWidth && (
                    <ToggleControl
                        label={__('Fluid (100%)')}
                        checked={fluidWidth}
                        onChange={() =>
                            setAttributes({
                                fluidWidth: !fluidWidth,
                                width: fluidWidth ? _width : '100%',
                            })
                        }
                    />
                )}

                {!autoWidth && !fluidWidth && (
                    <RangeControl
                        value={_width}
                        onChange={width => this.handleWidthChange(width)}
                        min={160}
                        max={1000}
                        step={5}
                    />
                )}
            </PanelBody>
        );
    }
}
