<?php

// Exit if accessed directly
if (! defined('ABSPATH')) {
    exit;
}

class Selz_API
{
    private $env        = '';
    private $auth_url   = '';
    private $api_url    = '';
    private $redirect   = '';

    public function __construct()
    {
        $this->slug     = selz()->slug;
        $this->version  = selz()->version;
        $this->lang     = selz()->lang;
        $this->name     = selz()->name;

        $this->redirect = admin_url() . 'admin.php?page=' . selz()->slug;

        $this->generate_client_id();

        $this->env = get_option($this->slug . '_settings')['env'];
        $this->auth_url = 'https://' . ($this->env != '' ? $this->env : 'selz.com') . '/wp';
        $this->api_url = 'https://api.' . ($this->env != '' ? $this->env : 'selz.com');

        add_action('current_screen', array( $this, 'get_first_token' ));
        add_action('current_screen', array( $this, 'set_store' ));

        add_action('admin_post_connect_' . $this->slug, array( $this, 'connect' ));
        add_action('admin_post_disconnect_' . $this->slug, array( $this, 'disconnect' ));
    }

    public function connect_url()
    {
        $args = array(
            'action' => 'connect_' . selz()->slug,
        );

        $url = add_query_arg($args, admin_url('admin-post.php'));

        return $url;
    }

    public function connect()
    {

        $url = $this->redirect;

        // Register client first to get credentials (client_id and client_secret)
        if ($this->register_client()) {
            // Redirect to authorize endpoint to initiate OAuth flow
            $endpoint = '/authorize';

            $args = array(
                'client_id' => $this->get_client_id(),
                'redirect_uri' => $this->redirect,
                'state' => md5('test')
            );

            $url = add_query_arg($args, $this->auth_url . $endpoint);
        }

        wp_redirect($url);

        exit;
    }

    public function disconnect_url()
    {
        $args = array(
            'action' => 'disconnect_' . selz()->slug,
        );

        $url = add_query_arg($args, admin_url('admin-post.php'));

        return $url;
    }

    public function disconnect()
    {

        $this->remove_tokens();
        $this->remove_client();

        wp_redirect($this->redirect);

        exit;
    }

    public function get_first_token($current_screen)
    {
        // only load on main plugin page
        if ($current_screen->id != 'toplevel_page_' . selz()->slug) {
            return;
        }

        if (isset($_GET['page']) && $_GET['page'] == $this->slug) {
            if (isset($_GET['error']) && $_GET['error'] != '') {
                $this->remove_client();
                $error_message = $_GET['error'];
            } elseif (isset($_GET['code']) && $_GET['code'] != '') {
                $code = sanitize_text_field($_GET['code']);

                $fields = array(
                    'grant_type' => 'authorization_code',
                    'client_id' => $this->get_client_id(),
                    'client_secret' => $this->get_client_secret(),
                    'redirect_uri' => $this->redirect,
                    'code' => $code,
                );

                $response = $this->send_request(
                    'POST',
                    $this->auth_url . '/token',
                    array(
                        'timeout' => 120,
                        'redirection' => 5,
                        'httpversion' => '1.0',
                        'blocking' => true,
                        'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
                        'body' => $fields,
                    )
                );

                if (is_wp_error($response)) {
                    $this->remove_client();
                    $error_message = $response->get_error_message();
                } else {
                    if (isset($response['body']) && $response['body'] != '') {
                        $body = json_decode($response['body']);

                        if ($body->access_token) {
                            update_option($this->slug . '_api_access_token', $body->access_token);
                            update_option($this->slug . '_api_refresh_token', $body->refresh_token);
                            update_option($this->slug . '_api_expires_on', current_time('timestamp') + $body->expires_in);

                            wp_redirect($this->redirect);
                            exit;
                        }
                    }
                }
            }
        }
    }

    public function refresh_token()
    {

        $fields = array(
            'grant_type' => 'refresh_token',
            'client_id' => $this->get_client_id(),
            'client_secret' => $this->get_client_secret(),
            'refresh_token' => $this->get_refresh_token()
        );

        $response = $this->send_request(
            'POST',
            $this->auth_url . '/token',
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
                'body' => $fields,
            )
        );

