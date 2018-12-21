import { actionOptions, colors } from '../../config';

export default {
    action: {
        type: 'string',
        default: actionOptions[0].value,
    },
    autoWidth: {
        type: 'boolean',
        default: true,
    },
    buttonBackgroundColor: {
        type: 'string',
        default: colors.primary,
    },
    buttonTextColor: {
        type: 'string',
        default: colors.white,
    },
    checkoutBackgroundColor: {
        type: 'string',
        default: colors.primary,
    },
    checkoutTextColor: {
        type: 'string',
        default: colors.white,
    },
    currentPage: {
        type: 'number',
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
        default: actionOptions[0].label,
    },
    textWasSet: {
        type: 'boolean',
        default: false,
    },
    type: {
        type: 'string',
        default: 'button',
    },
    url: {
        type: 'string',
    },
    width: {
        type: 'string',
    },
    _text: {
        type: 'string',
        default: actionOptions[0].label,
    },
    _width: {
        type: 'number',
        default: 320,
    },
};
