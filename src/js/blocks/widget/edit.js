import BehaviorPanel from '../../components/BehaviorPanel';
import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import DisplayPanel from '../../components/DisplayPanel';
import Embed from '../../components/Embed';
import ProductPanel from '../../components/ProductPanel';
import WidthPanel from '../../components/WidthPanel';

const { InspectorControls } = wp.blockEditor || wp.editor;
const { withDispatch } = wp.data;
const { Fragment } = wp.element;

function Edit({ openGeneralSidebar, ...props }) {
    return (
        <Fragment>
            <Embed {...props} openGeneralSidebar={openGeneralSidebar} isPreview />
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
}

export default withDispatch(dispatch => {
    const { openGeneralSidebar } = dispatch('core/edit-post');
    return { openGeneralSidebar };
})(Edit);
