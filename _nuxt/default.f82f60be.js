import{_ as y}from"./nuxt-link.0db37221.js";import{a as u,m as w,o as a,c as h,h as d,b as e,f as n,t as m,l as S,i as x,w as r,T as I,j as v,e as b,p as B}from"./entry.6e6bf922.js";import{g as k}from"./game.217396e3.js";const O={props:{icon:{type:String,required:!0}}};function L(o,t,i,c,s,_){const l=w("font-awesome-icon");return a(),h(l,{icon:i.icon},null,8,["icon"])}const g=u(O,[["render",L]]);const T={data(){return{gameStore:k(),modalOpen:!1}},computed:{averageGuesses(){return this.gameStore.statistics.guessAmount.length?(this.gameStore.statistics.guessAmount.reduce((t,i)=>t+i,0)/this.gameStore.statistics.guessAmount.length).toFixed(2):"N/A"},winPercent(){return this.gameStore.statistics.gamesPlayed?`(${(this.gameStore.statistics.wins/this.gameStore.statistics.gamesPlayed*100).toFixed(0)}%)`:""}}},A={class:"game-statistics"},N=e("h2",null," Your Statistics ",-1),P=e("th",null,"Games Played:",-1),H=e("th",null,"Record:",-1),G=e("th",null,"Average Guesses:",-1),V=e("th",null,"Longest Win Streak:",-1);function z(o,t,i,c,s,_){const l=g;return a(),d("div",A,[e("button",{class:"game-statistics__close",onClick:t[0]||(t[0]=p=>o.$emit("close"))},[n(l,{icon:"fa-solid fa-xmark"})]),N,e("table",null,[e("tbody",null,[e("tr",null,[P,e("td",null,m(s.gameStore.statistics.gamesPlayed),1)]),e("tr",null,[H,e("td",null,m(s.gameStore.statistics.wins)+" - "+m(s.gameStore.statistics.losses)+" "+m(_.winPercent),1)]),e("tr",null,[G,e("td",null,m(_.averageGuesses),1)]),e("tr",null,[V,e("td",null,m(s.gameStore.statistics.longestWinStreak),1)])])])])}const E=u(T,[["render",z]]);const F={props:{open:{type:Boolean,default:!1}}},q={key:0,class:"ui-modal"},K={class:"ui-modal__content"};function R(o,t,i,c,s,_){return i.open?(a(),d("div",q,[e("div",K,[S(o.$slots,"default")])])):x("",!0)}const W=u(F,[["render",R]]);const Y={data(){return{modalOpen:!1}},methods:{closeModal(){this.modalOpen=!1}}},j=e("span",{class:"ui-statistics-button__desktop"}," Your Statistics ",-1),D={class:"ui-statistics-button__mobile"};function J(o,t,i,c,s,_){const l=g,p=E,f=W;return a(),d("span",null,[e("button",{class:"ui-statistics-button",onClick:t[0]||(t[0]=$=>s.modalOpen=!0)},[j,e("span",D,[n(l,{icon:"fa-solid fa-chart-column"})])]),(a(),h(I,{to:"body"},[n(f,{open:s.modalOpen},{default:r(()=>[n(p,{onClose:_.closeModal},null,8,["onClose"])]),_:1},8,["open"])]))])}const M=u(Y,[["render",J]]);const Q={data(){return{gameStore:k()}},methods:{updateUseMetric(o){this.gameStore.options.useMetric=o}}},X={class:"ui-unit-toggle"};function Z(o,t,i,c,s,_){return a(),d("div",X,[e("div",{class:v(["ui-unit-toggle__option",[s.gameStore.options.useMetric?"active":""]])},[e("button",{title:"Kilometers",onClick:t[0]||(t[0]=l=>_.updateUseMetric(!0))}," KM ")],2),e("div",{class:v(["ui-unit-toggle__option",[s.gameStore.options.useMetric?"":"active"]])},[e("button",{title:"Miles",onClick:t[1]||(t[1]=l=>_.updateUseMetric(!1))}," MI ")],2)])}const C=u(Q,[["render",Z]]);const ee={},te={ref:"menu",class:"ui-mobile-menu"},ne={class:"ui-mobile-menu__links"};function se(o,t){const i=g,c=y,s=M,_=C;return a(),d("div",te,[e("ul",ne,[e("li",null,[n(c,{to:"/",onClick:t[0]||(t[0]=l=>o.$emit("hide-menu"))},{default:r(()=>[n(i,{icon:"fa fa-home"})]),_:1})]),e("li",null,[n(c,{to:"/about",onClick:t[1]||(t[1]=l=>o.$emit("hide-menu"))},{default:r(()=>[n(i,{icon:"fa-solid fa-question"})]),_:1})]),e("li",null,[n(s)]),e("li",null,[e("a",{href:"https://github.com/andydeforest/flagle",target:"_blank",onClick:t[2]||(t[2]=l=>o.$emit("hide-menu"))},[n(i,{icon:"fab fa-github"})])]),e("li",null,[n(_)])])],512)}const oe=u(ee,[["render",se]]),ie=""+globalThis.__publicAssetsURL("images/icon.png");const le={data(){return{menuOpen:!1}},watch:{menuOpen(o){const t="menu-open";o?document.body.classList.add(t):document.body.classList.remove(t)}},mounted(){window.addEventListener("resize",this.hideMenu)},beforeUnmount(){window.removeEventListener("resize",this.hideMenu)},methods:{hideMenu(){this.menuOpen=!1}}},_e={class:"ui-header"},ae={class:"ui-header__logo"},ce=e("img",{src:ie,alt:"Flagle logo"},null,-1),ue={class:"ui-header__nav"},re={href:"https://github.com/andydeforest/flagle",target:"_blank"},de={class:"ui-header__mobile"};function me(o,t,i,c,s,_){const l=y,p=M,f=g,$=C,U=oe;return a(),d("header",_e,[e("div",ae,[n(l,{to:"/"},{default:r(()=>[ce]),_:1})]),e("div",ue,[e("ul",null,[e("li",null,[n(l,{to:"/"},{default:r(()=>[b(" Home ")]),_:1})]),e("li",null,[n(l,{to:"/about"},{default:r(()=>[b(" About ")]),_:1})]),e("li",null,[n(p)]),e("li",null,[e("a",re,[n(f,{icon:"fab fa-github"})])]),e("li",null,[n($)])])]),e("div",de,[e("button",{onClick:t[0]||(t[0]=he=>s.menuOpen=!s.menuOpen)},[n(f,{icon:s.menuOpen?"fa-solid fa-xmark":"fa-solid fa-bars"},null,8,["icon"])])]),n(B,{name:"menu-slide"},{default:r(()=>[s.menuOpen?(a(),h(U,{key:0,onHideMenu:_.hideMenu},null,8,["onHideMenu"])):x("",!0)]),_:1})])}const pe=u(le,[["render",me]]),fe={};function ge(o,t){const i=pe;return a(),d("div",null,[n(i),S(o.$slots,"default")])}const ye=u(fe,[["render",ge]]);export{ye as default};