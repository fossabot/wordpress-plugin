function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,e){var n=[],i=!0,a=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){a=!0,r=t}finally{try{i||null==o.return||o.return()}finally{if(a)throw r}}return n}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n,i=0;i<e.length;i++)(n=e[i]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n,i,a=Object(this),r=a.length>>>0;if(0===r)return!1;for(var s=0|e,o=Math.max(0<=s?s:r-Math.abs(s),0);o<r;){if((n=a[o])===(i=t)||"number"==typeof n&&"number"==typeof i&&isNaN(n)&&isNaN(i))return!0;o++}return!1}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),n=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var i=arguments[1],a=0;a<n;){var r=e[a];if(t.call(i,r,a,e))return r;a++}},configurable:!0,writable:!0}),String.prototype.endsWith||(String.prototype.endsWith=function(t,e){return(void 0===e||e>this.length)&&(e=this.length),this.substring(e-t.length,e)===t}),String.prototype.includes||(String.prototype.includes=function(t,e){return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),document.addEventListener("DOMContentLoaded",function(){function n(){this.style.setProperty("--value","".concat(function(){var t=this.max||100,e=this.min||0;return(this.value-e)/(t-e)*100}.call(this),"%"))}function i(e){"function"==typeof e.set||(n.call(e),t.forEach(function(t){e.addEventListener(t,n,!1)}),Object.defineProperty(e,"set",{value:function(t){null!==t&&"number"==typeof t&&(this.value=t),n.call(this)}}))}function e(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document.body,e='input[type="range"]';t instanceof HTMLElement&&(t.matches(e)&&(t=t.parentNode),Array.from(t.querySelectorAll(e)).forEach(i))}if("WebkitAppearance"in document.documentElement.style&&Array.from){var t=["input","change","update"];new MutationObserver(function(t){t.forEach(function(t){t.addedNodes.forEach(function(t){e(t)})})}).observe(document.body,{childList:!0,subtree:!0}),e()}}),function(n){n&&(n.expr.filters.loaded=function(t){var e=n(t);if(e.is("img"))return t.complete||"complete"===t.readyState||4===t.readyState||0!==t.naturalHeight;if(e.is("iframe"))try{return"complete"===(t.contentDocument||t.contentWindow.document).readyState}catch(t){return!1}return!1})}(jQuery),document.addEventListener("focusout",function(t){t.target.classList.remove("tab-focus")}),document.addEventListener("keydown",function(t){9!==t.keyCode||window.setTimeout(function(){document.activeElement.classList.add("tab-focus")},0)}),function(i){var t=function(){"use strict";function t(){_classCallCheck(this,t),this.selectors={container:".js-tab-container",tab:'[role="tab"]',panel:'[role="tabpanel"]'}}return _createClass(t,[{key:"show",value:function(t){var e=t.parents(this.selectors.container),n=i("#".concat(t.attr("aria-controls")));i(this.selectors.tab,e).attr("aria-selected","false"),t.attr("aria-selected","true"),i(this.selectors.panel,e).attr("aria-hidden","true"),n.attr("aria-hidden","false")}},{key:"handleClick",value:function(t){t.preventDefault(),this.show(i(t.target))}},{key:"handleKey",value:function(t){if([37,39].includes(t.which)){var e=i(t.target);if("true"===e.attr("aria-selected")){var n=e.parent("li")[39===t.which?"next":"prev"]("li").find(this.selectors.tab);n&&(n.focus(),this.show(n))}}}},{key:"build",value:function(){var e=this,t="".concat(this.selectors.container," ").concat(this.selectors.tab);i(document.body).on("click",t,function(t){e.handleClick(t)}).on("keydown",t,function(t){e.handleKey(t)})}}]),t}();i(function(){(new t).build()})}(jQuery),function(o){var c=function(t,e){t.attr("hidden",e),t.find(":input").prop("disabled",e)},t=function(){"use strict";function i(t,e){var n=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2];_classCallCheck(this,i),this.$form=t,!n&&this.$form.isSetup||(this.$form.isSetup=!0,this.namespace=e,this.selectors={colorPicker:".js-color-picker",productList:".js-product-list"},this.init(),this.listeners())}return _createClass(i,[{key:"get",value:function(e){return this.$form.serializeArray().find(function(t){return t.name===e||t.name.endsWith("[".concat(e,"]"))})}},{key:"getValue",value:function(t){var e=this.get(t);return e?e.value:null}},{key:"listeners",value:function(){var t=this;this.$form.on("input",function(){return t.handleInput()})}},{key:"handleInput",value:function(){var a=this.getValue("type");if(a){this.$form.find("[data-type]").each(function(t,e){var n=o(e),i=n.data("type").split(",");c(n,!i.includes(a))});var t=this.$form.find('[name="auto_width"]'),e="button"===a&&t.is(":checked"),n=this.$form.find('[name="fluid_width"]'),i=n.is(":checked"),r=this.$form.find('[name="width"]');c(n.parent(".control"),e),c(r.parent(".control"),e||i);var s=this.getValue("action");this.$form.find('[name="'.concat(this.get("interact").name,'"]')).parents(".control-group").attr("hidden","add-to-cart"===s)}}},{key:"setupColorPickers",value:function(){this.$form.find(this.selectors.colorPicker).each(function(t,e){var n=o(e);n.hasClass("has-colorpicker")||n.addClass("has-colorpicker").wpColorPicker().removeClass("wp-color-picker")})}},{key:"setupProductList",value:function(){var t=this.$form.find(this.selectors.productList);t.length&&new window.PluginProductList(t,this.namespace).fetch()}},{key:"init",value:function(){this.handleInput(),this.setupColorPickers(),this.setupProductList()}}]),i}();window.PluginForm=t}(jQuery),function(o){var n=function(){"use strict";function e(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";_classCallCheck(this,e),this.$element=o(".".concat(t,"-modal")),this.$element.length&&(this.namespace=t,this.$backdrop=o(".js-".concat(t,"-modal-backdrop")),this.$controls=o(".js-".concat(t,"-modal-controls")),this.$close=this.$element.find('[data-modal="close"]'),this.form=null,this.$form=this.$element.find("form"),this.$submit=this.$form.find(":submit"),this.loading=!1,this.shown=!1,this.updating=!1,this.listeners())}return _createClass(e,[{key:"enforceFocus",value:function(){var e=this;o(document).off("focusin.modal").on("focusin.modal",function(t){e.$element[0]===t.target||e.$element.has(t.target).length||e.$element.trigger("focus")})}},{key:"setUpdateMode",value:function(t){this.updating=t,this.$submit.find(".is-update").attr("hidden",!t),this.$submit.find(".is-new").attr("hidden",t)}},{key:"validate",value:function(){if(null===this.form)return!1;var t=this.$form.get(0).checkValidity();return"product"===this.form.getValue("kind")&&(t=t&&null!==this.form.getValue("link")),this.$submit.prop("disabled",!t),t}},{key:"setKind",value:function(t){this.$kind||(this.$kind=o("<input>").attr({type:"hidden",name:"kind"}).appendTo(this.$form)),this.$kind.val(t)}},{key:"listeners",value:function(){var e=this;this.$form.on("input change click",function(){e.validate()}),this.$form.on("input change",'input[type="range"]',function(t){var e=o(t.target);o('output[for="'.concat(e.attr("id"),'"]')).prop("value",e.val())}),this.$close.on("click",function(t){t.preventDefault(),e.hide()}),this.$form.on("submit",function(t){t.preventDefault(),e.insert()}),o(document).on("keyup",function(t){27!==t.keyCode||e.hide()}),this.$element.on("updated.products",function(){e.validate()})}},{key:"load",value:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=window.ajaxurl,i=window["".concat(this.namespace,"_globals")],a=i.action,r=i.nonce;if(!this.loading&&"string"===o.type(n)&&n.length){this.setTitle("Loading..."),this.loading=!0,this.$submit.prop("disabled",!0);var s=o.extend({},this.$form.serializeArray().reduce(function(t,e){return t[e.name]=e.value,t},{}),t);o.post(n,{action:a,nonce:r,data:o.param(s)},function(t){e.$controls.html(t),e.setTitle(e.$controls.find("legend").html()),e.loading=!1,e.form=new window.PluginForm(e.$form,e.namespace),e.validate()})}}},{key:"setTitle",value:function(t){this.$form.find("header h1").html(t)}},{key:"hide",value:function(){this.shown&&(this.shown=!1,this.$backdrop.attr("hidden",!this.shown),this.$element.attr("hidden",!this.shown))}},{key:"show",value:function(t){if(!this.shown&&window.wpActiveEditor){this.setKind(t);var e=window.tinymce.get(window.wpActiveEditor).selection.getNode(),a={},n=!1;if(e){var i=e.innerHTML,r=window["".concat(this.namespace,"_globals")].slug;i.startsWith("[".concat(r))&&(i.match(/[\w-_]+=".+?"/g).forEach(function(t){var e=_slicedToArray(t.match(/([\w-_]+)="(.+?)"/),3),n=e[1],i=e[2];a[n]=i}),n=!0)}this.setUpdateMode(n),o(".".concat(this.namespace,"-modal-controls")).html('\n                <div class="text-center padding-6">\n                    <span class="loader" aria-hidden="true"></span>\n                    <p class="margin-0 margin-top-2">Loading&hellip;</p>\n                </div>\n            '),this.shown=!0,this.$backdrop.attr("hidden",!this.shown),this.$element.attr("hidden",!this.shown),this.$close.focus(),this.load(a),this.enforceFocus()}}},{key:"insert",value:function(){var t=window.tinymce.get(window.wpActiveEditor);if(t&&this.validate()){this.hide();var e=this.$form.serializeArray(),n=e.find(function(t){return"type"===t.name}),i=["kind"];"store"===n?i.push("action","button_text","show_description","show_logos","interact","link","width","auto_width","fluid_width"):(i.push("store_link","link_color"),"button"===n?i.push("show_description"):"widget"===n&&i.push("auto_width"));var a=e.filter(function(t){return!i.includes(t.name)}).map(function(t){var e=t.name,n=t.value;return"fluid_width"===e&&(e="width",n="100%"),"".concat(e,'="').concat(n,'"')}).join(" "),r=window["".concat(this.namespace,"_globals")].slug,s="[".concat(r," ").concat(a,"]");t.execCommand("mceBeginUndoLevel"),this.updating?t.selection.getNode().innerHTML=s:t.execCommand("mceInsertContent",!1,s),t.execCommand("mceEndUndoLevel")}}}]),e}();o(function(){var r={};o(".js-open-modal").each(function(t,e){var n=o(e),i=n.data("namespace");r[i]=r[i]||[],r[i].push(n)}),Object.keys(r).forEach(function(t){var i=new n(t),e=o(o.map(r[t],function(t){return t.get()})),a="is-bound";e.each(function(t,e){var n=o(e);n.hasClass(a)||n.on("click",function(t){i.show(o(t.target).data("type"))}).addClass(a)})})})}(jQuery),function(a){a(document).on("ready widget-added widget-updated",function(){a(".widgets-sortables > div").each(function(t,e){var n=a(e),i=n.attr("id");void 0!==i&&["selz","izettle"].filter(function(t){return i.includes(t)}).forEach(function(t){return new window.PluginForm(n.find("form"),t)})})})}(jQuery),function(a){var r=function(){},e=function(){"use strict";function i(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:r,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:r;_classCallCheck(this,i),this.request=t,this.timestamp=Date.now(),this.callback=e,this.fail=n}return _createClass(i,[{key:"send",value:function(){var i=this;a.ajax(this.request).then(function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return i.callback.apply(i,[i].concat(e))}).fail(function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return i.fail.apply(i,[i].concat(e))})}}]),i}(),t=function t(e,n,i){"use strict";_classCallCheck(this,t),this.number=e,this.start=n,this.end=i},n=function(){"use strict";function i(t,e,n){_classCallCheck(this,i),this.config=a.extend(!0,{limit:50,classNames:{landscape:"is-landscape",portrait:"is-portrait",square:"is-square",loading:"is-loading"}},n),this.$element=t,this.namespace=e,this.$list=t.find(".product-list"),this.$search=t.find('[type="search"]'),this.$pager=t.find(".product-pager"),this.$previous=this.$pager.find('[data-page="previous"]'),this.$next=this.$pager.find('[data-page="next"]'),this.searchTimer=null,this.inputName=t.data("input-name"),this.selected=t.data("selected"),this.defaultImage=t.data("default-image"),this.request=null,this.resetPager(),this.query=null,this.last=null,this.listeners()}return _createClass(i,[{key:"listeners",value:function(){var e=this;this.$search.on("input",function(t){window.clearTimeout(e.searchTimer),e.searchTimer=window.setTimeout(function(){e.query=a(t.target).val(),e.resetPager(),e.fetch()},500)}),this.$list.on("input",":radio",function(){e.selected=e.$list.find(":checked").val()}),this.$previous.on("click",function(){return e.previous()}),this.$next.on("click",function(){return e.next()})}},{key:"loadImages",value:function(){var r=this,i=function(t){return t.addClass((e=t,n=e.get(0),i=n.naturalWidth,a=n.naturalHeight,i&&a?a<i?r.config.classNames.landscape:i<a?r.config.classNames.portrait:a===i?r.config.classNames.square:"":"")).removeClass(r.config.classNames.loading);var e,n,i,a};this.$list.find("img").each(function(t,e){var n=a(e);n.is(":loaded")?i(n):n.on("load error",function(){return i(n)})})}},{key:"map",value:function(t){var s=this;if(t&&t.length)return t.map(function(t){var e;e=t.featured_image?t.featured_image.small:s.defaultImage;var n=s.config.classNames.loading,i=s.inputName,a=t.short_url,r=s.selected===a?"checked":"";return'\n                        <li>\n                            <label class="product-list-item">\n                                <input type="radio" name="'.concat(i,'" value="').concat(a,'" required ').concat(r,'>\n                                <span class="').concat("media-ratio-1-1 media-placeholder product-image",'" role="presentation">\n                                    <img src=\'').concat(e,"' alt='' class=\"").concat(n,'">\n                                </span>\n                                <span class="product-info">\n                                    ').concat(t.title,"\n                                </span>\n                            </button>\n                        </li>\n                    ")}).join("");var e=this.searching?"No matches found":"No products found";return'<li class="padding-6 text-center color-light">'.concat(e,"</li>")}},{key:"render",value:function(){this.$list.html(this.map(this.products)),this.loadImages(),this.$pager.attr("hidden",!this.hasMore&&1===this.page.number),this.$next.attr("disabled",!this.hasMore),this.$previous.attr("disabled",1===this.page.number),this.$list.trigger("updated.products")}},{key:"previous",value:function(){var t=this.pages[this.page.number-1];t&&(this.start=t.start,this.page=t,this.fetch())}},{key:"next",value:function(){this.start=this.page.end,this.page=new t(this.page.number+1),this.fetch()}},{key:"resetPager",value:function(){this.start=null,this.page=new t(1),this.pages={},this.hasMore=!1}},{key:"fetch",value:function(){var n=this,t=window.ajaxurl;"string"===a.type(t)&&t.length&&(this.$list.html('\n                <li class="padding-6 text-center">\n                    <span class="loader" aria-hidden="true"></span>\n                    <p class="margin-0 margin-top-2 color-light">Loading&hellip;</p>\n                <li>\n            '),this.$pager.attr("hidden",!0),this.request=new e({url:t,method:"GET",dataType:"json",data:{action:"".concat(this.namespace,"_").concat(this.searching?"search":"get","_products"),starting_after:1===this.page.number?null:this.start,page:this.page.number,q:this.query}},function(t,e){e&&t.timestamp===n.request.timestamp&&(n.products=e.data,n.hasMore=e.has_more,n.products&&n.products.length&&(n.page.start=n.products[0].id,n.page.end=n.products[n.products.length-1].id),n.pages[n.page.number]=n.page,n.render())},function(){n.$list.html('<li class="padding-6 text-center color-light">Failed to load products. Please try again.</li>')}),this.request.send())}},{key:"searching",get:function(){return!("string"!==a.type(this.query)||!this.query.length)}}]),i}();window.PluginProductList=n}(jQuery);