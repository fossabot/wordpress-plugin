!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=12)}([function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return c});var r=window.izettle_globals.colors,o=wp.i18n,a=o.__,l=o.sprintf,i=[{label:a("Add to cart"),value:"add-to-cart"},{label:a("Buy"),value:"buy",text:a("Buy it now")},{label:a("View"),value:"view",text:a("Buy it now")}],c={izettle:{button:a("iZettle Button"),connectAccount:l(a("Connect your %s account"),"iZettle"),connectAccountNotice:l(a("%s blocks require a connection to your account."),"iZettle Ecommerce"),store:a("iZettle Store"),widget:a("iZettle Widget")},reckon:{button:a("Reckon Button"),connectAccount:l(a("Connect your %s account"),"Reckon"),connectAccountNotice:l(a("%s blocks require a connection to your account."),"Reckon Ecommerce"),store:a("Reckon Store"),widget:a("Reckon Widget")},selz:{button:a("Selz Button"),connectAccount:l(a("Connect your %s account"),"Selz"),connectAccountNotice:l(a("%s blocks require a connection to your account."),"Selz Ecommerce"),store:a("Selz Store"),widget:a("Selz Widget")}}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=window.izettle_globals,c=i.embed,u=i.env,s=wp.blockEditor.BlockIcon,p=wp.blocks.getBlockType,f=wp.components.Placeholder,m=wp.element,d=m.Component,h=m.Fragment,w=wp.i18n.__,b=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={didRender:!1},n}return a(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.clientId,n=e.openGeneralSidebar;t||this.forceUpdate(),n("edit-post/block")}},{key:"getEmbedProps",value:function(){var e=this.props,t=e.attributes,n=e.deprecated,r=t.action,o=t.buttonBackgroundColor,a=t.buttonTextColor,l=t.category,i=t.checkoutBackgroundColor,c=t.checkoutTextColor,s=t.description,p=t.linksColor,f=t.logos,m=t.modal,d=t.showCategories,h=t.showPagination,w=t.showSearch,b=t.squareImages,y=t.text,g=t.truncateTitles,v=t.width,E=t.url,x={action:r,category:l,colors:{buttons:{background:o,text:a},checkout:{background:i,text:c},links:p},description:s,logos:f,modal:m,showCategories:d,showPagination:h,showSearch:w,squareImages:b,style:this.getEmbedStyle(),text:y,truncateTitles:g,url:E,width:v};return n&&delete x.category,u&&(x.env=u),JSON.stringify(x)}},{key:"getEmbedStyle",value:function(){var e=this.props.className.split(" ");return e[1]?e[1].replace("is-style-",""):"price-right"}},{key:"render",value:function(){this.state.didRender||this.setState({didRender:!0});var e=this.props,t=e.attributes,n=t.text,r=t.type,o=t.url,a=e.className,l=e.clientId,i=e.deprecated,u=e.isPreview,m=e.name;if(!o&&!l)return wp.element.createElement(f,null);if(!o){var d=p(m),b=d.icon.src,y=d.title;return wp.element.createElement(f,{icon:wp.element.createElement(s,{icon:b}),label:y},w("Hold tight while we load your products \u2026"))}var g=this.getEmbedProps();return wp.element.createElement(h,null,wp.element.createElement("div",{"data-embed":r,className:!i&&a,key:l&&this.state.didRender?g:Math.random()},wp.element.createElement("script",{type:"text/props"},g)),!u&&wp.element.createElement(h,null,wp.element.createElement("script",{async:!0,src:c}),wp.element.createElement("noscript",null,wp.element.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer"},"store"===r?w("Shop now"):n))))}}]),t}(d);t.a=b},function(e,t){e.exports=lodash},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(2),i=(n.n(l),n(0)),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=wp.components,s=u.PanelBody,p=u.SelectControl,f=u.TextControl,m=u.ToggleControl,d=wp.element.Component,h=wp.i18n.__,w=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.debouncedSetText=Object(l.debounce)(n.setText,500),n}return a(t,e),c(t,[{key:"getActionText",value:function(e){var t=i.a.find(function(t){return t.value===e}),n=t.label;return t.text||n}},{key:"handleActionChange",value:function(e){var t=this.props,n=t.attributes,r=n.textWasSet,o=n.useDefaultText,a=t.setAttributes,l=this.getActionText(e),i={action:e};!1===r&&(i._text=l),(!1===r||o)&&(i.text=l),a(i)}},{key:"handleTextChange",value:function(e){this.props.setAttributes({_text:e,textWasSet:!0}),this.debouncedSetText(e)}},{key:"setText",value:function(e){this.props.setAttributes({text:e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.attributes,r=n._text,o=n.action,a=n.modal,l=n.useDefaultText,c=t.setAttributes;return wp.element.createElement(s,{title:h("Behavior"),initialOpen:!1},wp.element.createElement(p,{label:h("Action"),value:o,options:i.a,onChange:function(t){return e.handleActionChange(t)}}),wp.element.createElement(p,{label:h("Window Type"),value:a,options:[{label:h("Overlay"),value:!0},{label:h("New Tab"),value:!1}],onChange:function(e){return c({modal:"true"===e})}}),wp.element.createElement(f,{label:h("Text"),value:r,onChange:function(t){return e.handleTextChange(t)},disabled:l}),wp.element.createElement(m,{label:h("Use Default Text"),checked:l,onChange:function(){return c({useDefaultText:!l,text:l?r:e.getActionText(o)})}}))}}]),t}(d);t.a=w},function(e,t,n){"use strict";var r=wp.blockEditor,o=r.ContrastChecker,a=r.PanelColorSettings,l=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,r=t.buttonBackgroundColor,i=t.buttonTextColor;return wp.element.createElement(a,{title:l("Button Colors"),initialOpen:!1,colorSettings:[{value:r,onChange:function(e){return n({buttonBackgroundColor:e})},label:l("Background Color")},{value:i,onChange:function(e){return n({buttonTextColor:e})},label:l("Text Color")}]},wp.element.createElement(o,{backgroundColor:r,textColor:i}))}},function(e,t,n){"use strict";var r=wp.blockEditor,o=r.ContrastChecker,a=r.PanelColorSettings,l=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,r=t.checkoutBackgroundColor,i=t.checkoutTextColor;return wp.element.createElement(a,{title:l("Checkout Colors"),initialOpen:!1,colorSettings:[{value:r,onChange:function(e){return n({checkoutBackgroundColor:e})},label:l("Background Color")},{value:i,onChange:function(e){return n({checkoutTextColor:e})},label:l("Text Color")}]},wp.element.createElement(o,{backgroundColor:r,textColor:i}))}},function(e,t,n){"use strict";var r=n(7),o=wp.components,a=o.PanelBody,l=o.ToggleControl,i=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,o=t.description,c=t.logos,u=t.type;return wp.element.createElement(a,{title:i("Display"),initialOpen:!1},"widget"===u&&wp.element.createElement(l,{label:i("Show Description"),checked:o,onChange:function(){return n({description:!o})}}),wp.element.createElement(l,{label:i("Show Payment Logos"),checked:c,onChange:function(){return n({logos:!c})}}),wp.element.createElement(r.a,{attributes:t,setAttributes:n}))}},function(e,t,n){"use strict";var r=wp.components.ToggleControl,o=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,a=t.showCart;return wp.element.createElement(r,{label:o("Show Cart"),help:o("Preview your shopping cart."),checked:a,onChange:function(){n({showCart:!a}),document.body.classList.toggle("cart-visible")}})}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(2),c=(n.n(i),n(17)),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=wp.components,f=p.PanelBody,m=p.TextControl,d=wp.element.Component,h=wp.i18n.__,w=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.debouncedSearchProducts=Object(i.debounce)(n.searchProducts,500),n}return l(t,e),s(t,[{key:"componentDidMount",value:function(){this.fetchProducts(this.props.attributes.currentPage)}},{key:"componentWillUnmount",value:function(){this.debouncedSearchProducts.cancel()}},{key:"fetchProducts",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=this.props,o=n.attributes,a=o.pages,l=o.url,i=n.setAttributes,c=this.getRequest(t);i({request:c}),fetch(c.url).then(function(e){return e.json()}).then(function(n){var o=n.data,u=n.has_more;if(e.props.attributes.request.timestamp===c.timestamp){var s=o.filter(function(e){return e.short_url}),p={isLoading:!1,products:s,hasMore:u};s&&s.length&&(p.url=l||s[0].short_url,p.pages=Object.assign({},a,r({},t,{number:t,start:s[0].id,end:s[s.length-1].id})),p.currentPage=t),i(p)}},function(e){return i({isLoading:!1,error:e})})}},{key:"getRequest",value:function(e){var t=this.props.attributes,n=t.pages,r=t.query,o={action:"izettle_"+(r?"search":"get")+"_products",starting_after:1!==e?n[e-1].end:null,page:e,q:r};return{data:o,url:this.getUrl(o),timestamp:Date.now()}}},{key:"getUrl",value:function(e){var t=window,n=t.ajaxurl;return Object.keys(e).reduce(function(t,r){return e[r]?t+(t===n?"?":"&")+r+"="+e[r]:t},n)}},{key:"handleQueryChange",value:function(e){this.props.setAttributes({query:e,error:null}),this.debouncedSearchProducts()}},{key:"next",value:function(){this.searchProducts(this.props.attributes.currentPage+1)}},{key:"previous",value:function(){this.searchProducts(this.props.attributes.currentPage-1)}},{key:"searchProducts",value:function(e){this.props.setAttributes({isLoading:!0}),this.fetchProducts(e)}},{key:"render",value:function(){var e=this,t=this.props;return wp.element.createElement(f,{title:h("Product")},wp.element.createElement(m,{label:h("Search Products"),type:"search",value:t.attributes.query,className:"is-filter",onChange:function(t){return e.handleQueryChange(t)}}),wp.element.createElement(c.a,u({},t,{next:function(){return e.next()},previous:function(){return e.previous()}})))}}]),t}(d);t.a=w},function(e,t,n){"use strict";function r(e){var t=e.label,n=e.className,r=e.selected,o=e.help,u=e.instanceId,s=e.onChange,p=e.options,f=void 0===p?[]:p,m="inspector-radio-control-"+u,d=function(e){return s(e.target.value)};return!Object(l.isEmpty)(f)&&wp.element.createElement(c,{label:t,id:m,help:o,className:a()(n,"components-radio-control")},f.map(function(e,t){return wp.element.createElement("div",{key:m+"-"+t,className:"components-radio-control__option has-image"},wp.element.createElement("input",{id:m+"-"+t,className:"components-radio-control__input",type:"radio",name:m,value:e.value,onChange:d,checked:e.value===r,"aria-describedby":o?m+"__help":void 0}),wp.element.createElement("label",{htmlFor:m+"-"+t},wp.element.createElement(i.a,{src:e.image})," ",e.label))}))}var o=n(18),a=n.n(o),l=n(2),i=(n.n(l),n(19)),c=wp.components.BaseControl,u=wp.compose.withInstanceId;t.a=u(r)},function(e,t,n){"use strict";t.a=function(e){var t=e.ariaLabel,n=e.children;return wp.element.createElement("div",{className:"components-scroll",tabIndex:"0",role:"group","aria-label":t},n)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(2),i=(n.n(l),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),c=wp.components,u=c.PanelBody,s=c.RangeControl,p=c.ToggleControl,f=wp.element.Component,m=wp.i18n.__,d=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.debouncedSetWidth=Object(l.debounce)(n.setWidth,200),n}return a(t,e),i(t,[{key:"handleWidthChange",value:function(e){this.props.setAttributes({_width:e}),this.debouncedSetWidth(e)}},{key:"setWidth",value:function(e){this.props.setAttributes({width:String(e)})}},{key:"render",value:function(){var e=this,t=this.props,n=t.attributes,r=n._width,o=n.autoWidth,a=n.fluidWidth,l=n.type,i=t.setAttributes;return wp.element.createElement(u,{title:m("Width"),initialOpen:!1},"button"===l&&wp.element.createElement(p,{label:m("Automatic"),checked:o,onChange:function(){return i({autoWidth:!o,width:o?r:null})}}),!o&&wp.element.createElement(p,{label:m("Fluid (100%)"),checked:a,onChange:function(){return i({fluidWidth:!a,width:a?r:"100%"})}}),!o&&!a&&wp.element.createElement(s,{value:r,onChange:function(t){return e.handleWidthChange(t)},min:160,max:1e3,step:5}))}}]),t}(f);t.a=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(13),a=(n.n(o),n(14)),l=n(20),i=n(28),c=n(31),u=(n.n(c),n(32)),s=(n.n(u),r.c.izettle),p=s.connectAccount,f=s.connectAccountNotice,m=wp.blocks.registerBlockType,d=wp.data.dispatch,h=wp.url.addQueryArgs;window.izettle_globals.store?[a.a,l.a,i.a].forEach(function(e){var t=e.name,n=e.settings;m(t,n)}):d("core/notices").createInfoNotice(f,{actions:[{label:p,url:h("admin-post.php",{action:"connect_izettle"})}]})},function(e,t,n){var r=wp.blockEditor.InspectorAdvancedControls,o=wp.blocks.hasBlockSupport,a=wp.components.TextControl,l=wp.compose.createHigherOrderComponent,i=wp.element.Fragment,c=wp.hooks,u=c.addFilter,s=c.removeFilter,p=wp.i18n.__;s("editor.BlockEdit","core/editor/custom-class-name/with-inspector-control"),u("editor.BlockEdit","izettle/with-inspector-controls",l(function(e){return function(t){var n=t.attributes.className,l=t.isSelected,c=t.name,u=t.setAttributes,s=o(c,"customClassName",!0),f=c.startsWith("izettle");return s&&l&&!f?wp.element.createElement(i,null,wp.element.createElement(e,t),wp.element.createElement(r,null,wp.element.createElement(a,{label:p("Additional CSS Class"),value:n||"",onChange:function(e){return u({className:e})}}))):wp.element.createElement(e,t)}},"withInspectorControls"))},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=n(1),a=n(15),l=n(16),i=n(0),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=wp.components,s=u.G,p=u.Rect,f=u.SVG,m=wp.blocks,d=m.createBlock,h=m.getBlockAttributes,w=wp.i18n.__;t.a={name:"izettle/button",settings:{title:i.c.izettle.button,description:w("Prompt visitors to add to cart, buy now or view a store item."),category:"izettle-ecommerce",icon:wp.element.createElement(f,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(s,{fill:"none",transform:"translate(2 6)"},wp.element.createElement(p,{width:"20",height:"11",fill:i.b.primary,rx:"2"}),wp.element.createElement(p,{width:"7",height:"3",x:"3",y:"4",fill:"#FFF",rx:"1.5"}),wp.element.createElement(p,{width:"5",height:"3",x:"12",y:"4",fill:"#FFF",rx:"1.5"}))),styles:[{name:"price-right",label:w("Default"),isDefault:!0},{name:"price-left",label:w("Price Left")},{name:"price-above",label:w("Price Above")},{name:"price-below",label:w("Price Below")}],attributes:a.a,transforms:{to:[{type:"block",blocks:["izettle/widget"],transform:function(e){var t=(e.autoWidth,r(e,["autoWidth"])),n=h("izettle/widget"),o=n.description,a=n.type,l=n.width;return d("izettle/widget",Object.assign({},t,{description:o,type:a,width:l}))}}]},edit:l.a,save:function(e){return wp.element.createElement(o.a,e)},deprecated:[{attributes:a.a,save:function(e){return wp.element.createElement(o.a,c({},e,{deprecated:!0}))}}]}}},function(e,t,n){"use strict";var r=n(0),o=r.a[0],a=o.label,l=o.text,i=o.value,c=l||a,u=r.b.primary,s=r.b.white;t.a={_text:{type:"string",default:c},_width:{type:"number",default:320},action:{type:"string",default:i},autoWidth:{type:"boolean",default:!0},buttonBackgroundColor:{type:"string",default:u},buttonTextColor:{type:"string",default:s},checkoutBackgroundColor:{type:"string",default:u},checkoutTextColor:{type:"string",default:s},currentPage:{type:"number"},error:{type:"object"},fluidWidth:{type:"boolean",default:!1},hasMore:{type:"boolean"},isLoading:{type:"boolean",default:!0},logos:{type:"boolean",default:!1},modal:{type:"boolean",default:!0},pages:{type:"object"},products:{type:"array"},query:{type:"string",default:""},request:{type:"object"},showCart:{type:"boolean",default:!1},text:{type:"string",default:c},textWasSet:{type:"boolean",default:!1},type:{type:"string",default:"button"},url:{type:"string"},useDefaultText:{type:"boolean",default:!1},width:{type:"string"}}},function(e,t,n){"use strict";var r=n(3),o=n(4),a=n(5),l=n(6),i=n(1),c=n(8),u=n(11),s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=wp.blockEditor.InspectorControls,f=wp.data.useDispatch,m=wp.element.Fragment;t.a=function(e){var t=f("core/edit-post"),n=t.openGeneralSidebar;return wp.element.createElement(m,null,wp.element.createElement(i.a,s({},e,{openGeneralSidebar:n,isPreview:!0})),wp.element.createElement(p,null,wp.element.createElement(c.a,e),wp.element.createElement(r.a,e),wp.element.createElement(u.a,e),wp.element.createElement(l.a,e),wp.element.createElement(o.a,e),wp.element.createElement(a.a,e)))}},function(e,t,n){"use strict";var r=n(9),o=n(10),a=wp.components,l=a.Button,i=a.Notice,c=a.Spinner,u=wp.element.Fragment,s=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.next,a=e.previous,p=e.setAttributes,f=t.currentPage,m=t.error,d=t.hasMore,h=t.isLoading,w=t.products,b=t.request,y=t.url;return m?wp.element.createElement(i,{status:"error",isDismissible:!1},s("Failed to load products. Please try again.")):h?wp.element.createElement("div",{style:{textAlign:"center"}},wp.element.createElement(c,null)):w&&w.length?wp.element.createElement(u,null,wp.element.createElement(o.a,{ariaLabel:s("Products")},wp.element.createElement(r.a,{selected:y,options:w.map(function(e){var t=e.title,n=e.short_url,r=e.featured_image;return{label:t,value:n,image:r&&r.small}}),onChange:function(e){return p({url:e})}})),(1!==f||d)&&wp.element.createElement("div",{className:"components-pager"},wp.element.createElement(l,{isLink:!0,onClick:a,disabled:1===f},s("Prev")),wp.element.createElement(l,{isLink:!0,onClick:n,disabled:!d},s("Next")))):wp.element.createElement(i,{status:"info",isDismissible:!1},s(b.data.q?"No matches found":"No products found"))}},function(e,t,n){var r,o;!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var l=n.apply(null,r);l&&e.push(l)}else if("object"===o)for(var i in r)a.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}var a={}.hasOwnProperty;"undefined"!==typeof e&&e.exports?(n.default=n,e.exports=n):(r=[],void 0!==(o=function(){return n}.apply(t,r))&&(e.exports=o))}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=wp.components,c=i.G,u=i.Path,s=i.SVG,p=wp.element.Component,f=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={className:"is-loading"},n}return a(t,e),l(t,[{key:"setClassName",value:function(e){var t=e.target,n=t.naturalWidth,r=t.naturalHeight;n>r?this.setState({className:"is-landscape"}):r>n?this.setState({className:"is-portrait"}):r===n?this.setState({className:"is-square"}):this.setState({className:""})}},{key:"render",value:function(){var e=this,t=this.props.src;return wp.element.createElement("span",{className:"product-image media-placeholder media-ratio-1-1",role:"presentation"},t?wp.element.createElement("img",{className:this.state.className,src:t,alt:"",onLoad:function(t){return e.setClassName(t)},onError:function(t){return e.setClassName(t)}}):wp.element.createElement(s,{viewBox:"0 0 64 64",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(c,{fill:"none"},wp.element.createElement(u,{fill:"#DBE3E8",d:"M0 0h64v64H0z"}),wp.element.createElement(u,{fill:"#FFF",d:"M47.84 34.293L29.707 16.16a.484.484 0 0 0-.374-.16h-12.8c-.32 0-.533.213-.533.533v12.8c0 .16.053.267.16.374L34.293 47.84c.107.107.267.16.374.16a.576.576 0 0 0 .373-.16l12.8-12.8a.516.516 0 0 0 0-.747zM24 26.133A2.14 2.14 0 0 1 21.867 24 2.14 2.14 0 0 1 24 21.867 2.14 2.14 0 0 1 26.133 24 2.14 2.14 0 0 1 24 26.133z"}))))}}]),t}(p);t.a=f},function(e,t,n){"use strict";var r=n(1),o=n(21),a=n(22),l=n(0),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=l.b.primary,u=wp.components,s=u.G,p=u.Path,f=u.Rect,m=u.SVG,d=wp.i18n.__;t.a={name:"izettle/store",settings:{title:l.c.izettle.store,description:d("Embed your whole store."),category:"izettle-ecommerce",icon:wp.element.createElement(m,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(s,{fill:"none",fillRule:"evenodd",transform:"translate(2 2)"},wp.element.createElement(s,{transform:"translate(11 11)"},wp.element.createElement(f,{width:"8",height:"8",x:".5",y:".5",stroke:"#DBE3E8",rx:"1"}),wp.element.createElement(p,{fill:"#DBE3E8",fillOpacity:".5",fillRule:"nonzero",d:"M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z"}),wp.element.createElement(f,{width:"2",height:"1",x:"2",y:"6",fill:c,fillRule:"nonzero",rx:".5"}),wp.element.createElement(f,{width:"2",height:"1",x:"5",y:"6",fill:c,fillRule:"nonzero",rx:".5"})),wp.element.createElement(s,{transform:"translate(0 11)"},wp.element.createElement(f,{width:"8",height:"8",x:".5",y:".5",stroke:"#DBE3E8",rx:"1"}),wp.element.createElement(p,{fill:"#DBE3E8",fillOpacity:".5",fillRule:"nonzero",d:"M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z"}),wp.element.createElement(f,{width:"2",height:"1",x:"2",y:"6",fill:c,fillRule:"nonzero",rx:".5"}),wp.element.createElement(f,{width:"2",height:"1",x:"5",y:"6",fill:c,fillRule:"nonzero",rx:".5"})),wp.element.createElement(s,{transform:"translate(11)"},wp.element.createElement(f,{width:"8",height:"8",x:".5",y:".5",stroke:"#DBE3E8",rx:"1"}),wp.element.createElement(p,{fill:"#DBE3E8",fillOpacity:".5",fillRule:"nonzero",d:"M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z"}),wp.element.createElement(f,{width:"2",height:"1",x:"2",y:"6",fill:c,fillRule:"nonzero",rx:".5"}),wp.element.createElement(f,{width:"2",height:"1",x:"5",y:"6",fill:c,fillRule:"nonzero",rx:".5"})),wp.element.createElement(f,{width:"8",height:"8",x:".5",y:".5",stroke:"#DBE3E8",rx:"1"}),wp.element.createElement(p,{fill:"#DBE3E8",fillOpacity:".5",fillRule:"nonzero",d:"M1 0h7a1 1 0 0 1 1 1v4H0V1a1 1 0 0 1 1-1z"}),wp.element.createElement(f,{width:"2",height:"1",x:"2",y:"6",fill:c,fillRule:"nonzero",rx:".5"}),wp.element.createElement(f,{width:"2",height:"1",x:"5",y:"6",fill:c,fillRule:"nonzero",rx:".5"}))),attributes:o.a,edit:a.a,save:function(e){return wp.element.createElement(r.a,e)},deprecated:[{attributes:o.a,save:function(e){return wp.element.createElement(r.a,i({},e,{deprecated:!0}))}}]}}},function(e,t,n){"use strict";var r=n(0),o=r.a[0],a=o.label,l=o.text,i=o.value,c=l||a,u=r.b.primary,s=r.b.white;t.a={_text:{type:"string",default:c},action:{type:"string",default:i},buttonBackgroundColor:{type:"string",default:u},buttonTextColor:{type:"string",default:s},categories:{type:"array"},category:{type:"string",default:""},checkoutBackgroundColor:{type:"string",default:u},checkoutTextColor:{type:"string",default:s},error:{type:"object"},isLoading:{type:"boolean",default:!0},linksColor:{type:"string",default:u},modal:{type:"boolean",default:!0},query:{type:"string",default:""},showCart:{type:"boolean",default:!1},showCategories:{type:"boolean",default:!0},showPagination:{type:"boolean",default:!0},showSearch:{type:"boolean",default:!0},squareImages:{type:"boolean",default:!0},text:{type:"string",default:c},textWasSet:{type:"boolean",default:!1},truncateTitles:{type:"boolean",default:!0},type:{type:"string",default:"store"},url:{type:"string",default:"http://"+window.izettle_globals.store.name},useDefaultText:{type:"boolean",default:!1}}},function(e,t,n){"use strict";var r=n(3),o=n(4),a=n(23),l=n(5),i=n(1),c=n(25),u=n(26),s=n(27),p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f=wp.blockEditor.InspectorControls,m=wp.data.useDispatch,d=wp.element.Fragment;t.a=function(e){var t=m("core/edit-post"),n=t.openGeneralSidebar;return wp.element.createElement(d,null,wp.element.createElement(i.a,p({},e,{openGeneralSidebar:n,isPreview:!0})),wp.element.createElement(f,null,wp.element.createElement(a.a,e),wp.element.createElement(r.a,e),wp.element.createElement(s.a,e),wp.element.createElement(u.a,e),wp.element.createElement(o.a,e),wp.element.createElement(c.a,e),wp.element.createElement(l.a,e)))}},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(24),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=wp.components,s=u.PanelBody,p=u.TextControl,f=wp.element.Component,m=wp.i18n.__,d=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),c(t,[{key:"componentDidMount",value:function(){this.fetchCategories()}},{key:"fetchCategories",value:function(){var e=this.props,t=e.attributes.category,n=e.setAttributes;fetch(window.ajaxurl+"?action=izettle_get_categories").then(function(e){return e.json()}).then(function(e){var o=e.data,a=function(e){return"all"===e.slug},l=[o.find(a)].concat(r(o.filter(function(e){return!a(e)})));l[0].id=t,n({isLoading:!1,categories:l,category:t||l&&l.length&&l[0].id})},function(e){return n({isLoading:!1,error:e})})}},{key:"render",value:function(){var e=this.props,t=e.attributes.query,n=e.setAttributes;return wp.element.createElement(s,{title:m("Category")},wp.element.createElement(p,{label:m("Search Categories"),type:"search",value:t,className:"is-filter",onChange:function(e){return n({query:e})}}),wp.element.createElement(i.a,e))}}]),t}(f);t.a=d},function(e,t,n){"use strict";var r=n(9),o=n(10),a=wp.components,l=a.Notice,i=a.Spinner,c=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,a=t.categories,u=t.category,s=t.error,p=t.isLoading,f=t.query;return s?wp.element.createElement(l,{status:"error",isDismissible:!1},c("Failed to load categories. Please try again.")):p?wp.element.createElement("div",{style:{textAlign:"center"}},wp.element.createElement(i,null)):(f&&(a=a.filter(function(e){var t=e.title;return!f||t.toLowerCase().includes(f)})),a&&a.length?wp.element.createElement(o.a,{ariaLabel:c("Categories")},wp.element.createElement(r.a,{selected:u,options:a.map(function(e){var t=e.title,n=e.id,r=e.image;return{label:t,value:n,image:r&&r.small}}),onChange:function(e){return n({category:e})}})):wp.element.createElement(l,{status:"info",isDismissible:!1},c(f?"No matches found":"No categories found")))}},function(e,t,n){"use strict";var r=wp.blockEditor.PanelColorSettings,o=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,a=t.linksColor;return wp.element.createElement(r,{title:o("Links Color"),initialOpen:!1,colorSettings:[{value:a,onChange:function(e){return n({linksColor:e})},label:o("Color")}]})}},function(e,t,n){"use strict";var r=wp.components,o=r.PanelBody,a=r.ToggleControl,l=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,r=t.squareImages,i=t.truncateTitles;return wp.element.createElement(o,{title:l("Options"),initialOpen:!1},wp.element.createElement(a,{label:l("Square Images"),help:l("Product images in your embed will be cropped square."),checked:r,onChange:function(){return n({squareImages:!r})}}),wp.element.createElement(a,{label:l("Truncate Titles"),help:l("Truncate product titles to improve uniformity."),checked:i,onChange:function(){return n({truncateTitles:!i})}}))}},function(e,t,n){"use strict";var r=n(7),o=wp.components,a=o.PanelBody,l=o.ToggleControl,i=wp.i18n.__;t.a=function(e){var t=e.attributes,n=e.setAttributes,o=t.showCategories,c=t.showPagination,u=t.showSearch;return wp.element.createElement(a,{title:i("Display"),initialOpen:!1},wp.element.createElement(l,{label:i("Show Categories"),checked:o,onChange:function(){return n({showCategories:!o})}}),wp.element.createElement(l,{label:i("Show Search"),checked:u,onChange:function(){return n({showSearch:!u})}}),wp.element.createElement(l,{label:i("Show Pagination"),checked:c,onChange:function(){return n({showPagination:!c})}}),wp.element.createElement(r.a,{attributes:t,setAttributes:n}))}},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=n(1),a=n(29),l=n(30),i=n(0),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=wp.components,s=u.G,p=u.Path,f=u.Rect,m=u.SVG,d=wp.blocks,h=d.createBlock,w=d.getBlockAttributes,b=wp.i18n.__;t.a={name:"izettle/widget",settings:{title:i.c.izettle.widget,description:b("Feature a store item by displaying a preview with a call to action."),category:"izettle-ecommerce",icon:wp.element.createElement(m,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},wp.element.createElement(s,{fill:"none",fillRule:"evenodd",transform:"translate(2 2)"},wp.element.createElement(f,{width:"19",height:"19",x:".5",y:".5",stroke:"#DBE3E8",rx:"2"}),wp.element.createElement(p,{fill:"#DBE3E8",fillOpacity:".5",fillRule:"nonzero",d:"M2 0h16a2 2 0 0 1 2 2v5H0V2a2 2 0 0 1 2-2z"}),wp.element.createElement(s,{fillRule:"nonzero",transform:"translate(3 12)"},wp.element.createElement(f,{width:"14",height:"5",fill:i.b.primary,rx:"1"}),wp.element.createElement(f,{width:"5.6",height:"1",x:"1.4",y:"2",fill:"#FFF",rx:".5"}),wp.element.createElement(f,{width:"4",height:"1",x:"8.6",y:"2",fill:"#FFF",rx:".5"})),wp.element.createElement(s,{fill:"#DBE3E8",fillRule:"nonzero",transform:"translate(3 9)"},wp.element.createElement(f,{width:"3",height:"1",rx:".5"}),wp.element.createElement(f,{width:"2",height:"1",x:"4",rx:".5"}),wp.element.createElement(f,{width:"3",height:"1",x:"7",rx:".5"}),wp.element.createElement(f,{width:"3",height:"1",x:"11",rx:".5"})))),attributes:a.a,transforms:{to:[{type:"block",blocks:["izettle/button"],transform:function(e){var t=(e.description,r(e,["description"])),n=w("izettle/button"),o=n.autoWidth,a=n.type,l=n.width;return h("izettle/button",Object.assign({},t,{autoWidth:o,type:a,width:l}))}}]},edit:l.a,save:function(e){return wp.element.createElement(o.a,e)},deprecated:[{attributes:a.a,save:function(e){return wp.element.createElement(o.a,c({},e,{deprecated:!0}))}}]}}},function(e,t,n){"use strict";var r=n(0),o=r.a[0],a=o.label,l=o.text,i=o.value,c=l||a,u=r.b.primary,s=r.b.white;t.a={_text:{type:"string",default:c},_width:{type:"number",default:320},action:{type:"string",default:i},buttonBackgroundColor:{type:"string",default:u},buttonTextColor:{type:"string",default:s},checkoutBackgroundColor:{type:"string",default:u},checkoutTextColor:{type:"string",default:s},currentPage:{type:"number"},description:{type:"boolean",default:!0},error:{type:"object"},fluidWidth:{type:"boolean",default:!1},hasMore:{type:"boolean"},isLoading:{type:"boolean",default:!0},logos:{type:"boolean",default:!1},modal:{type:"boolean",default:!0},pages:{type:"object"},products:{type:"array"},query:{type:"string",default:""},request:{type:"object"},showCart:{type:"boolean",default:!1},text:{type:"string",default:c},textWasSet:{type:"boolean",default:!1},type:{type:"string",default:"widget"},url:{type:"string"},useDefaultText:{type:"boolean",default:!1},width:{type:"string",default:320}}},function(e,t,n){"use strict";var r=n(3),o=n(4),a=n(5),l=n(6),i=n(1),c=n(8),u=n(11),s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=wp.blockEditor.InspectorControls,f=wp.data.useDispatch,m=wp.element.Fragment;t.a=function(e){var t=f("core/edit-post"),n=t.openGeneralSidebar;return wp.element.createElement(m,null,wp.element.createElement(i.a,s({},e,{openGeneralSidebar:n,isPreview:!0})),wp.element.createElement(p,null,wp.element.createElement(c.a,e),wp.element.createElement(r.a,e),wp.element.createElement(u.a,e),wp.element.createElement(l.a,e),wp.element.createElement(o.a,e),wp.element.createElement(a.a,e)))}},function(e,t){},function(e,t){}]);