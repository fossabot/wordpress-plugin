import BehaviorPanel from '../../components/BehaviorPanel';
import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CategoryPanel from '../../components/CategoryPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import Embed from '../../components/Embed';
import LinksColorPanel from '../../components/LinksColorPanel';
import OptionsPanel from '../../components/OptionsPanel';
import StoreDisplayPanel from '../../components/StoreDisplayPanel';

const { InspectorControls } = wp.blockEditor || wp.editor;
const { withDispatch } = wp.data;
const { Fragment } = wp.element;

function Edit({ openGeneralSidebar, ...props }) {
    return (
        <Fragment>
            <Embed {...props} openGeneralSidebar={openGeneralSidebar} isPreview />
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
}

export default withDispatch(dispatch => {
    const { openGeneralSidebar } = dispatch('core/edit-post');
    return { openGeneralSidebar };
})(Edit);
