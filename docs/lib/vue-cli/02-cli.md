# @vue/cli

## 作用

注册全局命令，具体哪些命令呢，如下：

- `vue create <app-name>`
- `vue add <plugin> [plugin]`
- `vue invoke <plugin> [pluginOptions] `
- `vue inspect [path...]`
- `vue serve [entry]`
- `vue build [entry]`
- `vue ui`
- `vue init <template> <app-name>  `
- `vue config [value]`
- `vue outdated`
- `vue updrade [plugin-name]  `
- `vue migrate [plugin-name]`
- `vue info`，打印当前系统环境信息，依赖 envinfo
- `vue <command>`，捕获不存在的命令，输出帮助信息
- `vue --help`

Vue ClI 的文档开始就告诉我们全局安装脚手架，执行了 `npm install -g @vue/cli` 或者 `yarn global add @vue/cli` 这个命令，那么为什么安装之后我们能够使用 `vue xxx` 呢，主要原因是在 `package.json` 文件中的 `bin: {vue: 'bin/vue.js'}` 这段代码的配置，当然也可以从[阮老师的文章](https://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)中找到说明。

## 目录结构

```js
|-- bin/vue.js
|-- lib
|-- |-- create
|-- |-- Creator
|-- |-- options
|-- __tests__ // 正经的项目，测试还是不能少的
|-- package.json
```

## 项目依赖

### 外部依赖

- [commander](https://github.com/tj/commander.js) tj大神的node命令行工具，用于获取参数、设置默认值
- [slash](https://github.com/sindresorhus/slash) 修改资源路径，保证 Unix 和 Windows 返回路径一致
- [minimist](https://github.com/substack/minimist) 命令行参数解析器
- [didyoumean](https://github.com/dcporter/didyoumean.js) 一个简单的，经过优化的 js 库 和 node.js 模块，能够将人的个性化输入和各种可能性进行匹配
- [debug](https://github.com/visionmedia/debug) 带有命名空间的日志输出工具，能够彩色打印，支持浏览器和node.js，使用的时候，需要设置以下代码 debug.enabled = true

### 内部依赖

#### @vue/cli-shared-utils

- [chalk](https://github.com/chalk/chalk) 为命令行字符串添加样式
- [execa](https://github.com/sindresorhus/execa) 改善了 node.js 原来的 Child Process 进程，执行脚本命令
- [semver](https://github.com/npm/node-semver) 语义化版本，同时能够进行版本的比较
- [lru-catch](https://github.com/isaacs/node-lru-cache) 高速缓存对象，用于删除最近最少使用的项目

## 源码探索

### `@vue/cli/bin/vue.js`

首先从 `/bin/vue.js` 开始，这一部分一共做了以下几个事：

1. 检测当前的node版本是否符合期望的版本，这里提一下这句 `process.version`，[`process`](http://nodejs.cn/api/process.html#process_process) 是全局变量，它提供当前 node.js 进程的信息并对其进行控制。因为他是全局变量，所以不需要 `require()` 也可以使用。

`process` 打印的部分内容如下
```js
{
  version: 'v12.13.0',
  versions: {
    node: '12.13.0',
    v8: '7.7.299.13-node.12',
    uv: '1.32.0',
    zlib: '1.2.11',
    brotli: '1.0.7',
    ares: '1.15.0',
    modules: '72',
    nghttp2: '1.39.2',
    napi: '5',
    llhttp: '1.1.4',
    http_parser: '2.8.0',
    openssl: '1.1.1d',
    cldr: '35.1',
    icu: '64.2',
    tz: '2019a',
    unicode: '12.1'
  },
  arch: 'x64',
  platform: 'darwin',
  release: {
    name: 'node',
    lts: 'Erbium',
    sourceUrl: 'https://nodejs.org/download/release/v12.13.0/node-v12.13.0.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v12.13.0/node-v12.13.0-headers.tar.gz'
  },
  ......
}
```
可以看到这里面的信息丰富。

2. 通过 commander 注册命令，第一个是 `vue create <app-name>` 命令，<app-name> 表示传入的参数名。

```js
program
  .command('create <app-name>')
  .description('create a new project powered by vue-cli-service')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-d, --default', 'Skip prompts and use default preset')
  ......
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    }
    // --git makes commander to default git to true
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true
    }
    require('../lib/create')(name, options)
  })
```

`const options = cleanArgs(cmd)` 这一行中 cleanArgs() 方法的作用是解析传递给 `vue create xxx` 命令的参数，cmd的格式如下，
```js
Command {
  commands: [],
  options: [
    Option {
      flags: '-p, --preset <presetName>',
      required: true,
      optional: false,
      bool: true,
      short: '-p',
      long: '--preset',
      description: 'Skip prompts and use saved or remote preset'
    },
    ......
}
```

而当我们给 vue create 命令传递参数时，例如 `vue create test-app -p 23123 -f` 那么结构会变成如下

```js
Command {
  commands: [],
  options: [
    Option {
      flags: '-p, --preset <presetName>',
      required: true,
      optional: false,
      bool: true,
      short: '-p',
      long: '--preset',
      description: 'Skip prompts and use saved or remote preset'
    },
    ......
  // 设置的参数会变成 Command 对象的属性
  git: true,
  preset: '23123',
  force: true
```

下面这段代码是调用了 `/lib/create.js`并且将 name 和 options 传了过去。 `create.js` 的文件内容比较少，下面这段代码，说的是如果项目名字是 `"."` 那么就会直接在当前文件夹下生成内容，这个特点解决了先在 gitlab 上创建好项目，然后再在本地生成的项目内容的需求。
```js
const inCurrent = projectName === '.'
const name = inCurrent ? path.relative('../', cwd) : projectName
```

### `@vue/cli/lib/create.js`

在 `create.js` 中校验了项目项目名字是否正确，通过插件 [validate-npm-package-name](https://github.com/npm/validate-npm-package-name) 来做，如果名字是 "."，则会通过提示来确认是否直接在当前目录创建，如果当前目录有内容则会提示是否覆盖，接下来调用 `Creator` 对象，传入 项目名字（`name`）、目标目录（`targetDir`）、和`getPromptModules()` 方法的返回值，这个方法返回 `@vue/cli/lib/promptModules` 下的所有的需要提示的内容。


看下 `getPromptModules` 方法，这个方法返回一个数组，数组中每个元素的内容通过下文提到的 `@vue/cli/lib/promptModules/babel.js` 文件可以返现，每个元素都是函数。
```js
exports.getPromptModules = () => {
  return [
    'babel',
    'typescript',
    'pwa',
    'router',
    'vuex',
    'cssPreprocessors',
    'linter',
    'unit',
    'e2e'
  ].map(file => require(`../promptModules/${file}`))
}
```

我们找一个 `@vue/cli/lib/promptModules` 目录下的文件看下，`@vue/cli/lib/promptModules/babel.js`
```js
module.exports = cli => {
  cli.injectFeature({
    name: 'Babel',
    value: 'babel',
    short: 'Babel',
    description: 'Transpile modern JavaScript to older versions (for compatibility)',
    link: 'https://babeljs.io/',
    checked: true
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('ts')) {
      if (!answers.useTsWithBabel) {
        return
      }
    } else if (!answers.features.includes('babel')) {
      return
    }
    options.plugins['@vue/cli-plugin-babel'] = {}
  })
}
```
首先他返回一个函数，这个函数的参数有 `injectFeature` 和 `onPromptComplete` 两个方法。

通过 `@vue/cli/lib/Creator.js` 的构造函数中的 `const promptAPI = new PromptModuleAPI(this) promptModules.forEach(m => m(promptAPI))` 这两行可以知道 `@vue/cli/lib/promptModules/babel.js` 中的参数 cli 其实是 `PromptModuleAPI` 的实例，而 `PromptModuleAPI` 这个类的内容如下
```js
module.exports = class PromptModuleAPI {
  constructor (creator) {
    this.creator = creator
  }

  injectFeature (feature) {
    this.creator.featurePrompt.choices.push(feature)
  }

  injectPrompt (prompt) {
    this.creator.injectedPrompts.push(prompt)
  }

  injectOptionForPrompt (name, option) {
    this.creator.injectedPrompts.find(f => {
      return f.name === name
    }).choices.push(option)
  }

  onPromptComplete (cb) {
    this.creator.promptCompleteCbs.push(cb)
  }
}
```
这样我们就明白了 `@vue/cli/lib/promptModules/babel.js` 中参数 cli 为啥能够直接调用 `injectFeature` 和 `onPromptComplete` 方法了。`injectFeature` 的作用是将功能特性注册到 Creator 实例中，而 `onPromptComplete` 则是注册了回调函数。

### `@vue/cli/lib/Creator.js`

在 `@vue/cli/lib/create.js` 的最后是 `const creator = new Creator(name, targetDir, getPromptModules())` 和 `await creator.create(options)` 实例化 Creator 对象，然后调用它的 create 方法将 optoins 传过去。

下面来看下实例化的过程，代码如下
```js
constructor (name, context, promptModules) {
    super()

    // name就是项目名字
    this.name = name
    // context 表示项目路径
    this.context = process.env.VUE_CLI_CONTEXT = context
    const { presetPrompt, featurePrompt } = this.resolveIntroPrompts()
    this.presetPrompt = presetPrompt
    this.featurePrompt = featurePrompt
    this.outroPrompts = this.resolveOutroPrompts()
    this.injectedPrompts = []
    this.promptCompleteCbs = []
    this.afterInvokeCbs = []
    this.afterAnyInvokeCbs = []

    this.run = this.run.bind(this)

    const promptAPI = new PromptModuleAPI(this)
    promptModules.forEach(m => m(promptAPI))
  }
```

`resolveIntroPrompts()`  这个方法的作用是初始化预设的提示和功能的提示，预设提示就是载入 `.vuerc` 文件中的预设配置如果你曾经存过预设那么则会有内容，类似下面这样的内容

```js
{
  "useTaobaoRegistry": false,
  "latestVersion": "4.2.2",
  "lastChecked": 1581493828978,
  "packageManager": "yarn",
  "presets": {
    "llccing-default": {
      "useConfigFiles": true,
      "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-router": {
          "historyMode": false
        },
        "@vue/cli-plugin-eslint": {
          "config": "base",
          "lintOn": [
            "save"
          ]
        }
      },
      "cssPreprocessor": "stylus"
    }
  }
}
```
和默认的预设混合，而功能的提示则暂时为空。接下来是执行 `resolveOutroPrompts()` 方法，这个方法的主要是初始化一些其他问题，例如：配置文件是否拆开，是否保存当前预设，然后判断下你是否有除了 `npm` 之外的，如 `yarn`、`Pnpm`如果有的话，则选择通过哪种方式安装依赖。

接下来有这样一行，`this.run = this.run.bind(this)`（这里温习下 bind 函数的作用：`bind()` 返回一个新函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用），因为Creator 是 Class 的写法，并且 run 函数中使用了 `this.context` 的写法，所以这里需要用 bind 函数改变 run 函数中 this 指向。

```js
const promptAPI = new PromptModuleAPI(this)
promptModules.forEach(m => m(promptAPI))
```
这两行前文已经提到，forEach 的循环执行完成，则将 `promptModules` 目录下的函数都执行了一遍，执行的时候会把功能、提示和回调函数都作为元素 push 到 Creator 类的属性中。

#### create 函数

从 `@vue/cli/lib/create.js` 文件的最后一行调用 `await creator.create(options)` 传入到 Creator.js 中的 create方法的参数只有一个，就是 `{ git: true, preset: '23123', force: true }` 这样的结构。

Creator.js 的 `create(cliOptions, preset=null)`，cliOptions 参数就是我们从 create.js 中传过来的，接下来的逻辑如下
```js
      if (cliOptions.preset) {
        // 如果有 preset 预设就通过 resolvePreset 函数载入
        // vue create foo --preset bar
        // resolvePreset 函数支持载入本地预设、json格式的本地预设、以及远程预设3种
        preset = await this.resolvePreset(cliOptions.preset, cliOptions.clone)
      } else if (cliOptions.default) {
        // 没有预设则使用默认预设
        // vue create foo --default
        preset = defaults.presets.default
      } else if (cliOptions.inlinePreset) {
        // 当然他还支持内联预设
        // vue create foo --inlinePreset {...}
        try {
          preset = JSON.parse(cliOptions.inlinePreset)
        } catch (e) {
          error(`CLI inline preset is not valid JSON: ${cliOptions.inlinePreset}`)
          exit(1)
        }
      } else {
        preset = await this.promptAndResolvePreset()
      }
```

1. 然后直接注册了核心服务 `@vue/cli-service`
2. 确定项目包管理器
3. 向外派发了事件 `this.emit('creation', { event: 'creating' })`（TODO，暂记一下，后期看哪里监听了该事件）
4. 生成 package.json 文件
5. 初始化 git，派发事件 `this.emit('creation', { event: 'git-init' })`
6. 安装插件，派发事件 `this.emit('creation', { evnet: 'plugins-install' })`
7. 执行生成器，派发事件 `this.emit('creation', { event: 'invoking-generators' })`，通过 `resolvePlugins()` 载入插件，并且根据插件的提示通过命令行提问。


## 有意思的点

1. `vue craete .`

[出处](https://github.com/vuejs/vue-cli/blob/2531d10086b0e1740cf83a6be7094bba112b6f68/packages/@vue/cli/lib/create.js#L16)

适用情况：先从gitlab上拉下一个项目，然后再使用 vue create 创建同名项目

2. `JSON.stringify(pkg, null, 2)`

[出处](https://github.com/vuejs/vue-cli/blob/773f8a47e9acd58abbd3a3821a906be550b4c010/packages/@vue/cli/lib/Creator.js#L159)

能够格式化字符串，并且有缩进，且这个缩进能够在嵌套的结构中提现

效果如下，
```js
JSON.stringify({a: 123123, b: 'adfasdf', c: {d: 'this is dddd'}}, null , 2)

// 输出如下 
"{
  "a": 123123,
  "b": "adfasdf",
  "c": {
    "d": "this is dddd"
  }
}"

```