import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import Embed from '../../components/Embed';
import OptionsPanel from '../../components/OptionsPanel';
import ProductPanel from '../../components/ProductPanel';
import WidthPanel from '../../components/WidthPanel';

const { InspectorControls } = wp.editor;

export default props => [
    <Embed {...props} />,
    <InspectorControls>
        <ProductPanel {...props} />
        <OptionsPanel {...props} />
        <WidthPanel {...props} />
        <ButtonColorsPanel {...props} />
        <CheckoutColorsPanel {...props} />
    </InspectorControls>,
];
