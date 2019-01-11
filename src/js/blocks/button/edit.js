import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import Embed from '../../components/Embed';
import OptionsPanel from '../../components/OptionsPanel';
import ProductPanel from '../../components/ProductPanel';
import WidthPanel from '../../components/WidthPanel';

const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

export default props => (
    <Fragment>
        <Embed {...props} isPreview />
        <InspectorControls>
            <ProductPanel {...props} />
            <OptionsPanel {...props} />
            <WidthPanel {...props} />
            <ButtonColorsPanel {...props} />
            <CheckoutColorsPanel {...props} />
        </InspectorControls>
    </Fragment>
);
