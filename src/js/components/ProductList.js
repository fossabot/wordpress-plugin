import Scroll from './Scroll';

const { Button, Notice, RadioControl, Spinner } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

export default ({ attributes, next, previous, setAttributes }) => {
    const { currentPage, error, hasMore, isLoading, products, request, url } = attributes;

    if (error) {
        return (
            <Notice status="error" isDismissible={false}>
                {__('Failed to load products. Please try again.')}
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

    if (!products || !products.length) {
        return (
            <Notice status="info" isDismissible={false}>
                {request.data.q ? __('No matches found') : __('No products found')}
            </Notice>
        );
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
                <div className="components-pager">
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
