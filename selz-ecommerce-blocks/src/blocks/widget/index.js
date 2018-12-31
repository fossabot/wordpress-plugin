import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';

const { Path, SVG } = wp.components;
const { createBlock, getBlockAttributes } = wp.blocks;
const { __ } = wp.i18n;

export default {
    name: 'selz/widget',
    settings: {
        title: __('Selz Widget'),
        description: __('Feature a store item by displaying a preview with a call to action.'),
        category: 'selz-ecommerce',
        icon: (
            <SVG viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="dashicon" width="20" height="20">
                <Path fill="url(#logo-gradient-a)" d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a47.998 47.998 0 0 0 14.059 33.941l211.882 211.882c18.745 18.745 49.137 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM259.886 463.996L48 252.118V48h204.118L464 259.882 259.886 463.996zM192 144c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z" />
            </SVG>
        ),
        attributes,
        transforms: {
            to: [
                {
                    type: 'block',
                    blocks: ['selz/button'],
                    transform: ({ description, ...attributes }) => {
                        const { autoWidth, type, width } = getBlockAttributes('selz/button');

                        return createBlock('selz/button', {
                            ...attributes,
                            autoWidth,
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
