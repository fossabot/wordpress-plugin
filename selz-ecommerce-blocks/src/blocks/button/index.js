import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';

const { G, Path, SVG } = wp.components;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('selz-ecommerce-blocks/button', {
    title: __('Selz Button'),
    description: __('Block displaying Selz button.'),
    icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill="none" d="M0 0h24v24H0V0z" /><G><Path d="M19 6H5L3 8v8l2 2h14l2-2V8l-2-2zm0 10H5V8h14v8z" /></G></SVG>,
    category: 'common',
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
    edit,
    save: props => <Embed {...props} />,
});
