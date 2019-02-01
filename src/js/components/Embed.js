const { embed, env } = window[`${namespace}_globals`];
const { getBlockType } = wp.blocks;
const { Placeholder } = wp.components;
const { withDispatch } = wp.data;
const { BlockIcon } = wp.editor;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;

class Embed extends Component {
    constructor(props) {
        super(props);
        this.state = { didRender: false };
    }

    componentDidMount() {
        const { clientId, openGeneralSidebar } = this.props;

        // Style previews for embeds don't display properly without a re-render. We're able to force one here -- for
        // style previews only -- by checking for the `clientId` prop.
        if (!clientId) {
            this.forceUpdate();
        }

        // Open the sidebar so products can load
        openGeneralSidebar();
    }

    getEmbedProps() {
        const {
            action,
            buttonBackgroundColor,
            buttonTextColor,
            category,
            checkoutBackgroundColor,
            checkoutTextColor,
            description,
            linksColor,
            logos,
            modal,
            showCategories,
            showPagination,
            showSearch,
            squareImages,
            text,
            truncateTitles,
            width,
            url,
        } = this.props.attributes;

        const embedProps = {
            action,
            category,
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
            modal,
            showCategories,
            showPagination,
            showSearch,
            squareImages,
            style: this.getEmbedStyle(),
            text,
            truncateTitles,
            url,
            width,
        };

        if (env) {
            embedProps.env = env;
        }

        return JSON.stringify(embedProps);
    }

    getEmbedStyle() {
        const classes = this.props.className.split(' ');

        if (classes[1]) {
            return classes[1].replace('is-style-', '');
        }

        return 'price-right';
    }

    render() {
        if (!this.state.didRender) {
            this.setState({ didRender: true });
        }

        const {
            attributes: { text, type, url },
            clientId,
            isPreview,
            name,
        } = this.props;

        // Render a blank placeholder for style previews only
        if (!url && !clientId) {
            return <Placeholder />;
        }

        // Render a loading screen while we wait for `url` to be set
        if (!url) {
            const {
                icon: { src },
                title,
            } = getBlockType(name);

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
            <Fragment>
                <div data-embed={type} key={clientId && this.state.didRender ? embedProps : Math.random()}>
                    <script type="text/props">{embedProps}</script>
                </div>

                {!isPreview && (
                    <Fragment>
                        <script async src={embed} />
                        <noscript>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                {type === 'store' ? __('Shop now') : text}
                            </a>
                        </noscript>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default withDispatch(dispatch => ({
    openGeneralSidebar: () => dispatch('core/edit-post').openGeneralSidebar('edit-post/block'),
}))(Embed);
