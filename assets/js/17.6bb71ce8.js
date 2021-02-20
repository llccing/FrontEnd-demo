(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{218:function(t,e,r){"use strict";r.r(e);var a=r(0),o=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"oop"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#oop","aria-hidden":"true"}},[t._v("#")]),t._v(" OOP")]),t._v(" "),r("div",{staticClass:"tip custom-block"},[r("p",[t._v("面向对象编程（Object-Oriented Programming）")])]),t._v(" "),r("h2",{attrs:{id:"面向过程编程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#面向过程编程","aria-hidden":"true"}},[t._v("#")]),t._v(" 面向过程编程")]),t._v(" "),r("blockquote",[r("p",[t._v("通过编写多个函数来解决问题，会产生多个全局变量，不利于别人重复使用， 一旦别人使用你提供的方法，你就不能轻易的去修改这些方法，这不利于团队代码维护。")])]),t._v(" "),r("h2",{attrs:{id:"面向对象编程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#面向对象编程","aria-hidden":"true"}},[t._v("#")]),t._v(" 面向对象编程")]),t._v(" "),r("blockquote",[r("p",[t._v("将你的需求抽象成一个对象，然后针对这个对象分析其特征（属性）与动作（方法）。这个对象我们称为类，面向对象编程的一个特点是封装，就是把需要的功能放在一个对象里。")])]),t._v(" "),r("h2",{attrs:{id:"封装一个类"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#封装一个类","aria-hidden":"true"}},[t._v("#")]),t._v(" 封装一个类")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/m4LwdeLo/2/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo1"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("这样将我们将要用到的属性和方法都封装到抽象的Book类里面了,当使用功能方法时,不能直接使用Book类，需要使用new关键字来实例化新的对象。")]),t._v(" "),r("blockquote",[r("p",[t._v("通过this添加的属性和方法同在prototype中添加的属性和方法有什么区别?")])]),t._v(" "),r("p",[t._v("“通过thist添加的属性和方法是在当前对象上添加的,然而JavaScript是一种基于原型prototype的语言,所以每创建一个对象时（当然在JavaScript中函数也是一种对象）,它都有一个原型prototype用于指向其继承的属性、方法。这样通过prototype继承的方法并不是对象自身的，所以在使用这些方法时，需要通过prototype一级一级的查找来得到。这样你会发现通过this定义的属性和方法是对象拥有的，所以每次通过类创建一个对象时，this指向的属性和方法都会得到创建，通过prototypej继承的属性和方法是每个对象通过prototype访问到,所以我们每次通过类创建一个新对象时这些属性和方法不会再次创建。”")]),t._v(" "),r("p",[t._v("constructor是一个属性，当创建一个函数时都会为其创建一个原型对象prototype，在prototype对象中又会像函数中创建this一样创建一个constructor属性,那么constructor属性指向的就是拥有整个原型对象的函数或者对象")]),t._v(" "),r("p",[t._v("在这个例子中 Book prototype中的constructors属性指向的就是Book类对象。")]),t._v(" "),r("h2",{attrs:{id:"属性与方法封装"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#属性与方法封装","aria-hidden":"true"}},[t._v("#")]),t._v(" 属性与方法封装")]),t._v(" "),r("p",[t._v("JavaScript是函数级作用域，声明在函数内部的变量和方法在外界是访问不到的,通过特性可以可以创建类的私有变量和私有方法。")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/Ln9jq88v/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo2"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("“通过new关键字创建对象实质上是对新对象this的不断赋值，并将prototype指向类的prototype所指向的对象，而类的构造函数外面通过点语法定义的属性方法是不会添加到新创建的对象上去的。因此要想在新创建的对象中使用isChinese就得通过Book类使用而不能通过this，如Book.isChinese，而类的原型prototype上定义的属性在新对象上可以直接使用，这是因为新对象的prototype和类的prototype指向的是同一个对象。”")]),t._v(" "),r("h2",{attrs:{id:"通过闭包实现来实现类的静态变量"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#通过闭包实现来实现类的静态变量","aria-hidden":"true"}},[t._v("#")]),t._v(" 通过闭包实现来实现类的静态变量")]),t._v(" "),r("blockquote",[r("p",[t._v("闭包：有权访问另外一个函数作用域中变量的函数，即在一个函数内部创建另外一个函数。")])]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/Ln9jq88v/1/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo3"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("我们将这个闭包作为创建对象的构造函数，这样它既是闭包又是可以实例对象的函数，即可以访问到类函数作用域中的变量，如bookNum这个变量，此时这个变量叫静态私有变量,并且checkBook可称为静态私有方法。当然闭包内部也有私有的变量及方法，如price、checkID().但是外部添加属性和方法看上去像是脱离了闭包这个类，所以有时候要在闭包中实现一个完整的类，然后将其返回。")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/Ln9jq88v/2/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo4"),r("OutboundLink")],1)]),t._v(" "),r("h2",{attrs:{id:"创建对象的安全模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建对象的安全模式","aria-hidden":"true"}},[t._v("#")]),t._v(" 创建对象的安全模式")]),t._v(" "),r("blockquote",[r("p",[t._v("如果忘记了使用new关键字就会报undefined错误。")])]),t._v(" "),r("p",[r("a",{attrs:{href:"https://fiddle.jshell.net/zg0658kp/2/",target:"_blank",rel:"noopener noreferrer"}},[t._v("问题demo"),r("OutboundLink")],1)]),t._v(" "),r("p",[r("a",{attrs:{href:"https://fiddle.jshell.net/zg0658kp/3/",target:"_blank",rel:"noopener noreferrer"}},[t._v("解决"),r("OutboundLink")],1)]),t._v(" "),r("h2",{attrs:{id:"继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 继承")]),t._v(" "),r("h3",{attrs:{id:"子类的原型对象-类式继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#子类的原型对象-类式继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 子类的原型对象--类式继承")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/xsqbsmfa/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("分析透彻的原理：")]),t._v(" "),r("blockquote",[r("p",[t._v("类式继承需要两个类，核心在与将父类的实例对象赋值给子类的原型。")])]),t._v(" "),r("blockquote",[r("p",[t._v("“类的原型对象的作用就是为类的原型添加公有方法，但是类不能直接访问这些属性和方法，必须通过原型prototype。而我们实例化一个父类的时候，新创建的对象复制了父类的构造函数内的属性与方法并且将原型__proto__指向了父类的原型对象，这样就拥有了父类原型对象上的属性与方法，并且这个新创建的对象可以直接访问到父类原型上的属性与方法。如果我们将这个新创建的对象赋值给子类的原型，那么子类的原型就可以访问到父类的原型属性和方法。”")])]),t._v(" "),r("blockquote",[r("p",[t._v("“新创建的对象不仅仅可以访问父类原型上的属性与方法，同样可以访问从父类构造函数中复制的属性与方法。将这对象赋值给子类的原型，那么这个子类的原型同样可以访问父类原型上的属性和方法与从父类构造函数中复制的属性与方法。”这是类式继承的原理。")])]),t._v(" "),r("p",[t._v("验证继承是否成功 "),r("a",{attrs:{href:"https://jsfiddle.net/xsqbsmfa/1/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("类式继承的缺点：")]),t._v(" "),r("p",[t._v("1.若父类中的公有属性是引用类型，则会在子类中被所有实例g共用。")]),t._v(" "),r("p",[t._v("2.创建父类时，无法向父类传递参数。")]),t._v(" "),r("h3",{attrs:{id:"创建即继承-构造函数继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#创建即继承-构造函数继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 创建即继承--构造函数继承")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/6z00qmyv/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),r("OutboundLink")],1)]),t._v(" "),r("blockquote",[r("p",[t._v("Parent.apply(this,[name]);这个方法是构造函数继承的核心，由于apply方法能够改变函数的作用环境，因此在子类中，对Parent调用这个方法就是将子类中的变量在父类中执行一遍，由于父类中是给this绑定属性的，因此子类自然也就继承了父类的共有属性。")])]),t._v(" "),r("p",[t._v("缺点：由于构造函数继承没有涉及到原型prototype，所以父类的原型方法不会被子类继承，要想被子类继承就要放到构造函数中去，这样每个实例都会单独拥有一份而不能共用，违背了代码复用的原则。所以就有了组合继承。")]),t._v(" "),r("h3",{attrs:{id:"将优点为我所用-组合继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#将优点为我所用-组合继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 将优点为我所用--组合继承")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/6z00qmyv/2/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),r("OutboundLink")],1)]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v("    // 构造函数继承\n    Parent.apply(this, [name]);\n    // 类式继承 \n    Child.prototype = new Parent();\n")])])]),r("p",[t._v("缺点：使用构造函数继承时执行了一遍父类的构造函数，实现子类原型的类式继承时又执行了一遍父类的构造函数。所以执行了两遍，所以还有更好的方法。")]),t._v(" "),r("h3",{attrs:{id:"洁净的继承者-原型式继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#洁净的继承者-原型式继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 洁净的继承者--原型式继承")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/wLa6qwf8/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("与类式继承相似的是，父类对象中值类型的属性会复制，引用类型的属性会被覆盖。")]),t._v(" "),r("h3",{attrs:{id:"如虎添翼-寄生式继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#如虎添翼-寄生式继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 如虎添翼--寄生式继承")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://jsfiddle.net/v2r4tyLx/1/",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),r("OutboundLink")],1)]),t._v(" "),r("h3",{attrs:{id:"终极继承者-寄生组合式继承"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#终极继承者-寄生组合式继承","aria-hidden":"true"}},[t._v("#")]),t._v(" 终极继承者--寄生组合式继承")]),t._v(" "),r("p",[r("a",{attrs:{href:"..."}},[t._v("demo")])])])}),[],!1,null,null,null);e.default=o.exports}}]);