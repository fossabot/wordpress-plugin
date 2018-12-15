import Scroll from './Scroll';

const { Button, PanelBody, RadioControl, TextControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getProducts();
    }

    componentWillUnmount() {
        // TODO: Stop the fetch right here
    }

    getOptions() {
        return this.props.attributes.products.map(({ title, short_url }) => ({
            label: title,
            value: short_url
        }));
    }

    getProducts(startingAfter = null, endingBefore = null) {
        fetch(`${window.ajaxurl}?action=selz_get_products&starting_after=${startingAfter}&ending_before=${endingBefore}`)
            .then(response => response.json())
            .then(({ data, has_more }) => {
                this.props.setAttributes({
                    isLoading: false,
                    products: data,
                    hasMore: has_more
                });

                this.setState({
                    firstProduct: data[0].id,
                    lastProduct: data[data.length - 1].id
                });
            })
            .catch(error => console.error(error));
    }

    next() {
        this.getProducts(this.props.attributes.products[0].id);
    }
    
    previous() {
        const { products } = this.props.attributes;

        this.getProducts(null, products[products.length - 1].id);
    }

    handleSearch(search) {
        this.setState({ search });
    }

    handleProduct(product) {
        this.props.setAttributes({ url: product });
        this.setState({ product });
    }

    render() {
        const { product, search } = this.state;
        const { isLoading, products, hasMore } = this.props.attributes;

        return (
            <PanelBody title={__('Product')} className={isLoading && 'is-loading'}>
                <TextControl
                    label={__('Search Products')}
                    type="search"
                    value={search}
                    onChange={search => this.handleSearch(search)}
                    className="is-filter"
                />

                <Scroll isLoading={isLoading} ariaLabel="Available Products">
                    <RadioControl
                        options={() => this.getOptions()}
                        selected={product}
                        onChange={product => this.handleProduct(product)}
                    />
                </Scroll>

                {(!isLoading && hasMore) &&
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                        <Button isLink onClick={() => this.previous()} disabled={this.state.page === 1}>Prev</Button>
                        <Button isLink onClick={() => this.next()} disabled={!hasMore}>Next</Button>
                    </div>
                }
            </PanelBody>
        );
    }
}
