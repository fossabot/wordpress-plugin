const { Component } = wp.element;
const { Placeholder } = wp.components;

// TODO: Move this out as util
const getStyle = className => {
    if (!className.split(' ')[1]) {
        return 'price-right';
    }
    return className.split(' ')[1].replace('is-style-', '');
};

export default class Embed extends Component {
    constructor(props) {
        super(props);
    }

    // Re-renders the style options
    componentDidMount() {
        if (!this.props.clientId) {
            this.forceUpdate();
        }
    }

    render() {
        const { btnBg, btnText, checkoutHeader, checkoutHeaderText, logos, text, width, url } = this.props.attributes;
        const props = {
            "type": "button",
            "colors": {
                "buttons": {
                    "background": btnBg,
                    "text": btnText,
                },
                "checkout": {
                    "background": checkoutHeader,
                    "text": checkoutHeaderText,
                },
            },
            "logos": logos,
            "url": url,
            "text": text,
            "style": getStyle(this.props.className),
            "width": width,
        };
        const key = this.props.clientId ? JSON.stringify(props) : Math.random();

        if (!url && !this.props.clientId) {
            return (
                <Placeholder />
            );
        }

        // TODO: Make this not ugly
        if (!url) {
            return (
                <Placeholder icon="wordpress-alt" label="Selz eCommerce">
                    Hold tight while we load your products…
                </Placeholder>
            );
        }

        // TODO: Better explain usage of `key`
        return (
            <div data-embed="embed" key={key} style={{ textAlign: 'center' }}>
                <script type="text/props">
                    {JSON.stringify(props)}
                </script>
            </div>
        );
    }
}
