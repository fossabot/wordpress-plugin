import Scroll from './Scroll';

const { Component, Fragment } = wp.element;
const { Button, RadioControl, Spinner } = wp.components;
const { __ } = wp.i18n;

// TODO: Convert to stateless functional component
export default class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { attributes: { isLoading, products, request, url }, setAttributes } = this.props;

        if (isLoading) {
            return <Spinner />;
        } else if (!products.length) {
            return <p>{__('No matches found')}</p>;
        } else {
            const options = products.map(({ title, short_url }) => ({
                label: title,
                value: short_url,
            }));

            return (
                <Fragment>
                    <Scroll ariaLabel={__('Products')}>
                        <RadioControl
                            selected={url}
                            options={options}
                            onChange={url => setAttributes({ url })}
                        />
                    </Scroll>
                    <div className="pager">
                        <Button isLink onClick={this.props.previous} disabled={request.data.page === 1}>
                            {__('Prev')}
                        </Button>
                        <Button isLink onClick={this.props.next}>
                            {__('Next')}
                        </Button>
                    </div>
                </Fragment>
            );
        }
    }
};
