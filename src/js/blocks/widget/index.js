import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';
import { colors, translations } from '../../config';

const { G, Path, Rect, SVG } = wp.components;
const { createBlock, getBlockAttributes } = wp.blocks;
const { __ } = wp.i18n;

export default {
    name: `${namespace}/widget`,
    settings: {
        title: translations[namespace].widget,
        description: __('Feature a store item by displaying a preview with a call to action.'),
        category: `${namespace}-ecommerce`,
        // prettier-ignore
        icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><G fill="none" fill-rule="evenodd" transform="translate(2 2)"><Rect width="19" height="19" x=".5" y=".5" stroke="#DBE3E8" rx="2" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M2 0h16a2 2 0 0 1 2 2v5H0V2a2 2 0 0 1 2-2z" /><G fill-rule="nonzero" transform="translate(3 12)"><Rect width="14" height="5" fill={colors.primary} rx="1" /><Rect width="5.6" height="1" x="1.4" y="2" fill="#FFF" rx=".5" /><Rect width="4" height="1" x="8.6" y="2" fill="#FFF" rx=".5" /></G><G fill="#DBE3E8" fill-rule="nonzero" transform="translate(3 9)"><Rect width="3" height="1" rx=".5" /><Rect width="2" height="1" x="4" rx=".5" /><Rect width="3" height="1" x="7" rx=".5" /><Rect width="3" height="1" x="11" rx=".5" /></G></G></SVG>,
        attributes,
        transforms: {
            to: [
                {
                    type: 'block',
                    blocks: [`${namespace}/button`],
                    // eslint-disable-next-line no-unused-vars
                    transform: ({ description, ...attributes }) => {
                        const { autoWidth, type, width } = getBlockAttributes(`${namespace}/button`);

                        return createBlock(`${namespace}/button`, {
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
