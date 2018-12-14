import Scroll from './Scroll';

const { PanelBody, RadioControl, Spinner, TextControl } = wp.components;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            options: [],
            product: '',
            search: ''
        };
    }

    componentDidMount() {
        fetch(`${window.ajaxurl}?action=selz_get_products&starting_after=1&page=2`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    isLoading: false,
                    options: response.data.map(({ title, short_url }) => ({
                        label: title,
                        value: short_url
                    })),
                    product: response.data[0].short_url
                });
            })
            .catch(error => console.error(error));
    }

    componentWillUnmount() {
        // TODO: Stop the fetch right here
    }

    handleSearch(search) {
        this.setState({ search });
    }

    render() {
        const { isLoading, options, product, search } = this.state;

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
                        options={options}
                        selected={product}
                        onChange={product => this.setState({ product })}
                    />
                </Scroll>
            </PanelBody>
        );
    }
}
