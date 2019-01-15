const { BaseControl, G, Path, Rect, SVG } = wp.components;
// const { withInstanceId } = wp.compose;
const { Component } = wp.element;

export default class ProductItem extends Component {
    render() {
        const { featured_image: _img, title } = this.props.product;

        console.log(this.props.product); // eslint-disable-line

        const img = (_img && _img.small) || 'thiswillneverload.jpg';

        return (
            <div
                style={{
                    backgroundColor: '#eee',
                    borderRadius: 4,
                    marginBottom: 8,
                    width: 34,
                    height: 34,
                }}
            >
                <img src={Math.random() ? 'thiswillneverload.jpg' : img} alt="" />
            </div>
        );

        // eslint-disable-next-line no-unreachable
        return (
            <BaseControl style={{ display: 'flex', alignItems: 'center' }}>
                <div key={this.props.key} className="components-product-item__option">
                    <input
                        // id={`${id}-${index}`}
                        className="components-product-item__input"
                        type="radio"
                        // name={id}
                        // value={option.value}
                        // onChange={onChangeValue}
                        // checked={option.value === selected}
                        // aria-describedby={!!help ? `${id}__help` : undefined}
                    />
                    {/*
                    TODO: On load, fade images in by removing `is-loading` and adding relevant aspect ratio class name.
                    On error (`onError`), still show the broken image?

                    @see https://github.com/Selz/wordpress-plugin/blob/master/src/js/products.js#L94
                    */}
                    <label htmlFor={this.props.key}>
                        {img && img.small ? (
                            <img
                                className="is-loading"
                                src={img.small}
                                width={34}
                                height={34}
                                alt=""
                                style={{ objectFit: 'cover', marginRight: 8, width: 34, height: 34 }}
                            />
                        ) : (
                            <SVG
                                xmlns="http://www.w3.org/2000/svg"
                                width="34"
                                height="34"
                                viewBox="0 0 64 64"
                                style={{ marginRight: 8 }}
                            >
                                <G fill="none">
                                    <Rect width="64" height="64" fill="#DBE3E8" />
                                    <Path
                                        fill="#FFF"
                                        d="M47.84,34.2933333 L29.7066667,16.16 C29.6,16.0533333 29.4933333,16 29.3333333,16 L16.5333333,16 C16.2133333,16 16,16.2133333 16,16.5333333 L16,29.3333333 C16,29.4933333 16.0533333,29.6 16.16,29.7066667 L34.2933333,47.84 C34.4,47.9466667 34.56,48 34.6666667,48 C34.7733333,48 34.9333333,47.9466667 35.04,47.84 L47.84,35.04 C48.0533333,34.8266667 48.0533333,34.5066667 47.84,34.2933333 Z M24,26.1333333 C22.8266667,26.1333333 21.8666667,25.1733333 21.8666667,24 C21.8666667,22.8266667 22.8266667,21.8666667 24,21.8666667 C25.1733333,21.8666667 26.1333333,22.8266667 26.1333333,24 C26.1333333,25.1733333 25.1733333,26.1333333 24,26.1333333 Z"
                                    />
                                </G>
                            </SVG>
                        )}
                        {title}
                    </label>
                </div>
            </BaseControl>
        );
    }
}

/*
function ProductItem({ label, selected, help, instanceId, onChange, options = [] }) {
    const id = `inspector-radio-control-${instanceId}`;
    const onChangeValue = event => onChange(event.target.value);

    return (
        true && (
            <BaseControl label={label} id={id} help={help}>
                {options.map((option, index) => (
                    <div key={`${id}-${index}`} className="components-radio-control__option">
                        <input
                            id={`${id}-${index}`}
                            className="components-radio-control__input"
                            type="radio"
                            name={id}
                            value={option.value}
                            onChange={onChangeValue}
                            checked={option.value === selected}
                            aria-describedby={!!help ? `${id}__help` : undefined}
                        />
                        <img src="https://placekitten.com/48/48" alt="" />
                        <label htmlFor={`${id}-${index}`}>{option.label}</label>
                    </div>
                ))}
            </BaseControl>
        )
    );
}

export default withInstanceId(ProductItem);
*/
