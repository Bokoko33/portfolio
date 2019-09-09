!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.barba=n()}(this,function(){var t=function(){function t(){}return t.prototype.then=function(r,i){var e=new t,o=this.s;if(o){var u=1&o?r:i;if(u){try{n(e,1,u(this.v))}catch(t){n(e,2,t)}return e}return this}return this.o=function(t){try{var o=t.v;1&t.s?n(e,1,r?r(o):o):i?n(e,1,i(o)):n(e,2,o)}catch(t){n(e,2,t)}},e},t}();function n(r,i,e){if(!r.s){if(e instanceof t){if(!e.s)return void(e.o=n.bind(null,r,i));1&i&&(i=e.s),e=e.v}if(e&&e.then)return void e.then(n.bind(null,r,i),n.bind(null,r,2));r.s=i,r.v=e;var o=r.o;o&&o(r)}}function r(t,n){try{var r=t()}catch(t){return n(t)}return r&&r.then?r.then(void 0,n):r}var i={};!function(){function r(t){this.t=t,this.i=null,this.u=null,this.h=null,this.l=null}function e(t){return{value:t,done:!0}}function o(t){return{value:t,done:!1}}r.prototype[Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator"))]=function(){return this},r.prototype.p=function(n){return this.u(n&&n.then?n.then(o):o(n)),this.i=new t},r.prototype.next=function(r){var o=this;return o.l=new Promise(function(u){var s=o.i;if(null===s){var f=o.t;if(null===f)return u(o.l);function c(t){o.u(t&&t.then?t.then(e):e(t)),o.i=null,o.u=null}o.t=null,o.u=u,f(o).then(c,function(n){if(n===i)c(o.h);else{var r=new t;o.u(r),o.i=null,o.u=null,_resolve(r,2,n)}})}else o.i=null,o.u=u,n(s,1,r)})},r.prototype.return=function(t){var r=this;return r.l=new Promise(function(o){var u=r.i;if(null===u)return null===r.t?o(r.l):(r.t=null,o(t&&t.then?t.then(e):e(t)));r.h=t,r.u=o,r.i=null,n(u,2,i)})},r.prototype.throw=function(t){var r=this;return r.l=new Promise(function(i,e){var o=r.i;if(null===o)return null===r.t?i(r.l):(r.t=null,e(t));r.u=i,r.i=null,n(o,2,t)})}}();var e,o,u=(function(t){var n=t.exports=function(t,n){return n=n||function(){},function(){var r=!1,i=arguments,e=new Promise(function(n,e){var o,u=t.apply({async:function(){return r=!0,function(t,r){t?e(t):n(r)}}},Array.prototype.slice.call(i));r||(!(o=u)||"object"!=typeof o&&"function"!=typeof o||"function"!=typeof o.then?n(u):u.then(n,e))});return e.then(n.bind(null,null),n),e}};n.cb=function(t,r){return n(function(){var n=Array.prototype.slice.call(arguments);return n.length===t.length-1&&n.push(this.async()),t.apply(this,n)},r)}}(e={exports:{}}),e.exports);!function(t){t[t.off=0]="off",t[t.error=1]="error",t[t.warning=2]="warning",t[t.info=3]="info",t[t.debug=4]="debug"}(o||(o={}));var s=o.off,f=function(t){this.m=t};f.getLevel=function(){return s},f.setLevel=function(t){return s=o[t]},f.prototype.error=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];this.P(console.error,o.error,t)},f.prototype.warn=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];this.P(console.warn,o.warning,t)},f.prototype.info=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];this.P(console.info,o.info,t)},f.prototype.debug=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];this.P(console.log,o.debug,t)},f.prototype.P=function(t,n,r){n<=f.getLevel()&&t.apply(console,["["+this.m+"] "].concat(r))};var c=function(){this.logger=new f("@barba/core"),this.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeAppear","appear","afterAppear","appearCanceled","before","beforeLeave","leave","afterLeave","leaveCanceled","beforeEnter","enter","afterEnter","enterCanceled","after"],this.registered=new Map,this.init()};c.prototype.init=function(){var t=this;this.registered.clear(),this.all.forEach(function(n){t[n]||(t[n]=function(r,i){void 0===i&&(i=null),t.registered.has(n)||t.registered.set(n,new Set),t.registered.get(n).add({ctx:i,fn:r})})})},c.prototype.do=function(t){for(var n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];if(this.registered.has(t)){var i=Promise.resolve();return this.registered.get(t).forEach(function(t){var r=t.ctx?t.fn.bind(t.ctx):t.fn;i=i.then(function(){return u(r).apply(void 0,n)})}),i}return Promise.resolve()},c.prototype.clear=function(){var t=this;this.all.forEach(function(n){delete t[n]}),this.init()},c.prototype.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var t=[];this.registered.forEach(function(n,r){return t.push(r)}),this.logger.info("Registered hooks: "+t.join(","))};var a=new c,h=function t(n,r,i){return n instanceof RegExp?function(t,n){if(!n)return t;var r=t.source.match(/\((?!\?)/g);if(r)for(var i=0;i<r.length;i++)n.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(n,r):Array.isArray(n)?function(n,r,i){for(var e=[],o=0;o<n.length;o++)e.push(t(n[o],r,i).source);return new RegExp("(?:"+e.join("|")+")",g(i))}(n,r,i):function(t,n,r){return E(m(t,r),n,r)}(n,r,i)},v=m,l=b,d=E,p="/",w=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function m(t,n){for(var r,i=[],e=0,o=0,u="",s=n&&n.delimiter||p,f=n&&n.whitelist||void 0,c=!1;null!==(r=w.exec(t));){var a=r[0],h=r[1],v=r.index;if(u+=t.slice(o,v),o=v+a.length,h)u+=h[1],c=!0;else{var l="",d=r[2],m=r[3],b=r[4],g=r[5];if(!c&&u.length){var E=u.length-1,x=u[E];(!f||f.indexOf(x)>-1)&&(l=x,u=u.slice(0,E))}u&&(i.push(u),u="",c=!1);var A=m||b,T=l||s;i.push({name:d||e++,prefix:l,delimiter:T,optional:"?"===g||"*"===g,repeat:"+"===g||"*"===g,pattern:A?P(A):"[^"+y(T===s?T:T+s)+"]+?"})}}return(u||o<t.length)&&i.push(u+t.substr(o)),i}function b(t){for(var n=new Array(t.length),r=0;r<t.length;r++)"object"==typeof t[r]&&(n[r]=new RegExp("^(?:"+t[r].pattern+")$"));return function(r,i){for(var e="",o=i&&i.encode||encodeURIComponent,u=0;u<t.length;u++){var s=t[u];if("string"!=typeof s){var f,c=r?r[s.name]:void 0;if(Array.isArray(c)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but got array');if(0===c.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var a=0;a<c.length;a++){if(f=o(c[a],s),!n[u].test(f))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'"');e+=(0===a?s.prefix:s.delimiter)+f}}else if("string"!=typeof c&&"number"!=typeof c&&"boolean"!=typeof c){if(!s.optional)throw new TypeError('Expected "'+s.name+'" to be '+(s.repeat?"an array":"a string"))}else{if(f=o(String(c),s),!n[u].test(f))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+f+'"');e+=s.prefix+f}}else e+=s}return e}}function y(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function P(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function g(t){return t&&t.sensitive?"":"i"}function E(t,n,r){for(var i=(r=r||{}).strict,e=!1!==r.start,o=!1!==r.end,u=r.delimiter||p,s=[].concat(r.endsWith||[]).map(y).concat("$").join("|"),f=e?"^":"",c=0;c<t.length;c++){var a=t[c];if("string"==typeof a)f+=y(a);else{var h=a.repeat?"(?:"+a.pattern+")(?:"+y(a.delimiter)+"(?:"+a.pattern+"))*":a.pattern;n&&n.push(a),f+=a.optional?a.prefix?"(?:"+y(a.prefix)+"("+h+"))?":"("+h+")?":y(a.prefix)+"("+h+")"}}if(o)i||(f+="(?:"+y(u)+")?"),f+="$"===s?"$":"(?="+s+")";else{var v=t[t.length-1],l="string"==typeof v?v[v.length-1]===u:void 0===v;i||(f+="(?:"+y(u)+"(?="+s+"))?"),l||(f+="(?="+y(u)+"|"+s+")")}return new RegExp(f,g(r))}h.parse=v,h.compile=function(t,n){return b(m(t,n))},h.tokensToFunction=l,h.tokensToRegExp=d;var x={container:"container",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},A=function(){this.g=x,this.A=new DOMParser,this.T=null};A.prototype.toString=function(t){return t.outerHTML},A.prototype.toDocument=function(t){return this.A.parseFromString(t,"text/html")},A.prototype.toElement=function(t){var n=document.createElement("div");return n.innerHTML=t,n},A.prototype.getHtml=function(t){return void 0===t&&(t=document),this.toString(t.documentElement)},A.prototype.getWrapper=function(t){return void 0===t&&(t=document),t.querySelector("["+this.g.prefix+'="'+this.g.wrapper+'"]')},A.prototype.getContainer=function(t){return void 0===t&&(t=document),t.querySelector("["+this.g.prefix+'="'+this.g.container+'"]')},A.prototype.removeContainer=function(t){document.body.contains(t)&&(this.T=t.nextElementSibling,t.parentNode.removeChild(t))},A.prototype.addContainer=function(t,n){this.T?n.insertBefore(t,this.T):n.appendChild(t)},A.prototype.getNamespace=function(t){void 0===t&&(t=document);var n=t.querySelector("["+this.g.prefix+"-"+this.g.namespace+"]");return n?n.getAttribute(this.g.prefix+"-"+this.g.namespace):null},A.prototype.getHref=function(t){if(t.tagName&&"a"===t.tagName.toLowerCase()){var n=t.getAttribute("href");if(n)return n.baseVal||n}return null};var T=new A,j=function(){this.j=[]},k={current:{configurable:!0},previous:{configurable:!0},size:{configurable:!0}};j.prototype.init=function(t,n){var r={index:0,ns:n,scroll:{x:window.scrollX,y:window.scrollY},url:t};this.j.push(r),window.history&&window.history.replaceState(r,"",r.url)},j.prototype.add=function(t,n,r,i){void 0===r&&(r=null),void 0===i&&(i=!0);var e={index:r||this.size,ns:n,scroll:{x:window.scrollX,y:window.scrollY},url:t};this.j.push(e),i&&window.history&&window.history.pushState(e,"",e.url)},j.prototype.remove=function(){this.j.pop()},j.prototype.clear=function(){this.j=[]},j.prototype.update=function(t){var n=Object.assign({},this.current,t);this.current=n,window.history&&window.history.replaceState(n,"",n.url)},j.prototype.cancel=function(){this.remove(),window.history&&window.history.back()},j.prototype.get=function(t){return this.j[t]},j.prototype.getDirection=function(t){var n="popstate";return t<this.current.index?n="back":t>this.current.index&&(n="forward"),n},k.current.get=function(){return this.j[this.j.length-1]},k.current.set=function(t){this.j[this.j.length-1]=t},k.previous.get=function(){return this.j.length<2?null:this.j[this.j.length-2]},k.size.get=function(){return this.j.length},Object.defineProperties(j.prototype,k);var O=new j,R=function(t,n){try{var r=function(){if(!n.next.html)return Promise.resolve(t).then(function(t){var r=n.next;if(t){var i=T.toElement(t);r.namespace=T.getNamespace(i),r.container=T.getContainer(i),r.html=t,O.update({ns:r.namespace});var e=T.toDocument(t);document.title=e.title}})}();return Promise.resolve(r&&r.then?r.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},L=h,M={update:R,nextTick:function(){return new Promise(function(t){window.requestAnimationFrame(t)})},pathToRegexp:L},S=function(){return window.location.origin},$=function(t){var n=t||window.location.port,r=window.location.protocol;return""!==n?parseInt(n,10):"https:"===r?443:80},q=function(t){var n,r=t.replace(S(),""),i={},e=r.indexOf("#");e>=0&&(n=r.slice(e+1),r=r.slice(0,e));var o=r.indexOf("?");return o>=0&&(i=C(r.slice(o+1)),r=r.slice(0,o)),{hash:n,path:r,query:i}},C=function(t){return t.split("&").reduce(function(t,n){var r=n.split("=");return t[r[0]]=r[1],t},{})},B=function(t){return t.replace(/(\/#.*|\/|#.*)$/,"")},H={getHref:function(){return window.location.href},getOrigin:S,getPort:$,getPath:function(t){return q(t).path},parse:q,parseQuery:C,clean:B},I=function(t){if(this.k=[],"boolean"==typeof t)this.O=t;else{var n=Array.isArray(t)?t:[t];this.k=n.map(function(t){return L(t)})}};I.prototype.checkUrl=function(t){if("boolean"==typeof this.O)return this.O;var n=q(t).path;return this.k.some(function(t){return null!==t.exec(n)})};var N=function(t){function n(n){t.call(this,n),this.j=new Map}return t&&(n.__proto__=t),(n.prototype=Object.create(t&&t.prototype)).constructor=n,n.prototype.set=function(t,n,r){return this.checkUrl(t)||this.j.set(t,{action:r,request:n}),{action:r,request:n}},n.prototype.get=function(t){return this.j.get(t)},n.prototype.getRequest=function(t){return this.j.get(t).request},n.prototype.getAction=function(t){return this.j.get(t).action},n.prototype.has=function(t){return this.j.has(t)},n.prototype.delete=function(t){return this.j.delete(t)},n.prototype.update=function(t,n){var r=Object.assign({},this.j.get(t),n);return this.j.set(t,r),r},n}(I);function U(t,n,r){return void 0===n&&(n=2e3),new Promise(function(i,e){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE)if(200===o.status)i(o.responseText);else if(o.status){var n={status:o.status,statusText:o.statusText};r(t,n),e(n)}},o.ontimeout=function(){var i=new Error("Timeout error ["+n+"]");r(t,i),e(i)},o.onerror=function(){var n=new Error("Fetch error");r(t,n),e(n)},o.open("GET",t),o.timeout=n,o.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),o.setRequestHeader("x-barba","yes"),o.send()})}var D=function(){return!window.history.pushState},X=function(t){return!t.el||!t.href},_=function(t){var n=t.event;return n.which>1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey},z=function(t){var n=t.el;return n.hasAttribute("target")&&"_blank"===n.target},F=function(t){var n=t.el;return void 0!==n.protocol&&window.location.protocol!==n.protocol||void 0!==n.hostname&&window.location.hostname!==n.hostname},G=function(t){var n=t.el;return void 0!==n.port&&$()!==$(n.port)},Q=function(t){var n=t.el;return n.getAttribute&&"string"==typeof n.getAttribute("download")},W=function(t){return t.el.hasAttribute(x.prefix+"-"+x.prevent)},J=function(t){return Boolean(t.el.closest("["+x.prefix+"-"+x.prevent+'="all"]'))},K=function(t){return B(t.href)===B(window.location.href)},V=function(t){function n(n){t.call(this,n),this.suite=[],this.tests=new Map,this.init()}return t&&(n.__proto__=t),(n.prototype=Object.create(t&&t.prototype)).constructor=n,n.prototype.init=function(){this.add("pushState",D),this.add("exists",X),this.add("newTab",_),this.add("blank",z),this.add("corsDomain",F),this.add("corsPort",G),this.add("download",Q),this.add("preventSelf",W),this.add("preventAll",J),this.add("sameUrl",K,!1)},n.prototype.add=function(t,n,r){void 0===r&&(r=!0),this.tests.set(t,n),r&&this.suite.push(t)},n.prototype.run=function(t,n,r,i){return this.tests.get(t)({el:n,event:r,href:i})},n.prototype.checkLink=function(t,n,r){var i=this;return this.suite.some(function(e){return i.run(e,t,n,r)})},n}(I),Y=function(t){void 0===t&&(t=[]),this.logger=new f("@barba/core"),this.all=[],this.appear=[],this.R=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],t&&(this.all=this.all.concat(t)),this.update()};Y.prototype.add=function(t,n){switch(t){case"rule":this.R.splice(n.position||0,0,n.value);break;case"transition":default:this.all.push(n)}this.update()},Y.prototype.resolve=function(t,n){var r,i=this;void 0===n&&(n={});var e=n.appear?this.appear:this.all;e=e.filter(n.self?function(t){return t.name&&"self"===t.name}:function(t){return!t.name||"self"!==t.name});var o=new Map,u=e.find(function(r){var e=!0,u={};return!(!n.self||"self"!==r.name)||(i.R.reverse().forEach(function(o){e&&(e=i.L(r,o,t,u),n.appear||(r.from&&r.to&&(e=i.L(r,o,t,u,"from")&&i.L(r,o,t,u,"to")),r.from&&!r.to&&(e=i.L(r,o,t,u,"from")),!r.from&&r.to&&(e=i.L(r,o,t,u,"to"))))}),o.set(r,u),e)}),s=o.get(u),f=[];if(f.push(n.appear?"appear":"page"),n.self&&f.push("self"),s){var c=[u];Object.keys(s).length>0&&c.push(s),(r=this.logger).info.apply(r,["Transition found ["+f.join(",")+"]"].concat(c))}else this.logger.info("No transition found ["+f.join(",")+"]");return u},Y.prototype.update=function(){var t=this;this.all=this.all.map(function(n){return t.M(n)}).sort(function(t,n){return t.priority-n.priority}).reverse().map(function(t){return delete t.priority,t}),this.appear=this.all.filter(function(t){return void 0!==t.appear})},Y.prototype.L=function(t,n,r,i,e){var o=!0,u=!1,s=t,f=n.name,c=f,a=f,h=f,v=e?s[e]:s,l="to"===e?r.next:r.current;if(e?v&&v[f]:v[f]){switch(n.type){case"strings":default:var d=Array.isArray(v[c])?v[c]:[v[c]];l[c]&&-1!==d.indexOf(l[c])&&(u=!0),-1===d.indexOf(l[c])&&(o=!1);break;case"object":var p=Array.isArray(v[a])?v[a]:[v[a]];l[a]&&(l[a].name&&-1!==p.indexOf(l[a].name)&&(u=!0),-1===p.indexOf(l[a].name)&&(o=!1));break;case"function":v[h](r)?u=!0:o=!1}u&&(e?(i[e]=i[e]||{},i[e][f]=s[e][f]):i[f]=s[f])}return o},Y.prototype.S=function(t,n,r){var i=0;return(t[n]||t.from&&t.from[n]||t.to&&t.to[n])&&(i+=Math.pow(10,r),t.from&&t.from[n]&&(i+=1),t.to&&t.to[n]&&(i+=2)),i},Y.prototype.M=function(t){var n=this;t.priority=0;var r=0;return this.R.forEach(function(i,e){r+=n.S(t,i.name,e+1)}),t.priority=r,t};var Z=function(t){void 0===t&&(t=[]),this.logger=new f("@barba/core"),this.$=!1,this.store=new Y(t)},tt={isRunning:{configurable:!0},hasAppear:{configurable:!0},hasSelf:{configurable:!0},shouldWait:{configurable:!0}};Z.prototype.get=function(t,n){return this.store.resolve(t,n)},tt.isRunning.get=function(){return this.$},tt.isRunning.set=function(t){this.$=t},tt.hasAppear.get=function(){return this.store.appear.length>0},tt.hasSelf.get=function(){return this.store.all.some(function(t){return"self"===t.name})},tt.shouldWait.get=function(){return this.store.all.some(function(t){return t.to&&!t.to.route||t.sync})},Z.prototype.doAppear=function(t){var n=t.data,i=t.transition;try{var e=this;function o(t){e.$=!1}var u=i||{};e.$=!0;var s=r(function(){return Promise.resolve(e.q("beforeAppear",n,u)).then(function(){return Promise.resolve(e.appear(n,u)).then(function(){return Promise.resolve(e.q("afterAppear",n,u)).then(function(){})})})},function(t){throw e.$=!1,e.logger.error(t),new Error("Transition error [appear]")});return s&&s.then?s.then(o):o()}catch(t){return Promise.reject(t)}},Z.prototype.doPage=function(t){var n=t.data,i=t.transition,e=t.page,o=t.wrapper;try{var u=this;function s(t){u.$=!1}var f=i||{},c=!0===f.sync||!1;u.$=!0;var a=r(function(){function t(){return Promise.resolve(u.q("before",n,f)).then(function(){function t(t){return Promise.resolve(u.q("after",n,f)).then(function(){return Promise.resolve(u.remove(n)).then(function(){})})}var i=function(){if(c)return r(function(){return Promise.resolve(u.add(n,o)).then(function(){return Promise.resolve(u.q("beforeLeave",n,f)).then(function(){return Promise.resolve(u.q("beforeEnter",n,f)).then(function(){return Promise.resolve(Promise.all([u.leave(n,f),u.enter(n,f)])).then(function(){return Promise.resolve(u.q("afterLeave",n,f)).then(function(){return Promise.resolve(u.q("afterEnter",n,f)).then(function(){})})})})})})},function(){throw new Error("Transition error [page][sync]")});{function t(t){return r(function(){var t=function(){if(!1!==i)return Promise.resolve(u.add(n,o)).then(function(){return Promise.resolve(u.q("beforeEnter",n,f)).then(function(){return Promise.resolve(u.enter(n,f,i)).then(function(){return Promise.resolve(u.q("afterEnter",n,f)).then(function(){})})})})}();if(t&&t.then)return t.then(function(){})},function(){throw new Error("Transition error [page][enter]")})}var i=!1,s=r(function(){return Promise.resolve(u.q("beforeLeave",n,f)).then(function(){return Promise.resolve(Promise.all([u.leave(n,f),R(e,n)]).then(function(t){return t[0]})).then(function(t){return i=t,Promise.resolve(u.q("afterLeave",n,f)).then(function(){})})})},function(){throw new Error("Transition error [page][leave]")});return s&&s.then?s.then(t):t()}}();return i&&i.then?i.then(t):t()})}var i=function(){if(c)return Promise.resolve(R(e,n)).then(function(){})}();return i&&i.then?i.then(t):t()},function(t){throw u.$=!1,u.logger.error(t),new Error("Transition error")});return a&&a.then?a.then(s):s()}catch(t){return Promise.reject(t)}},Z.prototype.appear=function(t,n){try{return Promise.resolve(a.do("appear",t,n)).then(function(){return n.appear?u(n.appear)(t):Promise.resolve()})}catch(t){return Promise.reject(t)}},Z.prototype.leave=function(t,n){try{return Promise.resolve(a.do("leave",t,n)).then(function(){return n.leave?u(n.leave)(t):Promise.resolve()})}catch(t){return Promise.reject(t)}},Z.prototype.enter=function(t,n,r){try{return Promise.resolve(a.do("enter",t,n)).then(function(){return n.enter?u(n.enter)(t,r):Promise.resolve()})}catch(t){return Promise.reject(t)}},Z.prototype.add=function(t,n){try{T.addContainer(t.next.container,n),a.do("nextAdded",t)}catch(t){return Promise.reject(t)}},Z.prototype.remove=function(t){try{T.removeContainer(t.current.container),a.do("currentRemoved",t)}catch(t){return Promise.reject(t)}},Z.prototype.q=function(t,n,r){try{return Promise.resolve(a.do(t,n,r)).then(function(){return r[t]?u(r[t])(n):Promise.resolve()})}catch(t){return Promise.reject(t)}},Object.defineProperties(Z.prototype,tt);var nt=function(t){var n=this;this.names=["beforeAppear","afterAppear","beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,0!==t.length&&(t.forEach(function(t){n.byNamespace.set(t.namespace,t)}),this.names.forEach(function(t){a[t](n.C(t),n)}))};nt.prototype.C=function(t){var n=this;return function(r){var i=t.match(/enter/i)?r.next:r.current,e=n.byNamespace.get(i.namespace);e&&e[t]&&e[t](r)}},Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var n=this;do{if(n.matches(t))return n;n=n.parentElement||n.parentNode}while(null!==n&&1===n.nodeType);return null});var rt={container:void 0,html:void 0,namespace:void 0,url:{hash:void 0,href:void 0,path:void 0,query:{}}},it=function(){this.version="2.6.0",this.schemaPage=rt,this.Logger=f,this.logger=new f("@barba/core"),this.plugins=[],this.hooks=a,this.dom=T,this.helpers=M,this.history=O,this.request=U,this.url=H},et={data:{configurable:!0},wrapper:{configurable:!0}};return it.prototype.use=function(t,n){var r=this.plugins;r.indexOf(t)>-1?this.logger.warn("Plugin ["+t.name+"] already installed."):"function"==typeof t.install?(t.install(this,n),r.push(t)):this.logger.warn("Plugin ["+t.name+'] has no "install" method.')},it.prototype.init=function(t){void 0===t&&(t={});var n=t.transitions;void 0===n&&(n=[]);var r=t.views;void 0===r&&(r=[]);var i=t.prevent;void 0===i&&(i=null);var e=t.timeout;void 0===e&&(e=2e3);var o=t.requestError,u=t.cacheIgnore;void 0===u&&(u=!1);var s=t.prefetchIgnore;void 0===s&&(s=!1);var c=t.schema;void 0===c&&(c=x);var a=t.debug;void 0===a&&(a=!1);var h=t.logLevel;if(void 0===h&&(h="off"),f.setLevel(!0===a?"debug":h),this.logger.info(this.version),Object.keys(c).forEach(function(t){x[t]&&(x[t]=c[t])}),this.B=o,this.timeout=e,this.cacheIgnore=u,this.prefetchIgnore=s,this.H=this.dom.getWrapper(),!this.H)throw new Error("[@barba/core] No Barba wrapper found");this.H.setAttribute("aria-live","polite"),this.I();var v=this.data.current;if(!v.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new N(u),this.prevent=new V(s),this.transitions=new Z(n),this.views=new nt(r),null!==i){if("function"!=typeof i)throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",i)}this.history.init(v.url.href,v.namespace),this.N=this.N.bind(this),this.U=this.U.bind(this),this.D=this.D.bind(this),this.X(),this.plugins.forEach(function(t){return t.init()});var l=this.data;l.trigger="barba",l.next=l.current,this.hooks.do("ready",l),this.appear(l),this.I()},it.prototype.destroy=function(){this.I(),this._(),this.history.clear(),this.hooks.clear(),this.plugins=[]},et.data.get=function(){return this.F},et.wrapper.get=function(){return this.H},it.prototype.force=function(t){window.location.assign(t)},it.prototype.go=function(t,n,r){var i;if(void 0===n&&(n="barba"),this.transitions.isRunning)this.force(t);else if(!(i="popstate"===n?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(t):this.prevent.run("sameUrl",null,null,t))||this.transitions.hasSelf){if("popstate"===n){var e=r.state;n=this.history.getDirection(e.index),this.history.add(t,e.ns,e.index,!1)}else this.history.add(t,"tmp");return r&&(r.stopPropagation(),r.preventDefault()),this.page(t,n,i)}},it.prototype.appear=function(t){try{var n=this;return Promise.resolve(n.hooks.do("beforeEnter",t)).then(function(){function i(){return Promise.resolve(n.hooks.do("afterEnter",t)).then(function(){})}var e=function(){if(n.transitions.hasAppear){var i=r(function(){var r=n.transitions.get(t,{appear:!0});return Promise.resolve(n.transitions.doAppear({transition:r,data:t})).then(function(){})},function(t){n.logger.error(t)});if(i&&i.then)return i.then(function(){})}}();return e&&e.then?e.then(i):i()})}catch(t){return Promise.reject(t)}},it.prototype.page=function(t,n,i){try{var e=this;function o(){var t=e.data;return Promise.resolve(e.hooks.do("page",t)).then(function(){var n=r(function(){var n=e.transitions.get(t,{appear:!1,self:i});return Promise.resolve(e.transitions.doPage({data:t,page:u,transition:n,wrapper:e.H})).then(function(){e.I()})},function(t){e.logger.error(t)});if(n&&n.then)return n.then(function(){})})}e.data.next.url=Object.assign({},{href:t},e.url.parse(t)),e.data.trigger=n;var u=e.cache.has(t)?e.cache.update(t,{action:"click"}).request:e.cache.set(t,e.request(t,e.timeout,e.onRequestError.bind(e,n)),"click").request,s=function(){if(e.transitions.shouldWait)return Promise.resolve(R(u,e.data)).then(function(){})}();return s&&s.then?s.then(o):o()}catch(t){return Promise.reject(t)}},it.prototype.onRequestError=function(t){for(var n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];this.transitions.isRunning=!1;var i=n[0],e=n[1],o=this.cache.getAction(i);return this.cache.delete(i),!(this.B&&!1===this.B(t,o,i,e)||("click"===o&&this.force(i),1))},it.prototype.prefetch=function(t){var n=this;this.cache.has(t)||this.cache.set(t,this.request(t,this.timeout,this.onRequestError.bind(this,"barba")).catch(function(t){n.logger.error(t)}),"prefetch")},it.prototype.X=function(){!0!==this.prefetchIgnore&&(document.addEventListener("mouseover",this.N),document.addEventListener("touchstart",this.N)),document.addEventListener("click",this.U),window.addEventListener("popstate",this.D)},it.prototype._=function(){!0!==this.prefetchIgnore&&(document.removeEventListener("mouseover",this.N),document.removeEventListener("touchstart",this.N)),document.removeEventListener("click",this.U),window.removeEventListener("popstate",this.D)},it.prototype.N=function(t){var n=this,r=this.G(t);if(r){var i=this.dom.getHref(r);this.prevent.checkUrl(i)||this.cache.has(i)||this.cache.set(i,this.request(i,this.timeout,this.onRequestError.bind(this,r)).catch(function(t){n.logger.error(t)}),"enter")}},it.prototype.U=function(t){var n=this.G(t);n&&this.go(this.dom.getHref(n),n,t)},it.prototype.D=function(t){this.go(this.url.getPath(this.url.getHref()),"popstate",t)},it.prototype.G=function(t){for(var n=t.target;n&&!this.dom.getHref(n);)n=n.parentNode;if(n&&!this.prevent.checkLink(n,t,this.dom.getHref(n)))return n},it.prototype.I=function(){var t=this.url.getPath(this.url.getHref()),n={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:Object.assign({},{href:t},this.url.parse(t))};this.F={current:n,next:Object.assign({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data)},Object.defineProperties(it.prototype,et),new it});
//# sourceMappingURL=barba.umd.js.map
