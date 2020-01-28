import BehaviorPanel from '../../components/BehaviorPanel';
import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CategoryPanel from '../../components/CategoryPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import Embed from '../../components/Embed';
import LinksColorPanel from '../../components/LinksColorPanel';
import OptionsPanel from '../../components/OptionsPanel';
import StoreDisplayPanel from '../../components/StoreDisplayPanel';

const { InspectorControls } = wp.blockEditor;
const { Fragment } = wp.element;

export default props => (
    <Fragment>
        <Embed {...props} isPreview />
        <InspectorControls>
            <CategoryPanel {...props} />
            <BehaviorPanel {...props} />
            <StoreDisplayPanel {...props} />
            <OptionsPanel {...props} />
            <ButtonColorsPanel {...props} />
            <LinksColorPanel {...props} />
            <CheckoutColorsPanel {...props} />
        </InspectorControls>
    </Fragment>
);
