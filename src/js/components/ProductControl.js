import classnames from 'classnames';
import { isEmpty } from 'lodash';
import ProductImage from './ProductImage';

const { BaseControl } = wp.components;
const { withInstanceId } = wp.compose;

function ProductControl({ label, className, selected, help, instanceId, onChange, options = [] }) {
    const id = `inspector-radio-control-${instanceId}`;
    const onChangeValue = event => onChange(event.target.value);

    return (
        !isEmpty(options) && (
            <BaseControl
                label={label}
                id={id}
                help={help}
                className={classnames(className, 'components-radio-control')}
            >
                {options.map((option, index) => (
                    <div key={`${id}-${index}`} className="components-radio-control__option has-image">
                        <input
                            id={`${id}-${index}`}
                            className="components-radio-control__input"
                            type="radio"
                            name={id}
                            value={option.value}
                            onChange={onChangeValue}
                            checked={option.value === selected}
                            aria-describedby={!!help ? `${id}__help` : undefined}
                        />
                        <label htmlFor={`${id}-${index}`}>
                            <ProductImage src={option.image} /> {option.label}
                        </label>
                    </div>
                ))}
            </BaseControl>
        )
    );
}

export default withInstanceId(ProductControl);
