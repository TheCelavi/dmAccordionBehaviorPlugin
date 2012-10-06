(function($) {    
    
    var methods = {        
        init: function(behavior) {                       
            var $this = $(this), data = $this.data('dmAccordionBehavior');
            if (data && behavior.dm_behavior_id != data.dm_behavior_id) { // There is attached the same, so we must report it
                alert('You can not attach accordion behavior to same content'); // TODO TheCelavi - adminsitration mechanizm for this? Reporting error
            };
            $this.data('dmAccordionBehavior', behavior);
        },        
        start: function(behavior) {
            var $this = $(this), $elements = $this.children(), tabsCounter = 0, indexCounter = 0;
            $this.addClass(behavior.theme).addClass('dmAccordionBehaviorContainer');
            $.each($elements, function(index){
                var $element = $($elements[index]);
                tabsCounter++;
                if (tabsCounter%2 == 0){                    
                    $element.addClass('dm_accordiont_content dm_accordion_content_index_' + indexCounter);
                    if (behavior.initialy_open_index) {
                        var signal = true;
                        $.each(behavior.initialy_open_index, function(ind){
                            if (behavior.initialy_open_index[ind] == indexCounter) {
                                signal = false;
                                return false;
                            };
                        });
                        if (signal) $element.css('display','none');
                    } else {
                        $element.css('display', 'none');
                    };
                } else {
                    indexCounter++;
                    $element.addClass('dm_accordiont_tab dm_accordion_tab_index_' + indexCounter);
                    var signal = true;
                    $.each(behavior.initialy_open_index, function(ind){
                        if (behavior.initialy_open_index[ind] == indexCounter) {
                            signal = false;
                            return false;
                        };
                    });
                    if (signal) $element.addClass('dm_accordion_tab_closed'); else $element.addClass('dm_accordion_tab_open');
                    if (behavior.event == 'mouseover') {
                        $element.mouseover(methods.animateContent);
                    } else {
                        $element.click(methods.animateContent);
                    };
                };
            });            
        },
        stop: function(behavior) {
            var $this = $(this), $elements = $this.children(), tabsCounter = 0, indexCounter = 0;
            $this.data('dmAccordionBehavior', null);
            $this.removeClass(behavior.theme).removeClass('dmAccordionBehaviorContainer'); 
            $.each($elements, function(index){
                var $element = $($elements[index]);
                tabsCounter++;
                if (tabsCounter%2 == 0){                    
                    $element.removeClass('dm_accordiont_content dm_accordion_content_index_' + indexCounter);
                    $element.css('display', 'block');
                } else {
                    indexCounter++;
                    $element.removeClass('dm_accordiont_tab dm_accordion_tab_index_' + indexCounter).removeClass('dm_accordion_tab_closed').removeClass('dm_accordion_tab_open');
                    if (behavior.event == 'mouseover') {
                        $element.unbind('mouseover', methods.animateContent);
                    } else {
                        $element.unbind('click',methods.animateContent);
                    };
                };
            });
        },
        destroy: function(behavior) {            
            var $this = $(this);
            $this.data('dmAccordionBehavior', null);     
        },
        animateContent: function() {
            
            var $this = $(this), $container = $this.closest('.dmAccordionBehaviorContainer'), data = $container.data('dmAccordionBehavior');
            
            function animate($elem, open_or_close) {
                function setClasses($elem) {
                    if (open_or_close == 'open') {
                        $elem.prev().addClass('dm_accordion_tab_open').removeClass('dm_accordion_tab_closed');
                    } else {
                        $elem.prev().addClass('dm_accordion_tab_closed').removeClass('dm_accordion_tab_open');
                    };
                };
                switch(data.animation) {
                    case 'slide': {
                        $elem.slideToggle(data.duration, data.easing, function(){
                            setClasses($(this));
                        });
                    };                    
                    break;
                    case 'show': {
                        $elem.toggle(data.duration, data.easing, function(){
                            setClasses($(this));
                        });
                    };                    
                    break;
                    case 'fade': {
                        $elem.fadeToggle(data.duration, data.easing, function(){
                            setClasses($(this));
                        });
                    };                    
                    break;
                    default: {
                        if (open_or_close == 'open') {
                            $elem.css('display', 'block');
                        } else {
                            $elem.css('display', 'none');
                        };
                        setClasses($elem);
                    }
                    break;
                };
                
            };            
            if (data.colapsable) {                
                animate($container.find('.dm_accordiont_content').filter(':visible').not($this.next()), 'close');
            };
            switch(data.event) {
                case 'click_open_close': {
                       if ($this.next().is(':visible'))  animate($this.next(), 'close');
                       else animate($this.next(), 'open');
                }; break;
                case 'click_open_only': {
                       if ($this.next().is(':visible')) return;
                       else animate($this.next(), 'close');
                }; break;
                default: {
                    if ($this.next().is(':visible'))  animate($this.next(), 'close');
                    else animate($this.next(), 'open');
                }break;
            };
        }
    };
    
    $.fn.dmAccordionBehavior = function(method, behavior){
        return this.each(function() {
            if ( methods[method] ) {
                return methods[ method ].apply( this, [behavior]);
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, [method] );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dmAccordionBehavior' );
            }; 
        });
    };

    $.extend($.dm.behaviors, {        
        dmAccordionBehavior: {
            init: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmAccordionBehavior('init', behavior);
            },
            start: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmAccordionBehavior('start', behavior);
            },
            stop: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmAccordionBehavior('stop', behavior);
            },
            destroy: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmAccordionBehavior('destroy', behavior);
            }
        }
    });
    
})(jQuery);