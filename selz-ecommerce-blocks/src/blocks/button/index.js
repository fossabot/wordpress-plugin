import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';

const { Path, SVG } = wp.components;
const { __ } = wp.i18n;

const Defs = () => (
    <defs>
        <linearGradient id="logo-gradient-a" x1="100%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stop-color="#C8318C" />
            <stop offset="100%" stop-color="#602BC6" />
        </linearGradient>
    </defs>
);

export default {
    name: 'button',
    settings: {
        title: __('Selz Button'),
        category: 'selz-ecommerce',
        icon: <SVG style={{ width: 20, height: 20 }} aria-hidden="true" data-prefix="far" data-icon="rectangle-wide" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-rectangle-wide fa-w-20 fa-3x"><Defs /><Path fill="url(#logo-gradient-a)" d="M592 96.5H48c-26.5 0-48 21.5-48 48v223c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-223c0-26.5-21.5-48-48-48zm-6 271H54c-3.3 0-6-2.7-6-6v-211c0-3.3 2.7-6 6-6h532c3.3 0 6 2.7 6 6v211c0 3.3-2.7 6-6 6z" class=""></Path></SVG>,
        keywords: [
            __('Selz'),
            __('eCommerce'),
            __('Button'),
        ],
        styles: [
            {
                name: 'price-right',
                label: __('Price on Right'),
                isDefault: true,
            },
            {
                name: 'price-left',
                label: __('Price on Left'),
            },
            {
                name: 'price-above',
                label: __('Price Above'),
            },
            {
                name: 'price-below',
                label: __('Price Below'),
            },
        ],
        attributes,
        // transforms: [],
        supports: {
            customClassName: false,
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
