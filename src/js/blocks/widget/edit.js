import BehaviorPanel from '../../components/BehaviorPanel';
import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import DisplayPanel from '../../components/DisplayPanel';
import Embed from '../../components/Embed';
import ProductPanel from '../../components/ProductPanel';
import WidthPanel from '../../components/WidthPanel';

const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

export default props => (
    <Fragment>
        <Embed {...props} isPreview />
        <InspectorControls>
            <ProductPanel {...props} />
            <BehaviorPanel {...props} />
            <WidthPanel {...props} />
            <DisplayPanel {...props} />
            <ButtonColorsPanel {...props} />
            <CheckoutColorsPanel {...props} />
        </InspectorControls>
    </Fragment>
);
