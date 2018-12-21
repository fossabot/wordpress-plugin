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
    type: {
        type: 'string',
        default: 'store',
    },
    // url: {
    //     type: 'string',
    // },
};
