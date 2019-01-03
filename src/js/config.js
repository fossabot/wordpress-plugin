const { colors, resources } = window.selz_block_globals;

export const actionOptions = Object.keys(resources).map(key => ({
    label: resources[key],
    value: resources[key].replace(/ /g, '-').toLowerCase(),
}));

export { colors };
