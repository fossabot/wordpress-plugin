export default ({ ariaLabel, children, isLoading }) => {
    return isLoading ? (
        <wp.components.Spinner />
    ) : (
        <div tabindex="0" role="group" aria-label={ariaLabel} style={{ maxHeight: '14em', overflow: 'auto' }}>
            {children}
        </div>
    );
};
