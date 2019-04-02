/*
== malihu jquery custom scrollbar plugin == 
Version: 3.0.5 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright 2010 Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/(function(d,t,F,N){(function(t){var K="https:"==F.location.protocol?"https:":"http:";"function"===typeof define&&define.amd||d.event.special.mousewheel||d("head").append(decodeURI("%3Cscript src\x3d"+K+"//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js%3E%3C/script%3E"));t()})(function(){var M={setWidth:!1,setHeight:!1,setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,autoHideScrollbar:!1,autoExpandScrollbar:!1,alwaysShowScrollbar:0,snapAmount:null,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1,disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{enable:!1,scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoExpandHorizontalScroll:!1,autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable\x3d'true']",updateOnContentResize:!0,updateOnImageLoad:!0,updateOnSelectorChange:!1,releaseDraggableSelectors:!1},theme:"light",callbacks:{onInit:!1,onScrollStart:!1,onScroll:!1,onTotalScroll:!1,onTotalScrollBack:!1,whileScrolling:!1,onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0,onOverflowY:!1,onOverflowX:!1,onOverflowYNone:!1,onOverflowXNone:!1},live:!1,liveSelector:null},K=0,I={},J=function(a){I[a]&&(clearTimeout(I[a]),g._delete.call(null,I[a]))},H=t.attachEvent&&!t.addEventListener?1:0,B=!1,D={init:function(a){a=d.extend(!0,{},M,a);var c=g._selector.call(this);if(a.live){var b=a.liveSelector||this.selector||".mCustomScrollbar",f=d(b);if("off"===a.live){J(b);return}I[b]=setTimeout(function(){f.mCustomScrollbar(a);"once"===a.live&&f.length&&J(b)},500)}else J(b);a.setWidth=a.set_width?a.set_width:a.setWidth;a.setHeight=a.set_height?a.set_height:a.setHeight;a.axis=a.horizontalScroll?"x":g._findAxis.call(null,a.axis);a.scrollInertia=0<a.scrollInertia&&17>a.scrollInertia?17:a.scrollInertia;"object"!==typeof a.mouseWheel&&1==a.mouseWheel&&(a.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1});a.mouseWheel.scrollAmount=a.mouseWheelPixels?a.mouseWheelPixels:a.mouseWheel.scrollAmount;a.mouseWheel.normalizeDelta=a.advanced.normalizeMouseWheelDelta?a.advanced.normalizeMouseWheelDelta:a.mouseWheel.normalizeDelta;a.scrollButtons.scrollType=g._findScrollButtonsType.call(null,a.scrollButtons.scrollType);g._theme.call(null,a);return d(c).each(function(){var b=d(this);if(!b.data("mCS")){b.data("mCS",{idx:++K,opt:a,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:b.css("direction"),cbOffsets:null,trigger:null});var c=b.data("mCS").opt,f=b.data("mcs-axis"),m=b.data("mcs-scrollbar-position"),n=b.data("mcs-theme");f&&(c.axis=f);m&&(c.scrollbarPosition=m);n&&(c.theme=n,g._theme.call(null,c));g._pluginMarkup.call(this);D.update.call(null,b)}})},update:function(a){a=a||g._selector.call(this);return d(a).each(function(){var a=d(this);if(a.data("mCS")){var b=a.data("mCS"),f=b.opt,e=d("#mCSB_"+b.idx+"_container"),h=[d("#mCSB_"+b.idx+"_dragger_vertical"),d("#mCSB_"+b.idx+"_dragger_horizontal")];e.length&&(b.tweenRunning&&g._stop.call(null,a),a.hasClass("mCS_disabled")&&a.removeClass("mCS_disabled"),a.hasClass("mCS_destroyed")&&a.removeClass("mCS_destroyed"),g._maxHeight.call(this),g._expandContentHorizontally.call(this),"y"===f.axis||f.advanced.autoExpandHorizontalScroll||e.css("width",g._contentWidth(e.children())),b.overflowed=g._overflowed.call(this),g._scrollbarVisibility.call(this),f.autoDraggerLength&&g._setDraggerLength.call(this),g._scrollRatio.call(this),g._bindEvents.call(this),e=[Math.abs(e[0].offsetTop),Math.abs(e[0].offsetLeft)],"x"!==f.axis&&(b.overflowed[0]?h[0].height()>h[0].parent().height()?g._resetContentPosition.call(this):(g._scrollTo.call(this,a,e[0].toString(),{dir:"y",dur:0,overwrite:"none"}),b.contentReset.y=null):(g._resetContentPosition.call(this),"y"===f.axis?g._unbindEvents.call(this):"yx"===f.axis&&b.overflowed[1]&&g._scrollTo.call(this,a,e[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==f.axis&&(b.overflowed[1]?h[1].width()>h[1].parent().width()?g._resetContentPosition.call(this):(g._scrollTo.call(this,a,e[1].toString(),{dir:"x",dur:0,overwrite:"none"}),b.contentReset.x=null):(g._resetContentPosition.call(this),"x"===f.axis?g._unbindEvents.call(this):"yx"===f.axis&&b.overflowed[0]&&g._scrollTo.call(this,a,e[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),g._autoUpdate.call(this))}})},scrollTo:function(a,c){if("undefined"!=typeof a&&null!=a){var b=g._selector.call(this);return d(b).each(function(){var b=d(this);if(b.data("mCS")){var e=b.data("mCS"),h=e.opt,k=d.extend(!0,{},{trigger:"external",scrollInertia:h.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},c),m=g._arr.call(this,a),n=0<k.scrollInertia&&17>k.scrollInertia?17:k.scrollInertia;m[0]=g._to.call(this,m[0],"y");m[1]=g._to.call(this,m[1],"x");k.moveDragger&&(m[0]*=e.scrollRatio.y,m[1]*=e.scrollRatio.x);k.dur=n;setTimeout(function(){null!==m[0]&&"undefined"!==typeof m[0]&&"x"!==h.axis&&e.overflowed[0]&&(k.dir="y",k.overwrite="all",g._scrollTo.call(this,b,m[0].toString(),k));null!==m[1]&&"undefined"!==typeof m[1]&&"y"!==h.axis&&e.overflowed[1]&&(k.dir="x",k.overwrite="none",g._scrollTo.call(this,b,m[1].toString(),k))},k.timeout)}})}},stop:function(){var a=g._selector.call(this);return d(a).each(function(){var a=d(this);a.data("mCS")&&g._stop.call(null,a)})},disable:function(a){var c=g._selector.call(this);return d(c).each(function(){var b=d(this);b.data("mCS")&&(b.data("mCS"),g._autoUpdate.call(this,"remove"),g._unbindEvents.call(this),a&&g._resetContentPosition.call(this),g._scrollbarVisibility.call(this,!0),b.addClass("mCS_disabled"))})},destroy:function(){var a=g._selector.call(this);return d(a).each(function(){var c=d(this);if(c.data("mCS")){var b=c.data("mCS"),f=b.opt,e=d("#mCSB_"+b.idx),h=d("#mCSB_"+b.idx+"_container"),k=d(".mCSB_"+b.idx+"_scrollbar");f.live&&J(a);g._autoUpdate.call(this,"remove");g._unbindEvents.call(this);g._resetContentPosition.call(this);c.removeData("mCS");g._delete.call(null,this.mcs);k.remove();e.replaceWith(h.contents());c.removeClass("mCustomScrollbar _mCS_"+b.idx+" mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")}})}},g={_selector:function(){return"object"!==typeof d(this)||1>d(this).length?".mCustomScrollbar":this},_theme:function(a){a.autoDraggerLength=-1<d.inArray(a.theme,["rounded","rounded-dark","rounded-dots","rounded-dots-dark"])?!1:a.autoDraggerLength;a.autoExpandScrollbar=-1<d.inArray(a.theme,"rounded-dots rounded-dots-dark 3d 3d-dark 3d-thick 3d-thick-dark inset inset-dark inset-2 inset-2-dark inset-3 inset-3-dark".split(" "))?!1:a.autoExpandScrollbar;a.scrollButtons.enable=-1<d.inArray(a.theme,["minimal","minimal-dark"])?!1:a.scrollButtons.enable;a.autoHideScrollbar=-1<d.inArray(a.theme,["minimal","minimal-dark"])?!0:a.autoHideScrollbar;a.scrollbarPosition=-1<d.inArray(a.theme,["minimal","minimal-dark"])?"outside":a.scrollbarPosition},_findAxis:function(a){return"yx"===a||"xy"===a||"auto"===a?"yx":"x"===a||"horizontal"===a?"x":"y"},_findScrollButtonsType:function(a){return"stepped"===a||"pixels"===a||"step"===a||"click"===a?"stepped":"stepless"},_pluginMarkup:function(){var a=d(this),c=a.data("mCS"),b=c.opt,f=b.autoExpandScrollbar?" mCSB_scrollTools_onDrag_expand":"",f=["\x3cdiv id\x3d'mCSB_"+c.idx+"_scrollbar_vertical' class\x3d'mCSB_scrollTools mCSB_"+c.idx+"_scrollbar mCS-"+b.theme+" mCSB_scrollTools_vertical"+f+"'\x3e\x3cdiv class\x3d'mCSB_draggerContainer'\x3e\x3cdiv id\x3d'mCSB_"+c.idx+"_dragger_vertical' class\x3d'mCSB_dragger' style\x3d'position:absolute;' oncontextmenu\x3d'return false;'\x3e\x3cdiv class\x3d'mCSB_dragger_bar' /\x3e\x3c/div\x3e\x3cdiv class\x3d'mCSB_draggerRail' /\x3e\x3c/div\x3e\x3c/div\x3e","\x3cdiv id\x3d'mCSB_"+c.idx+"_scrollbar_horizontal' class\x3d'mCSB_scrollTools mCSB_"+c.idx+"_scrollbar mCS-"+b.theme+" mCSB_scrollTools_horizontal"+f+"'\x3e\x3cdiv class\x3d'mCSB_draggerContainer'\x3e\x3cdiv id\x3d'mCSB_"+c.idx+"_dragger_horizontal' class\x3d'mCSB_dragger' style\x3d'position:absolute;' oncontextmenu\x3d'return false;'\x3e\x3cdiv class\x3d'mCSB_dragger_bar' /\x3e\x3c/div\x3e\x3cdiv class\x3d'mCSB_draggerRail' /\x3e\x3c/div\x3e\x3c/div\x3e"],e="yx"===b.axis?"mCSB_vertical_horizontal":"x"===b.axis?"mCSB_horizontal":"mCSB_vertical",f="yx"===b.axis?f[0]+f[1]:"x"===b.axis?f[1]:f[0],h="yx"===b.axis?"\x3cdiv id\x3d'mCSB_"+c.idx+"_container_wrapper' class\x3d'mCSB_container_wrapper' /\x3e":"",k=b.autoHideScrollbar?" mCS-autoHide":"",m="x"!==b.axis&&"rtl"===c.langDir?" mCS-dir-rtl":"";b.setWidth&&a.css("width",b.setWidth);b.setHeight&&a.css("height",b.setHeight);b.setLeft="y"!==b.axis&&"rtl"===c.langDir?"989999px":b.setLeft;a.addClass("mCustomScrollbar _mCS_"+c.idx+k+m).wrapInner("\x3cdiv id\x3d'mCSB_"+c.idx+"' class\x3d'mCustomScrollBox mCS-"+b.theme+" "+e+"'\x3e\x3cdiv id\x3d'mCSB_"+c.idx+"_container' class\x3d'mCSB_container' style\x3d'position:relative; top:"+b.setTop+"; left:"+b.setLeft+";' dir\x3d"+c.langDir+" /\x3e\x3c/div\x3e");e=d("#mCSB_"+c.idx);k=d("#mCSB_"+c.idx+"_container");"y"===b.axis||b.advanced.autoExpandHorizontalScroll||k.css("width",g._contentWidth(k.children()));"outside"===b.scrollbarPosition?("static"===a.css("position")&&a.css("position","relative"),a.css("overflow","visible"),e.addClass("mCSB_outside").after(f)):(e.addClass("mCSB_inside").append(f),k.wrap(h));g._scrollButtons.call(this);a=[d("#mCSB_"+c.idx+"_dragger_vertical"),d("#mCSB_"+c.idx+"_dragger_horizontal")];a[0].css("min-height",a[0].height());a[1].css("min-width",a[1].width())},_contentWidth:function(a){return Math.max.apply(Math,a.map(function(){return d(this).outerWidth(!0)}).get())},_expandContentHorizontally:function(){var a=d(this).data("mCS"),c=a.opt,a=d("#mCSB_"+a.idx+"_container");c.advanced.autoExpandHorizontalScroll&&"y"!==c.axis&&a.css({position:"absolute",width:"auto"}).wrap("\x3cdiv class\x3d'mCSB_h_wrapper' style\x3d'position:relative; left:0; width:999999px;' /\x3e").css({width:Math.ceil(a[0].getBoundingClientRect().right+.4)-Math.floor(a[0].getBoundingClientRect().left),position:"relative"}).unwrap()},_scrollButtons:function(){var a=d(this).data("mCS"),c=a.opt,a=d(".mCSB_"+a.idx+"_scrollbar:first"),b=["\x3ca href\x3d'#' class\x3d'mCSB_buttonUp' oncontextmenu\x3d'return false;' /\x3e","\x3ca href\x3d'#' class\x3d'mCSB_buttonDown' oncontextmenu\x3d'return false;' /\x3e","\x3ca href\x3d'#' class\x3d'mCSB_buttonLeft' oncontextmenu\x3d'return false;' /\x3e","\x3ca href\x3d'#' class\x3d'mCSB_buttonRight' oncontextmenu\x3d'return false;' /\x3e"],b=["x"===c.axis?b[2]:b[0],"x"===c.axis?b[3]:b[1],b[2],b[3]];c.scrollButtons.enable&&a.prepend(b[0]).append(b[1]).next(".mCSB_scrollTools").prepend(b[2]).append(b[3])},_maxHeight:function(){var a=d(this),c=a.data("mCS"),c=d("#mCSB_"+c.idx),b=a.css("max-height")||"none",f=-1!==b.indexOf("%"),e=a.css("box-sizing");"none"!==b&&(b=f?a.parent().height()*parseInt(b)/100:parseInt(b),"border-box"===e&&(b-=a.innerHeight()-a.height()+(a.outerHeight()-a.innerHeight())),c.css("max-height",Math.round(b)))},_setDraggerLength:function(){var a=d(this).data("mCS"),c=d("#mCSB_"+a.idx),b=d("#mCSB_"+a.idx+"_container"),a=[d("#mCSB_"+a.idx+"_dragger_vertical"),d("#mCSB_"+a.idx+"_dragger_horizontal")],c=[c.height()/b.outerHeight(!1),c.width()/b.outerWidth(!1)],c=[parseInt(a[0].css("min-height")),Math.round(c[0]*a[0].parent().height()),parseInt(a[1].css("min-width")),Math.round(c[1]*a[1].parent().width())],b=H&&c[3]<c[2]?c[2]:c[3];a[0].css({height:H&&c[1]<c[0]?c[0]:c[1],"max-height":a[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"});a[1].css({width:b,"max-width":a[1].parent().width()-10})},_scrollRatio:function(){var a=d(this).data("mCS"),c=d("#mCSB_"+a.idx),b=d("#mCSB_"+a.idx+"_container"),f=[d("#mCSB_"+a.idx+"_dragger_vertical"),d("#mCSB_"+a.idx+"_dragger_horizontal")],c=[b.outerHeight(!1)-c.height(),b.outerWidth(!1)-c.width()],f=[c[0]/(f[0].parent().height()-f[0].height()),c[1]/(f[1].parent().width()-f[1].width())];a.scrollRatio={y:f[0],x:f[1]}},_onDragClasses:function(a,c,b){b=b?"mCSB_dragger_onDrag_expanded":"";var d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag"],e=a.closest(".mCSB_scrollTools");"active"===c?(a.toggleClass(d[0]+" "+b),e.toggleClass(d[1]),a[0]._draggable=a[0]._draggable?0:1):a[0]._draggable||("hide"===c?(a.removeClass(d[0]),e.removeClass(d[1])):(a.addClass(d[0]),e.addClass(d[1])))},_overflowed:function(){var a=d(this).data("mCS"),c=d("#mCSB_"+a.idx),b=d("#mCSB_"+a.idx+"_container"),f=null==a.overflowed?b.height():b.outerHeight(!1),a=null==a.overflowed?b.width():b.outerWidth(!1);return[f>c.height(),a>c.width()]},_resetContentPosition:function(){var a=d(this),c=a.data("mCS"),b=c.opt,f=d("#mCSB_"+c.idx),e=d("#mCSB_"+c.idx+"_container"),h=[d("#mCSB_"+c.idx+"_dragger_vertical"),d("#mCSB_"+c.idx+"_dragger_horizontal")];g._stop(a);if("x"!==b.axis&&!c.overflowed[0]||"y"===b.axis&&c.overflowed[0])h[0].add(e).css("top",0),g._scrollTo(a,"_resetY");if("y"!==b.axis&&!c.overflowed[1]||"x"===b.axis&&c.overflowed[1])b=dx=0,"rtl"===c.langDir&&(b=f.width()-e.outerWidth(!1),dx=Math.abs(b/c.scrollRatio.x)),e.css("left",b),h[1].css("left",dx),g._scrollTo(a,"_resetX")},_bindEvents:function(){var a=d(this),c=a.data("mCS"),b=c.opt;if(!c.bindEvents){g._draggable.call(this);b.contentTouchScroll&&g._contentDraggable.call(this);if(b.mouseWheel.enable){var f=function(){e=setTimeout(function(){d.event.special.mousewheel?(clearTimeout(e),g._mousewheel.call(a[0])):f()},1E3)},e;f()}g._draggerRail.call(this);g._wrapperScroll.call(this);b.advanced.autoScrollOnFocus&&g._focus.call(this);b.scrollButtons.enable&&g._buttons.call(this);b.keyboard.enable&&g._keyboard.call(this);c.bindEvents=!0}},_unbindEvents:function(){var a=d(this),c=a.data("mCS"),b=c.opt,f="mCS_"+c.idx,e=".mCSB_"+c.idx+"_scrollbar",e=d("#mCSB_"+c.idx+",#mCSB_"+c.idx+"_container,#mCSB_"+c.idx+"_container_wrapper,"+e+" .mCSB_draggerContainer,#mCSB_"+c.idx+"_dragger_vertical,#mCSB_"+c.idx+"_dragger_horizontal,"+e+"\x3ea"),h=d("#mCSB_"+c.idx+"_container");b.advanced.releaseDraggableSelectors&&e.add(d(b.advanced.releaseDraggableSelectors));c.bindEvents&&(d(F).unbind("."+f),e.each(function(){d(this).unbind("."+f)}),clearTimeout(a[0]._focusTimeout),g._delete.call(null,a[0]._focusTimeout),clearTimeout(c.sequential.step),g._delete.call(null,c.sequential.step),clearTimeout(h[0].onCompleteTimeout),g._delete.call(null,h[0].onCompleteTimeout),c.bindEvents=!1)},_scrollbarVisibility:function(a){var c=d(this),b=c.data("mCS"),f=b.opt,e=d("#mCSB_"+b.idx+"_container_wrapper"),e=e.length?e:d("#mCSB_"+b.idx+"_container"),g=[d("#mCSB_"+b.idx+"_scrollbar_vertical"),d("#mCSB_"+b.idx+"_scrollbar_horizontal")],k=[g[0].find(".mCSB_dragger"),g[1].find(".mCSB_dragger")];"x"!==f.axis&&(b.overflowed[0]&&!a?(g[0].add(k[0]).add(g[0].children("a")).css("display","block"),e.removeClass("mCS_no_scrollbar_y mCS_y_hidden")):(f.alwaysShowScrollbar?(2!==f.alwaysShowScrollbar&&k[0].add(g[0].children("a")).css("display","none"),e.removeClass("mCS_y_hidden")):(g[0].css("display","none"),e.addClass("mCS_y_hidden")),e.addClass("mCS_no_scrollbar_y")));"y"!==f.axis&&(b.overflowed[1]&&!a?(g[1].add(k[1]).add(g[1].children("a")).css("display","block"),e.removeClass("mCS_no_scrollbar_x mCS_x_hidden")):(f.alwaysShowScrollbar?(2!==f.alwaysShowScrollbar&&k[1].add(g[1].children("a")).css("display","none"),e.removeClass("mCS_x_hidden")):(g[1].css("display","none"),e.addClass("mCS_x_hidden")),e.addClass("mCS_no_scrollbar_x")));b.overflowed[0]||b.overflowed[1]?c.removeClass("mCS_no_scrollbar"):c.addClass("mCS_no_scrollbar")},_coordinates:function(a){switch(a.type){case "pointerdown":case "MSPointerDown":case "pointermove":case "MSPointerMove":case "pointerup":case "MSPointerUp":return[a.originalEvent.pageY,a.originalEvent.pageX,!1];case "touchstart":case "touchmove":case "touchend":var c=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];return[c.pageY,c.pageX,1<(a.originalEvent.touches.length||a.originalEvent.changedTouches.length)];default:return[a.pageY,a.pageX,!1]}},_draggable:function(){function a(a){var b=m.find("iframe");b.length&&b.css("pointer-events",a?"auto":"none")}function c(a,c,d,h){m[0].idleTimer=233>e.scrollInertia?250:0;if(l.attr("id")===k[1]){var n="x";a=(l[0].offsetLeft-c+h)*f.scrollRatio.x}else n="y",a=(l[0].offsetTop-a+d)*f.scrollRatio.y;g._scrollTo(b,a.toString(),{dir:n,drag:!0})}var b=d(this),f=b.data("mCS"),e=f.opt,h="mCS_"+f.idx,k=["mCSB_"+f.idx+"_dragger_vertical","mCSB_"+f.idx+"_dragger_horizontal"],m=d("#mCSB_"+f.idx+"_container"),n=d("#"+k[0]+",#"+k[1]),l,p,G,A=e.advanced.releaseDraggableSelectors?n.add(d(e.advanced.releaseDraggableSelectors)):n;n.bind("mousedown."+h+" touchstart."+h+" pointerdown."+h+" MSPointerDown."+h,function(c){c.stopImmediatePropagation();c.preventDefault();if(g._mouseBtnLeft(c)){B=!0;H&&(F.onselectstart=function(){return!1});a(!1);g._stop(b);l=d(this);var f=l.offset(),h=g._coordinates(c)[0]-f.top;c=g._coordinates(c)[1]-f.left;var k=l.height()+f.top,f=l.width()+f.left;h<k&&0<h&&c<f&&0<c&&(p=h,G=c);g._onDragClasses(l,"active",e.autoExpandScrollbar)}}).bind("touchmove."+h,function(a){a.stopImmediatePropagation();a.preventDefault();var b=l.offset(),d=g._coordinates(a)[0]-b.top;a=g._coordinates(a)[1]-b.left;c(p,G,d,a)});d(F).bind("mousemove."+h+" pointermove."+h+" MSPointerMove."+h,function(a){if(l){var b=l.offset(),d=g._coordinates(a)[0]-b.top;a=g._coordinates(a)[1]-b.left;p!==d&&c(p,G,d,a)}}).add(A).bind("mouseup."+h+" touchend."+h+" pointerup."+h+" MSPointerUp."+h,function(b){l&&(g._onDragClasses(l,"active",e.autoExpandScrollbar),l=null);B=!1;H&&(F.onselectstart=null);a(!0)})},_contentDraggable:function(){function a(a,b){var c=[1.5*b,2*b,b/1.5,b/2];return 90<a?4<b?c[0]:c[3]:60<a?3<b?c[3]:c[2]:30<a?8<b?c[1]:6<b?c[0]:4<b?b:c[2]:8<b?b:c[3]}function c(a,c,d,f,e,h){a&&g._scrollTo(b,a.toString(),{dur:c,scrollEasing:d,dir:f,overwrite:e,drag:h})}var b=d(this),f=b.data("mCS"),e=f.opt,h="mCS_"+f.idx,k=d("#mCSB_"+f.idx),m=d("#mCSB_"+f.idx+"_container"),n=[d("#mCSB_"+f.idx+"_dragger_vertical"),d("#mCSB_"+f.idx+"_dragger_horizontal")],l,p,G,A,w=[],u=[],q,x,v,y,r,z,C,L="yx"===e.axis?"none":"all",E=[];m.bind("touchstart."+h+" pointerdown."+h+" MSPointerDown."+h,function(a){if(g._pointerTouch(a)&&!B&&!g._coordinates(a)[2]){var b=m.offset();l=g._coordinates(a)[0]-b.top;p=g._coordinates(a)[1]-b.left;E=[g._coordinates(a)[0],g._coordinates(a)[1]]}}).bind("touchmove."+h+" pointermove."+h+" MSPointerMove."+h,function(a){if(g._pointerTouch(a)&&!B&&!g._coordinates(a)[2]){a.stopImmediatePropagation();x=g._getTime();var b=k.offset(),d=g._coordinates(a)[0]-b.top,b=g._coordinates(a)[1]-b.left;w.push(d);u.push(b);E[2]=Math.abs(g._coordinates(a)[0]-E[0]);E[3]=Math.abs(g._coordinates(a)[1]-E[1]);if(f.overflowed[0])var h=n[0].parent().height()-n[0].height(),h=0<l-d&&d-l>-(h*f.scrollRatio.y)&&(2*E[3]<E[2]||"yx"===e.axis);if(f.overflowed[1])var C=n[1].parent().width()-n[1].width(),C=0<p-b&&b-p>-(C*f.scrollRatio.x)&&(2*E[2]<E[3]||"yx"===e.axis);(h||C)&&a.preventDefault();z="yx"===e.axis?[l-d,p-b]:"x"===e.axis?[null,p-b]:[l-d,null];m[0].idleTimer=250;f.overflowed[0]&&c(z[0],0,"mcsLinearOut","y","all",!0);f.overflowed[1]&&c(z[1],0,"mcsLinearOut","x",L,!0)}});k.bind("touchstart."+h+" pointerdown."+h+" MSPointerDown."+h,function(a){if(g._pointerTouch(a)&&!B&&!g._coordinates(a)[2]){a.stopImmediatePropagation();g._stop(b);q=g._getTime();var c=k.offset();G=g._coordinates(a)[0]-c.top;A=g._coordinates(a)[1]-c.left;w=[];u=[]}}).bind("touchend."+h+" pointerup."+h+" MSPointerUp."+h,function(b){if(g._pointerTouch(b)&&!B&&!g._coordinates(b)[2]){b.stopImmediatePropagation();v=g._getTime();var d=k.offset(),h=g._coordinates(b)[0]-d.top,d=g._coordinates(b)[1]-d.left;if(!(30<v-x)){r=1E3/(v-q);var n=(b=2.5>r)?[w[w.length-2],u[u.length-2]]:[0,0];y=b?[h-n[0],d-n[1]]:[h-G,d-A];h=[Math.abs(y[0]),Math.abs(y[1])];r=b?[Math.abs(y[0]/4),Math.abs(y[1]/4)]:[r,r];b=[Math.abs(m[0].offsetTop)-y[0]*a(h[0]/r[0],r[0]),Math.abs(m[0].offsetLeft)-y[1]*a(h[1]/r[1],r[1])];z="yx"===e.axis?[b[0],b[1]]:"x"===e.axis?[null,b[1]]:[b[0],null];C=[4*h[0]+e.scrollInertia,4*h[1]+e.scrollInertia];b=parseInt(e.contentTouchScroll)||0;z[0]=h[0]>b?z[0]:0;z[1]=h[1]>b?z[1]:0;f.overflowed[0]&&c(z[0],C[0],"mcsEaseOut","y",L,!1);f.overflowed[1]&&c(z[1],C[1],"mcsEaseOut","x",L,!1)}}})},_mousewheel:function(){var a=d(this),c=a.data("mCS");if(c){var b=c.opt,f="mCS_"+c.idx,e=d("#mCSB_"+c.idx),h=[d("#mCSB_"+c.idx+"_dragger_vertical"),d("#mCSB_"+c.idx+"_dragger_horizontal")],k=d("#mCSB_"+c.idx+"_container").find("iframe"),m=e;k.length&&k.each(function(){var a=null;try{a=(this.contentDocument||this.contentWindow.document).body.innerHTML}catch(l){}null!==a&&(m=m.add(d(this).contents().find("body")))});m.bind("mousewheel."+f,function(f,k){g._stop(a);if(!g._disableMousewheel(a,f.target)){var l="auto"!==b.mouseWheel.deltaFactor?parseInt(b.mouseWheel.deltaFactor):H&&100>f.deltaFactor?100:f.deltaFactor||100;if("x"===b.axis||"x"===b.mouseWheel.axis)var n="x",l=[Math.round(l*c.scrollRatio.x),parseInt(b.mouseWheel.scrollAmount)],l="auto"!==b.mouseWheel.scrollAmount?l[1]:l[0]>=e.width()?.9*e.width():l[0],m=Math.abs(d("#mCSB_"+c.idx+"_container")[0].offsetLeft),w=h[1][0].offsetLeft,u=h[1].parent().width()-h[1].width(),q=f.deltaX||f.deltaY||k;else n="y",l=[Math.round(l*c.scrollRatio.y),parseInt(b.mouseWheel.scrollAmount)],l="auto"!==b.mouseWheel.scrollAmount?l[1]:l[0]>=e.height()?.9*e.height():l[0],m=Math.abs(d("#mCSB_"+c.idx+"_container")[0].offsetTop),w=h[0][0].offsetTop,u=h[0].parent().height()-h[0].height(),q=f.deltaY||k;if(("y"!==n||c.overflowed[0])&&("x"!==n||c.overflowed[1])){b.mouseWheel.invert&&(q=-q);b.mouseWheel.normalizeDelta&&(q=0>q?-1:1);if(0<q&&0!==w||0>q&&w!==u||b.mouseWheel.preventDefault)f.stopImmediatePropagation(),f.preventDefault();g._scrollTo(a,(m-q*l).toString(),{dir:n})}}})}},_disableMousewheel:function(a,c){var b=c.nodeName.toLowerCase(),f=a.data("mCS").opt.mouseWheel.disableOver,g=["select","textarea"];return-1<d.inArray(b,f)&&!(-1<d.inArray(b,g)&&!d(c).is(":focus"))},_draggerRail:function(){var a=d(this),c=a.data("mCS"),b="mCS_"+c.idx,f=d("#mCSB_"+c.idx+"_container"),e=f.parent();d(".mCSB_"+c.idx+"_scrollbar .mCSB_draggerContainer").bind("touchstart."+b+" pointerdown."+b+" MSPointerDown."+b,function(a){B=!0}).bind("touchend."+b+" pointerup."+b+" MSPointerUp."+b,function(a){B=!1}).bind("click."+b,function(b){if(d(b.target).hasClass("mCSB_draggerContainer")||d(b.target).hasClass("mCSB_draggerRail")){g._stop(a);var h=d(this),m=h.find(".mCSB_dragger");if(0<h.parent(".mCSB_scrollTools_horizontal").length){if(!c.overflowed[1])return;h="x";b=b.pageX>m.offset().left?-1:1;b=Math.abs(f[0].offsetLeft)-.9*b*e.width()}else{if(!c.overflowed[0])return;h="y";b=b.pageY>m.offset().top?-1:1;b=Math.abs(f[0].offsetTop)-.9*b*e.height()}g._scrollTo(a,b.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}})},_focus:function(){var a=d(this),c=a.data("mCS"),b=c.opt,f="mCS_"+c.idx,e=d("#mCSB_"+c.idx+"_container"),h=e.parent();e.bind("focusin."+f,function(c){var f=d(F.activeElement);c=e.find(".mCustomScrollBox").length;f.is(b.advanced.autoScrollOnFocus)&&(g._stop(a),clearTimeout(a[0]._focusTimeout),a[0]._focusTimer=c?17*c:0,a[0]._focusTimeout=setTimeout(function(){var c=[f.offset().top-e.offset().top,f.offset().left-e.offset().left],d=[e[0].offsetTop,e[0].offsetLeft],d=[0<=d[0]+c[0]&&d[0]+c[0]<h.height()-f.outerHeight(!1),0<=d[1]+c[1]&&d[0]+c[1]<h.width()-f.outerWidth(!1)],k="yx"!==b.axis||d[0]||d[1]?"all":"none";"x"===b.axis||d[0]||g._scrollTo(a,c[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:k,dur:0});"y"===b.axis||d[1]||g._scrollTo(a,c[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:k,dur:0})},a[0]._focusTimer))})},_wrapperScroll:function(){var a=d(this).data("mCS"),c="mCS_"+a.idx,b=d("#mCSB_"+a.idx+"_container").parent();b.bind("scroll."+c,function(c){0===b.scrollTop()&&0===b.scrollLeft()||d(".mCSB_"+a.idx+"_scrollbar").css("visibility","hidden")})},_buttons:function(){var a=d(this),c=a.data("mCS"),b=c.opt,f=c.sequential,e="mCS_"+c.idx;d("#mCSB_"+c.idx+"_container");d(".mCSB_"+c.idx+"_scrollbar\x3ea").bind("mousedown."+e+" touchstart."+e+" pointerdown."+e+" MSPointerDown."+e+" mouseup."+e+" touchend."+e+" pointerup."+e+" MSPointerUp."+e+" mouseout."+e+" pointerout."+e+" MSPointerOut."+e+" click."+e,function(e){function h(c,d){f.scrollAmount=b.snapAmount||b.scrollButtons.scrollAmount;g._sequentialScroll.call(this,a,c,d)}e.preventDefault();if(g._mouseBtnLeft(e)){var m=d(this).attr("class");f.type=b.scrollButtons.scrollType;switch(e.type){case "mousedown":case "touchstart":case "pointerdown":case "MSPointerDown":if("stepped"===f.type)break;B=!0;c.tweenRunning=!1;h("on",m);break;case "mouseup":case "touchend":case "pointerup":case "MSPointerUp":case "mouseout":case "pointerout":case "MSPointerOut":if("stepped"===f.type)break;B=!1;f.dir&&h("off",m);break;case "click":"stepped"!==f.type||c.tweenRunning||h("on",m)}}})},_keyboard:function(){var a=d(this),c=a.data("mCS"),b=c.opt,f=c.sequential,e="mCS_"+c.idx,h=d("#mCSB_"+c.idx),k=d("#mCSB_"+c.idx+"_container"),m=k.parent();h.attr("tabindex","0").bind("blur."+e+" keydown."+e+" keyup."+e,function(e){function h(d,e){f.type=b.keyboard.scrollType;f.scrollAmount=b.snapAmount||b.keyboard.scrollAmount;"stepped"===f.type&&c.tweenRunning||g._sequentialScroll.call(this,a,d,e)}switch(e.type){case "blur":c.tweenRunning&&f.dir&&h("off",null);break;case "keydown":case "keyup":var p=e.keyCode?e.keyCode:e.which,n="on";if("x"!==b.axis&&(38===p||40===p)||"y"!==b.axis&&(37===p||39===p))(38!==p&&40!==p||c.overflowed[0])&&(37!==p&&39!==p||c.overflowed[1])&&("keyup"===e.type&&(n="off"),d(F.activeElement).is("input,textarea,select,datalist,keygen,[contenteditable\x3d'true']")||(e.preventDefault(),e.stopImmediatePropagation(),h(n,p)));else if(33===p||34===p){if(c.overflowed[0]||c.overflowed[1])e.preventDefault(),e.stopImmediatePropagation();"keyup"===e.type&&(g._stop(a),p=34===p?-1:1,"x"===b.axis||"yx"===b.axis&&c.overflowed[1]&&!c.overflowed[0]?(e="x",p=Math.abs(k[0].offsetLeft)-.9*p*m.width()):(e="y",p=Math.abs(k[0].offsetTop)-.9*p*m.height()),g._scrollTo(a,p.toString(),{dir:e,scrollEasing:"mcsEaseInOut"}))}else if((35===p||36===p)&&!d(F.activeElement).is("input,textarea,select,datalist,keygen,[contenteditable\x3d'true']")){if(c.overflowed[0]||c.overflowed[1])e.preventDefault(),e.stopImmediatePropagation();"keyup"===e.type&&("x"===b.axis||"yx"===b.axis&&c.overflowed[1]&&!c.overflowed[0]?(e="x",p=35===p?Math.abs(m.width()-k.outerWidth(!1)):0):(e="y",p=35===p?Math.abs(m.height()-k.outerHeight(!1)):0),g._scrollTo(a,p.toString(),{dir:e,scrollEasing:"mcsEaseInOut"}))}}})},_sequentialScroll:function(a,c,b){function f(b){var c="stepped"!==k.type,d=b?c?h.scrollInertia/1.5:h.scrollInertia:1E3/60,l=b?c?7.5:40:2.5,n=[Math.abs(m[0].offsetTop),Math.abs(m[0].offsetLeft)],u=[10<e.scrollRatio.y?10:e.scrollRatio.y,10<e.scrollRatio.x?10:e.scrollRatio.x],l="x"===k.dir[0]?n[1]+k.dir[1]*u[1]*l:n[0]+k.dir[1]*u[0]*l,u="x"===k.dir[0]?n[1]+k.dir[1]*parseInt(k.scrollAmount):n[0]+k.dir[1]*parseInt(k.scrollAmount),l="auto"!==k.scrollAmount?u:l;b&&17>d&&(l="x"===k.dir[0]?n[1]:n[0]);g._scrollTo(a,l.toString(),{dir:k.dir[0],scrollEasing:b?c?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",dur:d,onComplete:b?!0:!1});b?k.dir=!1:(clearTimeout(k.step),k.step=setTimeout(function(){f()},d))}var e=a.data("mCS"),h=e.opt,k=e.sequential,m=d("#mCSB_"+e.idx+"_container"),n="stepped"===k.type?!0:!1;switch(c){case "on":k.dir=["mCSB_buttonRight"===b||"mCSB_buttonLeft"===b||39===b||37===b?"x":"y","mCSB_buttonUp"===b||"mCSB_buttonLeft"===b||38===b||37===b?-1:1];g._stop(a);if(g._isNumeric(b)&&"stepped"===k.type)break;f(n);break;case "off":clearTimeout(k.step),g._stop(a),(n||e.tweenRunning&&k.dir)&&f(!0)}},_arr:function(a){var c=d(this).data("mCS").opt,b=[];"function"===typeof a&&(a=a());a instanceof Array?b=1<a.length?[a[0],a[1]]:"x"===c.axis?[null,a[0]]:[a[0],null]:(b[0]=a.y?a.y:a.x||"x"===c.axis?null:a,b[1]=a.x?a.x:a.y||"y"===c.axis?null:a);"function"===typeof b[0]&&(b[0]=b[0]());"function"===typeof b[1]&&(b[1]=b[1]());return b},_to:function(a,c){if(null!=a&&"undefined"!=typeof a){var b=d(this),f=b.data("mCS"),e=f.opt,f=d("#mCSB_"+f.idx+"_container"),h=f.parent(),k=typeof a;c||(c="x"===e.axis?"x":"y");var m="x"===c?f.outerWidth(!1):f.outerHeight(!1),e="x"===c?f.offset().left:f.offset().top,n="x"===c?f[0].offsetLeft:f[0].offsetTop,l="x"===c?"left":"top";switch(k){case "function":return a();case "object":if(a.nodeType)var p="x"===c?d(a).offset().left:d(a).offset().top;else if(a.jquery){if(!a.length)break;p="x"===c?a.offset().left:a.offset().top}return p-e;case "string":case "number":if(g._isNumeric.call(null,a))return Math.abs(a);if(-1!==a.indexOf("%"))return Math.abs(m*parseInt(a)/100);if(-1!==a.indexOf("-\x3d"))return Math.abs(n-parseInt(a.split("-\x3d")[1]));if(-1!==a.indexOf("+\x3d"))return b=n+parseInt(a.split("+\x3d")[1]),0<=b?0:Math.abs(b);if(-1!==a.indexOf("px")&&g._isNumeric.call(null,a.split("px")[0]))return Math.abs(a.split("px")[0]);if("top"===a||"left"===a)return 0;if("bottom"===a)return Math.abs(h.height()-f.outerHeight(!1));if("right"===a)return Math.abs(h.width()-f.outerWidth(!1));if("first"===a||"last"===a)return b=f.find(":"+a),p="x"===c?d(b).offset().left:d(b).offset().top,p-e;if(d(a).length)return p="x"===c?d(a).offset().left:d(a).offset().top,p-e;f.css(l,a);D.update.call(null,b[0])}}},_autoUpdate:function(a){function c(){clearTimeout(l[0].autoUpdate);l[0].autoUpdate=setTimeout(function(){if(n.advanced.updateOnSelectorChange&&(u=e(),u!==w)){h();w=u;return}n.advanced.updateOnContentResize&&(x=[l.outerHeight(!1),l.outerWidth(!1),p.height(),p.width(),A()[0],A()[1]],x[0]!==q[0]||x[1]!==q[1]||x[2]!==q[2]||x[3]!==q[3]||x[4]!==q[4]||x[5]!==q[5])&&(h(),q=x);n.advanced.updateOnImageLoad&&(y=b(),y!==v&&(l.find("img").each(function(){f(this.src)}),v=y));(n.advanced.updateOnSelectorChange||n.advanced.updateOnContentResize||n.advanced.updateOnImageLoad)&&c()},60)}function b(){var a=0;n.advanced.updateOnImageLoad&&(a=l.find("img").length);return a}function f(a){var b=new Image;b.onload=function(a,b){return function(){return b.apply(a,arguments)}}(b,function(){this.onload=null;h()});b.src=a}function e(){!0===n.advanced.updateOnSelectorChange&&(n.advanced.updateOnSelectorChange="*");var a=0,b=l.find(n.advanced.updateOnSelectorChange);n.advanced.updateOnSelectorChange&&0<b.length&&b.each(function(){a+=d(this).height()+d(this).width()});return a}function h(){clearTimeout(l[0].autoUpdate);D.update.call(null,k[0])}var k=d(this),m=k.data("mCS"),n=m.opt,l=d("#mCSB_"+m.idx+"_container");if(a)clearTimeout(l[0].autoUpdate),g._delete.call(null,l[0].autoUpdate);else{var p=l.parent(),t=[d("#mCSB_"+m.idx+"_scrollbar_vertical"),d("#mCSB_"+m.idx+"_scrollbar_horizontal")],A=function(){return[t[0].is(":visible")?t[0].outerHeight(!0):0,t[1].is(":visible")?t[1].outerWidth(!0):0]},w=e(),u,q=[l.outerHeight(!1),l.outerWidth(!1),p.height(),p.width(),A()[0],A()[1]],x,v=b(),y;c()}},_snapAmount:function(a,c,b){return Math.round(a/c)*c-b},_stop:function(a){a=a.data("mCS");d("#mCSB_"+a.idx+"_container,#mCSB_"+a.idx+"_container_wrapper,#mCSB_"+a.idx+"_dragger_vertical,#mCSB_"+a.idx+"_dragger_horizontal").each(function(){g._stopTween.call(this)})},_scrollTo:function(a,c,b){function f(a){return h&&k.callbacks[a]&&"function"===typeof k.callbacks[a]}function e(){var c=[l[0].offsetTop,l[0].offsetLeft],d=[w[0].offsetTop,w[0].offsetLeft],f=[l.outerHeight(!1),l.outerWidth(!1)],e=[n.height(),n.width()];a[0].mcs={content:l,top:c[0],left:c[1],draggerTop:d[0],draggerLeft:d[1],topPct:Math.round(100*Math.abs(c[0])/(Math.abs(f[0])-e[0])),leftPct:Math.round(100*Math.abs(c[1])/(Math.abs(f[1])-e[1])),direction:b.dir}}var h=a.data("mCS"),k=h.opt;b=d.extend({trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:k.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},b);var m=[b.dur,b.drag?0:b.dur],n=d("#mCSB_"+h.idx),l=d("#mCSB_"+h.idx+"_container"),p=l.parent(),t=k.callbacks.onTotalScrollOffset?g._arr.call(a,k.callbacks.onTotalScrollOffset):[0,0],A=k.callbacks.onTotalScrollBackOffset?g._arr.call(a,k.callbacks.onTotalScrollBackOffset):[0,0];h.trigger=b.trigger;if(0!==p.scrollTop()||0!==p.scrollLeft())d(".mCSB_"+h.idx+"_scrollbar").css("visibility","visible"),p.scrollTop(0).scrollLeft(0);"_resetY"!==c||h.contentReset.y||(f("onOverflowYNone")&&k.callbacks.onOverflowYNone.call(a[0]),h.contentReset.y=1);"_resetX"!==c||h.contentReset.x||(f("onOverflowXNone")&&k.callbacks.onOverflowXNone.call(a[0]),h.contentReset.x=1);if("_resetY"!==c&&"_resetX"!==c){!h.contentReset.y&&a[0].mcs||!h.overflowed[0]||(f("onOverflowY")&&k.callbacks.onOverflowY.call(a[0]),h.contentReset.x=null);!h.contentReset.x&&a[0].mcs||!h.overflowed[1]||(f("onOverflowX")&&k.callbacks.onOverflowX.call(a[0]),h.contentReset.x=null);k.snapAmount&&(c=g._snapAmount(c,k.snapAmount,k.snapOffset));switch(b.dir){case "x":var w=d("#mCSB_"+h.idx+"_dragger_horizontal"),u="left",q=l[0].offsetLeft,x=[n.width()-l.outerWidth(!1),w.parent().width()-w.width()],v=[c,0===c?0:c/h.scrollRatio.x],y=t[1],r=A[1],z=0<y?y/h.scrollRatio.x:0,C=0<r?r/h.scrollRatio.x:0;break;case "y":w=d("#mCSB_"+h.idx+"_dragger_vertical"),u="top",q=l[0].offsetTop,x=[n.height()-l.outerHeight(!1),w.parent().height()-w.height()],v=[c,0===c?0:c/h.scrollRatio.y],y=t[0],r=A[0],z=0<y?y/h.scrollRatio.y:0,C=0<r?r/h.scrollRatio.y:0}0>v[1]||0===v[0]&&0===v[1]?v=[0,0]:v[1]>=x[1]?v=[x[0],x[1]]:v[0]=-v[0];a[0].mcs||(e(),f("onInit")&&k.callbacks.onInit.call(a[0]));clearTimeout(l[0].onCompleteTimeout);if(h.tweenRunning||!(0===q&&0<=v[0]||q===x[0]&&v[0]<=x[0]))g._tweenTo.call(null,w[0],u,Math.round(v[1]),m[1],b.scrollEasing),g._tweenTo.call(null,l[0],u,Math.round(v[0]),m[0],b.scrollEasing,b.overwrite,{onStart:function(){b.callbacks&&b.onStart&&!h.tweenRunning&&(f("onScrollStart")&&(e(),k.callbacks.onScrollStart.call(a[0])),h.tweenRunning=!0,g._onDragClasses(w),h.cbOffsets=[k.callbacks.alwaysTriggerOffsets||q>=x[0]+y,k.callbacks.alwaysTriggerOffsets||q<=-r])},onUpdate:function(){b.callbacks&&b.onUpdate&&f("whileScrolling")&&(e(),k.callbacks.whileScrolling.call(a[0]))},onComplete:function(){b.callbacks&&b.onComplete&&("yx"===k.axis&&clearTimeout(l[0].onCompleteTimeout),l[0].onCompleteTimeout=setTimeout(function(){f("onScroll")&&(e(),k.callbacks.onScroll.call(a[0]));f("onTotalScroll")&&v[1]>=x[1]-z&&h.cbOffsets[0]&&(e(),k.callbacks.onTotalScroll.call(a[0]));f("onTotalScrollBack")&&v[1]<=C&&h.cbOffsets[1]&&(e(),k.callbacks.onTotalScrollBack.call(a[0]));h.tweenRunning=!1;l[0].idleTimer=0;g._onDragClasses(w,"hide")},l[0].idleTimer||0))}})}},_tweenTo:function(a,c,b,d,e,h,k){function f(){r.stop||(q||p.call(),q=g._getTime()-w,n(),q>=r.time&&(r.time=q>r.time?q+u-(q-r.time):q+u-1,r.time<q+1&&(r.time=q+1)),r.time<d?r.id=y(f):A.call())}function n(){0<d?(r.currVal=l(r.time,x,z,d,e),v[c]=Math.round(r.currVal)+"px"):v[c]=b+"px";B.call()}function l(a,b,c,d,e){switch(e){case "linear":case "mcsLinear":return c*a/d+b;case "mcsLinearOut":return a/=d,a--,c*Math.sqrt(1-a*a)+b;case "easeInOutSmooth":a/=d/2;if(1>a)return c/2*a*a+b;a--;return-c/2*(a*(a-2)-1)+b;case "easeInOutStrong":a/=d/2;if(1>a)return c/2*Math.pow(2,10*(a-1))+b;a--;return c/2*(-Math.pow(2,-10*a)+2)+b;case "easeInOut":case "mcsEaseInOut":a/=d/2;if(1>a)return c/2*a*a*a+b;a-=2;return c/2*(a*a*a+2)+b;case "easeOutSmooth":return a/=d,a--,-c*(a*a*a*a-1)+b;case "easeOutStrong":return c*(-Math.pow(2,-10*a/d)+1)+b;default:return d=(a/=d)*a,e=d*a,b+c*(.499999999999997*e*d+-2.5*d*d+5.5*e+-6.5*d+4*a)}}a._malihuTween||(a._malihuTween={top:{},left:{}});k=k||{};var p=k.onStart||function(){},B=k.onUpdate||function(){},A=k.onComplete||function(){},w=g._getTime(),u,q=0,x=a.offsetTop,v=a.style,y,r=a._malihuTween[c];"left"===c&&(x=a.offsetLeft);var z=b-x;r.stop=0;"none"!==h&&null!=r.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(r.id):clearTimeout(r.id),r.id=null);(function(){u=1E3/60;r.time=q+u;y=t.requestAnimationFrame?t.requestAnimationFrame:function(a){n();return setTimeout(a,.01)};r.id=y(f)})()},_getTime:function(){return t.performance&&t.performance.now?t.performance.now():t.performance&&t.performance.webkitNow?t.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},_stopTween:function(){this._malihuTween||(this._malihuTween={top:{},left:{}});this._malihuTween.top.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(this._malihuTween.top.id):clearTimeout(this._malihuTween.top.id),this._malihuTween.top.id=null,this._malihuTween.top.stop=1);this._malihuTween.left.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(this._malihuTween.left.id):clearTimeout(this._malihuTween.left.id),this._malihuTween.left.id=null,this._malihuTween.left.stop=1)},_delete:function(a){delete a},_mouseBtnLeft:function(a){return!(a.which&&1!==a.which)},_pointerTouch:function(a){a=a.originalEvent.pointerType;return!(a&&"touch"!==a&&2!==a)},_isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)}};d.fn.mCustomScrollbar=function(a){if(D[a])return D[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof a&&a)d.error("Method "+a+" does not exist");else return D.init.apply(this,arguments)};d.mCustomScrollbar=function(a){if(D[a])return D[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof a&&a)d.error("Method "+a+" does not exist");else return D.init.apply(this,arguments)};d.mCustomScrollbar.defaults=M;t.mCustomScrollbar=!0;d(t).load(function(){d(".mCustomScrollbar").mCustomScrollbar()})})})(jQuery,window,document);