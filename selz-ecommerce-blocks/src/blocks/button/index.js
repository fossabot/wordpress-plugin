import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';

const { Path, SVG } = wp.components;
const { createBlock, getBlockAttributes } = wp.blocks;
const { __ } = wp.i18n;

export default {
    name: 'selz/button',
    settings: {
        title: __('Selz Button'),
        description: __('Prompt visitors to add to cart, buy now or view a store item.'),
        category: 'selz-ecommerce',
        icon: <SVG viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><Path fill="url(#logo-gradient-a)" d="M592 96.5H48c-26.5 0-48 21.5-48 48v223c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-223c0-26.5-21.5-48-48-48zm-6 271H54c-3.3 0-6-2.7-6-6v-211c0-3.3 2.7-6 6-6h532c3.3 0 6 2.7 6 6v211c0 3.3-2.7 6-6 6z" /></SVG>,
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
        transforms: {
            to: [
                {
                    type: 'block',
                    blocks: ['selz/widget'],
                    transform: ({ autoWidth, ...attributes }) => {
                        const { description, type, width } = getBlockAttributes('selz/widget');

                        return createBlock('selz/widget', {
                            ...attributes,
                            description,
                            type,
                            width,
                        });
                    },
                },
            ],
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
