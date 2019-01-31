/* eslint-disable camelcase, no-console */

const { PanelBody } = wp.components;
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
                    setAttributes({
                        isLoading: false,
                        categories: data,
                    });
                },
                error => {
                    setAttributes({
                        isLoading: false,
                        error,
                    });
                },
            );
    }

    render() {
        const { categories } = this.props.attributes;

        return (
            <PanelBody title={__('Category')}>
                {categories ? (
                    <ul>
                        {categories.map(({ title }, index) => (
                            <li key={index}>{title}</li>
                        ))}
                    </ul>
                ) : (
                    <div>Loading</div>
                )}
            </PanelBody>
        );
    }
}
