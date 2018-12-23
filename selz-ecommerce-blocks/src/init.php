<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
add_action('enqueue_block_assets', function () {
    wp_enqueue_style('selz/blocks.style.css', plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), [
        'wp-editor'
    ]);
});

/**
 * Enqueue Gutenberg block assets for backend editor.
 */
add_action('enqueue_block_editor_assets', function () {
    // Scripts
    wp_enqueue_script('selz/blocks.js', plugins_url('/dist/blocks.build.js', dirname( __FILE__)), [
        'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'
    ], true);

    // Styles
    wp_enqueue_style('selz/blocks.editor.css', plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), [
        'wp-edit-blocks'
    ]);

    wp_localize_script('selz/blocks.js', 'selz', ['store' => get_option('selz_store')]);
});

add_action('admin_enqueue_scripts', function ($hook) {
    // if ($hook !== 'edit.php') {
    //     return;
    // }

    wp_enqueue_script('selz/foo', 'https://embeds.selzstatic.com/1/loader.js');
});

add_filter('script_loader_tag', function ($tag, $handle, $src) {
    if ($handle === 'selz/foo') {
        $tag = '<script async src="' . esc_url( $src ) . '"></script>';
    }

    return $tag;
}, 10, 3);

add_filter('block_categories', function ($categories, $post) {
    if ($post->post_type !== 'post') {
        return $categories;
    }
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'selz-ecommerce',
                'title' => __('Selz Ecommerce', 'selz'),
                // 'icon'  => 'wordpress',
            ),
        )
    );
}, 10, 2);

add_action('admin_footer', function () {
    ?>
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="409" viewBox="0 0 720 409">
        <defs>
            <linearGradient id="logo-gradient-a" x1="100%" x2="0%" y1="100%" y2="0%">
                <stop offset="0%" stop-color="#C8318C"/>
                <stop offset="100%" stop-color="#602BC6"/>
            </linearGradient>
        </defs>
    </svg>
    <?php
});
