import { actionOptions, colors } from '../../config';

export default {
    action: {
        type: 'string',
        default: actionOptions[0].value,
    },
    text: {
        type: 'string',
        default: actionOptions[0].label,
    },
    logos: {
        type: 'boolean',
        default: false,
    },
    type: {
        type: 'string',
        default: 'button',
    },
    width: {
        type: 'string',
        default: null,
    },
    modal: {
        type: 'boolean',
        default: true,
    },
    url: {
        type: 'string',
    },
    isLoading: {
        type: 'boolean',
        default: true,
    },
    products: {
        type: 'array',
        default: [],
    },
    hasMore: {
        type: 'boolean',
        default: false,
    },
    query: {
        type: 'string',
        default: '',
    },
    request: {
        type: 'object',
    },
    pages: {
        type: 'object',
        default: {},
    },
    page: {
        type: 'object',
        default: {
            number: 1,
        },
    },
    currentPage: {
        type: 'integer',
    },
    btnBg: {
        type: 'string',
        default: colors.primary,
    },
    btnText: {
        type: 'string',
        default: colors.white,
    },
    checkoutHeader: {
        type: 'string',
        default: colors.primary,
    },
    checkoutHeaderText: {
        type: 'string',
        default: colors.white,
    },
    linksColor: {
        type: 'string',
        default: colors.primary,
    },
    textWasSet: {
        type: 'boolean',
        default: false,
    },
    autoWidth: {
        type: 'boolean',
        default: true,
    },
    fluidWidth: {
        type: 'boolean',
        default: false,
    },
    _text: {
        type: 'string',
        default: actionOptions[0].label,
    },
    _width: {
        type: 'integer',
        default: 320,
    },
    error: {
        type: 'boolean',
        default: false,
    },
};
