import { actionOptions, colors } from '../../config';

const { label, text, value: defaultAction } = actionOptions[0];
const defaultText = text || label;
const { primary: primaryColor, white } = colors;

export default {
    _text: {
        type: 'string',
        default: defaultText,
    },
    _width: {
        type: 'number',
        default: 320,
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
    currentPage: {
        type: 'number',
    },
    description: {
        type: 'boolean',
        default: true,
    },
    error: {
        type: 'object',
    },
    fluidWidth: {
        type: 'boolean',
        default: false,
    },
    hasMore: {
        type: 'boolean',
    },
    isLoading: {
        type: 'boolean',
        default: true,
    },
    logos: {
        type: 'boolean',
        default: false,
    },
    modal: {
        type: 'boolean',
        default: true,
    },
    pages: {
        type: 'object',
    },
    products: {
        type: 'array',
    },
    query: {
        type: 'string',
        default: '',
    },
    request: {
        type: 'object',
    },
    text: {
        type: 'string',
        default: defaultText,
    },
    textWasSet: {
        type: 'boolean',
        default: false,
    },
    type: {
        type: 'string',
        default: 'widget',
    },
    url: {
        type: 'string',
    },
    useDefaultText: {
        type: 'boolean',
        default: false,
    },
    width: {
        type: 'string',
        default: 320,
    },
};
