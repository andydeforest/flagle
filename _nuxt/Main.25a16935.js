import{a as o,o as e,h as t,l as n,j as _}from"./entry.b5a6bfd1.js";const r={props:{noContainer:Boolean,background:String,includeGaps:Boolean,sectionRowGap:{type:String,default:"base-gap"}},data(){return{hasClass:!0}},computed:{classObject(){return{"base-section":!this.hasClass,"include-gaps":this.includeGaps||!this.hasClass}}},mounted(){this.hasClass=this.$el.className!=="",(this.includeGaps||!this.hasClass)&&this.$el.style.setProperty("--section-row-gap",`var(--${this.sectionRowGap})`)}},l=["data-section-background"],d={key:1,class:"container"};function u(s,c,a,m,g,i){return e(),t("section",{class:_(i.classObject),"data-section-background":a.background},[a.noContainer?n(s.$slots,"default",{key:0}):(e(),t("div",d,[n(s.$slots,"default")]))],10,l)}const y=o(r,[["render",u]]);const h={},p={id:"content"};function f(s,c){return e(),t("main",p,[n(s.$slots,"default")])}const b=o(h,[["render",f]]);export{y as _,b as a};