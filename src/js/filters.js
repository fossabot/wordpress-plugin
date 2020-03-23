const { InspectorAdvancedControls } = wp.blockEditor || wp.editor;
const { hasBlockSupport } = wp.blocks;
const { TextControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter, removeFilter } = wp.hooks;
const { __ } = wp.i18n;

/**
 * Remove custom class name controls
 */
removeFilter('editor.BlockEdit', 'core/editor/custom-class-name/with-inspector-control');

/**
 * Add custom class name controls back in for all but custom blocks
 */
addFilter(
    'editor.BlockEdit',
    `${namespace}/with-inspector-controls`,
    createHigherOrderComponent(
        BlockEdit => props => {
            const {
                attributes: { className },
                isSelected,
                name,
                setAttributes,
            } = props;
            const hasCustomClassName = hasBlockSupport(name, 'customClassName', true);
            const isCustomBlock = name.startsWith(namespace);

            if (hasCustomClassName && isSelected && !isCustomBlock) {
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
        },
        'withInspectorControls',
    ),
);
