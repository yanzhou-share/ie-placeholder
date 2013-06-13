/**
*修改IE下placeholder bug
*
*需要input有_placeholder 属性
*页面引入js并且 $('input').placeholder();
*/
(function($){
  $.fn.vl = $.fn.val;
	
	$.fn.placeholder = function(args){
		return this.each(function(){
			var input = $(this), options = args;
			
			if(typeof options === 'string')	options = {empty:options};
			
			options = $.extend({
				empty:input.attr('_placeholder'),
				className:'watermark'
			}, options);
			
			input.attr('_placeholder', options.empty);
			
			return input.focus(function(){
				$(this).removeClass(options.className);
				if($(this).vl() == options.empty)	$(this).vl("");
			}).blur(function(){
				if($(this).vl() === "")	$(this).vl(options.empty);
				$(this).addClass(options.className);
			});
		});
	}
	//重写jquery val 方法
	$.fn.val = function(){
		var value = $(this).vl.apply(this, arguments);
		var empty = $(this).attr('_placeholder');
		
		if(typeof empty != 'undefined' && empty == value)	value = '';
		
		return value;
	}

})(jQuery);
