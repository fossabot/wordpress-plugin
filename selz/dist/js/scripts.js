function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i,n=0;n<t.length;n++)(i=t[n]).enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var i,n,o=Object(this),d=o.length>>>0;if(0===d)return!1;for(var s=0|t,a=Math.max(0<=s?s:d-Math.abs(s),0);a<d;){if((i=o[a])===(n=e)||"number"==typeof i&&"number"==typeof n&&isNaN(i)&&isNaN(n))return!0;a++}return!1}}),function(l){function c(e,t){var i,n,o,d,s=e.data("ddslick"),a=e.find(".dd-selected"),l=a.siblings(".dd-selected-value"),c=(e.find(".dd-options"),a.siblings(".dd-pointer"),e.find(".dd-option").eq(t)),r=c.closest("li"),p=s.settings,u=s.settings.data[t];e.find(".dd-option").removeClass("dd-option-selected"),c.addClass("dd-option-selected"),s.selectedIndex=t,s.selectedItem=r,s.selectedData=u,p.showSelectedHTML?a.html((u.imageSrc?'<img class="dd-selected-image'+("right"==p.imagePosition?" dd-image-right":"")+'" src="'+u.imageSrc+'" />':"")+(u.text?'<label class="dd-selected-text">'+u.text+"</label>":"")+(u.description?'<small class="dd-selected-description dd-desc'+(p.truncateDescription?" dd-selected-description-truncated":"")+'" >'+u.description+"</small>":"")):a.html(u.text),l.val(u.value),s.original.val(u.value),e.data("ddslick",s),f(e),n=(i=e).find(".dd-select").css("height"),o=i.find(".dd-selected-description"),d=i.find(".dd-selected-image"),o.length<=0&&0<d.length&&i.find(".dd-selected-text").css("lineHeight",n),"function"==typeof p.onSelected&&p.onSelected.call(this,s)}function r(e){var o,t=e.find(".dd-select"),i=t.siblings(".dd-options"),n=t.find(".dd-pointer"),d=i.is(":visible");l(".dd-click-off-close").not(i).slideUp(50),l(".dd-pointer").removeClass("dd-pointer-up"),t.removeClass("dd-open"),d?(i.slideUp("fast"),n.removeClass("dd-pointer-up"),t.removeClass("dd-open")):(t.addClass("dd-open"),i.slideDown("fast"),n.addClass("dd-pointer-up")),(o=e).find(".dd-option").each(function(){var e=l(this),t=e.css("height"),i=e.find(".dd-option-description"),n=o.find(".dd-option-image");i.length<=0&&0<n.length&&e.find(".dd-option-text").css("lineHeight",t)})}function f(e){e.find(".dd-select").removeClass("dd-open"),e.find(".dd-options").slideUp(50),e.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")}l.fn.ddslick=function(e){return t[e]?t[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==_typeof(e)&&e?void l.error("Method "+e+" does not exists."):t.init.apply(this,arguments)};var t={},p={data:[],keepJSONItemsOnTop:!1,width:"100%",height:null,background:"#fff",selectText:"",defaultSelectedIndex:null,truncateDescription:!0,imagePosition:"left",showSelectedHTML:!0,clickOffToClose:!0,embedCSS:!0,onSelected:function(){}};t.init=function(a){var e=l.extend({},p,a);return l("#css-ddslick").length<=0&&e.embedCSS&&l('<style id="css-ddslick" type="text/css">.dd-select{ border-radius:4px; box-shadow:0 1px 1px rgba(0,0,0,.05);border:solid 1px #dbe3e8; position:relative; cursor:pointer;}.dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }.dd-selected {overflow: hidden;display: block;padding: 0;color: #333b3f !important;border-bottom: none !important;}.dd-selected-text, .dd-option-text {margin: 0 !important;line-height:44px !important}.dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}.dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }.dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}.dd-options{ border:solid 1px #dbe3e8; list-style:none; box-shadow:0px 3px 5px #bbb; display:none; position:absolute; z-index:2000; margin:2px 0 0 0; padding:0;background:#fff; overflow:auto;border-radius: 4px;}.dd-option{ color:#333b3f !important;padding:0; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }.dd-options > li{ margin:0}.dd-options > li:last-child > .dd-option{ border-bottom:none;}.dd-option:hover{ background:#f9f9f9;border-bottom:1px solid #aaa !important}.dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }.dd-option-selected { background:#fff; }.dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin:5px 5px 5px 4px; max-width:64px;}.dd-image-right { float:right; margin-right:15px; margin-left:5px;}.dd-container{ position:relative;}​ .dd-selected-text {}​</style>').appendTo("head"),this.each(function(){var i=l.extend({},p,a),e=l(this);if(!e.data("ddslick")){var n=[];i.data;e.find("option").each(function(){var e=l(this),t=e.data();n.push({text:l.trim(e.text()),value:e.val(),selected:e.is(":selected"),description:t.description,imageSrc:t.imagesrc})}),i.keepJSONItemsOnTop?l.merge(i.data,n):i.data=l.merge(n,i.data);var t=e,o=l("<div/>",{id:e.attr("id")+"-dd-placeholder"});e.replaceWith(o),(e=o).addClass("dd-container").append('<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>').append('<ul class="dd-options"></ul>'),e.find("input.dd-selected-value").attr("id",l(t).attr("id")).attr("name",l(t).attr("name"));n=e.find(".dd-select");var d=e.find(".dd-options");if(d.css({width:i.width}),n.css({width:i.width,background:i.background}),e.css({width:i.width}),null!=i.height&&d.css({height:i.height,overflow:"auto"}),l.each(i.data,function(e,t){t.selected&&(i.defaultSelectedIndex=e),d.append('<li><a class="dd-option">'+(t.value?' <input class="dd-option-value" type="hidden" value="'+t.value+'" />':"")+(t.imageSrc?' <img class="dd-option-image'+("right"==i.imagePosition?" dd-image-right":"")+'" src="'+t.imageSrc+'" />':"")+(t.text?' <label class="dd-option-text">'+t.text+"</label>":"")+(t.description?' <small class="dd-option-description dd-desc">'+t.description+"</small>":"")+"</a></li>")}),e.data("ddslick",{settings:i,original:t,selectedIndex:-1,selectedItem:null,selectedData:null}),0<i.selectText.length&&null==i.defaultSelectedIndex)e.find(".dd-selected").html(i.selectText);else{var s=null!=i.defaultSelectedIndex&&0<=i.defaultSelectedIndex&&i.defaultSelectedIndex<i.data.length?i.defaultSelectedIndex:0;c(e,s)}e.find(".dd-select").on("click.ddslick",function(){r(e)}),e.find(".dd-option").on("click.ddslick",function(){c(e,l(this).closest("li").index())}),i.clickOffToClose&&(d.addClass("dd-click-off-close"),e.on("click.ddslick",function(e){e.stopPropagation()}),l("body").on("click",function(){l(".dd-open").removeClass("dd-open"),l(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up")}))}})},t.select=function(i){return this.each(function(){var e,t;void 0!==i.index&&c(l(this),i.index),i.id&&(e=l(this),t=i.id,c(e,e.find(".dd-option-value[value= '"+t+"']").parents("li").prevAll().length))})},t.open=function(){return this.each(function(){var e=l(this);e.data("ddslick")&&r(e)})},t.close=function(){return this.each(function(){var e=l(this);e.data("ddslick")&&f(e)})},t.destroy=function(){return this.each(function(){var e=l(this),t=e.data("ddslick");if(t){var i=t.original;e.removeData("ddslick").unbind(".ddslick").replaceWith(i)}})}}(jQuery),document.addEventListener("DOMContentLoaded",function(){function i(){this.style.setProperty("--value","".concat(function(){var e=this.max||100,t=this.min||0;return(this.value-t)/(e-t)*100}.call(this),"%"))}function n(t){"function"==typeof t.set||(i.call(t),e.forEach(function(e){t.addEventListener(e,i,!1)}),Object.defineProperty(t,"set",{value:function(e){null!==e&&"number"==typeof e&&(this.value=e),i.call(this)}}))}function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document.body,t='input[type="range"]';e instanceof HTMLElement&&(e.matches(t)&&(e=e.parentNode),Array.from(e.querySelectorAll(t)).forEach(n))}if("WebkitAppearance"in document.documentElement.style&&Array.from){var e=["input","change","update"];new MutationObserver(function(e){e.forEach(function(e){e.addedNodes.forEach(function(e){t(e)})})}).observe(document.body,{childList:!0,subtree:!0}),t()}}),document.addEventListener("focusout",function(e){e.target.classList.remove("tab-focus")}),document.addEventListener("keydown",function(e){9!==e.keyCode||window.setTimeout(function(){document.activeElement.classList.add("tab-focus")},0)}),function(a){function i(e,t){t?e.removeAttr("hidden"):e.attr("hidden","")}var e=function(){"use strict";function t(e){_classCallCheck(this,t),this.$element=a(".selz-modal"),this.$backdrop=a(".selz-modal-backdrop"),this.$controls=a(".selz-modal-controls"),this.$close=a('[data-modal="close"]'),this.$form=this.$element.find("form"),this.$submit=this.$form.find(":submit"),this.loading=!1,this.shown=!1,this.show(e)}return _createClass(t,[{key:"enforceFocus",value:function(){var t=this;a(document).off("focusin.modal").on("focusin.modal",function(e){t.$element[0]===e.target||t.$element.has(e.target).length||t.$element.trigger("focus")})}},{key:"hide",value:function(){this.shown&&(this.shown=!1,i(this.$backdrop,this.shown),i(this.$element,this.shown),a(document).off("focusin.modal").off("keyup.hide.modal"),this.$form.off("change.type.modal").off("submit.modal"))}},{key:"show",value:function(e){var t=this;!window.wpActiveEditor||this.shown||(a(".selz-modal-controls .js-tab-container").html(),a(".selz-modal-controls").html(window.selzvars.spinner),a("<input>").attr({type:"hidden",name:"kind"}).appendTo(this.$form),this.shown=!0,i(this.$backdrop,this.shown),i(this.$element,this.shown),this.$close.focus(),a('input[name="kind"]').val(e),this.update(),this.$close.on("click.hide.modal",function(e){e.preventDefault(),t.hide()}),this.$form.on("change.type.modal",'select[name="type"]',function(){t.update()}),this.$form.on("submit.modal",function(e){e.preventDefault(),t.insert()}),a(document).on("keyup.hide.modal",function(e){27===e.keyCode&&t.hide()}),this.enforceFocus())}},{key:"insert",value:function(){if(window.tinymce){var e=window.tinymce.get(window.wpActiveEditor),s="";this.hide();a("input select textarea",this.$form).each(function(e,t){var i=a(t),n=i.attr("id"),o=i.val();if(n)if(i.is(":checkbox")){var d=i.prop("checked");s+=" ".concat(n,'="').concat(d,'"')}else o&&(s+=" ".concat(n,'="').concat(o,'"'))});var t="[".concat(window.selzvars.slug).concat(s,"]");e&&(window.tinymce.execCommand("mceBeginUndoLevel"),window.tinymce.execCommand("mceInsertContent",!1,t),window.tinymce.execCommand("mceEndUndoLevel")),window.edInsertContent("",t)}}},{key:"update",value:function(){var t=this;!this.loading&&"string"==typeof window.ajaxurl&&window.ajaxurl.length&&(this.loading=!0,this.$submit.prop("disabled",!0),a.post(window.ajaxurl,{action:window.selzvars.action,nonce:window.selzvars.nonce,data:this.$form.serialize()},function(e){t.$submit.prop("disabled",!1),t.$controls.html(e),t.loading=!1}))}}]),t}();window.SelzModal=e}(jQuery),function(o){function e(){o(".widgets-sortables > div").each(function(e,t){var i=o(t).attr("id");void 0!==i&&-1!==i.indexOf("selz")&&new n(i)})}var n=function(){"use strict";function t(e){_classCallCheck(this,t),this.$element=o("#".concat(e)),this.$controls=o(".selz-widget-controls"),this.$form=this.$element.find("form"),this.$type=this.$form.find(".widget-type select"),this.loading=!1,this.show()}return _createClass(t,[{key:"show",value:function(){var e=this;this.update(this.$type.val()),this.$type.on("change",function(){e.update(e.$type.val())})}},{key:"update",value:function(n){this.$form.find(".control-group").each(function(e,t){var i=o(t).data("type");o(t).toggle(!i||-1!==i.indexOf(n))})}}]),t}();window.SelzWidget=n,o(document).ready(function(){e()}),o(document).on("widget-added widget-updated",function(){e()})}(jQuery),function(n){function e(){n(".js-color-picker:not(.has-colorpicker)").addClass("has-colorpicker").wpColorPicker().removeClass("wp-color-picker")}function o(e){var t=e.parents(".js-tab-container"),i=n("#".concat(e.attr("aria-controls")));n("[role='tab']",t).attr("aria-selected","false"),e.attr("aria-selected","true"),n("[role='tabpanel']",t).attr("aria-hidden","true"),i.attr("aria-hidden","false")}function t(e){e.preventDefault(),o(n(this))}function i(e){if([37,39].includes(e.which)){var t=n(this);if("true"===t.attr("aria-selected")){var i=t.parent("li")[39===e.which?"next":"prev"]("li").find("[role='tab']");i&&(i.focus(),o(i))}}}function d(){n(".js-tab-container [role='tab']").on("click",t).on("keydown",i)}n(document).ready(e).ready(d).ajaxComplete(e).ajaxComplete(d)}(jQuery);