(window.webpackJsonp=window.webpackJsonp||[]).push([[6,5],{233:function(t,e,n){"use strict";n.r(e);var r={props:{prev:{type:Object,default:function(){return null}},next:{type:Object,default:function(){return null}}}},l=n(19),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex justify-between"},[t.prev?n("NuxtLink",{staticClass:"text-primary font-bold hover:underline",attrs:{to:{name:"blog-slug",params:{slug:t.prev.slug}}}},[t._v("\n    "+t._s(t.prev.title)+"\n  ")]):n("span",[t._v(" ")]),t._v(" "),t.next?n("NuxtLink",{staticClass:"font-bold hover:underline",attrs:{to:{name:"blog-slug",params:{slug:t.next.slug}}}},[t._v("\n    "+t._s(t.next.title)+"\n  ")]):n("span",[t._v(" ")])],1)}),[],!1,null,"04732766",null);e.default=component.exports},248:function(t,e,n){"use strict";n.r(e);var r=n(17),l=n(6),c=(n(31),n(41),n(39),{asyncData:function(t){return Object(l.a)(regeneratorRuntime.mark((function e(){var n,l,article,c,o,d,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,l=t.params,e.next=3,n("articles",l.slug).fetch();case 3:return article=e.sent,e.next=6,n("articles").where({status:{$ne:"private"}}).only(["title"],["slug"]).sortBy("createdAt","asc").surround(l.slug).fetch();case 6:return c=e.sent,o=Object(r.a)(c,2),d=o[0],v=o[1],e.abrupt("return",{article:article,prev:d,next:v});case 11:case"end":return e.stop()}}),e)})))()},head:function(){return{title:this.article.title,meta:[{hid:"description",name:"description",content:this.article.description}],link:[{rel:"canonical",href:"https://runkel.org/blog/"+this.article.slug}]}},methods:{formatDate:function(t){return new Date(t).toLocaleDateString("en",{year:"numeric",month:"long",day:"numeric"})}}}),o=n(19),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",{staticClass:"max-w-4xl mx-auto"},[n("h1",{staticClass:"text-4xl pr-4 py-4"},[t._v(t._s(t.article.title))]),t._v(" "),n("p",[t._v("Posted: "+t._s(t.formatDate(t.article.date))+" Last updated: "+t._s(t.formatDate(t.article.updatedAt)))]),t._v(" "),n("div",{staticClass:"prose"},[n("nuxt-content",{attrs:{document:t.article}})],1),t._v(" "),n("prev-next",{attrs:{prev:t.prev,next:t.next}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{PrevNext:n(233).default})}}]);