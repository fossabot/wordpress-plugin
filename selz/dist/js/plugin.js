!function(){"use strict";tinymce.create("tinymce.plugins.selz",{init:function(e){e.addCommand("selz",function(){"undefined"!=typeof SelzModal&&new SelzModal}),e.addButton("selz",{title:"Selz",cmd:"selz"})},createControl:function(){return null},getInfo:function(){return{longname:"selz",author:"selz",authorurl:"https://selz.com",infourl:"https://selz.com",version:"1.7.0"}}}),tinymce.PluginManager.add("selz",tinymce.plugins.selz)}();