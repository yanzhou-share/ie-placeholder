(function($){
    
    var styleString = '<style type="text/css">'+
                    '      .h_label {'+
  				'       	position: absolute;'+
                    '       	left: 7px;'+
					'       	top : 4px;'+
					'       	cursor: text;'+
					'       	pointer-events: none;'+
					'       	color: #666;'+
                    '       }'+
					'      .h_r_div{position:relative;padding:0;margin:0;}'+
                    '</style>'
            , style      = $(styleString);
            
            $('head').append(style)
            
            ,ie = $.browser.msie
			,fns = ie ? {
        		show  : 'show'
        		,hide : 'hide'
        		,ani  : 'css'  
        	} : {
        		show  : 'fadeIn'
        		,hide : 'fadeOut'
        		,ani  : 'animate'
        	};
    
    /**placeHolder**/
    $.fn.placeHolder = function(){
       return this.each(function(){
    	   
    	   var ___val = $(this).val();
    	   
           var input = $(this)
               ,input_palceholder = input.attr('_placeholder')
               ,input_id  = input.attr('id')
               ,input_name = input.attr('name')
			   ,tag_name   = input[0].tagName
               ,input_in
               ,input_pt = input.css('paddingTop')
			   ,input_mt = input.css('marginTop')
			   ,input_lh = tag_name && tag_name.toLowerCase() == 'textarea' ? 'auto' : input.height()
			   ,r_div = getWrapDiv(),
			   h_data = input.attr('holder-data');
            
            if(h_data){
            	
            	h_data = h_data.replace(/\;$/g, '').replace(/\;/g, ',').replace(/px/g, "");
            	eval('(h_data = {' + h_data + '})');
            }
            
			input.removeAttr('_placeholder');
			
            if(input_id && !input_name){
                input.attr('name', input_id);
                input_in = input_id;
            }
            
            if(!input_id && !input_name){
                
                var gid = getId();
                input.attr('id', gid);
                input.attr('name', gid);
                
                input_in = gid;
            }
            
            if(!input_id && input_name){
                input.attr('id', input_name);
                input_in = input_name;
            }
			
			if(!input_in){
				input_in = input_id;
			}
			
			var label = getLabel(input_palceholder);
			var pmt = parseInt(input_pt) + parseInt(input_mt);
			label.css({top : (pmt == 0 ? 2 : pmt), lineHeight: (!input_lh ? 'auto' : input_lh + 'px')});
			h_data && label.css(h_data);
			
			input.wrap(r_div);
			input.before(label);
            
            function getLabel(val){
                return $('<label class="h_label" id="l_' + input_in + '" for="' + input_in + '">' + input_palceholder + '</label>');
            }
            
            function getId(){
                return 'n_' + new Date().getTime();
            }
			
			function getWrapDiv(){
		        return $('<div class="h_r_div"></div>');
		    }
			
			function addEvents(){
				
				var timer, isClear;
				input.bind('focus', function(){
                    
					var $this = $(this),
					    label = $this.prev();
					
					if($this.val() == ''){
						label.show();
						label.css('color','#ccc');
					}
					if(timer) return false;
					timer = setInterval(function(){
						if($this.val() == ''){
							if(!isClear) return false;
							isClear = 0;
							label[fns['show']](10);
						}else{
							if(isClear) return false;
							isClear = 1;
							label[fns['hide']](10);
						}
					}, 100);
                });
				
				input.bind('blur', function(){
					
					var $this = $(this),
                        label = $this.prev();
                    
                    if($this.val() == ''){
                    	label.css('color','#666');
                    }
					
                    if(timer){
						clearInterval(timer);
						timer = null;
					}
                });
			}
			
			addEvents();

			if(___val != ''){
				$(this).hideLabel();
			}
        });
    }
    
	$('input[_placeholder], textarea[_placeholder]').placeHolder();
})($);
