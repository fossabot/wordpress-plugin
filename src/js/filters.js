const { hasBlockSupport } = wp.blocks;
const { TextControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { InspectorAdvancedControls } = wp.editor;
const { Fragment } = wp.element;
const { addFilter, removeFilter } = wp.hooks;
const { __ } = wp.i18n;

/**
 * Remove custom class name controls
 */
removeFilter('editor.BlockEdit', 'core/editor/custom-class-name/with-inspector-control');

/**
 * Add custom class name controls back in for all but Selz blocks
 */
addFilter('editor.BlockEdit', 'selz/with-inspector-controls', createHigherOrderComponent(BlockEdit => props => {
    const { attributes: { className }, isSelected, name, setAttributes } = props;
    const hasCustomClassName = hasBlockSupport(name, 'customClassName', true);
    const isSelzBlock = name.substring(0, 4) === 'selz';

    if (hasCustomClassName && isSelected && !isSelzBlock) {
        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorAdvancedControls>
                    <TextControl
                        label={__('Additional CSS Class')}
                        value={className || ''}
                        onChange={className => setAttributes({ className })}
                    />
                </InspectorAdvancedControls>
            </Fragment>
        );
    }

    return <BlockEdit {...props} />;
}, 'withInspectorControls'));
