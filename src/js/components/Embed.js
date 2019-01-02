const { getBlockType } = wp.blocks;
const { Placeholder } = wp.components;
const { BlockIcon } = wp.editor;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class Embed extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Style previews for embeds don't display properly without a re-render. We're able to force one here -- for
        // style previews only -- by checking for the `clientId` prop.
        if (!this.props.clientId) {
            this.forceUpdate();
        }
    }

    getEmbedProps() {
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
        } = this.props.attributes;

        return JSON.stringify({
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
            style: this.getEmbedStyle(),
            text,
            type,
            url,
            width,
        });
    }

    getEmbedStyle() {
        const classes = this.props.className.split(' ');

        if (classes[1]) {
            return classes[1].replace('is-style-', '');
        }

        return 'price-right';
    }

    render() {
        const { attributes: { url }, clientId } = this.props;

        // Render a blank placeholder for style previews only
        if (!url && !clientId) {
            return (
                <Placeholder />
            );
        }

        // Render a loading screen while we wait for `url` to be set
        if (!url) {
            const { icon: { src }, title } = getBlockType(this.props.name);

            return (
                <Placeholder icon={<BlockIcon icon={src} />} label={title}>
                    {__('Hold tight while we load your products …')}
                </Placeholder>
            );
        }

        const embedProps = this.getEmbedProps();

        // Embeds normally update when props change using the MutationObserver, but because React, we trigger the
        // update by setting the `key` attribute. This ensures the parent node is updated rather than just the child.
        // For style previews, we trigger an update for each render by supplying a random number. Otherwise, we only
        // trigger an update per prop change -- we do this by supplying the stringified props instead.
        return (
            <div data-embed="embed" key={clientId ? embedProps : Math.random()}>
                <script type="text/props">
                    {embedProps}
                </script>
            </div>
        );
    }
}