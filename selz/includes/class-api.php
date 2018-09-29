<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class Selz_API {
	private $auth_url 		= 'https://selz.com/wp';
	private $api_url 		= 'https://api.selz.com';
	private $redirect 		= '';
	private $key 		= '';

	public function __construct() {
		$this->slug 	= selz()->slug;
		$this->version 	= selz()->version;
		$this->lang 	= selz()->lang;
		$this->name 	= selz()->name;

		$this->redirect = admin_url() . 'admin.php?page=' . selz()->slug;

		$this->key = $this->generate_key();

		add_action( 'current_screen', array( $this, 'register_client' ) );
		add_action( 'current_screen', array( $this, 'get_first_token' ) );
		add_action( 'current_screen', array( $this, 'set_store' ) );

		add_action( 'admin_post_disconnect_' . $this->slug, array( $this, 'disconnect' ) );

		add_action( 'admin_init', array( $this, 'is_expired' ) );
	}

	public function register_client( $current_screen ) {
		// only load on main plugin page
		if ( $current_screen->id != 'toplevel_page_' . selz()->slug )
			return;

		// ignore if we already have a registered client
		if ( $this->get_client_id() )
			return;

		// ignore if we are already connected
		if ( $this->is_connected() )
			return;

		// ignore if we don't have a key
		if ( ! $this->key ){
			return;
		}

		$fields = array(
			'key' => $this->key,
			'source' => $this->name,
			'redirect_uri' => $this->redirect
		);

		$response = wp_remote_post( $this->auth_url . '/register',
			array(
				'timeout' => 10,
				'redirection' => 5,
				'httpversion' => '1.0',
				'blocking' => true,
				'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
				'body' => $fields,
			)
		);

		if ( is_wp_error( $response ) ) {
			$error_message = $response->get_error_message();
		} else {

			if( isset( $response['body'] ) && $response['body'] != '' ) {

				$body = json_decode( $response['body'] );

				if( $body->client_id && $body->client_secret ) {
					update_option( $this->slug . '_api_client_id', $body->client_id );
					update_option( $this->slug . '_api_client_secret', $body->client_secret );
				}
			}
		}
	}

	public function auth_url() {
		$endpoint = '/authorize';

		$args = array(
	        'client_id' => $this->get_client_id(),
	        'redirect_uri' => $this->redirect,
	        'state' => md5( 'test' )
	    );

	    $url = add_query_arg( $args, $this->auth_url . $endpoint );

	    return $url;
	}

	public function disconnect_url() {
		$args = array(
	        'action' => 'disconnect_' . selz()->slug,
		);

	    $url = add_query_arg( $args, admin_url( 'admin-post.php' ) );

		return $url;
	}

	public function disconnect() {
		delete_option( $this->slug . '_api_access_token' );
		delete_option( $this->slug . '_api_refresh_token' );
		delete_option( $this->slug . '_api_expires_on' );
		delete_option( $this->slug . '_store' );
		wp_redirect( $this->redirect );

		exit;
	}

	public function get_first_token( $current_screen ) {
		// only load on main plugin page
		if( $current_screen->id != 'toplevel_page_' . selz()->slug )
			return;

		if(
			( isset( $_GET['page'] ) && $_GET['page'] == $this->slug ) &&
			( isset( $_GET['code'] ) && $_GET['code'] != '' )
		) {

			$code = sanitize_text_field( $_GET['code'] );

		    $fields = array(
		    	'grant_type' => 'authorization_code',
		        'client_id' => $this->get_client_id(),
		        'client_secret' => $this->get_client_secret(),
		        'redirect_uri' => $this->redirect,
		        'code' => $code,
		    );

		    $response = wp_remote_post( $this->auth_url . '/token',
		    	array(
			        'timeout' => 10,
			        'redirection' => 5,
			        'httpversion' => '1.0',
			        'blocking' => true,
			        'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
			        'body' => $fields,
		        )
		    );

		    if ( is_wp_error( $response ) ) {
		       $error_message = $response->get_error_message();
		    } else {

		    	if( isset( $response['body'] ) && $response['body'] != '' ) {

		    		$body = json_decode( $response['body'] );

		    		if ( $body->access_token ) {

		    			//update_option( $this->slug . '_api', $body );
		    			update_option( $this->slug . '_api_access_token', $body->access_token );
		    			update_option( $this->slug . '_api_refresh_token', $body->refresh_token );
		    			update_option( $this->slug . '_api_expires_on', current_time( 'timestamp' ) + $body->expires_in );

		    			wp_redirect( $this->redirect );
		    			exit;

		    		}
				}
		    }
		}
	}

	public function refresh_token() {
		$refresh = get_option( $this->slug . '_api_refresh_token' );

	    $fields = array(
	    	'grant_type' => 'refresh_token',
	        'client_id' => $this->get_client_id(),
	        'client_secret' => $this->get_client_secret(),
	        'refresh_token' => $refresh,
	    );

	    $response = wp_remote_post( $this->auth_url . '/token',
	    	array(
		        'timeout' => 10,
		        'redirection' => 5,
		        'httpversion' => '1.0',
		        'blocking' => true,
		        'headers' => array( 'Content-Type: application/x-www-form-urlencoded' ),
		        'body' => $fields,
	        )
	    );

	    if ( is_wp_error( $response ) ) {
	       $error_message = $response->get_error_message();
	    } else {

	    	if( isset( $response['body'] ) && $response['body'] != '' ) {

	    		$body = json_decode( $response['body'] );

	    		if( $body->access_token ) {
	    			update_option( $this->slug . '_api_access_token', $body->access_token );
	    			update_option( $this->slug . '_api_refresh_token', $body->refresh_token );
	    			update_option( $this->slug . '_api_expires_on', current_time( 'timestamp' ) + $body->expires_in );
	    		}
			}

	    }
	}

	public function set_store( $current_screen ) {
		// only load on main plugin page
		if ( $current_screen->id != 'toplevel_page_' . selz()->slug )
			return;

		// ignore if we already have a store
		if ( $this->get_store() )
			return;

		// ignore if we aren't connected
		if ( ! $this->is_connected() )
			return;

	    $response = wp_remote_get( $this->api_url . '/store',
	    	array(
		        'timeout' => 10,
		        'redirection' => 5,
		        'httpversion' => '1.0',
		        'headers' => $this->get_headers(),
	        )
	    );

	    if ( is_wp_error( $response ) ) {
	       	$error_message = $response->get_error_message();
	    } else {
	    	if ( isset( $response['body'] ) && $response['body'] != '' ) {
	    		$body = json_decode( $response['body'] );
	    		if( $body ) {
	    			update_option( $this->slug . '_store', $body );
	    		}
    		}
    	}
	}

	public function get_store() {
	    $store = get_option( $this->slug . '_store' );
	    if( $store ) {
	    	return $store;
	    } else {

	    }
	}

	public function get_products( $starting_after ) {

		$args = array(
			'limit' => 20,
			'starting_after' => $starting_after,
	    );

	    $response = wp_remote_get( add_query_arg( $args, $this->api_url . '/products' ),
	    	array(
		        'timeout' => 10,
		        'redirection' => 5,
		        'httpversion' => '1.0',
		        'headers' => $this->get_headers(),
	        )
	    );

	    if ( is_wp_error( $response ) ) {
	       $error_message = $response->get_error_message();
	    } else {
	    	if ( isset( $response['body'] ) && $response['body'] != '' ) {
	    		$body = json_decode( $response['body'] );
	    		if ( $body ) {
	    			return $body;
	    		}
    		}
    	}
	}

	public function search_products( $query, $page ) {

		$args = array(
	        'limit' => 20,
	        'q' => $query,
	        'page' => $page,
	    );

	    $response = wp_remote_get( add_query_arg( $args, $this->api_url . '/search/products' ),
	    	array(
		        'timeout' => 10,
		        'redirection' => 5,
		        'httpversion' => '1.0',
		        'headers' => $this->get_headers(),
	        )
	    );

	    if ( is_wp_error( $response ) ) {
	       $error_message = $response->get_error_message();
	    } else {

	    	if( isset( $response['body'] ) && $response['body'] != '' ) {
	    		$body = json_decode( $response['body'] );
	    		if( $body ) {
	    			return $body;
	    		}
    		}

    	}
	}

	public function is_connected() {
		if(
			( get_option( $this->slug . '_api_access_token' ) != '' ) &&
			( ((int)get_option( $this->slug . '_api_expires_on' )) >= current_time( 'timestamp' ) ) )
		{
			return true;
		}
	}

	public function is_expired() {
		if( ((int)get_option( $this->slug . '_api_expires_on' )) < current_time( 'timestamp' ) )
			$this->refresh_token();
	}

	public function get_token() {
		return get_option( $this->slug . '_api_access_token' );
	}

	public function get_headers() {
		return array(
			'Authorization' => 'Bearer ' . $this->get_token(),
			'Accept' => 'application/json',
		);
	}

	public function get_client_id() {
		return get_option( $this->slug . '_api_client_id' );
	}

	public function get_client_secret() {
		return get_option( $this->slug . '_api_client_secret' );
	}

	public function generate_key() {
		// ignore if we already have a registered client
		if ( $this->get_client_id() )
			return;

		// ignore if we are already connected
		if ( $this->is_connected() )
			return;

		// ignore if we already have a key
		if ( $this->key )
			return $this->key;

	    $response = wp_remote_get( $this->auth_url . '/key?redirect_uri=' . $this->redirect,
	    	array(
		        'timeout' => 10,
		        'redirection' => 5,
		        'httpversion' => '1.0'
	        )
	    );

	    if ( is_wp_error( $response ) ) {
			$error_message = $response->get_error_message();
		 } else {

			 if( isset( $response['body'] ) && $response['body'] != '' ) {
				 $body = json_decode( $response['body'] );
				 if( $body->key ) {
					 return $body->key;
				 }
			 }

		 }
	}
}
