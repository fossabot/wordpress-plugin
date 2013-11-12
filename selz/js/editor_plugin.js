/*
    Selz Shortcode
    Author: selz.com
    Author URI: http://selz.com
    License: GPL2
    
	Copyright 2013  selz.com  (email : engineer@selz.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

(function() {
	// http://wiki.moxiecode.com/index.php/TinyMCE:Create_plugin/3.x#Creating_your_own_plugins
	// Load plugin specific language pack
	// tinymce.PluginManager.requireLangPack('selz');
	tinymce.create('tinymce.plugins.selz', {
		init : function(ed, url) {
			ed.addCommand('selz', function() {
				if ( typeof(selzShortcode) != 'undefined' ) {
					selzShortcode.open();
					return;
				}				
			});
			
			ed.addButton('selz', {		// Register example button
				title : 'Selz',
				cmd : 'selz'
			});
			
			ed.onNodeChange.add(function(ed, cm, n) {	// Add a node change handler, selects the button in the UI when a image is selected
				cm.setActive('selz', n.nodeName == 'IMG');
			});
		},
		createControl : function(n, cm) {
			return null;
		},
		getInfo : function() {
			return {
				longname  : 'selz',
				author 	  : 'selz',
				authorurl : 'http://www.selz.com',
				infourl   : 'http://www.selz.com',
				version   : '1.1'
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('selz', tinymce.plugins.selz);
})();