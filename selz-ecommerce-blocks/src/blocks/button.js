import Embed from '../components/Embed';
import ButtonInspector from '../components/ButtonInspector';

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
        width: {
            type: 'string',
        },
        modal: {
            type: 'boolean',
            default: true,
        },
        url: {
            type: 'string',
        },
        isLoading: {
            type: 'boolean',
            default: true,
        },
        products: {
            type: 'array',
            default: [],
        },
        hasMore: {
            type: 'boolean',
            default: false,
        },
        query: {
            type: 'string',
            default: '',
        },
        request: {
            type: 'object',
        },
        pages: {
            type: 'object',
            default: {},
        },
        page: {
            type: 'object',
            default: {
                number: 1,
            },
        },
        currentPage: {
            type: 'integer',
        },
        color: {
            type: 'string',
        },
    },
    edit: props => [
        <Embed {...props} />,
        <ButtonInspector {...props} />
    ],
    save: props => (
        <Embed {...props} />
    ),
});
