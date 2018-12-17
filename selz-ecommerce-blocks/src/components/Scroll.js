export default ({ ariaLabel, children }) => (
    <div className="foo" tabindex="0" role="group" aria-label={ariaLabel} style={{ maxHeight: '14em', overflow: 'auto' }}>
        {children}
    </div>
);
