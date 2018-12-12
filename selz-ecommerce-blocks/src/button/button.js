// import CustomButton from '../embeds/src/embeds/Button';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, BlockControls } = wp.editor;
const {
    PanelBody,
    TextareaControl,
    TextControl,
    Dashicon,
    Toolbar,
    Button,
    Tooltip,
    DropdownMenu,
    ToggleControl,
    SelectControl
} = wp.components;
const { createElement } = wp.element;

registerBlockType('selz-ecommerce-blocks/store', {
    title: __('Selz Store'),
    description: __('Block displaying your Selz shop-front.'),
    icon: 'store',
    category: 'common',
    keywords: [
        __('Store'),
        __('Shop'),
    ],
    styles: [
        {
            name: 'price-right',
            label: __('Price on right'),
            isDefault: true
        },
        {
            name: 'price-left',
            label: __('Price on left')
        },
        {
            name: 'price-above',
            label: __('Price above')
        },
        {
            name: 'price-below',
            label: __('Price below')
        },
    ],
    attributes: {
        action: {
            type: 'string',
            default: 'view'
        },
        text: {
            type: 'string',
        },
        logos: {
            type: 'boolean',
            default: false,
        },
    },

    edit: ({ attributes, className, setAttributes }) => {
        const handleToggle = value => {
            setAttributes({ logos: !attributes.logos });
        }

        const handleSelect = value => {
            setAttributes({ action: value });
        }

        const handleText = value => {
            setAttributes({ text: value });
        }

        const colors = {
            "buttons": {
                "background": "#f9b642",
                "text": "#ffffff"
            },
            "checkout": {
                "background": "#f9b642",
                "text": "#ffffff"
            }
        };

        return [
            <div className={className}>
                {/* <CustomButton
                    colors={colors}
                    url="https://selz.co/N1EsMz8or"
                    modal={true}
                    text={attributes.text}
                /> */}
            </div>,
            <InspectorControls key="inspector">
                <PanelBody title={__('Button Settings')}>
                    <SelectControl
                        label="Action"
                        value={attributes.action}
                        options={[
                            { label: 'Add to cart', value: 'addToCart' },
                            { label: 'Buy now', value: 'buyNow' },
                            { label: 'View', value: 'view' }
                        ]}
                        onChange={handleSelect}
                    />

                    <TextControl
                        label={__('Text')}
                        onChange={handleText}
                        value={attributes.text}
                    />

                    <ToggleControl
                        label={__('Show payment logos')}
                        checked={attributes.logos}
                        onChange={handleToggle}
                    />
                </PanelBody>
            </InspectorControls>
        ];
    },

    save(props) {
        const { action, logos } = props.attributes;
        const foo = {
            "action": action,
            "colors": {
                "buttons": {
                    "background": "#f9b642",
                    "text": "#ffffff"
                },
                "checkout": {
                    "background": "#f9b642",
                    "text": "#ffffff"
                }
            },
            "logos": logos,
            "modal": true,
            "url": "http://selz.co/1rvb96h"
        };

        return (
            <div>
                <h5>Settings:</h5>
                <div data-embed="button">
                    <script type="text/props">
                        {JSON.stringify(foo)}
                    </script>
                </div>
                <script async src="https://embeds.selzstatic.com/1/loader.js"></script>
                <noscript><a href="http://selz.co/1rvb96h" target="_blank">Add to cart</a></noscript>
            </div>
        );
    },
});
