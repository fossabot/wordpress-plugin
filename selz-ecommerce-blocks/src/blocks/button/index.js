import Embed from '../../components/Embed';

const { G, Path, SVG } = wp.components;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './edit';

registerBlockType('selz-ecommerce-blocks/button', {
    title: __('Selz Button'),

    description: __('Block displaying Selz button.'),

    icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill="none" d="M0 0h24v24H0V0z" /><G><Path d="M19 6H5L3 8v8l2 2h14l2-2V8l-2-2zm0 10H5V8h14v8z" /></G></SVG>,

    category: 'common',

    keywords: [
        __('Store'),
        __('Shop'),
        __('Button'),
    ],

    styles: [
        {
            name: 'price-right',
            label: __('Price on Right'),
            isDefault: true
        },
        {
            name: 'price-left',
            label: __('Price on Left')
        },
        {
            name: 'price-above',
            label: __('Price Above')
        },
        {
            name: 'price-below',
            label: __('Price Below')
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
            default: null,
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
        btnBg: {
            type: 'string',
        },
        btnText: {
            type: 'string',
        },
        checkoutHeader: {
            type: 'string',
        },
        checkoutHeaderText: {
            type: 'string',
        },
        linksColor: {
            type: 'string',
        },
        textWasSet: {
            type: 'boolean',
            default: false,
        },
        autoWidth: {
            type: 'boolean',
            default: true,
        },
        fluidWidth: {
            type: 'boolean',
            default: false,
        },
        _text: {
            type: 'string',
            default: '',
        },
        _width: {
            type: 'integer',
            default: 320,
        },
    },

    edit,

    save: props => <Embed {...props} />,
});
