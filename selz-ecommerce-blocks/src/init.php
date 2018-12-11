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
