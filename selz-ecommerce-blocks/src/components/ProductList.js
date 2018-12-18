import Scroll from './Scroll';

const { Fragment } = wp.element;
const { Button, RadioControl, Spinner } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, next, previous, setAttributes }) => {
    const { currentPage, hasMore, isLoading, products, query, url } = attributes;

    if (isLoading) {
        return <Spinner />;
    }

    if (!products || !products.length) {
        const message = query ? __('No matches found') : __('No products found');
        return <p>{message}</p>;
    }

    return (
        <Fragment>
            <Scroll ariaLabel={__('Products')}>
                <RadioControl
                    selected={url}
                    options={products.map(({ title, short_url }) => ({
                        label: title,
                        value: short_url,
                    }))}
                    onChange={url => setAttributes({ url })}
                />
            </Scroll>

            {(currentPage !== 1 || hasMore) && (
                <div className="pager">
                    <Button isLink onClick={previous} disabled={currentPage === 1}>
                        {__('Prev')}
                    </Button>
                    <Button isLink onClick={next} disabled={!hasMore}>
                        {__('Next')}
                    </Button>
                </div>
            )}
        </Fragment>
    );
};
