import Client from 'selz-js-sdk';
import CategoryList from './CategoryList';

const { PanelBody, TextControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class CategoryPanel extends Component {
    componentDidMount() {
        const { env, store } = window[`${namespace}_globals`];
        const { id } = store;
        this.client = new Client({ env, store: parseInt(id, 10) });

        this.fetchCategories();
    }

    fetchCategories() {
        const {
            attributes: { category },
            setAttributes,
        } = this.props;

        this.client.getCategories().then(
            (res) => {
                // Move the "All" category to the beginning
                const categories = res.categories.sort((a) => (a.slug === 'all' ? -1 : 0));

                // Assign `category` to the "All" category's ID -- this prevents a re-render
                categories[0].id = category;

                setAttributes({
                    isLoading: false,
                    categories,
                    category: category || (categories && categories.length && categories[0].id),
                });
            },
            (error) =>
                setAttributes({
                    isLoading: false,
                    error,
                }),
        );
    }

    render() {
        const { props } = this;
        const {
            attributes: { query },
            setAttributes,
        } = props;

        return (
            <PanelBody title={__('Category')}>
                <TextControl
                    label={__('Search Categories')}
                    type="search"
                    value={query}
                    className="is-filter"
                    onChange={(query) => setAttributes({ query })}
                />
                <CategoryList {...props} />
            </PanelBody>
        );
    }
}
