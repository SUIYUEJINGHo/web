// ui-search组件定义
$.fn.uiSearch = function(){
	var ui = $(this);
	// (1) 点击下拉框 则展示信息
	$(".ui-search-selected" , ui).on("click" , function(){
		$(".ui-search-select-list" , ui).show("slow");
		return false;
	});
	// (2)点击其它位置则将list隐藏
	$("body").on("click",function(){
		$.hide(".ui-search-select-list" , ui);
		return false;
	});
	// (3)点击下拉框中的内容则显示在input框中
	$(".ui-search-select-list a" , ui).on("click" , function(){
		$(".ui-search-input" , ui).val($(this).text());
		$.hide(".ui-search-select-list" , ui);
		return false;
	});
}
/*$.fn.extend({
	uiSearch:function(){
		var ui = $(this);
		// (1) 点击下拉框 则展示信息
		$(".ui-search-selected" , ui).on("click" , function(){
			$(".ui-search-select-list" , ui).show("slow");
			return false;
		});
		// (2)点击其它位置则将list隐藏
		$("body").on("click",function(){
			$.hide(".ui-search-select-list" , ui);
			return false;
		});
		// (3)点击下拉框中的内容则显示在input框中
		$(".ui-search-select-list a" , ui).on("click" , function(){
			$(".ui-search-input" , ui).val($(this).text());
			$.hide(".ui-search-select-list" , ui);
			return false;
		});
	}
})*/
// 定义一个全局通用的jquery方法
$.extend({
	hide:function(className , fromClassName){
		$(className ,fromClassName).hide("slow");
	}
});
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

/**
 * 切换选项卡，从而切换内容组建
 */

/*$.fn.extend({
	uiTab:function(header ,content ,hideClass) {
		var ui = $(this);
		var tabs = $(header, ui);
		var cons = $(content, ui);
		var prefix = hideClass || "";
		tabs.on("click" , function(){
			var index = $(this).index();
			tabs.removeClass(prefix + "item_focus").eq(index).addClass(prefix + "item_focus");
			cons.hide().eq(index).show();
		});
	}
});*/
$.fn.uiBackTop = function(){
	var ui = $(this);
	var el = $('<a class="ui-backTop" href = "#"></a>');
	ui.append(el);

	var limit = "400";

	$(window).on("scroll" , function(){
		var top = $("html,body").scrollTop();
		if(top > limit){
			el.show("slow");
		}else{
			el.hide("slow");
		}
	});
	el.on("click" ,function(){
		$(window).scrollTop(0);
	});
};
/*$.fn.extend({
	uiBackTop : function(){
		var ui = $(this);
		var el = $('<a class="ui-backTop" href = "#"></a>')
		ui.append(el);
		// 当前页面高度
		// var windowHeight = $(window).height();
		var windowHeight = "400";
		$(window).on("scroll" , function(){
			// 滑动高度
			var top = $("html,body").scrollTop();
			if(top > windowHeight){
				el.show("slow");
			}else{
				el.hide("slow");
			}
		});
		$(".ui-backTop").on("click" , function(){
			$("html,body").scrollTop(0);
		})
	}
})*/

// 脚本逻辑
$(function(){
	$(".ui-search").uiSearch();
	$(".content-tab").uiTab(".caption > .item" , ".block > .item" , "");
	$(".content-tab .block .item").uiTab(".block-caption > a", ".block-content > .block-wrap" , "block-capiton-");
	$("body").uiBackTop();
})