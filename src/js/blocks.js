import './filters';
import button from './blocks/button/';
import store from './blocks/store/';
import widget from './blocks/widget/';
import '../scss/block-editor.scss';

const { registerBlockType } = wp.blocks;
const { dispatch } = wp.data;
const { __, sprintf } = wp.i18n;
const { addQueryArgs } = wp.url;

if (window.selz_block_globals) {
    [button, store, widget].forEach(({ name, settings }) => {
        registerBlockType(name, settings);
    });
} else {
    dispatch('core/notices').createInfoNotice(
        sprintf(__('%s blocks require a connection to your account.'), 'Selz Ecommerce'),
        {
            actions: [
                {
                    label: sprintf(__('Connect your %s account'), 'Selz'),
                    url: addQueryArgs('admin-post.php', { action: 'connect_selz' }),
                },
            ],
        }
    );
}
