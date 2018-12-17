export default class Width extends Component {
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
        return (
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
        );
    }
}
