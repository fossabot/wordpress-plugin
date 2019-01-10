import { colors } from '../../config';

export default {
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
    linksColor: {
        type: 'string',
        default: colors.primary,
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
    square: {
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
};
