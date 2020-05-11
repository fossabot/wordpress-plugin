<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Looks like we'll need to set height using JS so we can prevent scroll inside of iframe
// See `window.postMessage`
// Also see `<base>`
?>

<style>
    #wpcontent {
        padding-left: 0;
    }
    #wpbody-content {
        padding-bottom: 0;
    }
    iframe {
        width: 100%;
        min-height: 100vh;
    }
</style>
<iframe src="https://styledmatter.com">