        if (is_wp_error($response)) {
            $this->remove_tokens();
            $error_message = $response->get_error_message();
        } else {
            if (isset($response['body']) && $response['body'] != '') {
                $body = json_decode($response['body']);

                if ($body->access_token) {
                    update_option($this->slug . '_api_access_token', $body->access_token);
                    update_option($this->slug . '_api_refresh_token', $body->refresh_token);
                    update_option($this->slug . '_api_expires_on', current_time('timestamp') + $body->expires_in);
                }
            }
        }
    }

    public function set_store($current_screen)
    {

        // only load on main plugin page
        if ($current_screen->id != 'toplevel_page_' . selz()->slug) {
            return;
        }

        // ignore if we already have a store
        if ($this->get_store()) {
            return;
        }

        // ignore if we aren't connected
        if (! $this->is_connected()) {
            return;
        }

        // if access token has expired, refresh token
        if ($this->is_expired()) {
            $this->refresh_token();
        }

        $response = $this->send_request(
            'GET',
            $this->api_url . '/store',
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'headers' => $this->get_headers(),
            )
        );

        if (is_wp_error($response)) {
            $this->remove_tokens();
            $error_message = $response->get_error_message();
        } else {
            if (isset($response['body']) && $response['body'] != '') {
                $body = json_decode($response['body']);
                if ($body) {
                    update_option($this->slug . '_store', $body);
                    selz()->add_store_page();
                }
            }
        }
    }

    public function get_store()
    {
        $store = get_option($this->slug . '_store');
        if ($store) {
            return $store;
        }
    }

    public function get_products($starting_after = null)
    {

        // ignore if we aren't connected
        if (! $this->is_connected()) {
            return;
        }

        // if access token has expired, refresh token
        if ($this->is_expired()) {
            $this->refresh_token();
        }

        $args = array(
            'limit' => 20,
            'starting_after' => $starting_after,
            'is_published' => 'true',
        );

        $response = $this->send_request(
            'GET',
            add_query_arg($args, $this->api_url . '/products'),
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'headers' => $this->get_headers(),
            )
        );

        if (is_wp_error($response)) {
            $this->remove_tokens();
            $error_message = $response->get_error_message();
        } else {
            if (isset($response['body']) && $response['body'] != '') {
                $body = json_decode($response['body']);
                if ($body) {
                    return $body;
                }
            }
        }
    }

    public function search_products($query = "", $page = 1)
    {

        // ignore if we aren't connected
        if (! $this->is_connected()) {
            return;
        }

        // if access token has expired, refresh token
        if ($this->is_expired()) {
            $this->refresh_token();
        }

        $args = array(
            'limit' => 20,
            'q' => $query,
            'page' => $page,
            'is_published' => 'true',
        );

        $response = $this->send_request(
            'GET',
            add_query_arg($args, $this->api_url . '/search/products'),
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'headers' => $this->get_headers(),
            )
        );

        if (is_wp_error($response)) {
            $this->remove_tokens();
            $error_message = $response->get_error_message();
        } else {
            if (isset($response['body']) && $response['body'] != '') {
                $body = json_decode($response['body']);
                if ($body) {
                    return $body;
                }
            }
        }
    }

    /**
     * @since 2.1.0
     */
    public function get_categories()
    {
        // Ignore if we aren't connected
        if (!$this->is_connected()) {
            return;
        }

        // If access token has expired, refresh token
        if ($this->is_expired()) {
            $this->refresh_token();
        }

        $response = $this->send_request('GET', $this->api_url . '/categories', array(
            'timeout' => 120,
            'redirection' => 5,
            'httpversion' => '1.0',
            'headers' => $this->get_headers(),
        ));

        if (is_wp_error($response)) {
            $this->remove_tokens();
            $error_message = $response->get_error_message();
        } elseif (isset($response['body']) && $response['body'] != '') {
            $body = json_decode($response['body']);
            if ($body) {
                return $body;
            }
        }
    }

    public function is_connected()
    {
        if ($this->get_access_token() != '') {
            return true;
        }
    }

    public function is_expired()
    {
        if (((int)$this -> get_expires_on()) < current_time('timestamp')) {
            return true;
        }
    }

    public function get_headers()
    {
        return array(
            'Authorization' => 'Bearer ' . $this->get_access_token(),
            'Accept' => 'application/json',
        );
    }

    public function get_access_token()
    {
        return get_option($this->slug . '_api_access_token');
    }

    public function get_refresh_token()
    {
        return get_option($this->slug . '_api_refresh_token');
    }

    public function get_expires_on()
    {
        return get_option($this->slug . '_api_expires_on');
    }

    public function get_client_id()
    {
        return get_option($this->slug . '_api_client_id');
    }

    public function get_client_secret()
    {
        return get_option($this->slug . '_api_client_secret');
    }

    public function generate_client_id()
    {
        // ignore if we already have a client id
        if ($this->get_client_id()) {
            return;
        }

        $response = $this->send_request(
            'GET',
            $this->auth_url . '/key?redirect_uri=' . $this->redirect,
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0'
            )
        );

        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
        } else {
            if (isset($response['body']) && $response['body'] != '') {
                $body = json_decode($response['body']);

                if ($body->key) {
                    update_option($this->slug . '_api_client_id', $body->key);
                }
            }
        }
    }

    public function register_client()
    {
        // ignore if we already have a registered client
        if ($this->get_client_secret()) {
            return true;
        }

        // if we don't have client id yet, get one now
        if (! $this->get_client_id()) {
            $this->generate_client_id();
        }

        $fields = array(
            'key' => $this->get_client_id(),
            'source' => $this->name,
            'redirect_uri' => $this->redirect
        );

        $response = $this->send_request(
            'POST',
            $this->auth_url . '/register',
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
                'body' => $fields,
            )
        );

        if (is_wp_error($response)) {
            $this->remove_client();
            $error_message = $response->get_error_message();
        } else {
            if (isset($response['body']) && $response['body'] != '') {
                $body = json_decode($response['body']);

                if ($body->client_id && $body->client_secret) {
                    update_option($this->slug . '_api_client_id', $body->client_id);
                    update_option($this->slug . '_api_client_secret', $body->client_secret);
                    return true;
                }
            }
        }

        return false;
    }

    public function remove_client()
    {

        $fields = array(
            'client_id' => $this->get_client_id(),
            'client_secret' => $this->get_client_secret()
        );

        $response = $this->send_request(
            'POST',
            $this->auth_url . '/unregister',
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
                'body' => $fields,
            )
        );

        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
        }

        delete_option($this->slug . '_api_client_id');
        delete_option($this->slug . '_api_client_secret');
    }

    public function remove_tokens()
    {

        $fields = array(
            'client_id' => $this->get_client_id(),
            'client_secret' => $this->get_client_secret(),
            'token' => $this->get_access_token(),
            'token' => $this->get_refresh_token()
        );

        $response = $this->send_request(
            'POST',
            $this->auth_url . '/revoke',
            array(
                'timeout' => 120,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
                'body' => $fields,
            )
        );

        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
        }

        delete_option($this->slug . '_api_access_token');
        delete_option($this->slug . '_api_refresh_token');
        delete_option($this->slug . '_api_expires_on');
        delete_option($this->slug . '_store');
    }

    public function send_request($method, $url, $args = array())
    {

        $response = $method == 'POST' ? wp_remote_post($url, $args) : wp_remote_get($url, $args);

        // Check the response code
        $response_code = wp_remote_retrieve_response_code($response);
        $response_message = wp_remote_retrieve_response_message($response);

        if (200 != $response_code && ! empty($response_message)) {
            return new WP_Error($response_code, $response_message);
        } elseif (200 != $response_code) {
            return new WP_Error($response_code, 'Unknown error occurred');
        } else {
            return $response;
        }
    }
}
