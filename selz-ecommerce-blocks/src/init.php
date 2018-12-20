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
                'title' => __('Selz eCommerce', 'my-plugin'),
                // 'icon'  => 'wordpress',
            ),
        )
    );
}, 10, 2);
