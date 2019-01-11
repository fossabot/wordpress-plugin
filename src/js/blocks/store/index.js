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
        icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><G fill="none" fill-rule="evenodd" transform="translate(2 2)"><G transform="translate(11 11)"><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1,0 L8,0 C8.55228475,-1.01453063e-16 9,0.44771525 9,1 L9,5 L0,5 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G><G transform="translate(0 11)"><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1,0 L8,0 C8.55228475,-1.01453063e-16 9,0.44771525 9,1 L9,5 L0,5 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G><G transform="translate(11)"><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1,0 L8,0 C8.55228475,-1.01453063e-16 9,0.44771525 9,1 L9,5 L0,5 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G><Rect width="8" height="8" x=".5" y=".5" stroke="#DBE3E8" rx="1" /><Path fill="#DBE3E8" fill-opacity=".5" fill-rule="nonzero" d="M1,0 L8,0 C8.55228475,-1.01453063e-16 9,0.44771525 9,1 L9,5 L0,5 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" /><Rect width="2" height="1" x="2" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /><Rect width="2" height="1" x="5" y="6" fill="#DBE3E8" fill-rule="nonzero" rx=".5" /></G></SVG>,
        attributes,
        supports: {
            multiple: false,
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
