const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

export default ({ attributes, setAttributes }) => {
    const { showCategories, showPagination, showSearch } = attributes;

    return (
        <PanelBody title={__('Display')} initialOpen={false}>
            <ToggleControl
                label={__('Show Categories')}
                checked={showCategories}
                onChange={() => setAttributes({ showCategories: !showCategories })}
            />
            <ToggleControl
                label={__('Show Search')}
                checked={showSearch}
                onChange={() => setAttributes({ showSearch: !showSearch })}
            />
            <ToggleControl
                label={__('Show Pagination')}
                checked={showPagination}
                onChange={() => setAttributes({ showPagination: !showPagination })}
            />
        </PanelBody>
    );
};
