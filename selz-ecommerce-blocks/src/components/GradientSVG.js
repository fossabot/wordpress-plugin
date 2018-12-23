const { withInstanceId } = wp.compose;
const { Path, SVG } = wp.components;

export default withInstanceId(({ children: { props }, instanceId }) => (
    <SVG viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id={`gradient-${instanceId}`} x1="100%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stop-color="#C8318C" />
            <stop offset="100%" stop-color="#602BC6" />
        </linearGradient>
        <Path fill={`url(#gradient-${instanceId})`} {...props} />
    </SVG>
));
