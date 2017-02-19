/**
 * Created by zhengyanyun on 17/2/16.
 */

var express = require('express');    //加载express模块
var app = express();
var port = process.env.PORT || 3000;  //监听的端口
app.use(express.static(__dirname + '/dist'));
app.use(function (req , res){
    res.sendfile('./dist/test.html')
});
app.listen(port,function(){
    console.log('TechNode is on port' + port + '!' )
});

var livereload = require('livereload');
var server = livereload.createServer();
server.watch(__dirname + "/dist");

console.log('File watching start');