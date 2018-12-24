// TODO:
// - Clean up Embed and this
// - Debounce extra classNames

import button from './blocks/button/';
import store from './blocks/store/';
import widget from './blocks/widget/';

import './style.scss';
import './editor.scss';

const { dispatch, select } = wp.data;
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

wp.hooks.addFilter('blocks.switchToBlockType.transformedBlock', 'selz/foo', transformedBlock => {
    const { className } = transformedBlock.attributes;

    if (className) {
        const { getBlockStyles } = select('core/blocks');
        const blockClassNames = getBlockStyles('selz/button').map(style => `is-style-${style.name}`);

        transformedBlock.attributes.className = className
            .split(' ')
            .filter(className => className && !blockClassNames.includes(className));
    }

    return transformedBlock;
});
