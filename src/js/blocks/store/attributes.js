import { actionOptions, colors } from '../../config';

const { label, text, value: defaultAction } = actionOptions[0];
const defaultText = text || label;
const { primary: primaryColor, white } = colors;

export default {
    _text: {
        type: 'string',
        default: defaultText,
    },
    action: {
        type: 'string',
        default: defaultAction,
    },
    buttonBackgroundColor: {
        type: 'string',
        default: primaryColor,
    },
    buttonTextColor: {
        type: 'string',
        default: white,
    },
    checkoutBackgroundColor: {
        type: 'string',
        default: primaryColor,
    },
    checkoutTextColor: {
        type: 'string',
        default: white,
    },
    linksColor: {
        type: 'string',
        default: primaryColor,
    },
    modal: {
        type: 'boolean',
        default: true,
    },
    showCart: {
        type: 'boolean',
        default: false,
    },
    showCategories: {
        type: 'boolean',
        default: true,
    },
    showPagination: {
        type: 'boolean',
        default: true,
    },
    showSearch: {
        type: 'boolean',
        default: true,
    },
    squareImages: {
        type: 'boolean',
        default: true,
    },
    text: {
        type: 'string',
        default: defaultText,
    },
    textWasSet: {
        type: 'boolean',
        default: false,
    },
    truncateTitles: {
        type: 'boolean',
        default: true,
    },
    type: {
        type: 'string',
        default: 'store',
    },
    url: {
        type: 'string',
        default: `http://${window[`${namespace}_globals`].store.name}`,
    },
    useDefaultText: {
        type: 'boolean',
        default: false,
    },
};
