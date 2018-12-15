const { Component } = wp.element;
const { Placeholder } = wp.components;

// TODO: There's several UI settings that don't need to reload the embed, try
// to update UI manually

export default class Embed extends Component {
    constructor(props) {
        super(props);
    }

    getStyle() {
        const { className } = this.props;

        if (!className.split(' ')[1]) {
            return 'price-right';
        }

        return className.split(' ')[1].replace('is-style-', '');
    }

    render() {
        const { isLoading, action, logos, text, width, modal, url } = this.props.attributes;
        const props = {
            "type": "button",
            "action": action,
            "colors": {
                "buttons": {
                    "background": "#f9b642",
                    "text": "#ffffff"
                },
                "checkout": {
                    "background": "#f9b642",
                    "text": "#ffffff"
                }
            },
            "logos": logos,
            "url": url,
            "text": text,
            "style": this.getStyle(),
            "width": width,
            "modal": modal
        };

        if (isLoading) {
            return (
                <Placeholder icon="wordpress-alt" label="Selz eCommerce">
                    Hold tight while we load your products…
                </Placeholder>
            );
        }
        
        if (!url) {
            return (
                <Placeholder icon="wordpress-alt" label="Selz eCommerce">
                    Please select the product you'd like to sell…
                </Placeholder>
            );
        }

        // Give the container a key based on the props coming in, so that the embed
        // only ever updates when props change - sure fire!!!
        //
        // Note: This is due to only the inner node updating (in React).
        return (
            <div data-embed="embed" key={JSON.stringify(props)} style={{ textAlign: 'center' }}>
                <script type="text/props">
                    {JSON.stringify(props)}
                </script>
            </div>
        );
    }
}
