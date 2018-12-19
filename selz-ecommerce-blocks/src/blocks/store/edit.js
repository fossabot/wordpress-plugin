import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import Embed from '../../components/Embed';

const { InspectorControls } = wp.editor;

export default props => [
    <Embed {...props} />,
    <InspectorControls>
        <ButtonColorsPanel {...props} />
        <CheckoutColorsPanel {...props} />
    </InspectorControls>
];
