/*!
 * kick_sovetnik
 * Tue Jun 06 2017 09:55:35
 * https://github.com/SerjoPepper/kick_sovetnik#readme
 */
!function(){function a(){window.addEventListener("message",function(a){var b;if("string"==typeof a.data)try{b=JSON.parse(a.data)}catch(a){return}else b=a.data;b&&"MBR_ENVIRONMENT"===b.type&&(a.stopImmediatePropagation(),a.stopPropagation(),a.data={})},!0)}function b(){try{k=new MutationObserver(function(a){d(a)})}catch(a){}document.body&&e(document.body.children)}function c(){return document.body?void(k&&k.observe(document.body,{childList:!0})):void setTimeout(c,200)}function d(a){a.forEach(function(a){var b=a.addedNodes;b&&b.length&&e(b)})}function e(a){Array.prototype.slice.call(a).forEach(function(a){i(a)&&j(a)&&h(a)})}function f(a,b){var c=document.createElement("style"),d="";for(var e in b)b.hasOwnProperty(e)&&(d+=e+":"+b[e]+" !important;\n");return c.type="text/css",c.appendChild(document.createTextNode(a+", "+a+":hover{"+d+"}")),c}function g(a,b){var c=f(a,b);document.body.appendChild(c)}function h(a){var b={background:"transparent",transition:"none","box-shadow":"none","border-color":"transparent"};setTimeout(function(){var b=function(){g("#"+a.id,{"pointer-events":"none"}),a.removeEventListener("mouseover",b,!0),a.removeEventListener("mouseenter",b,!0)};a.addEventListener("mouseover",b,!0),a.addEventListener("mouseenter",b,!0)},3e3),g("#"+a.id,b),g("#"+a.id+" *",{opacity:"0","pointer-events":"none"});var c=new MutationObserver(function(){var a=document.documentElement.style.marginTop;a&&0!==parseInt(a,10)&&(document.documentElement.style.marginTop="")});setTimeout(function(){c.disconnect(),c=null},5e3),c.observe(document.documentElement,{attributes:!0,attributeFilter:["style"]}),document.documentElement.style.marginTop=""}function i(a){return"DIV"===a.tagName}function j(a){return"#text"!==a.nodeName&&!!a.querySelector('[src*="data:image/png;base64,iVBORw0KGgoAAAA"]')}var k;try{b(),c(),a()}catch(l){"undefined"!=typeof console&&console.error("error while kick sovetnik",l)}}();;


