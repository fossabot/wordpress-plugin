const { colors, resources } = window[`${namespace}_block_globals`];
const { __, sprintf } = wp.i18n;

export const actionOptions = Object.keys(resources).map(key => ({
    label: resources[key],
    value: resources[key].replace(/ /g, '-').toLowerCase(),
}));

export { colors };

export const translations = {
    izettle: {
        button: __('iZettle Button'),
        connectAccount: sprintf(__('Connect your %s account'), 'iZettle'),
        connectAccountNotice: sprintf(__('%s blocks require a connection to your account.'), 'iZettle Ecommerce'),
        store: __('iZettle Store'),
        widget: __('iZettle Widget'),
    },
    selz: {
        button: __('Selz Button'),
        connectAccount: sprintf(__('Connect your %s account'), 'Selz'),
        connectAccountNotice: sprintf(__('%s blocks require a connection to your account.'), 'Selz Ecommerce'),
        store: __('Selz Store'),
        widget: __('Selz Widget'),
    },
};
