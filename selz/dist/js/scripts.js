!function(){var e="tab-focus";document.addEventListener("focusout",function(t){t.target.classList.remove(e)}),document.addEventListener("keydown",function(t){9===t.keyCode&&window.setTimeout(function(){document.activeElement.classList.add(e)},0)})}(),function(o){"use strict";function t(){this.$element=o(".selz-modal"),this.$backdrop=o(".selz-modal-backdrop"),this.$controls=o(".selz-modal-controls"),this.$close=o('[data-modal="close"]'),this.$form=this.$element.find("form"),this.$submit=this.$form.find(":submit"),this.loading=!1,this.shown=!1,this.show()}function e(t,e){e?t.removeAttr("hidden"):t.attr("hidden","")}t.prototype.enforceFocus=function(){o(document).off("focusin.modal").on("focusin.modal",o.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},t.prototype.hide=function(){this.shown&&(this.shown=!1,e(this.$backdrop,this.shown),e(this.$element,this.shown),o(document).off("focusin.modal").off("keyup.hide.modal"),this.$form.off("change.type.modal").off("submit.modal"))},t.prototype.show=function(){wpActiveEditor&&(this.shown||(this.shown=!0,e(this.$backdrop,this.shown),e(this.$element,this.shown),this.$close.focus(),this.$close.on("click.hide.modal",o.proxy(function(t){t.preventDefault(),this.hide()},this)),this.$form.on("change.type.modal",'select[name="type"]',o.proxy(function(){this.update()},this)),this.$form.on("submit.modal",o.proxy(function(t){t.preventDefault(),this.insert()},this)),o(document).on("keyup.hide.modal",o.proxy(function(t){27===t.keyCode&&this.hide()},this)),this.enforceFocus()))},t.prototype.insert=function(){if(tinymce){var t=tinymce.get(wpActiveEditor),e="";this.hide(),o("input",this.$form).each(function(){o(this).attr("id")&&o(this).is(":checkbox")?e+=" "+o(this).attr("id")+'="'+o(this).prop("checked")+'"':o(this).attr("id")&&o(this).not(":checkbox")&&o(this).val()&&(e+=" "+o(this).attr("id")+'="'+o(this).val()+'"')}),o("select",this.$form).each(function(){o(this).attr("id")&&o(this).val()&&(e+=" "+o(this).attr("id")+'="'+o(this).val()+'"')}),o("textarea",this.$form).each(function(){o(this).attr("id")&&o(this).val()&&(e+=" "+o(this).attr("id")+'="'+o(this).val()+'"')});var i="[selz"+e+"]";t&&(tinymce.execCommand("mceBeginUndoLevel"),tinymce.execCommand("mceInsertContent",!1,i),tinymce.execCommand("mceEndUndoLevel")),edInsertContent("",i)}},t.prototype.update=function(){!this.loading&&"string"==typeof ajaxurl&&ajaxurl.length&&(this.loading=!0,this.$submit.prop("disabled",!0),o.post(ajaxurl,{action:selzvars.action,nonce:selzvars.nonce,data:this.$form.serialize()},o.proxy(function(t){this.$submit.prop("disabled",!1),this.$controls.html(t),this.loading=!1},this)))},window.SelzModal=t}(jQuery),function(o){"use strict";function t(){o(".js-color-picker:not(.has-colorpicker)").addClass("has-colorpicker").wpColorPicker().removeClass("wp-color-picker")}function n(t){var e=t.parents(".js-tab-container"),i=o("#"+t.attr("aria-controls"));o("[role='tab']",e).attr("aria-selected","false"),t.attr("aria-selected","true"),o("[role='tabpanel']",e).attr("aria-hidden","true"),i.attr("aria-hidden","false")}function e(){o(".js-tab-container [role='tab']").on("click",function(t){t.preventDefault(),n(o(this))}).on("keydown",function(t){if(39===t.which||37===t.which){var e=o(this);if("true"===e.attr("aria-selected")){var i=e.parent("li")[39===t.which?"next":"prev"]("li").find("[role='tab']");i&&(i.focus(),n(i))}}})}o(document).ready(t).ready(e).ajaxComplete(t).ajaxComplete(e)}(jQuery);