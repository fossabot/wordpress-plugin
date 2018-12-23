const { Component } = wp.element;
const { Placeholder } = wp.components;

// TODO: Move these out as utils
const getStyle = className => {
    if (!className.split(' ')[1]) {
        return 'price-right';
    }
    return className.split(' ')[1].replace('is-style-', '');
};
const getProps = ({ attributes, className }) => {
    const {
        buttonBackgroundColor,
        buttonTextColor,
        checkoutBackgroundColor,
        checkoutTextColor,
        description,
        linksColor,
        logos,
        text,
        type,
        width,
        url,
    } = attributes;

    return {
        colors: {
            buttons: {
                background: buttonBackgroundColor,
                text: buttonTextColor,
            },
            checkout: {
                background: checkoutBackgroundColor,
                text: checkoutTextColor,
            },
            links: linksColor,
        },
        description,
        logos,
        style: getStyle(className),
        text,
        type,
        url,
        width,
    };
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
        const { attributes, className, clientId } = this.props;
        const { url } = attributes;
        const props = getProps({ attributes, className });
        const key = clientId ? JSON.stringify(props) : Math.random();

        if (!url && !clientId) {
            return (
                <Placeholder />
            );
        }

        // TODO: Make this not ugly
        if (!url) {
            return (
                <Placeholder icon="wordpress-alt" label="Selz Ecommerce">
                    Hold tight while we load your products…
                </Placeholder>
            );
        }

        // TODO: Better explain usage of `key`
        return (
            <div data-embed="embed" key={key}>
                <script type="text/props">
                    {JSON.stringify(props)}
                </script>
            </div>
        );
    }
}
