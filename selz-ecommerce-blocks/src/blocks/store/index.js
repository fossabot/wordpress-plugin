import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';

const { Path, SVG } = wp.components;
const { __ } = wp.i18n;

const Defs = () => (
    <defs>
        <linearGradient id="logo-gradient-a" x1="100%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stop-color="#C8318C" />
            <stop offset="100%" stop-color="#602BC6" />
        </linearGradient>
    </defs>
);

export default {
    name: 'store',
    settings: {
        title: __('Selz Store'),
        category: 'selz-ecommerce',
        icon: <SVG style={{ width: 20, height: 20 }} aria-hidden="true" data-prefix="far" data-icon="store" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" class="svg-inline--fa fa-store fa-w-20 fa-3x"><Defs /><Path fill="url(#logo-gradient-a)" d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-29.6 47.2-10 110.6 38 130.8v227.4c0 19.4 14.3 35.2 32 35.2h448c17.7 0 32-15.8 32-35.2V249.4c48-20.2 67.6-83.6 38-130.8zM516 464H100v-96h416v96zm0-144.2H100v-64.7c24-3.3 45.1-15.2 60.3-32.2 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 15.3 17 36.3 28.9 60.3 32.2v64.7zm47.7-133c-3.2 6.8-10.9 18.6-27 20.8-2.4.3-4.8.5-7.2.5-14.7 0-28.2-6.1-38.1-17.2L455.7 151 420 190.8c-9.9 11.1-23.5 17.2-38.1 17.2s-28.2-6.1-38.1-17.2L308 151l-35.7 39.8c-9.9 11.1-23.5 17.2-38.1 17.2-14.7 0-28.2-6.1-38.1-17.2L160.3 151l-35.7 39.8c-9.9 11.1-23.5 17.2-38.1 17.2-2.5 0-4.9-.2-7.2-.5-16-2.2-23.8-13.9-27-20.8-5-10.8-7.1-27.6 2.3-42.6L114.8 48h386.3l60.2 96.1c9.5 15.1 7.5 31.9 2.4 42.7z" class=""></Path></SVG>,
        keywords: [
            __('Selz'),
            __('eCommerce'),
            __('Store'),
        ],
        attributes,
        // transforms: [],
        supports: {
            customClassName: false,
            multiple: false,
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
