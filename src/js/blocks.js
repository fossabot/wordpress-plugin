import { translations } from './config';
import './filters';
import button from './blocks/button';
import store from './blocks/store';
import widget from './blocks/widget';
import '~/src/less/main.less';
import '~/src/less/block-editor.less';

const { connectAccount, connectAccountNotice } = translations[namespace];
const { registerBlockType } = wp.blocks;
const { dispatch } = wp.data;
const { addQueryArgs } = wp.url;

if (window[`${namespace}_globals`].store) {
    [button, store, widget].forEach(({ name, settings }) => {
        registerBlockType(name, settings);
    });
} else {
    dispatch('core/notices').createInfoNotice(connectAccountNotice, {
        actions: [
            {
                label: connectAccount,
                url: addQueryArgs('admin-post.php', { action: `connect_${namespace}` }),
            },
        ],
    });
}
