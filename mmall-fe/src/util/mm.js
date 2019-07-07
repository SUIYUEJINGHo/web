/**
 * @Author : Zy...
 * @Function : 封装一些通用的工具类，供模块引用
 * */
var conf = {
    serverHost : ''
};
var hogan = require('hogan');
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
    // 获取服务器地址
    getServerHost : function(path){
        return conf.serverHost + path;
    },
    // 获取浏览器请求数据 name为key
    getUrlParam   : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // window.location.search : 除了域名后项目的路径即url中？后面的内容
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    /* @unction : 利用html模板渲染数据
     * @param    : htmlTemplate : htmlm模板
     * @param    : data : 数据
     */
    renderHtml   : function(htmlTemplate , data){
        // 1,编译模板
        var template =  hogan.compile(htmlTemplate);
        console.info(template);
        // 2,渲染模板
        return template.render(data);
    },
    /**
     * @funciton : 正确提示
     * @param msg
     */
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    /**
     * @function： 错误提示
     * @param msg
     */
    errorTips   : function(msg){
        alert(msg || '哪里不对了！');
    },
    /**
     * functio : 校验数据是否非空，手机号，邮箱
     * @param value : 数据
     * @param type  : 校验类型
     */
    validate    : function(value , type){
        var value = $.trim(value);
        if('require' === type){
            return !!value;
        }
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        if('email' === type){
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    // 跳转到登陆页面
    doLogin     : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome      : function(){
        window.location.href = './index.html';
    }
};
module.exports = _mm;