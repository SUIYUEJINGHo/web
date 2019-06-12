// ui-search 定义
$.fn.uiSearch = function(){
	var ui = $(this);

	// (1) 点击选中框，下拉框展示 默认下拉框不展示
	$(".ui-search-selected" , ui).on("click" , function(){
		$(".ui-search-select-list" , ui).show();
		return false;
	});

	// (2) 点击下拉框内容则先会让选中框变成下拉框内容，之后让选中框消失
	$(".ui-search-select-list a" , ui).on("click" , function(){
		$(".ui-search-selected").text($(this).text());
		$(".ui-search-select-list").hide();
		return false;
	});

	// 全局点击时也要处罚关闭下拉框
	$("body").on("click" , function(){
		$(".ui-search-select-list").hide();
		return false;
	});
}
// ui-Tub 定义
/**
* @param {String} header : 所有标题头组件
* @param {String} content : 所有内容组件
* @param {String} hideClass : 隐藏元素前缀
*/
$.fn.uiTab = function(header ,content ,hideClass){
	var ui = $(this);
	var tabs = $(header , ui);
	var cons = $(content , ui);
	var prefix = hideClass || "";

	 tabs.on("click" , function(){
	 	var index = $(this).index();
	 	tabs.removeClass(prefix + "item_focus").eq(index).addClass(prefix + "item_focus");
		cons.hide().eq(index).show();
		return false;
	 });
}

// 脚本逻辑

$(function(){
	$(".ui-search").uiSearch();
	$(".content-tab").uiTab(".caption > .item" , ".block > .item");
	$(".content-tab .block .item").uiTab(".block-caption > a", ".block-content > .block-wrap" , "block-capiton-");
})