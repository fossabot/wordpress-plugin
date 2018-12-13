import Embed from '../components/Embed';
import ButtonSettings from '../components/ButtonSettings';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('selz-ecommerce-blocks/button', {
    title: __('Selz Button'),
    description: __('Block displaying Selz button.'),
    icon: 'store',
    category: 'common',
    keywords: [
        __('Store'),
        __('Shop'),
        __('Button'),
    ],
    styles: [
        {
            name: 'price-right',
            label: __('Price on right'),
            isDefault: true
        },
        {
            name: 'price-left',
            label: __('Price on left')
        },
        {
            name: 'price-above',
            label: __('Price above')
        },
        {
            name: 'price-below',
            label: __('Price below')
        },
    ],
    attributes: {
        action: {
            type: 'string',
            default: 'view'
        },
        text: {
            type: 'string',
        },
        logos: {
            type: 'boolean',
            default: false,
        },
        type: {
            type: 'string',
            default: 'button',
        },
    },
    edit: (props) => [
        <Embed {...props} />,
        <ButtonSettings {...props} />
    ],
    save: (props) => (
        <Embed {...props} />
    ),
});
