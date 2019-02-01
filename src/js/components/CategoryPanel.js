import CategoryList from './CategoryList';

const { PanelBody, TextControl } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;

export default class CategoryPanel extends Component {
    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        const { setAttributes } = this.props;

        fetch(`${window.ajaxurl}?action=${namespace}_get_categories`)
            .then(res => res.json())
            .then(
                ({ data }) => {
                    const isAllCategory = ({ slug }) => slug === 'all';

                    // Move the "All" category to the beginning
                    const categories = [data.find(isAllCategory), ...data.filter(category => !isAllCategory(category))];

                    setAttributes({
                        isLoading: false,
                        categories,
                        category: categories && categories.length && categories[0].id,
                    });
                },
                error =>
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
                    onChange={query => setAttributes({ query })}
                />
                <CategoryList {...props} />
            </PanelBody>
        );
    }
}
