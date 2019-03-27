var url = require('url');
x = url.resolve('http://localhost', '../xmas')
if(x.indexOf("/") != x.length-1) {
    x = x + "/";
}
x = url.resolve(x, './css');
console.log(x)