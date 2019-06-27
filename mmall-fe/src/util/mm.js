/**
 * @Author : Zy...
 * @Function : 封装一些通用的工具类，供模块引用
 * */
var _mm = {
    // 封装ajax请求
    request : function(param){
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data , res.msg);
                }
                // 状态是未登录状态
                if(10 === res.status){
                    _this.doLogin();
                }
                // 状态是失败
                if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 跳转到登陆页面
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};
module.exports = _mm;