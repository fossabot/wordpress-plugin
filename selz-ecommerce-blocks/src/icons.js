// TODO:
// - Look into why styles preview isn't working
// - Transforms
// - Re-order attrs inside components
// - Add Links Color panel to Store block
// - Look at Widget description

const { Path, SVG } = wp.components;

const Defs = () => (
    <defs>
        <linearGradient id="logo-gradient-a" x1="100%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stop-color="#C8318C" />
            <stop offset="100%" stop-color="#602BC6" />
        </linearGradient>
    </defs>
);

const WidgetIcon = <SVG style={{ width: 20, height: 20 }} aria-hidden="true" data-prefix="far" data-icon="tag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-tag fa-w-16 fa-3x"><Defs /><Path fill="url(#logo-gradient-a)" d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a47.998 47.998 0 0 0 14.059 33.941l211.882 211.882c18.745 18.745 49.137 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM259.886 463.996L48 252.118V48h204.118L464 259.882 259.886 463.996zM192 144c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z" class=""></Path></SVG>;
