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
    type: {
        type: 'string',
        default: 'store',
    },
    url: {
        type: 'string',
        default: `http://${window.selz_block_globals.store.name}`,
    },
};
