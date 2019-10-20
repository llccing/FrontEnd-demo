(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{220:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"_3个星"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3个星","aria-hidden":"true"}},[t._v("#")]),t._v(" 3个星")]),t._v(" "),s("p",[t._v("书籍的作者是个"),s("a",{attrs:{href:"http://resume.wuhaolin.cn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("孩子"),s("OutboundLink")],1),t._v("，像我一样的孩子，不过比我小一岁，大家同是16年毕业，人家是真的优秀。")]),t._v(" "),s("p",[t._v("这本书知识点是挺全的，就是过于简单，没有深入的内容，字里行间透露着青涩，像我一样的青涩。")]),t._v(" "),s("h2",{attrs:{id:"目录概览"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#目录概览","aria-hidden":"true"}},[t._v("#")]),t._v(" 目录概览")]),t._v(" "),s("ol",[s("li",[t._v("入门（27）")]),t._v(" "),s("li",[t._v("配置（32）")]),t._v(" "),s("li",[t._v("实战（91）")]),t._v(" "),s("li",[t._v("优化（73）")]),t._v(" "),s("li",[t._v("原理（32）")])]),t._v(" "),s("p",[t._v("一共五章内容，除了附录外265页内容。大部分的篇幅放在了实战和优化部分，真正有内容的原理部分涉及的较少。")]),t._v(" "),s("h2",{attrs:{id:"知识点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#知识点","aria-hidden":"true"}},[t._v("#")]),t._v(" 知识点")]),t._v(" "),s("h3",{attrs:{id:"plugin实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#plugin实现","aria-hidden":"true"}},[t._v("#")]),t._v(" Plugin实现")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BasicPlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在插件实例化时，获取用户设置的配置")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("compiler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    compiler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("plugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'emit'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("在构建过程中，webpack在不同时机会触发各种事件，通过给plugin传递的compiler参数，监听插件感兴趣的事件。\n通过"),s("code",[t._v("compiler.plugin('eventName', ()=>{})，监听事件。")])]),t._v(" "),s("p",[t._v("通过"),s("code",[t._v("compiler.plugin")]),t._v("能够监听事件，那事件触发是通过"),s("code",[t._v("compiler")])]),t._v(" "),s("p",[t._v("插件的执行逻辑，既可以是同步，也可以异步执行，如果是异步，那么当异步逻辑执行万，主动调用回调函数"),s("code",[t._v("function(compilation, cb)")]),t._v("的第二个参数，"),s("code",[t._v("cb()")]),t._v("即可继续执行。")]),t._v(" "),s("h3",{attrs:{id:"loader实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#loader实现","aria-hidden":"true"}},[t._v("#")]),t._v(" Loader实现")]),t._v(" "),s("pre",[s("code",[t._v("webpack能够处理各种资源的核心就是Loader，通过各种各样的Loader来处理各种资源。\n")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// source是处理前的内容")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("source")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行各种处理逻辑")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" source\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("这个处理函数的"),s("code",[t._v("this")]),t._v("指向的compiler对象，所以能够那种各种配置，在Loader中处理。")])])}),[],!1,null,null,null);a.default=e.exports}}]);