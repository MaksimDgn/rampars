/******************************************************************************************
 * The custom scroll bar jQuery plugin.
 * add extension functions:
 * - jQuery.fn.addThinScroll(data) -- add scroll to each object
 *   - data : Object -- addition init data (optional) can be used:
 *     - color : String -- cursor color (in format '#rrggbb').
 *     - width : Number -- width of scroll cursor (default: 6).
 *     - step : Number -- default scroll step for mouse wheel (default: 25).
 *     - paddingTop : Number -- scroll cursor top padding (default: 0).
 *     - paddingBottom : Number -- scroll cursor bottom padding (default: 0).
 *     - minCursorHeight : Number -- minimal cursor size (default: 30).
 * - jQuery.fn.removeThinScroll - remove scroll from objects
 * - jQuery.fn.updateThinScroll - update scroll state.
 * - jQuery.fn.scrollHeight - get scroll height for first elements in set.
 * - jQuery.fn.clientHeight - get client height for first elements in set.
 * handle events:
 * - scroll_update -- request or update scroll data.
 *   - event-data : Number -- time offset for double update.
 ******************************************************************************************/

(function(jQuery){
  if(!jQuery.fn.scrollHeight)
  {
    jQuery.fn.scrollHeight = function(){
      if(!this || this.length<1) return 0;
      return this[0].scrollHeight;
    };
  }
  
  if(!jQuery.fn.clientHeight)
  {
    jQuery.fn.clientHeight = function(){
      if(!this || this.length<1) return 0;
      return this[0].clientHeight;
    };
  }

  jQuery.fn.addThinScroll = function(data) {
    function initScroll(item, data)
    {
      // check if scroll is already added
      if(jQuery(item).find(".thinScrollBarLine").length > 0
        && jQuery(item).find(".thisScrollBarCursor").length > 0) return;
      // step for mouse wheel scroll
      var scrollStep = 15;
      // scroll bar cursor color
      var cursorColor = "#000000";
      // scroll bar width
      var scrollWidth = 6;
      // scroll bar top padding
      var paddingTop = 0;
      // scroll bar bottom padding
      var paddingBottom = 0;
      // minimal cursor height
      var minCursorHeight = 20;
      // indicate is mouse over the container
      var mouseInContainer = false;
      // mouse position when user start drag scroll cursor
      var mouseStartPos = 0;
      // scroll cursor position when user start drag it
      var cursorStartPos = 0;
      // indicate is user drag cursor
      var isMoving = false;
      // indicate that mouse over scroll cursor
      var isMouseOverCursor = false;
      // last scroll position
      var lastScrollPos = 0;
      // parse input data
      if(typeof(data) != 'undefined' && data != null)
      {
        if(data.color != null) cursorColor = data.color;
        if(data.width != null) scrollWidth = parseInt(data.width);
        if(data.step != null) scrollStep = parseInt(data.step);
        if(data.paddingTop != null) paddingTop = parseInt(data.paddingTop);
        if(data.paddingBottom != null) paddingBottom = parseInt(data.paddingBottom);
        if(data.minCursorHeight != null) minCursorHeight = parseInt(data.minCursorHeight);
      }
      // current container
      var container = jQuery(item);
      var scrollLine = null;
      var scrollCursor = null;
      var createScrollItems = function(ext){
        // create scroll line
        if(!ext || ext == "line") scrollLine = jQuery("<div>", {"class":"thinScrollBarLine"}).css({
          "position":"absolute",
          "display":"block",
          "top":paddingTop + "px",
          "right":"1px",
          "width":(scrollWidth + "px"),
          "height":container.height() - paddingTop - paddingBottom,
          "z-index":"1000000",
          "background":"transparent",
          "-webkit-transition":"opacity 0.3s linear",
          "-moz-transition":"opacity 0.3s linear",
          "-ms-transition":"opacity 0.3s linear",
          "-o-transition":"opacity 0.3s linear",
          "transition":"opacity 0.3s linear",
          "opacity":"0"
        });
        // create scroll cursor (thumb)
        if(!ext || ext == "cursor") scrollCursor = jQuery("<div>", {"class":"thisScrollBarCursor"}).css({
          "position":"absolute",
          "display":"block",
          "top":"0px",
          "left":"0px",
          "width":"100%",
          "height":"40px",
          "z-index":"1000000",
          "border-radius":"4px",
          "background-color":cursorColor,
          "cursor":"pointer",
          "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
          "-webkit-transition":"opacity 0.3s linear",
          "-moz-transition":"opacity 0.3s linear",
          "-ms-transition":"opacity 0.3s linear",
          "-o-transition":"opacity 0.3s linear",
          "transition":"opacity 0.3s linear",
          "opacity":"0.3"
        });
      };
      createScrollItems();
      // append scroll elements to container
      scrollLine.append(scrollCursor);
      container.append(scrollLine);
     //container.css("position", "relative");
      container.css("overflow-y", "hidden");
      // update scroll position and state
      var updateScrollBar = function(updateAlways) {
        // check if scroll element was deleted
        if(container.find(".thinScrollBarLine").length <= 0) createScrollItems("line");
        if(container.find(".thisScrollBarCursor").length <= 0) createScrollItems("cursor");
        // check content and view sizes
        var fullHeight = container.scrollHeight();
        var visibleHeight = container.clientHeight();
        var scrollBarHeight = container.clientHeight() - paddingTop - paddingBottom;
        if(fullHeight <= visibleHeight) scrollLine.css("display", "none");
        else scrollLine.css("display", "block");
        // check changes for scroll
        if(lastScrollPos == container.scrollTop() && !(updateAlways == true)) return;
        if(updateAlways)
        {
          scrollLine.css({"margin-top":0, "height":"1px"});
          scrollCursor.css({"height":"1px", "margin-top":0});
          fullHeight = container.scrollHeight();
        }
        lastScrollPos = container.scrollTop();
        // calculate new scroll bar and cursor sizes and position
        var ratio = visibleHeight/fullHeight;
        var cursorHeight = Math.max(Math.floor(scrollBarHeight * ratio), minCursorHeight);
        var deltaPos = lastScrollPos / (fullHeight - visibleHeight);
        var cursorPos = (scrollBarHeight - cursorHeight) * deltaPos;
        // update items sizes and position
        scrollLine.css({"margin-top":lastScrollPos+"px", "height":scrollBarHeight+"px"});
        scrollCursor.css({"height":cursorHeight+"px", "margin-top":cursorPos+"px"});
        cursorFade();
      };
      var toid = 0;
      var cursorFade = function() {
        if(isMouseOverCursor || isMoving) return;
        scrollCursor.css("opacity", "0.6");
        if(toid) clearTimeout(toid);
        toid = setTimeout(function(){
          scrollCursor.css("opacity", "0.3");
          toid = 0;
        }, 300);
      };
      // mouse wheel event handler
      var onMouseWheel = function(e) {
        var dx = e.wheelDelta ? e.wheelDelta : (e.detail ? -e.detail : 0);
        container[0].scrollTop += (dx > 0 ? -scrollStep : (dx < 0 ? scrollStep : 0));
        updateScrollBar();
        e.stopPropagation();
        e.preventDefault();
        return false;
      };
      // resize window event handler
      var onResize = function(e){
        scrollLine.height(parseInt(scrollLine.css("height")));
        updateScrollBar(true);
      };
      // mouse enter container event handle
      var onMouseEnter = function(e) {
        if(isMoving && e.which != 1) onCursorMouseUp();
        scrollLine.css("opacity", "1");
        mouseInContainer = true;
      };
      // mouse leave container event handle
      var onMouseLeave = function(){
        if(!isMoving) scrollLine.css("opacity", "0");
        mouseInContainer = false;
      };
      // user push mouse button over scroll cursor
      var onCursorMouseDown = function(e) {
        mouseStartPos = e.pageY;
        cursorStartPos = parseInt(scrollCursor.css("margin-top"));
        jQuery(window).bind("mousemove", onCursorMouseMove);
        jQuery(window).bind("mouseup", onCursorMouseUp);
        jQuery(window).bind("mouseleave", onCursorMouseUp);
        isMoving = true;
        return false;
      };
      // user move mouse past down on scroll cursor
      var onCursorMouseMove = function(e) {
        var dy = e.pageY - mouseStartPos;
        var np = cursorStartPos + dy;
        var fullHeight = container.scrollHeight();
        var visibleHeight = container.clientHeight();
        var ratio = visibleHeight/fullHeight;
        np /= ratio;
        if(np != container.scrollTop())
        {
          container.scrollTop(np);
          updateScrollBar();
        }
        return false;
      };
      // user up mouse button when dragged scroll cursor
      var onCursorMouseUp = function() {
        jQuery(window).unbind("mousemove", onCursorMouseMove);
        jQuery(window).unbind("mouseup", onCursorMouseUp);
        jQuery(window).unbind("mouseleave", onCursorMouseUp);
        isMoving = false;
        if(!mouseInContainer) scrollLine.css("opacity", "0");
        if(!isMouseOverCursor) scrollCursor.css("opacity", "0.3");
        return false;
      };
      // mouse enter scroll cursor
      var onCursorMouseEnter = function(){
        scrollCursor.css("opacity", "0.6");
        isMouseOverCursor = true;
      };
      // mouse leave scroll cursor
      var onCursorMouseLeave = function(){
        isMouseOverCursor = false;
        if(!isMoving) scrollCursor.css("opacity", "0.3");
      };
      // for first check mouse position
      var onFirstMouseInitMove = function() {
        container.unbind("mousemove", onFirstMouseInitMove);
        if(mouseInContainer) return;
        onMouseEnter();
      };
      var removeScroll = function() {
        // remove scroll elements
        container.find(".thinScrollBarLine").remove();
        container.find(".thisScrollBarCursor").remove();
        // unbind events
        if(container[0].removeEventListener)
        {
          container[0].removeEventListener("DOMMouseScroll", onMouseWheel, false);
          container[0].removeEventListener("mousewheel", onMouseWheel, false);
        }
        else container[0].onmousewheel = null;
        // detach event listeners
        container.unbind("scroll");
        container.unbind("resize");
        container.unbind("scroll_update");
        container.unbind("mouseenter");
        container.unbind("mouseleave");
        scrollLine.unbind("mousedown");
        scrollCursor.unbind("mouseenter");
        scrollCursor.unbind("mouseleave");
        container.unbind("mousemove");
        container.unbind("remove_scroll");
      };
      // bind events
      if(container[0].addEventListener)
      {
        container[0].addEventListener("DOMMouseScroll", onMouseWheel, false);
        container[0].addEventListener("mousewheel", onMouseWheel, false);
      }
      else container[0].onmousewheel = onMouseWheel;
      // attach event listeners
      container.bind("scroll", function(){ updateScrollBar(); return false; });
      container.bind("resize",onResize);
      container.bind("scroll_update", function(event, time){
        updateScrollBar(true);
        if(typeof(time) != 'undefined' && time > 0)
          setTimeout(function(){ updateScrollBar(true); }, time);
        return false;
      });
      container.bind("mouseenter", onMouseEnter);
      container.bind("mouseleave", onMouseLeave);
      scrollLine.bind("mousedown", onCursorMouseDown);
      scrollCursor.bind("mouseenter", onCursorMouseEnter);
      scrollCursor.bind("mouseleave", onCursorMouseLeave);
      container.bind("mousemove", onFirstMouseInitMove);
      container.bind("remove_scroll", removeScroll);
      // first init update scroll bar
      updateScrollBar(true);
    }
    // apply scroll to all items in jQuery's sets
    this.each(function(key, obj){ new initScroll(obj,data); });
    return this;
  };
  jQuery.fn.removeThinScroll = function() {
    // apply scroll to all items in jQuery's sets
    this.each(function(key, obj){ jQuery(obj).trigger("remove_scroll"); });
    return this;
  };
  jQuery.fn.updateThinScroll = function(time) {
    // apply scroll to all items in jQuery's sets
    this.each(function(key, obj){ jQuery(obj).trigger("scroll_update", time); });
    return this;
  };
})(jQuery);
