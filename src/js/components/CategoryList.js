import ProductControl from './ProductControl';
import Scroll from './Scroll';

const { Notice, Spinner } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    let { categories } = attributes;
    const { category, error, isLoading, query } = attributes;

    if (error) {
        return (
            <Notice status="error" isDismissible={false}>
                {__('Failed to load categories. Please try again.')}
            </Notice>
        );
    }

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        );
    }

    if (query) {
        categories = categories.filter(({ title }) => !query || title.toLowerCase().includes(query.toLowerCase()));
    }

    if (!categories || !categories.length) {
        return (
            <Notice status="info" isDismissible={false}>
                {query ? __('No matches found') : __('No categories found')}
            </Notice>
        );
    }

    return (
        <Scroll ariaLabel={__('Categories')}>
            <ProductControl
                selected={category}
                options={categories.map(({ title, id, image }) => ({
                    label: title,
                    value: id,
                    image: image && image.small,
                }))}
                onChange={category => setAttributes({ category })}
            />
        </Scroll>
    );
};
