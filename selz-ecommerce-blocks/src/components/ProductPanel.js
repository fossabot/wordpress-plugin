import { debounce } from 'lodash';
import ProductList from './ProductList';

const { Component } = wp.element;
const { PanelBody, TextControl } = wp.components;
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
        const { attributes: { pages, url }, setAttributes } = this.props;
        const request = this.getRequest(pageNumber);

        setAttributes({ request });
        fetch(request.url)
            .then(res => res.json())
            .then(
                ({ data, has_more }) => {
                    // Only re-render for the most recent request
                    if (this.props.attributes.request.timestamp !== request.timestamp) {
                        return;
                    }

                    const attributes = {
                        isLoading: false,
                        products: data,
                        hasMore: has_more,
                    };

                    if (data && data.length) {
                        attributes.url = url || data[0].short_url;
                        attributes.pages = {
                            ...pages,
                            [pageNumber]: {
                                number: pageNumber,
                                start: data[0].id,
                                end: data[data.length - 1].id,
                            },
                        };
                        attributes.currentPage = pageNumber;
                    }

                    setAttributes(attributes);
                },
                error => {
                    setAttributes({
                        isLoading: false,
                        error,
                    });
                }
            );
    }

    getRequest(pageNumber) {
        const { pages, query } = this.props.attributes;
        const data = {
            action: `selz_${query ? 'search' : 'get'}_products`,
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
        const url = Object.keys(data).reduce((url, param) => {
            return data[param] ? `${url}${url === ajaxurl ? '?' : '&'}${param}=${data[param]}` : url;
        }, ajaxurl);

        return url;
    }

    handleQueryChange(query) {
        this.props.setAttributes({ query, error: false });
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
                <ProductList {...props}
                    next={() => this.next()}
                    previous={() => this.previous()}
                />
            </PanelBody>
        );
    }
};
