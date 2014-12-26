/*
 * spa.shell.js
 * Shell module for SPA
 */

/*jslint        browser : true, continue : true,
  devel  : true, indent : 2,      maxerr : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true,     vars : false,
  white  : true
*/
/*global $, spa */

spa.shell = (function() {
  // ----- Begin Module Scope Variables -----
  var
    configMap = {
      mainHtml : String()
        + '<div class="spa-shell-head">'
          + '<div class="spa-shell-head-logo"></div>'
          + '<div class="spa-shell-head-acct"></div>'
          + '<div class="spa-shell-head-search"></div>'
        + '</div>'
        + '<div class="spa-shell-main">'
          + '<div class="spa-shell-main-nav"></div>'
          + '<div class="spa-shell-main-content"></div>'
        + '</div>'
        + '<div class="spa-shell-foot"></div>'
        + '<div class="spa-shell-chat"></div>'
        + '<div class="spa-shell-modal"></div>',

      chat_extend_time     : 1000,
      chat_retract_time    : 300,
      chat_extend_height   : 450,
      chat_retract_height  : 15
    },
    stateMap = { $container : null },
    jqueryMap = {},
    setJqueryMap, toggleChat, initModule;
  // -----  End Module Scope Variables -----

  // ----- BEGIN DOM METHODS -----
  // Begin DOM method /setJqueryMap/
  //
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container : $container,
      $chat : $container.find( '.spa-shell-chat' )
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /toggleChat/
  // Purpose   : Extends or retracts the chat slider.
  // Arguments :
  //   * do_extend - if true, extends slider; if false retracts
  //   * callback - optional function to execute when animation ends
  // Settings  :
  //   * chat_extend_time, chat_retract_time
  //   * chat_extend_height, chat_retract_height
  // Returns   : boolean
  //   * true  - slider animation activated
  //   * false - slider animation not activated
  //
  toggleChat = function ( do_extend, callback ) {
    var
      chat_height_px = jqueryMap.$chat.height(),
      is_open    = chat_height_px === configMap.chat_extend_height,
      is_closed  = chat_height_px === configMap.chat_retract_height,
      is_sliding = ! is_open && ! is_closed;

    // avoid race condition
    if ( is_sliding ) { return false; }

    // Begin extend chat slider
    if ( do_extend ) {
      jqueryMap.$chat.animate(
        { height : configMap.chat_extend_height },
        configMap.chat_extend_time,
        function() {
          if ( callback ){ callback( jqueryMap.$chat ); }
        }
      );
      return true;
    }
    // End extend chat slider

    // Begin retract chat slider
    jqueryMap.$chat.animate(
      { height : configMap.chat_retract_height },
      configMap.chat_retract_time,
      function() {
        if ( callback ){ callback( jqueryMap.$chat ); }
      }
    );
    // End retract chat slider
    return true;
  };
  // End DOM method /toggleChat/
  // ----- END DOM METHODS -----

  // ----- BEGIN PUBLIC METHODS -----
  // Begin Public method /initModule/
  //
  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.html( configMap.mainHtml );
    setJqueryMap();

    // test toggle
    setTimeout( function () {toggleChat( true );}, 3000 );
    setTimeout( function () {toggleChat( false );}, 6000 );
  };
  // End Public method /initModule/

  return { initModule : initModule };
  // ----- END PUBLIC METHODS -----
}());
