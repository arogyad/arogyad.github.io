import{S as t,i as e,s,e as r,t as l,k as n,c as a,a as i,g as c,d as o,n as h,b as f,f as d,D as p,F as u,h as v,j as x,m,o as g,x as b,u as $,v as E,M as k,G as I,N}from"./vendor-5b6c161e.js";function S(t){let e,s,n;return{c(){e=r("li"),s=r("span"),n=l("Oldest"),this.h()},l(t){e=a(t,"LI",{});var r=i(e);s=a(r,"SPAN",{class:!0});var l=i(s);n=c(l,"Oldest"),l.forEach(o),r.forEach(o),this.h()},h(){f(s,"class","text-xl font-light text-red-800 pb-3")},m(t,r){d(t,e,r),p(e,s),p(s,n)},p:u,d(t){t&&o(e)}}}function w(t){let e,s,n,h,u,x,m,g=t[0].blog.title+"",b=t[0].blog.date+"";return{c(){e=r("li"),s=r("a"),n=l(g),h=l(" ["),u=l(b),x=l("]"),this.h()},l(t){e=a(t,"LI",{});var r=i(e);s=a(r,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var l=i(s);n=c(l,g),h=c(l," ["),u=c(l,b),x=c(l,"]"),l.forEach(o),r.forEach(o),this.h()},h(){f(s,"sveltekit:prefetch",""),f(s,"href",m="/"+t[0].link),f(s,"class","text-xl font-light pb-3")},m(t,r){d(t,e,r),p(e,s),p(s,n),p(s,h),p(s,u),p(s,x)},p(t,e){1&e&&g!==(g=t[0].blog.title+"")&&v(n,g),1&e&&b!==(b=t[0].blog.date+"")&&v(u,b),1&e&&m!==(m="/"+t[0].link)&&f(s,"href",m)},d(t){t&&o(e)}}}function y(t){let e,s,n;return{c(){e=r("li"),s=r("span"),n=l("Newest"),this.h()},l(t){e=a(t,"LI",{});var r=i(e);s=a(r,"SPAN",{class:!0});var l=i(s);n=c(l,"Newest"),l.forEach(o),r.forEach(o),this.h()},h(){f(s,"class","text-xl font-light text-red-800 pb-3")},m(t,r){d(t,e,r),p(e,s),p(s,n)},p:u,d(t){t&&o(e)}}}function A(t){let e,s,n,h,u,x,m,g=t[1].blog.title+"",b=t[1].blog.date+"";return{c(){e=r("li"),s=r("a"),n=l(g),h=l(" ["),u=l(b),x=l("]"),this.h()},l(t){e=a(t,"LI",{});var r=i(e);s=a(r,"A",{"sveltekit:prefetch":!0,href:!0,class:!0});var l=i(s);n=c(l,g),h=c(l," ["),u=c(l,b),x=c(l,"]"),l.forEach(o),r.forEach(o),this.h()},h(){f(s,"sveltekit:prefetch",""),f(s,"href",m="/"+t[1].link),f(s,"class","text-xl font-light pb-3")},m(t,r){d(t,e,r),p(e,s),p(s,n),p(s,h),p(s,u),p(s,x)},p(t,e){2&e&&g!==(g=t[1].blog.title+"")&&v(n,g),2&e&&b!==(b=t[1].blog.date+"")&&v(u,b),2&e&&m!==(m="/"+t[1].link)&&f(s,"href",m)},d(t){t&&o(e)}}}function D(t){let e,s,v,x,m,g;function b(t,e){return null!=t[0]?w:S}let $=b(t),E=$(t);function k(t,e){return null!=t[1]?A:y}let I=k(t),N=I(t);return{c(){e=r("div"),s=l("More Similar Blogs:"),v=n(),x=r("div"),m=r("ul"),E.c(),g=n(),N.c(),this.h()},l(t){e=a(t,"DIV",{class:!0});var r=i(e);s=c(r,"More Similar Blogs:"),r.forEach(o),v=h(t),x=a(t,"DIV",{class:!0});var l=i(x);m=a(l,"UL",{});var n=i(m);E.l(n),g=h(n),N.l(n),n.forEach(o),l.forEach(o),this.h()},h(){f(e,"class","float-left font-normal text-2xl pt-2 pb-1 border-t-2"),f(x,"class","ml-4")},m(t,r){d(t,e,r),p(e,s),d(t,v,r),d(t,x,r),p(x,m),E.m(m,null),p(m,g),N.m(m,null)},p(t,[e]){$===($=b(t))&&E?E.p(t,e):(E.d(1),E=$(t),E&&(E.c(),E.m(m,g))),I===(I=k(t))&&N?N.p(t,e):(N.d(1),N=I(t),N&&(N.c(),N.m(m,null)))},i:u,o:u,d(t){t&&o(e),t&&o(v),t&&o(x),E.d(),N.d()}}}function L(t,e,s){let{prev:r}=e,{next:l}=e;return t.$$set=t=>{"prev"in t&&s(0,r=t.prev),"next"in t&&s(1,l=t.next)},[r,l]}class j extends t{constructor(t){super(),e(this,t,L,D,s,{prev:0,next:1})}}function V(t){let e,s,l;return s=new j({props:{prev:t[0],next:t[1]}}),{c(){e=r("div"),x(s.$$.fragment),this.h()},l(t){e=a(t,"DIV",{id:!0,class:!0});var r=i(e);m(s.$$.fragment,r),r.forEach(o),this.h()},h(){f(e,"id","next"),f(e,"class","grid pt-10")},m(t,r){d(t,e,r),g(s,e,null),l=!0},p(t,[e]){const r={};1&e&&(r.prev=t[0]),2&e&&(r.next=t[1]),s.$set(r)},i(t){l||(b(s.$$.fragment,t),l=!0)},o(t){$(s.$$.fragment,t),l=!1},d(t){t&&o(e),E(s)}}}function B(t,e,s){let{prev:r}=e,{next:l}=e;return t.$$set=t=>{"prev"in t&&s(0,r=t.prev),"next"in t&&s(1,l=t.next)},[r,l]}class M extends t{constructor(t){super(),e(this,t,B,V,s,{prev:0,next:1})}}function P(t){let e,s,u,S,w,y,A,D,L,j,V,B,P,O=t[0].title+"",F=t[0].date+"";return document.title=e=t[0].title,B=new M({props:{next:t[2],prev:t[3],index:t[4]}}),{c(){s=n(),u=r("div"),S=r("h1"),w=l(O),y=n(),A=r("span"),D=l(F),L=n(),j=new k,V=n(),x(B.$$.fragment),this.h()},l(t){I('[data-svelte="svelte-legvjf"]',document.head).forEach(o),s=h(t),u=a(t,"DIV",{id:!0,class:!0});var e=i(u);S=a(e,"H1",{class:!0});var r=i(S);w=c(r,O),r.forEach(o),y=h(e),A=a(e,"SPAN",{class:!0});var l=i(A);D=c(l,F),l.forEach(o),L=h(e),j=N(e),V=h(e),m(B.$$.fragment,e),e.forEach(o),this.h()},h(){f(S,"class","md:"),f(A,"class","font-light"),j.a=V,f(u,"id","blog"),f(u,"class","md:pl-72 md:pr-10 md:pt-10 p-10 md:text-justify")},m(e,r){d(e,s,r),d(e,u,r),p(u,S),p(S,w),p(u,y),p(u,A),p(A,D),p(u,L),j.m(t[1],u),p(u,V),g(B,u,null),P=!0},p(t,[s]){(!P||1&s)&&e!==(e=t[0].title)&&(document.title=e),(!P||1&s)&&O!==(O=t[0].title+"")&&v(w,O),(!P||1&s)&&F!==(F=t[0].date+"")&&v(D,F),(!P||2&s)&&j.p(t[1]);const r={};4&s&&(r.next=t[2]),8&s&&(r.prev=t[3]),16&s&&(r.index=t[4]),B.$set(r)},i(t){P||(b(B.$$.fragment,t),P=!0)},o(t){$(B.$$.fragment,t),P=!1},d(t){t&&o(s),t&&o(u),E(B)}}}function O(t,e,s){let{attributes:r}=e,{body:l}=e,{next:n}=e,{prev:a}=e,{index:i}=e;return t.$$set=t=>{"attributes"in t&&s(0,r=t.attributes),"body"in t&&s(1,l=t.body),"next"in t&&s(2,n=t.next),"prev"in t&&s(3,a=t.prev),"index"in t&&s(4,i=t.index)},[r,l,n,a,i]}class F extends t{constructor(t){super(),e(this,t,O,P,s,{attributes:0,body:1,next:2,prev:3,index:4})}}export{F as B};