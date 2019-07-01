require('./index.css');
// 引入通用工具类
var _mm = require('util/mm.js');

// 头部js书写
var header = {
    // 初始化头部方法
    init : function(){
        this.bindEvent();
    },
    // 页面刚加载
    onLoad : function(){
        // 选择商品时候要携带选择信息在input中
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    // 绑定一些事件
    bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 点击回车按钮触发
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    // 搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
    }
};
header.init();