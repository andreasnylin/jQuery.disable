// jQuery Disable plugin version 1.1
// Author: Andreas Nylin
(function($) {
    $.fn.disable = function(options) {
        var opts = $.extend({}, $.fn.disable.defaults, options);
    
        function disable($this) {
            $this.attr('disabled', 'disabled');
            
            if(opts.disableClass !== '') {
                 $this.addClass(opts.disableClass);   
            }
			if(opts.enableClass !== '') {
				$this.removeClass(opts.enableClass);
			}
        }
        
        function enable($this) {
            $this.removeAttr('disabled');
			if(opts.enableClass !== '') {
                 $this.addClass(opts.enableClass);   
            }
			if(opts.disableClass !== '') {
				$this.removeClass(opts.disableClass);
			}  
        }
        
        function setEnableTimeout($this) {
            setTimeout(function() {
                enable($this);
            }, opts.enableAfterSeconds * 1000);
        }
        
        function setAjaxEnable($this) {
            $this.ajaxComplete(function(event, request, settings){
                var statusOk = !opts.enableOnAjaxSuccess || (opts.enableOnAjaxSuccess && request.status === 200),
                    urlOk = opts.ajaxUrl === null || settings.url === opts.ajaxUrl,
                    responseTextOk = opts.ajaxResponseText === null || request.responseText === opts.ajaxResponseText;
                if(statusOk && urlOk && responseTextOk) {
                    enable($this);
                }
            });   
        }
        
        return this.each(function() {
            var $this = $(this);
            
            disable($this);
            
            if(opts.enableAfterSeconds > 0) {
                setEnableTimeout($this);
            }
            
            if(opts.enableOnAjaxComplete || opts.enableOnAjaxSuccess) {
                setAjaxEnable($this);
            }
         });
     };
  
    $.fn.disable.defaults = {
        enableClass: '',
		disableClass: '',
        enableAfterSeconds: 0,
        enableOnAjaxComplete: false,
        enableOnAjaxSuccess: false,
        ajaxUrl: null,
        ajaxResponseText: null
    };
	
	$.fn.enable = function(options) {
        var opts = $.extend({}, $.fn.enable.defaults, options);
           
        function enable($this) {
            $this.removeAttr('disabled');
            if(opts.enableClass !== '') {
                 $this.addClass(opts.enableClass);   
            }  
        }
        
        return this.each(function() {
            var $this = $(this);
            
            enable($this);
         });
     };
  
    $.fn.enable.defaults = {
        enableClass: ''
    };
})(jQuery);