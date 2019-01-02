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
            <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <Path fill="url(#logo-gradient-a)" d="M21.4508203,10.8258203 L13.1741797,2.54917969 C12.822551,2.19754838 12.3456393,2.0000026 11.8483594,2 L3.875,2 C2.83945312,2 2,2.83945312 2,3.875 L2,11.8483594 C1.99999402,12.345641 2.19754111,12.8225558 2.54917969,13.1741797 L10.8258203,21.4508203 C11.5580469,22.1830469 12.7452344,22.1830859 13.4774609,21.4508203 L21.4508203,13.4774609 C22.1830469,12.7452344 22.1830469,11.5580469 21.4508203,10.8258203 Z M12.1517969,20.1248437 L3.875,11.8483594 L3.875,3.875 L11.8483594,3.875 L20.125,12.1516406 L12.1517969,20.1248437 Z M9.5,7.625 C9.5,8.66054687 8.66054687,9.5 7.625,9.5 C6.58945313,9.5 5.75,8.66054687 5.75,7.625 C5.75,6.58945312 6.58945312,5.75 7.625,5.75 C8.66054687,5.75 9.5,6.58945312 9.5,7.625 Z" />
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
