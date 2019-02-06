import { debounce } from 'lodash';
import ProductList from './ProductList';

const { PanelBody, TextControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class ProductPanel extends Component {
    constructor(props) {
        super(props);
        this.debouncedSearchProducts = debounce(this.searchProducts, 500);
    }

    componentDidMount() {
        this.fetchProducts(this.props.attributes.currentPage);
    }

    componentWillUnmount() {
        this.debouncedSearchProducts.cancel();
    }

    fetchProducts(pageNumber = 1) {
        const {
            attributes: { pages, url },
            setAttributes,
        } = this.props;
        const request = this.getRequest(pageNumber);

        setAttributes({ request });
        fetch(request.url)
            .then(res => res.json())
            .then(
                // eslint-disable-next-line camelcase
                ({ data, has_more }) => {
                    // Only re-render for the most recent request
                    if (this.props.attributes.request.timestamp !== request.timestamp) {
                        return;
                    }

                    /**
                     * Filter out products without a short URL. Short URLs are required when embedding products.
                     * @see https://developer.selz.com/embeds#props
                     */
                    // eslint-disable-next-line camelcase
                    const products = data.filter(({ short_url }) => short_url);

                    const attributes = {
                        isLoading: false,
                        products,
                        hasMore: has_more,
                    };

                    if (products && products.length) {
                        attributes.url = url || products[0].short_url;
                        attributes.pages = {
                            ...pages,
                            [pageNumber]: {
                                number: pageNumber,
                                start: products[0].id,
                                end: products[products.length - 1].id,
                            },
                        };
                        attributes.currentPage = pageNumber;
                    }

                    setAttributes(attributes);
                },
                error =>
                    setAttributes({
                        isLoading: false,
                        error,
                    }),
            );
    }

    getRequest(pageNumber) {
        const { pages, query } = this.props.attributes;
        const data = {
            action: `${namespace}_${query ? 'search' : 'get'}_products`,
            starting_after: pageNumber !== 1 ? pages[pageNumber - 1].end : null,
            page: pageNumber,
            q: query,
        };

        return {
            data,
            url: this.getUrl(data),
            timestamp: Date.now(),
        };
    }

    getUrl(data) {
        const { ajaxurl } = window;
        const url = Object.keys(data).reduce(
            (url, param) => (data[param] ? `${url}${url === ajaxurl ? '?' : '&'}${param}=${data[param]}` : url),
            ajaxurl,
        );

        return url;
    }

    handleQueryChange(query) {
        this.props.setAttributes({ query, error: null });
        this.debouncedSearchProducts();
    }

    next() {
        this.searchProducts(this.props.attributes.currentPage + 1);
    }

    previous() {
        this.searchProducts(this.props.attributes.currentPage - 1);
    }

    searchProducts(pageNumber) {
        this.props.setAttributes({ isLoading: true });
        this.fetchProducts(pageNumber);
    }

    render() {
        const { props } = this;

        return (
            <PanelBody title={__('Product')}>
                <TextControl
                    label={__('Search Products')}
                    type="search"
                    value={props.attributes.query}
                    className="is-filter"
                    onChange={query => this.handleQueryChange(query)}
                />
                <ProductList {...props} next={() => this.next()} previous={() => this.previous()} />
            </PanelBody>
        );
    }
}
