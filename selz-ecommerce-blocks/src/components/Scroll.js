export default ({ ariaLabel, children }) => (
    <div className="components-scroll" tabindex="0" role="group" aria-label={ariaLabel}>
        {children}
    </div>
);
