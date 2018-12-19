export default {
    action: {
        type: 'string',
        default: 'view'
    },
    text: {
        type: 'string',
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
        default: '#7959C7',
    },
    btnText: {
        type: 'string',
        default: '#FFFFFF',
    },
    checkoutHeader: {
        type: 'string',
        default: '#7959C7',
    },
    checkoutHeaderText: {
        type: 'string',
        default: '#FFFFFF',
    },
    linksColor: {
        type: 'string',
        default: '#7959C7',
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
        default: '',
    },
    _width: {
        type: 'integer',
        default: 320,
    },
};
