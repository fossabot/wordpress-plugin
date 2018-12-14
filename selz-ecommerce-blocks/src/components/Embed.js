const { Component } = wp.element;

export default class Embed extends Component {
    constructor(props) {
        super(...arguments);
    }

    // Not sure why, but our embed won't render without an update here
    componentDidMount() {
        this.forceUpdate();
    }

    getStyle() {
        const { className } = this.props;

        if (!className.split(' ')[1]) {
            return 'price-right';
        }

        return this.props.className.split(' ')[1].replace('is-style-', '');
    }

    render() {
        const { action, logos, text, width, modal } = this.props.attributes;
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
            "url": "http://selz.co/1rvb96h",
            "text": text,
            "style": this.getStyle(),
            "width": width,
            "modal": modal
        };

        // Force update of entire component by setting random number on key attribute
        return (
            <div data-embed="embed" key={Math.random()}>
                <script type="text/props">
                    {JSON.stringify(props)}
                </script>
            </div>
        );
    }
}
