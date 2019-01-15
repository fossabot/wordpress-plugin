import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';
import { translations } from '../../config';

const { G, Path, Rect, SVG } = wp.components;
const { __ } = wp.i18n;

export default {
    name: `${namespace}/store`,
    settings: {
        title: translations[namespace].store,
        description: __('Embed your whole store.'),
        category: `${namespace}-ecommerce`,
        // prettier-ignore
        icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><G fill="none" fill-rule="evenodd" transform="translate(2 2)"><G transform="translate(11 11)"><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G><G transform="translate(0 11)"><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G><G transform="translate(11)"><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G></SVG>,
        attributes,
        edit,
        save: props => <Embed {...props} />,
    },
};
