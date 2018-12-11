import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
const { RichText } = wp.editor;

registerBlockType('selz-ecommerce-blocks/store', {
  title: __('Selz Store'),
  description: __('Block displaying your Selz shop-front.'),
  icon: 'store', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [
    __('Store'),
    __('Shop'),
  ],
	styles: [
		{
			name: 'default',
			label: __('Rounded'),
			isDefault: true
		},
		{
			name: 'outline',
			label: __('Outline')
		},
		{
			name: 'squared',
			label: __('Squared')
		},
	],
	attributes: {
		cover: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		author: {
			type: 'string',
			source: 'html',
			selector: '.book-author',
		},
		pages: {
			type: 'number',
		},
	},
	supports: {
		align: true,
		anchor: true,
		// customClassName: false,
	},

  edit(props) {
	const { content } = props.attributes;

	function onChangeContent(newContent) {
		props.setAttributes({ content: newContent });
	}  

    return createElement(RichText, {
		tagName: 'p',
		className: props.className,
		onChange: onChangeContent,
		value: content,
	});
  },

  save(props) {
    const { content } = props.attributes;

	  return createElement(RichText.Content, {
			tagName: 'p',
			className: props.className,
			value: content
		});
  },
});
