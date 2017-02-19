# vue-pages

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# glob模块
采用node的glob模块匹配路径，基本的匹配规则如下：
* `*` 匹配任意数量的字符，但`不匹配/`
* ? 匹配单个字符，但不匹配/
* `**` 匹配任意数量的字符，`包括/`，只要它是路径中唯一的一部分
* {} 允许使用一个逗号分割的列表或者表达式
* ! 在模式的开头用于否定一个匹配模式(即排除与模式匹配的信息)
ps：这里只是列了js版本的glob模式的一些常用语法。</br>
本项目的多页运用在src目录下，src目录结构如下：</br>

|---src</br>
&nbsp; |---assets</br>
&nbsp; |---components</br>
&nbsp; |---pages</br>
&nbsp;&nbsp;&nbsp;&nbsp; |---page1</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |---index.html</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |---index.js</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |---App.vue</br>
&nbsp;&nbsp;&nbsp;&nbsp; |---page2</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |---detail.html</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |---detail.js</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |---App.vue</br>

所有的页面都在pages目录下，因此在使用glob模块遍历pages下目录的js文件时，其代码如下：
```javascript
var glob = require('glob');
glob.sync('./src/pages/**/*.js').foreach(function(path){
  console.log(path)//path为pages下目录的js文件的路径，这里大家可以打印出来看一下
})
```
#webpack配置
webpack配置详细说明如下:</br>
      entry:打包的入口文件，一个字符串或者一个对象</br>
