import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import Embed from '../../components/Embed';
import LinksColorPanel from '../../components/LinksColorPanel';

const { InspectorControls } = wp.editor;

export default props => [
    <Embed {...props} isPreview />,
    <InspectorControls>
        <ButtonColorsPanel {...props} />
        <LinksColorPanel {...props} />
        <CheckoutColorsPanel {...props} />
    </InspectorControls>,
];
