<?php

// define( 'THEME_VERSION', '1.0.0' );

// get_template_part('functions/webpack_enqueue');
// get_template_part('functions/vue_in_editor');

add_filter("show_admin_bar", "__return_false");

if ( ! class_exists( 'Timber' ) ) {
  add_action( 'admin_notices', function() {
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
  });
  
  add_filter('template_include', function($template) {
    return get_stylesheet_directory() . '/static/no-timber.html';
  });
  
  return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {
  function __construct() {
    add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    // SOIL
    add_theme_support('soil-clean-up');
    add_theme_support('soil-disable-rest-api');
    add_theme_support('soil-disable-asset-versioning');
    add_theme_support('soil-disable-trackbacks');
    // add_theme_support('soil-google-analytics', 'UA-XXXXX-Y');
    add_theme_support('soil-js-to-footer');
    // add_theme_support('soil-nav-walker');
    add_theme_support('soil-nice-search');
    // add_theme_support('soil-relative-urls');
    function addJquery() {

      wp_deregister_script('jquery');
      wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);

    }
    add_action('wp_enqueue_scripts', 'addJquery');
    register_nav_menu( 'primary', __( 'Primary Menu', '_cd_' ) );
    register_nav_menu( 'footer_menu', __( 'Footer', '_cd_' ) );
    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
    add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
    add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
    add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );
    add_filter( 'img_caption_shortcode_width', '__return_false' );

    if( function_exists('acf_add_options_page') ) {
      acf_add_options_page(array(
        'page_title'  => 'Fountain Settings',
        'menu_title'  => 'Fountain Settings',
        'menu_slug'   => 'theme-general-settings',
        'capability'  => 'edit_posts',
        'redirect'    => false
      ));

      // SUBPAGE
      // acf_add_options_sub_page(array(
      //   'page_title'  => 'Subpage',
      //   'menu_title'  => 'Subpage',
      //   'parent_slug' => 'theme-general-settings',
      // ));
    }

    function remove_width_attribute( $html ) {
       $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
       return $html;
    }
 
    register_sidebar( array(
      'name'          => esc_html__( 'Widget Container', '_fountain' ),
      'id'            => 'sidebar-1',
      'description'   => esc_html__( 'Add widgets here.', '_fountain' ),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="h6 widget-title">',
      'after_title'   => '</h2>',
    ) );

    parent::__construct();
  }

  function register_post_types() {}

  function register_taxonomies() {}

  function add_to_context( $context ) {
    $context['menu'] = new \Timber\Menu( 'primary' );
    $context['footer_menu'] = new \Timber\Menu( 'footer_menu' );
    $context['is_page'] = is_page();
    $context['post_sidebar'] = Timber::get_widgets('sidebar-1');
    return $context;
  }

  function myfoo( $text ) {
    $text .= ' bar!';
    return $text;
  }

  function add_to_twig( $twig ) {
    /* this is where you can add your own functions to twig */
    $twig->addExtension( new Twig_Extension_StringLoader() );
    $twig->addFilter('slug', new Twig_SimpleFilter('slug', array($this, 'slug')));
    return $twig;
  }

  function slug($text) {
       // replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);

    // transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);

    // trim
    $text = trim($text, '-');

    // remove duplicate -
    $text = preg_replace('~-+~', '-', $text);

    // lowercase
    $text = strtolower($text);

    if (empty($text)) {
      return 'n-a';
    }

    return $text;
  }
}

new StarterSite();

function getTimberTerms($tax) {
  $terms = get_terms($tax);
  $timber_terms = array();

  foreach ($terms as $term) {
    array_push($timber_terms, new TimberTerm($term->term_id));
  }

  return $timber_terms;
}