　　　　output:配置打包的结果，一个对象</br>
　　　　　　fileName：定义输出文件名，一个字符串</br>
　　　　　　path：定义输出文件路径，一个字符串</br>
　　　　module:定义对模块的处理逻辑，一个对象</br>
　　　　　　loaders：定义一系列的加载器，一个数组</br>
　　　　　　　　[</br>
　　　　　　　　　　{</br>
　　　　　　　　　　　　test:正则表达式，用于匹配到的文件</br>
　　　　　　　　　　　　loader/loaders：字符串或者数组，处理匹配到的文件。如果只需要用到一个模块加载器则使用loader：string，如果要使用多个模块加载器，则使用loaders：array</br>
　　　　　　　　　　　　include:字符串或者数组，指包含的文件夹</br>
　　　　　　　　　　　　exclude：字符串或者数组，指排除的文件夹</br>
　　　　　　　　　　}</br>
　　　　　　　　]</br>
　　　　resolve:影响对模块的解析，一个对象</br>
　　　　　　extensions：自动补全识别后缀，是一个数组</br>
　　　　plugins:定义插件，一个数组</br>
由于多页运用要求我们要对不同的入口文件进行打包，因此我们只需改动entry的配置，说明如下：</br>
       (1）当entry是一个字符串时，这个字符串表示需要打包的模块的路径,如果只有一个要打包的模块，可以使用这种形式</br>
　　　　（2）当entry是一个对象</br>
　　　　　　a.是数组时,当需要将多个模块打包成一个模块，可以使用这个方式。如果这些模块之间不存在依赖，数组中值的顺序没有要求，如果存在依赖，则要将依赖性最高的模块放在最后面。例如：
```javascript
          entry:["./app/one.js",".app/two.js"]
```
　　　　　　`b.是键值对形式的对象是，当需要分别打包成多个模块时，可以使用这种方式，例如；`
```javascript
　　　　　　entry:{
　　　　　　　　module1:"./app/one.js",
　　　　　　　　module2:["./app/two.js","./app/three.js"]
　　　　　　}
```
`注:当entry是一个键值对形式的对象时，包名就是键名，output的filename不能是一个固定的值，因为每个包的名字不能一样`
同样需要输出不同的文件，因此需要修改output的配置，配置如下：</br>
　　　　（1）output是一个对象</br>
　　　　（2）output.filename:指定输出文件名，一个字符串。当输出一个文件，output.filename为一个确定的字符串如：</br>
```javascript
        output:{filename:"build.js"}
```
　　　　　　当输出多个文件，output.filename不能为一个确定的字符串。为了让每个文件有一个唯一的名字，需要用到下面的变量</br>
　　　　　　* [name] is replaced by the name of the chunk.对应entry的键名</br>
　　　　　　* [hash] is replaced by the hash of the compilation.</br>
　　　　　　* [chunkhash] is replaced by the hash of the chunk.</br>
如：</br>
```javascript
          output:{
　　　　　　　　　　path:'./build/',
　　　　　　　　　　fialname:'[name].js'
　　　　　　　　}
```
　　　　　（3）output.path:指定输出文件的路径，相对路径，一个字符串</br>
　　　　　（4）output中还有其他的一些值，不在这里说明,可以在webpack的官方网站中获得更多的详细信息</br>
其他配置说明如下：</br>

module.loaders详细说明：</br>
　　　　（1）module是一个对象，定义对模块的处理逻辑</br>
　　　　（2）module.loaders是一个数组，定义一系列加载器，这个数组中的每一项都是一个对象</br>
　　　　（3）module.loaders:[</br>
　　　　　　　　{</br>
　　　　　　　　　　test:正则，用于匹配要处理的文件</br>
　　　　　　　　　　loader/loaders: 字符串或者数组， 如果只需要用到一个模块加载器 ,则使用loader：string，如果要使用多个模块加载器，则使用loaders：array</br>
　　　　　　　　　　include:字符串或者数组，指包含的文件夹</br>
　　　　　　　　　　exclude：字符串或者数组，指排除的文件夹</br>
　　　　　　　　}</br>
　　　　　　]</br>
　　　　（4）module除了可以配置loaders以外还能配置其他的值,在webpack的官网中获得更多的信息</br>

resolve.extensions详细说明：</br>
　　　　（1）resolve.extensions并不是必须配置的，当不配置时，会使用默认值["", ".webpack.js", ".web.js", ".js"]，当手动为resolve.extensions设置值，它的默认值会被覆盖</br>
　　　　（2）如果你想要每个模块都能够按照它们自己扩展名正确的被解析，要在数组中添加一个空字符串。</br>
　　　　（3）如果你想请求一个js文件但是在请求时不带扩展（如：require('somecode')）,那么就需要将'.js'添加到数组中。其他文件一样</br>
　　　　（4）resolve还有其他的配置项，在webpack的官网获得更多信息</br>

补充：</br>

　　　　（1）当设置了配置文件后，在命令行中输入webpack就可按照默认配置文件中的配置项打包模块了。</br>
　　　　（2）设置多个webpack配置文件。webpack默认的配置文件是webpack.config.js,当在命令行中输入webpack时默认找的是webpack.config.js。通过在package.json的scripts中添加例如：</br>
```javascript
　　　　"start-html":"webpack --config webpack.html.config.js"
```
　　　　在命令行中输入npm run start-html查找的就是webpack.html.config.js，通过这种方式可以实现不同的配置文件有不同的用处，这样就不用反复修改同一个配置文件

#改造vue-cli多页运用
好了说了这么多，开始进行多页运用的改造吧，首先我在build目录下创建了一个获取pages下所有目录中文件路径的js，我们叫get-pages-path.js，代码如下：
```javascript
var glob = require('glob');
exports.getPagesPath = function (globPath) {
    var entries = {};
    /**
     * 读取src目录,并进行路径裁剪
     */
    glob.sync(globPath).forEach(function (entry) {
        /**
         * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
         * path.extname 获取文件后缀
         */
        var basename = path.basename(entry, path.extname(entry));
        // ***************begin***************
        // 当然， 你也可以加上模块名称, 即输出如下： { module/main: './src/module/index/main.js', module/test: './src/module/test/test.js' }
        // 最终编译输出的文件也在module目录下， 访问路径需要时 localhost:8080/module/index.html
        // slice 从已有的数组中返回选定的元素, -3 倒序选择，即选择最后三个
        // var tmp = entry.split('/').splice(-3)
        // var pathname = tmp.splice(0, 1) + '/' + basename; // splice(0, 1)取tmp数组中第一个元素
        // console.log(pathname)
        // entries[pathname] = entry
        // ***************end***************
        entries[basename] = entry
    });
// console.log(entries);
// 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
    return entries;
};
```
我们在build下webpack.base.conf.js中将上面的js引入并进行修改，主要修改入口文件:
```javascript
...
var getPagesPath = require('./get-pages-path');
...
module.exports = {
  // entry: {
  //   app: './src/main.js'
  // },
  entry: getPagesPath.getEntries('./src/module/**/*.js'),
  ...
```
`注：...表示其他不变，只改变entry。`
接下来我们需要修改生产环境下的webpack配置文件即build下webpack.prod.conf.js文件，在对其进行改造之前，我们先了解一个插件html-webpack-plugin
#html-webpack-plugin
这个插件的主要作用就是创建分离的js或者css文件并引入到HTML文件中，其配置项说明如下：</br>
* title: 用来生成页面的 title 元素</br>
* filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。</br>
* template: 模板文件路径，支持加载器，比如 html!./index.html</br>
* inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。</br>
* favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。</br>
* minify: {} | false , 传递 html-minifier 选项给 minify 输出</br>
* hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。</br>
* cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。</br>
* showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中</br>
* chunks: 允许只添加某些块 (比如，仅仅 unit test 块)</br>
* chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'</br>
* excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) </br>

#改造webpack.prod.conf.js

同样先引入get-pages-path.js，然后将配置中引入html-webpack-plugin插件的部分删除，即删除
```javascript
new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
```
然后加入如下代码：
```javascript
...
var getPagesPath = require('./get-pages-path');
var pages = getPagesPath.getEntries('./src/module/**/*.html');
var webpackConfig = merge(baseWebpackConfig, {
...
for(var page in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: page + '.html',
    template: pages[page], //模板路径
    inject: true,
    minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
    // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
    // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
    // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
    // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
    excludeChunks: Object.keys(pages).filter(function(item) {
      return (item != page)
    })
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}
```
`注：同样改造webpack.dev.conf.js就可以进行开发调试了`
