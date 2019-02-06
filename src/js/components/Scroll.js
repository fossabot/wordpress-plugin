export default ({ ariaLabel, children }) => (
    <div className="components-scroll" tabIndex="0" role="group" aria-label={ariaLabel}>
        {children}
    </div>
);
