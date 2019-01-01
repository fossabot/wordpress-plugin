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
        icon: (
            <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <Path fill="url(#logo-gradient-a)" d="M20.5,7.015625 L3.5,7.015625 C2.671875,7.015625 2,7.6875 2,8.515625 L2,15.484375 C2,16.3125 2.671875,16.984375 3.5,16.984375 L20.5,16.984375 C21.328125,16.984375 22,16.3125 22,15.484375 L22,8.515625 C22,7.6875 21.328125,7.015625 20.5,7.015625 Z M20.3125,15.484375 L3.6875,15.484375 C3.584375,15.484375 3.5,15.4 3.5,15.296875 L3.5,8.703125 C3.5,8.6 3.584375,8.515625 3.6875,8.515625 L20.3125,8.515625 C20.415625,8.515625 20.5,8.6 20.5,8.703125 L20.5,15.296875 C20.5,15.4 20.415625,15.484375 20.3125,15.484375 Z" />
            </SVG>
        ),
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
