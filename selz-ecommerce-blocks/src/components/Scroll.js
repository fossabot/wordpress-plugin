export default ({ ariaLabel, children }) => (
    <div className="product-list" tabindex="0" role="group" aria-label={ariaLabel}>
        {children}
    </div>
);
