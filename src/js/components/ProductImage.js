const { Component } = wp.element;

export default class ProductImage extends Component {
    constructor(props) {
        super(props);
        this.state = { className: 'is-loading' };
    }

    setClassName({ target: image }) {
        const { naturalWidth: width, naturalHeight: height } = image;

        if (width > height) {
            this.setState({ className: 'is-landscape' });
        } else if (height > width) {
            this.setState({ className: 'is-portrait' });
        } else if (height === width) {
            this.setState({ className: 'is-square' });
        } else {
            this.setState({ className: '' });
        }
    }

    render() {
        const { src } = this.props;

        return (
            <span className="product-image media-placeholder media-ratio-1-1" role="presentation">
                {src && (
                    <img
                        className={this.state.className}
                        src={src}
                        alt=""
                        onLoad={e => this.setClassName(e)}
                        onError={e => this.setClassName(e)}
                    />
                )}
            </span>
        );
    }
}
