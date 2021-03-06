# Node.js 架构和 12 个 Node.js 开发最佳实践

> [原文在此，也可以看原文哦](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development)

![地址](https://cdn.buttercms.com/3FHJ3r3KT9iWbj2k6a7T)

虽然 Node.js 才诞生 11 年，但是已经是过去 10 年来最流行的 web 开发框架之一。我是一个终极粉丝，感谢 Node.js，让我能够在浏览器外部写 JavaScript 代码，去创建一个非阻塞的、流畅的、快速的、健壮的、可扩展的服务端应用程序。

这篇文章中，我将讲述一下 Node.js 的两个方面 - 关于框架的内部机制和关于创建高效、可持续的 Node.js 应用程序的最佳开发实践。

通过有意识的努力理解框架的内部工作原理，我们不仅可以了解框架本身的方式方法，还可以了解流行的编程范式及其设计决策。随着时间推移，这些底层思想和知识会反应到我们写代码的方式中和也会使我们明白如何在速度和性能上优化我们的应用。Node.js 在底层如何工作的一个组成部分是它是单线程、基于事件循环的装置，用于实现异步行为。我们将在本文的前半部分更深入的探讨这一点。

这篇文章的第二个部分将专门讨论范围的另一端 - 重点介绍 12 个最佳实践，当开始新的 Node.js 项目是需要记住的。这些构成了创建一个健壮应用的各个方面，包括项目架构、目录结构、模块化、整洁代码书写、管理依赖等等。在某种程度上，这将是我们对 Node.js 构建块的理解的一种推断，以建立某些基本规则和指导方针，为我们的项目创建坚如磐石的基础。

通过这篇文章，我希望回答下面这些问题 -

- Node.js 在底层是如何工作的？
- 如何实现并发？
- 与其他多线程 web 框架相比，区别是什么？
- 一个好的 Node.js 项目看起来应该是什么样？
- 当开始一个 Node.js 应用时，什么是应该记在脑中的最重要的实践？

使用下面的链接切换到或者跳过教程：

- [Node.js简史](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#abriefhistory)
- [背景：关于 Node.js 底层工作原理的入门](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#background)
    - [传统的多线程处理的 web 框架](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#traditionalmultithread)
    - [Node.js 单线程事件循环架构](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#singlethread)
- [为什么一个良好的设置对 Node.js 应用很重要](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#whyagoodsetupmatters)
- [12 个 Node.js 开发的最佳实践](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#bestpractices)
    - [最佳实践 #1: 采取分层方法](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice1)
    - [最佳实践 #2: 目录结构](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice2)
    - [最佳实践 #3: 发布订阅模型](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice3)
    - [最佳实践 #4: 整洁代码和易读性](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice4)
    - [最佳实践 #5: 写异步代码](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice5)
    - [最佳实践 #6: 配置文件和环境变量](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice6)
    - [最佳实践 #7: 测试、日志和错误处理](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice7)
    - [最佳实践 #8: 代码压缩和文件大小](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice8)
    - [最佳实践 #9: 依赖注入](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice9)
    - [最佳实践 #10: 第三方解决方案](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice10)
    - [最佳实践 #11: 遵守编程原则](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice11)
    - [最佳实践 #12: 使用应用监控工具](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development#practice12)

让我们开始吧！

## Node.js 简史
Just to give you a sense of the timeline here, the World Wide Web started around 30 years back. Javascript was born about 25 years ago and about the same goes for PHP (26 years). Node.js, on the other hand, is only 11 years old. Despite its relatively short run, Node.js has done wonders for developer organizations around the world.

![timeline](https://cdn.buttercms.com/FEhzXv3S5QoRkb1qpgYg)

Ever since Javascript has launched, there have been attempts to utilize Javascript for the back-end, for example, Netscape tried to do something similar with Netscape Livewire. These however turned out to be unsuccessful. Around 2004 onwards, when the first waves of Web 2.0 were starting out, Javascript started getting a lot of traction owing to the visions of a modern web experience. Since Javascript was (and is) the most widely used client-side programming language, browsers competed and pushed to create the most optimized Javascript engines for best performance. One of these engines was Chrome V8, on top of which Node.js was later built. As a result of this momentum, Javascript flourished, and so did the V8 engine. 

In 2009, in the right place, at the right time, Node.js was born. Ever since then, Node.js development has skyrocketed. Despite competition from pioneers like PHP and Advance Java, Node.js has emerged to be the more preferred server-side choice for many applications today, thanks to it’s asynchronous I/O, event-driven architecture, light-weightedness, speed, scalability and the fact that it uses the most popular programming language i.e. Javascript. Today, Node.js servers are used in production for applications and enterprises that cater to hundreds of millions of users worldwide - Netflix, Linkedin, Microsoft, GoDaddy, Paypal and many more. To give you an estimate of it’s popularity, Node’s package manager, NPM, registers billions of downloads each week.

Node.js is very actively maintained, thanks to its enormous community of users and developers. This means that there’s abundant support on the internet if you get stuck somewhere and need some help with your code, or any web development advice in general.

Now let us look at what gives Node.js its edge - how it works under the hood.
## 背景：关于 Node.js 底层工作原理的入门

Node.js 因为 __“异步事件驱动、非阻塞 I/O”__ 处理而受欢迎，它从 JavaScript 的 __单线程事件循环__ 模型中获得了大部分并发性和异步性。

其他大部分 web 开发可选的如 ASP.NET，JSP，Spring 使用多线程处理架构来处理并发的客户端请求。在对比他们和Node.js带来的东西之前，让我们更多了解多线程处理模型。

### 传统的多线程处理的 web 框架

多线程处理模型的设置中，每个服务器有个有限的线程池可供使用。每次服务端收到客户端请求后，它从线程池中选择一个线程分配给客户端的请求。这个线程将负责与该请求相关的所有处理。这些线程内部，处理本质上是顺序和同步的，即一次执行一个操作。无论如何，当一个并发请求请求到服务器时，它能够从线程池中选择任何一个可用线程让他运行。

![多线程处理](https://cdn.buttercms.com/kgo7aSpmRqKQRP1dGBJp)

这能够运行到所有线程都被占用时，当都占用后，你的服务器将强制去等待其中一个繁忙的线程变的空闲后才能处理新进来的请求。如果不负责任的解释，这对您的应用程序来说可能会变得缓慢且低效。此外，内部每个线程的同步的自然处理意味着尽管我们可以启动多个线程来处理并发，每个独立的线程，如果遇到阻塞代码仍将会变慢。这样的多线程支持也带来了处理同步和管理多线程的困难。也有死锁的风险，即多个线程在等待彼此释放资源的过程中永远被阻塞。

现在我们看看 Node.js 如何处理并发。

### Node.js 单线程事件循环架构

关于 Node.js 真的能够仅使用一个线程处理每个事情有很多疑惑。这怎么可能？他如何仅用一个线程就与其他多线程框架竞争？

据我们所知，Node.js 本质上仅是运行在谷歌 V8 JavaScript 引擎上的一个 JavaScript 运行时。这意味着它是基于 JavaScript 的单线程架构。因此，每次客户端请求来时都是主线程来处理。事件循环是基础的组件，允许 Node.js 以非阻塞的方式执行阻塞 I/O 操作。它持续的追踪异步任务的状态（例如，你回调函数中的代码），在他们执行完成后移动回执行队列。它在我们一直谈论的同一个主线程中运行。

需要注意的是，虽然表面上只有一个主线程，但是系统内部仍然有一批辅助线程，来让 Node.js 能够利用可扩展的磁盘空间和基于网络的异步操作。这组线程构成（所谓的）工作池。

![Node.js server](https://cdn.buttercms.com/0Nh1yR6SSPwqnsKYSfHa)

事件循环能够自己做基本的处理，但是对于异步 I/O 操作，涉及到模块例如 fs (I/O 密集)和加密（CPU 密集），它能够将处理转到系统内部的工作池。工作池是通过 [libuv](http://docs.libuv.org/en/v1.x/) 实现，能够根据需要产生和管理多个线程。这些线程以同步方式独立运行他们各自的任务，在需要的时候返回响应。这些线程工作在他们自己被授予的操作中，事件循环能够正常继续运行，同时处理其他的请求。当线程所在的任务完成后，返回输出内容到事件循环中，被放回执行队列中执行然后返回给客户端。

采用这样的架构的思考过程可以归因于这样一个事实，即典型的 web 负载下，和传统的“一个线程处理一个请求”的架构相比，单个主线程能够更好的执行和扩展。因此，Node.js 是许多人的首选，因为它在速度和可扩展性方面具有优势。然而这里需要注意的是，性能可能会因为前期复杂的内存密集型操作而受到影响，例如用于图像处理的矩阵算法，数据科学和机器学习应用。这些能够阻塞仅有的主线程，使服务器响应迟钝。然而对于这样的情况，Node.js 也引入了 worker 线程，开发者可以利用它创建高效率的多线程 Node.js 应用。

如果你有兴趣学习更多得关于使用 JavaScript 写异步代码，你可以点击这里 [异步 JavaScript: 从 Promise 到 Async/Await，发布在我们的 blog 上](https://scoutapm.com/blog/async-javascript)。

## 为什么一个良好的设置对 Node.js 应用很重要

现在我们已经清楚的了解了 Node.js 工作的底层原理，让我们转到更多的应用侧，看看智能 Node.js 项目是由什么构成的。

一个良好的项目结构设置是任何软件工程工作流的关键，且为高效应用奠定了一个坚实的基础。当开始一个新的 Node.js 项目时，预先布置的明确定义的结构为您的系统工作提供了清晰地鸟瞰图。它也帮助我们以系统化的方式组织业务逻辑，服务、API 路由、数据模型等。这使得项目中各种组件连贯且清晰。

一个健全的架构允许你分解和简化一个复杂系统到更小、更独立可理解的模块，便于您更好地了解应用如何在内部工作。下面是一个理想的项目设置包含的关键点 - 

- 为了清晰，定义明确连贯的结构
- 可重用，模块化和关注点分离
- 简单易懂
- 易于调试和维护
- 自动化测试，日志机制
- 采用最佳编程、开发原则

建立一套在构建 Node.js 应用程序时要考虑的基本规则和指南，让我们深入下一部分，讨论开发 Node.js 项目的最佳实践。

## Node.js 开发的最佳实践

网络上充满了关于 web 开发基础的教程、文档、blog和视频。但是通常，关于最佳实践的（重要的）信息是我们在开发过程中不断学习的东西，随着我们构建更多的应用程序，随着我们一路上失败和成功。

这个部分，我想将 web 开发中最重要的方面提取为一系列关键点，来在使用 Node.js 开发 web 应用时考虑。这些要点提供了有关某些设计决策如何在您的 web 开发生命周期过程中带来巨大收益的见解。

### 最佳实践 #1: 采取分层方法

流行的 Node.js 框架像 Express.js 允许你通过回调函数的方式定义路由处理器，当收到客户端请求时执行定义的回调函数。凭借这些框架的灵活性，直接在这些函数中定义所有业务逻辑可能很天真。如果你这样做，你会注意到事情会在你意识到之前迅速升级，你的娇小的服务端路由文件变为了笨重、笨拙和凌乱的代码块。不仅难以阅读、维护和管理，同时也很难进行单元测试。

因此，这种情况适合实施“关注点分离”的编程原则。根据这个原则，我们应该有不同的模块来解决我们应用程序相关的不同问题。就服务端应用程序而言，不同的模块（或者层）应该负责处理客户端请求响应的不同方面。总的来说，在大多数情况下，这可能会表现为 - 

客户端请求 ➡️ 一些业务逻辑 + 一些数据操作 ➡️ 返回相应。

这些方面能够通过编程的 3 个不同层来处理，如下所示 - 

![汉堡包](https://cdn.buttercms.com/MeGKGWTZRZmCh0pNgSNP)

- __Controller__
    - (API 路由和端点)
- __Service 层__
    - (业务逻辑层)
- __数据访问层__
    - （针对数据库工作）

#### Controller 层

这个主要是 API 路由定义的模块。仅仅定义你的路由，在路由处理函数中，你可以解构请求对象，选择重要的数据将他们传入service层处理。

#### Service 层

这层主要是业务逻辑层，甚至是应用的核心部分。它包括了一系列类和方法，他们采用单一职责且可重用（也遵守其他 S.O.L.I.D 编程原则）。这个层允许你高效的解耦路由处定义的处理逻辑。

这里考虑的另一个方面是数据库部分。为了独立处理这个，我们需要另一个层。

#### 数据访问层

数据访问层能够担起这个职责，读取、写入、更新数据库。你的全部 SQL 查询，数据库连接，模型，ORM(对象关系映射)等都应该定义在这。

这三层的设置对大多数 Node.js 应用来说都是可靠的脚手架，使你的应用能够易于编写，可维护，便于调试和测试。现在我们看下如何在我们的项目中实现这些层。

### 最佳实践 #2: 目录结构，恰当的组织你的代码文件

上一部分，我们已经看到如何从逻辑上以模块化的方式将我们项目分为 3 层。这个抽象结构能够通过恰当的目录结构实现，即将不同的模块放到不同的目录。

这里清晰的描述了每个功能应该放到哪个位置，允许我们将类和方法放到不同的易于管理的目录中。下面是一个通用的（也是高效的）目录结构，能够作为我们开始新的 Node.js 项目的模板。

```js
   src
      ├── app.js			app entry point 入口
      ├── /api			    controller layer: api routes 路由
      ├── /config			config settings, env variables 配置，环境变量
      ├── /services		    service layer: business logic 服务层：业务逻辑
      ├── /models			data access layer: database models 数据访问层：数据模型
      ├── /scripts		    miscellaneous NPM scripts 各种的 npm 脚本
      ├── /subscribers		async event handlers 异步事件处理
      └── /test             test suites 测试
```

这里，目录 - __/API__(controller 层)，__/services__，和 __/models__（数据访问层）代表了我们在上一节讨论的 3 层。__/scripts__ 目录用来存储构建（或者部署）工作流自动化脚本，__/test__ 目录用于存储测试用例。我们将在后面的文章中讨论配置文件、环境变量和 发布/订阅模型时，看下 __/config__ 和 __/subscriber__ 目录的目的。

作为开发者，没有什么比以清晰、整洁的结构读（写）代码、组织规划目录更让我开心的了。这能够让我们将下一个重要的开发实践记在脑中 - 整洁代码和易读性。

### 最佳实践 #3: 发布订阅模型

发布者/订阅者模型是用于在发布者和订阅者这两个持续沟通的实体间的一种流行的数据交换模型。发布者（数据发送方）在对于接收实体没有任何了解的情况下通过特定的频道发送消息。另一方面，订阅者（消息接收方）表示对于一个或者多个这样的频道感兴趣，在对发送实体一无所知的情况下。

在你的项目中包含这个模型来管理针对一个事件的多个子操作是个好主意。例如，你的 APP 中，当新的用户注册时，将做一些列事情 - 数据库创建用户实体，生成授权 key，发送确认邮件等等。如果通过单个服务函数做这些，不仅会使处理时间边长，也会违反单一职责原则。这里是相同的示例代码 - 

```js
export default class UserService() {		

      async function signup(user) {

        // 1. Create user record 创建用户记录
        // 2. Generate auth key 生成授权 key
        // 3. Send confirmation email 发送确认邮件
        // ...  

      }

    }
```
让我们看下如何使用发布/订阅模型高效的简化和模块化它。

在 Node.js 中，发布/订阅模型能够通过 Events API 来设置。上面的例子中，当收到请求时你可以编码，来触发第一个“signup”事件。这时，你的服务模块仅需要一次调用即可触发相应事件，与之相对的是非发布订阅模型下需要操作多个函数。

```js
 var events = require('events');
      var eventEmitter = new events.EventEmitter();		

      export default class UserService() {

        async function signup(user) {
          // emit 'signup' event
          eventEmitter.emit('signup', user.data)
        }

      }

```
为了处理这样的事件，你可以定义多个订阅者，本质上他们是事件监听者，等待特定的事件的触发。这些订阅者能够基于他们的目的规划到不同的文件中，并存储到 /subscribers 目录中，正如我们上面看到的目录。
让我们为上面的例子创建一个订阅者文件的例子 - 

```js
// email.js

    // ...

    eventEmitter.on('signup', async ({ data }) => {  // event listener 
      // send email 
    })

    // ...
```

```js
// auth.js

    // ...

    eventEmitter.on('signup', async ({ data }) => {	// event listener
      // generate auth key
    })

    // ...
```
如你所见，这个方法非常整洁、灵活，因此适合维护和扩展。

### 最佳实践 #4: 整洁代码和易读性

__使用代码格式化工具、样式规范；添加注释__

#### lint & 格式化

主要是目的是改善代码质量和使其更易读。大多数代码设置工作流总是包含代码 lint 和格式化工具。linter 在语法（甚至语义上）查找错误代码并发出警告。代码格式化（正如名字所示）工具注重格式方面，
确保格式和样式规范在整个项目中一致。 几个最流行的 linter 工具如 [ESLint](https://eslint.org/)，[JSLint](https://jslint.com/) 和 [JSHint](https://jshint.com/).代码格式化，可以看下[Prettier](http://prettier.io/)。大多数的 IDE 或者代码编辑器如 VS Code，Atom 等，懂得写高质量代码的重要性并且提供了 lint 和 格式化插件，他们很直观并且很容易设置。

![lint format](https://cdn.buttercms.com/GMv3pRThQLyZNfZU9jAN)

这些 IDEs 也提供了一些有用的功能，如智能补全，自动导入，鼠标浮上去的文档支持，调试工具，代码跳转，重构等等。所以，我强烈建议你使用这样的 IDE（VSCode 很完美）作为你的代码编辑器。

#### 样式指南

除了 lint 和格式化，你也可以参考被 [Google](https://google.github.io/styleguide/jsguide.html) 和 [Airbnb](https://github.com/airbnb/javascript) 这些巨人公司采用的 JavaScript 代码风格和标准。这些指南被包括从命名转换（对 文件、变量、类等）到文件编码的格式细节等等。
这能够帮助你写高质量代码，符合世界上顶级开发者的编码实践和标准。

![google javascirpt style guide](https://cdn.buttercms.com/X9WBAAf4SOSZt5TtalVr)

#### Add comments

当你写代码时，另一个重要的事是勤奋的添加一些有用的注释，这样你团队的其他成员将获益。即使是最复杂的代码片段，仅用五六个单词的句子也能使你的队友更了解你的代码。这节省了每个人很多时间和省去了困惑，是个双赢的方案。

要注意的一个事是，我们应该更加聪明的添加注释，既不太多，也不太少。担心不知如何找到平衡？使用 Michael Gary Scott的话来说就是，"You'll learn baby. You'll learn"。

注释也是一种给你的项目api写文档的方式（从上层来看，版权信息、作者信息等），他的类（描述和参数），方法和函数名（描述、参数、和返回类型等）。
这些可以通过文档生成工具如 [JSDoc](https://jsdoc.app/) 来完成。


### 最佳实践 #5: 写异步代码

__使用 promise、async/await 语法__

JavaScript 因他的回调函数而出名（将函数作为参数传给另一个函数）。你也可以在 JavaScript 中定义异步行为。这个回调问题是 - 随着链式操作增加，
代码将变得笨重且臃肿，导致臭名昭著的回调地狱。为了解决这个问题，ES 6（ECMAScript 2015）带来了 Promise API，从而使在 JavaScript 中写异步代码变得更加简单。在此之上，ES 8（2017），__async/await__ 语法的引入进一步简化且使 API 更加直观自然。

因此，提倡抛弃笨重的回调函数，使用 async/await 和基于 Promise 的语法在你的 nodejs 项目中。这有利于代码整洁、可读性、更简单的错误处理和测试；
这一切将同时保持清晰地控制流和更连贯的功能编程设置。

使用 async/await 能够使感觉编码更加简单自然，这有个写异步代码的两种方式比较。

```js
<script>
    function get_data() {
        $.get('https://url.com/one', () => {
            $.get('https://url.com/two', () => {
                $.get('https://url.com/three', (res) => {
                    console.log(res)
                })
            })
        })
    }
</script>
```
回调函数的例子。

```js
<script>
    async function get_data() { // async function
        await $.get('https://url.com/one')
        await $.get('https://url.com/two')
        let res = await $.get('https://url.com/three')
        console.log(res)
    }
</script>
```
async/await 的例子。

正如前面提到的，我们已经在之前的文章 [JavaScript 异步编程](https://scoutapm.com/blog/async-javascript) 中包含异步编程涉及到的知识。如果你感兴趣，你可以查看这个， -> 异步 JavaScript: 从 Promises 到 Async/Await。

### 最佳实践 #6: 配置文件和环境变量

### 最佳实践 #7: 测试、日志和错误处理
### 最佳实践 #8: 代码压缩和文件大小

### 最佳实践 #9: 依赖注入
### 最佳实践 #10: 第三方解决方案

### 最佳实践 #11: 遵守编程原则
### 最佳实践 #12: 使用应用监控工具

## 部分知识点解析

`S.O.L.I.D`

- The Single-Responsibility Principle (SRP) 单一职责原则
- The Open-Closed Principle (OCP) 开闭原则
- The Liskov Substitution Principle (LSP) 里氏替换原则
- The Interface Segregation Principle (ISP) 接口隔离原则
- The Dependency inversion Principle (DIP) 依赖倒置原则