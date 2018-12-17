import ProductPanel from './ProductPanel';

const { InspectorControls } = wp.editor;

export default (props) => (
    <InspectorControls>
        <ProductPanel {...props} />
    </InspectorControls>
);
