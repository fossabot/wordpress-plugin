import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';
import { colors, translations } from '../../config';

const { G, Rect, SVG } = wp.components;
const { createBlock, getBlockAttributes } = wp.blocks;
const { __ } = wp.i18n;

export default {
    name: `${namespace}/button`,
    settings: {
        title: translations[namespace].button,
        description: __('Prompt visitors to add to cart, buy now or view a store item.'),
        category: `${namespace}-ecommerce`,
        // prettier-ignore
        icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><G fill="none" transform="translate(2 6)"><Rect width="20" height="11" fill={colors.primary} rx="2" /><Rect width="7" height="3" x="3" y="4" fill="#FFF" rx="1.5" /><Rect width="5" height="3" x="12" y="4" fill="#FFF" rx="1.5" /></G></SVG>,
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
                    // eslint-disable-next-line no-unused-vars
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
        },
        edit,
        save: props => <Embed {...props} />,
        deprecated: [
            {
                attributes,
                save: props => <Embed {...props} deprecated />,
            },
        ],
    },
};
