import ButtonColorsPanel from '../../components/ButtonColorsPanel';
import CheckoutColorsPanel from '../../components/CheckoutColorsPanel';
import DisplayPanel from '../../components/DisplayPanel';
import Embed from '../../components/Embed';
import LinksColorPanel from '../../components/LinksColorPanel';
import OptionsPanel from '../../components/OptionsPanel';

const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;

export default props => (
    <Fragment>
        <Embed {...props} isPreview />
        <InspectorControls>
            <OptionsPanel {...props} />
            <DisplayPanel {...props} />
            <ButtonColorsPanel {...props} />
            <LinksColorPanel {...props} />
            <CheckoutColorsPanel {...props} />
        </InspectorControls>
    </Fragment>
);
