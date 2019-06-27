var _mm = require('util/mm.js');
_mm.request({
    url : '/product/list.do?keyword=1',
    success : function(res){
        console.log("1" + res);
    },
    error : function(resText){
        console.log("2" + resText);
    }
})