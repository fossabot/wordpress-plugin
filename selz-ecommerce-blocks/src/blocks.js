// TODO:
// - Transforms
// - Clean up Embed and this

import button from './blocks/button/';
import store from './blocks/store/';
import widget from './blocks/widget/';

import './style.scss';
import './editor.scss';

const { dispatch } = wp.data;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

const { createInfoNotice } = dispatch('core/notices');

if (window.selz_globals) {
    [button, store, widget].forEach(({ name, settings }) =>
        registerBlockType(name, settings)
    );
} else {
    createInfoNotice(__('Please connect your Selz account'));
}
