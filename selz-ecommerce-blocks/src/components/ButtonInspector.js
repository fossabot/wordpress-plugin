import ProductPanel from './ProductPanel';
import OptionsPanel from './OptionsPanel';
import WidthPanel from './WidthPanel';
import ColorsPanel from './ColorsPanel';

const { InspectorControls } = wp.editor;

export default (props) => (
    <InspectorControls>
        <ProductPanel {...props} />
        <OptionsPanel {...props} />
        <WidthPanel {...props} />
        <ColorsPanel {...props} />
    </InspectorControls>
);
