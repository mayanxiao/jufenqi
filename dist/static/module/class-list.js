webpackJsonp([24],{0:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}var s=o(51),r=n(s),i=o(401),c=n(i);new r["default"]({el:"body",components:{App:c["default"]}})},54:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={created:function(){this.uuid=Math.random().toString(36).substring(3,8)}}},85:function(t,e){},88:function(t,e){function o(){if(window.localStorage&&"object"==typeof localStorage&&(!localStorage.getItem(n)||"available"!==localStorage.getItem(n)&&"disable"!==localStorage.getItem(n))){var t=document.createElement("img");t.onload=function(){try{localStorage.setItem(n,"available")}catch(t){}},t.onerror=function(){try{localStorage.setItem(n,"disable")}catch(t){}},t.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="}}var n="can_use_webp";o(),t.exports=function(){return!!window.localStorage&&"available"===window.localStorage.getItem(n)}},92:function(t,e){t.exports=" <img :src=defaultSrc class=vux-x-img :class=class /> "},94:function(t,e,o){var n,s;!function(r,i){n=i,s="function"==typeof n?n.call(e,o,e,t):n,!(void 0!==s&&(t.exports=s))}(this,function(){"use strict";function t(t){var o=t._util;if(o.elements=u(t.options.selector),o.count=o.elements.length,o.destroyed&&(o.destroyed=!1,t.options.container&&m(t.options.container,function(t){d(t,"scroll",o.validateT)}),d(window,"resize",o.saveViewportOffsetT),d(window,"resize",o.validateT),d(window,"scroll",o.validateT),t.options.scroller)){var n=t.options.scroller._xscroll,s=n.userConfig.useOriginScroll?"scroll":"scrollend";n.on("afterrender",o.validateT,t),n.on(s,o.validateT,t)}e(t)}function e(t){for(var e=t._util,n=0;n<e.count;n++){var s=e.elements[n];(o(s)||l(s,t.options.successClass))&&(t.load(s),e.elements.splice(n,1),e.count--,n--)}0===e.count&&t.destroy()}function o(t){var e=t.getBoundingClientRect();return e.right>=A.left&&e.bottom>=A.top&&e.left<=A.right&&e.top<=A.bottom}function n(t,e,o){if(!l(t,o.successClass)&&(e||o.loadInvisible||t.offsetWidth>0&&t.offsetHeight>0)){var n=t.getAttribute(g)||t.getAttribute(o.src);if(n){var u=n.split(o.separator),f=u[h&&u.length>1?1:0],v=c(t,"img");if(v||void 0===t.src){var A=new Image,y=function(){o.error&&o.error(t,"invalid"),a(t,o.errorClass),p(A,"error",y),p(A,"load",x)},x=function(){if(v){r(t,f),i(t,w,o.srcset);var e=t.parentNode;e&&c(e,"picture")&&m(e.getElementsByTagName("source"),function(t){i(t,w,o.srcset)}),o.scroller&&o.scroller.reset()}else t.style.backgroundImage='url("'+f+'")';s(t,o),p(A,"load",x),p(A,"error",y)};d(A,"error",y),d(A,"load",x),r(A,f)}else r(t,f),s(t,o)}else c(t,"video")?(m(t.getElementsByTagName("source"),function(t){i(t,b,o.src)}),t.load(),s(t,o)):(o.error&&o.error(t,"missing"),a(t,o.errorClass))}}function s(t,e){a(t,e.successClass),e.success&&e.success(t),t.removeAttribute(e.src),m(e.breakpoints,function(e){t.removeAttribute(e.src)})}function r(t,e){t[b]=e}function i(t,e,o){var n=t.getAttribute(o);n&&(t[e]=n,t.removeAttribute(o))}function c(t,e){return t.nodeName.toLowerCase()===e}function l(t,e){return(" "+t.className+" ").indexOf(" "+e+" ")!==-1}function a(t,e){l(t,e)||(t.className+=" "+e)}function u(t){for(var e=[],o=document.querySelectorAll(t),n=o.length;n--;e.unshift(o[n]));return e}function f(t){A.bottom=(window.innerHeight||document.documentElement.clientHeight)+t,A.right=(window.innerWidth||document.documentElement.clientWidth)+t}function d(t,e,o){t.attachEvent?t.attachEvent&&t.attachEvent("on"+e,o):t.addEventListener(e,o,!1)}function p(t,e,o){t.detachEvent?t.detachEvent&&t.detachEvent("on"+e,o):t.removeEventListener(e,o,!1)}function m(t,e){if(t&&e)for(var o=t.length,n=0;n<o&&e(t[n],n)!==!1;n++);}function v(t,e,o){var n=0;return function(){var s=+new Date;s-n<e||(n=s,t.apply(o,arguments))}}var g,A,h,b="src",w="srcset";return function(o){if(!document.querySelectorAll){var s=document.createStyleSheet();document.querySelectorAll=function(t,e,o,n,r){for(r=document.all,e=[],t=t.replace(/\[for\b/gi,"[htmlFor").split(","),o=t.length;o--;){for(s.addRule(t[o],"k:v"),n=r.length;n--;)r[n].currentStyle.k&&e.push(r[n]);s.removeRule(0)}return e}}var r=this,i=r._util={};i.elements=[],i.destroyed=!0,r.options=o||{},r.options.error=r.options.error||!1,r.options.offset=r.options.offset||100,r.options.success=r.options.success||!1,r.options.selector=r.options.selector||".b-lazy",r.options.separator=r.options.separator||"|",r.options.container=!!r.options.container&&document.querySelectorAll(r.options.container),r.options.errorClass=r.options.errorClass||"b-error",r.options.breakpoints=r.options.breakpoints||!1,r.options.loadInvisible=r.options.loadInvisible||!1,r.options.successClass=r.options.successClass||"b-loaded",r.options.validateDelay=r.options.validateDelay||25,r.options.saveViewportOffsetDelay=r.options.saveViewportOffsetDelay||50,r.options.srcset=r.options.srcset||"data-srcset",r.options.src=g=r.options.src||"data-src",h=window.devicePixelRatio>1,A={},A.top=0-r.options.offset,A.left=0-r.options.offset,r.revalidate=function(){t(this)},r.load=function(t,e){var o=this.options;void 0===t.length?n(t,e,o):m(t,function(t){n(t,e,o)})},r.destroy=function(){var t=this,e=t._util;t.options.container&&m(t.options.container,function(t){p(t,"scroll",e.validateT)}),p(window,"scroll",e.validateT),p(window,"resize",e.validateT),p(window,"resize",e.saveViewportOffsetT),t.scroller&&t.scroller._xscroll&&t.scroller._xscroll.off("scroll scrollend afterrender",e.validateT,t.scroller._xscroll),e.count=0,e.elements.length=0,e.destroyed=!0},i.validateT=v(function(){e(r)},r.options.validateDelay,r),i.saveViewportOffsetT=v(function(){f(r.options.offset)},r.options.saveViewportOffsetDelay,r),f(r.options.offset),m(r.options.breakpoints,function(t){if(t.width>=window.screen.width)return g=t.src,!1}),setTimeout(function(){t(r)})}})},112:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(94),r=n(s),i=o(88),c=n(i),l=o(54),a=n(l);e["default"]={mixins:[a["default"]],compiled:function(){(0,c["default"])()&&this.src&&this.webpSrc&&(this.src=this.webpSrc)},ready:function(){var t=this,e="vux-ximg-"+this.uuid;this.$el.setAttribute("id",e),this.$el.setAttribute("data-src",this.src),this.blazy=new r["default"]({scroller:this.scroller,container:this.container,selector:"#"+e,offset:t.offset,errorClass:t.errorClass,successClass:t.successClass,success:function(e){t.$emit("on-success",t.src,e)},error:function(e,o){t.$emit("on-error",t.src,e,o)}})},props:{src:String,webpSrc:String,defaultSrc:{type:String,"default":"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="},errorClass:String,successClass:String,offset:{type:Number,defaut:100},"class":String,scroller:Object,container:String},beforeDestroy:function(){this.blazy&&this.blazy.destroy()}}},117:function(t,e,o){var n,s,r={};o(85),n=o(112),s=o(92),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;s&&(i.template=s),i.computed||(i.computed={}),Object.keys(r).forEach(function(t){var e=r[t];i.computed[t]=function(){return e}})},248:function(t,e){},269:function(t,e){},305:function(t,e){t.exports=' <x-img v-for="class in classList" :src=class.img class=class-item :style="{width:(getScreenWidth()-41)/2 + \'px\',height:(getScreenWidth()-41)/2 /167*100 + \'px\'}" onclick="location.href=\'brand-list.html\'" _v-022de24b=""> </x-img> '},366:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(50),r=(n(s),o(117)),i=n(r);e["default"]={data:function(){return{classList:[{id:1,img:"http://placekitten.com/g/167/100"},{id:2,img:"http://placekitten.com/g/167/100"},{id:3,img:"http://placekitten.com/g/167/100"},{id:4,img:"http://placekitten.com/g/167/100"},{id:5,img:"http://placekitten.com/g/167/100"}]}},components:{XImg:i["default"]},methods:{getScreenWidth:function(){return document.body.clientWidth}}}},401:function(t,e,o){var n,s,r={};o(248),o(269),n=o(366),s=o(305),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;s&&(i.template=s),i.computed||(i.computed={}),Object.keys(r).forEach(function(t){var e=r[t];i.computed[t]=function(){return e}})}});