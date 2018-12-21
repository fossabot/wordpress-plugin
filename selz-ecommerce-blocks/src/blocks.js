import button from './blocks/button/';
import store from './blocks/store/';

import './style.scss';
import './editor.scss';

const { dispatch } = wp.data;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { createInfoNotice } = dispatch('core/notices');

if (window.selz_globals) {
    [button, store].forEach(({ name, settings }) =>
        registerBlockType(`selz/${name}`, settings)
    );
} else {
    createInfoNotice(__('Please connect your Selz account'));
}
