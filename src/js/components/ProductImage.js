const { G, Path, SVG } = wp.components;
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
                {src ? (
                    <img
                        className={this.state.className}
                        src={src}
                        alt=""
                        onLoad={e => this.setClassName(e)}
                        onError={e => this.setClassName(e)}
                    />
                ) : (
                    <SVG viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <G fill="none">
                            <Path fill="#DBE3E8" d="M0 0h64v64H0z" />
                            <Path
                                fill="#FFF"
                                d="M47.84 34.293L29.707 16.16a.484.484 0 0 0-.374-.16h-12.8c-.32 0-.533.213-.533.533v12.8c0 .16.053.267.16.374L34.293 47.84c.107.107.267.16.374.16a.576.576 0 0 0 .373-.16l12.8-12.8a.516.516 0 0 0 0-.747zM24 26.133A2.14 2.14 0 0 1 21.867 24 2.14 2.14 0 0 1 24 21.867 2.14 2.14 0 0 1 26.133 24 2.14 2.14 0 0 1 24 26.133z"
                            />
                        </G>
                    </SVG>
                )}
            </span>
        );
    }
}
