/**
 * Created by zhengyanyun on 17/2/19.
 */
var glob = require('glob');
var path = require('path');

exports.getEntries = function (globPath) {
    var entries = {};
    /**
     * 读取src目录,并进行路径裁剪
     */
    glob.sync(globPath).forEach(function (entry) {
        /**
         * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
         * path.extname 获取文件后缀
         */
        var basename = path.basename(entry, path.extname(entry), 'router.js'); // 过滤router.js
        // ***************begin***************
        // slice 从已有的数组中返回选定的元素, -3 倒序选择，即选择最后三个
        var tmp = entry.split('/').splice(-3);
        // console.log(tmp);
        var pathname = tmp[0] + '/' + tmp[1]; // 获取前两个元素
        //输出结果如:{ 'pages/page1': './src/pages/page1/index.js','pages/page2': './src/pages/page2/index.js','pages/page3': './src/pages/page3/index.js' }
        // console.log(pathname);
        entries[pathname] = entry;
        // ***************end***************
        // entries[basename] = entry
    });
    console.log(entries);
// 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
    return entries;
};
