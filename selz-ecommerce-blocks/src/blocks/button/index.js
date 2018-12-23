import Embed from '../../components/Embed';
import GradientSVG from '../../components/GradientSVG';
import attributes from './attributes';
import edit from './edit';

const { Path } = wp.components;
const { __ } = wp.i18n;

export default {
    name: 'selz/button',
    settings: {
        title: __('Selz Button'),
        description: __('Prompt visitors to add to cart, buy now or view a store item.'),
        category: 'selz-ecommerce',
        icon: <GradientSVG><Path d="M592 96.5H48c-26.5 0-48 21.5-48 48v223c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-223c0-26.5-21.5-48-48-48zm-6 271H54c-3.3 0-6-2.7-6-6v-211c0-3.3 2.7-6 6-6h532c3.3 0 6 2.7 6 6v211c0 3.3-2.7 6-6 6z" /></GradientSVG>,
        styles: [
            {
                name: 'price-right',
                label: __('Default'),
                isDefault: true,
            },
            {
                name: 'price-left',
                label: __('Price Left'),
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
        supports: {
            customClassName: false,
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
