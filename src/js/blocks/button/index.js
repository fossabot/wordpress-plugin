import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';
import { translations } from '../../config';

const { Path, SVG } = wp.components;
const { createBlock, getBlockAttributes } = wp.blocks;
const { __ } = wp.i18n;

export default {
    name: `${namespace}/button`,
    settings: {
        title: translations[namespace].button,
        description: __('Prompt visitors to add to cart, buy now or view a store item.'),
        category: `${namespace}-ecommerce`,
        icon: (
            <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <Path fill={namespace === 'selz' ? 'url(#logo-gradient-a)' : 'currentColor'} d="M20.5,7.015625 L3.5,7.015625 C2.671875,7.015625 2,7.6875 2,8.515625 L2,15.484375 C2,16.3125 2.671875,16.984375 3.5,16.984375 L20.5,16.984375 C21.328125,16.984375 22,16.3125 22,15.484375 L22,8.515625 C22,7.6875 21.328125,7.015625 20.5,7.015625 Z M20.3125,15.484375 L3.6875,15.484375 C3.584375,15.484375 3.5,15.4 3.5,15.296875 L3.5,8.703125 C3.5,8.6 3.584375,8.515625 3.6875,8.515625 L20.3125,8.515625 C20.415625,8.515625 20.5,8.6 20.5,8.703125 L20.5,15.296875 C20.5,15.4 20.415625,15.484375 20.3125,15.484375 Z" />
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
                    blocks: [`${namespace}/widget`],
                    transform: ({ autoWidth, ...attributes }) => {
                        const { description, type, width } = getBlockAttributes(`${namespace}/widget`);

                        return createBlock(`${namespace}/widget`, {
                            ...attributes,
                            description,
                            type,
                            width,
                        });
                    },
                },
            ],
            from: [
                {
                    type: 'shortcode',
                    tag: namespace,
                    attributes: {
                        buttonBackgroundColor: {
                            type: 'string',
                            shortcode: ({ named: { background_color } }) => background_color,
                        },
                        buttonTextColor: {
                            type: 'string',
                            shortcode: ({ named: { text_color } }) => text_color,
                        },
                        checkoutBackgroundColor: {
                            type: 'string',
                            shortcode: ({ named: { chbg_color } }) => chbg_color,
                        },
                        checkoutTextColor: {
                            type: 'string',
                            shortcode: ({ named: { chtx_color } }) => chtx_color,
                        },
                        modal: {
                            type: 'boolean',
                            shortcode: ({ named: { interact } }) => !!interact,
                        },
                        text: {
                            type: 'string',
                            shortcode: ({ named: { button_text } }) => button_text,
                        },
                        url: {
                            type: 'string',
                            shortcode: ({ named: { link } }) => link,
                        },
                    },
                },
            ],
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
