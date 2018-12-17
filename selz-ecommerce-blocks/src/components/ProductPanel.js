import { debounce } from 'lodash';
import ProductList from './ProductList';

const { Component } = wp.element;
const { PanelBody, RadioControl, TextControl } = wp.components;
const { __ } = wp.i18n;

export default class ProductPanel extends Component {
    constructor(props) {
        super(props);
        this.debouncedSearchProducts = debounce(this.searchProducts, 200);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    componentWillUnmount() {
        this.debouncedSearchProducts.cancel();
    }

    // TODO: Properly handle errors
    fetchProducts(data) {
        const { attributes: { url }, setAttributes } = this.props;
        const request = this.getRequest(data);

        setAttributes({ request });
        fetch(request.url)
            .then(res => res.json())
            .then(
                ({ data, has_more }) => {
                    // Only re-render for the most recent request
                    if (this.props.attributes.request.timestamp !== request.timestamp) {
                        return;
                    }

                    setAttributes({
                        request,
                        isLoading: false,
                        products: data,
                        hasMore: has_more,
                        ...(data.length ? { url: url || data[0].short_url } : {}),
                    });
                },
                error => {
                    setAttributes({
                        isLoading: false,
                        error,
                    });
                }
            );
    }

    getRequest(data) {
        const { query, request: { data: { page } } } = this.props.attributes;
        data = {
            action: `selz_${query ? 'search' : 'get'}_products`,
            page,
            q: query,
            ...data,
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

    handleChange(query) {
        this.props.setAttributes({ query });
        this.debouncedSearchProducts();
    }

    next() {
        const { pageNumber, products, query } = this.props.attributes;
        const data = query
            ? { page: pageNumber + 1 }
            : { starting_after: products[products.length - 1].id };

        this.searchProducts(data);
    }

    previous() {
        const { pageNumber, products, query } = this.props.attributes;
        const data = query
            ? { page: pageNumber - 1 }
            : { ending_before: products[0].id };

        this.searchProducts(data);
    }

    searchProducts(data) {
        this.props.setAttributes({ isLoading: true });
        this.fetchProducts(data);
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
                    onChange={query => this.handleChange(query)}
                />
                <ProductList {...props}
                    next={() => this.next()}
                    previous={() => this.previous()}
                />
            </PanelBody>
        );
    }
};
