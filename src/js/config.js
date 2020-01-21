const { colors } = window[`${namespace}_globals`];
const { __, sprintf } = wp.i18n;

export const actionOptions = [
    {
        label: __('Add to cart'),
        value: 'add-to-cart',
    },
    {
        label: __('Buy'),
        value: 'buy',
        text: __('Buy it now'),
    },
    {
        label: __('View'),
        value: 'view',
        text: __('Buy it now'),
    },
];

export { colors };

export const translations = {
    izettle: {
        button: __('iZettle Button'),
        connectAccount: sprintf(__('Connect your %s account'), 'iZettle'),
        connectAccountNotice: sprintf(__('%s blocks require a connection to your account.'), 'iZettle Ecommerce'),
        store: __('iZettle Store'),
        widget: __('iZettle Widget'),
    },
    reckon: {
        button: __('Reckon Button'),
        connectAccount: sprintf(__('Connect your %s account'), 'Reckon'),
        connectAccountNotice: sprintf(__('%s blocks require a connection to your account.'), 'Reckon Ecommerce'),
        store: __('Reckon Store'),
        widget: __('Reckon Widget'),
    },
    selz: {
        button: __('Selz Button'),
        connectAccount: sprintf(__('Connect your %s account'), 'Selz'),
        connectAccountNotice: sprintf(__('%s blocks require a connection to your account.'), 'Selz Ecommerce'),
        store: __('Selz Store'),
        widget: __('Selz Widget'),
    },
};
