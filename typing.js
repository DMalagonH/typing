/**
 * Plugin para detectar si el usuario esta escribiendo en un campo de texto
 * 
 * Dependencias: jQuery
 * Date: 2015-10-22
 * 
 * @author Diego Malagón <diego@altactic.com>
 * @param {type} $ jQuery
 * @returns {undefined}
 */
(function ($) {  
    
    var Typing = function(){
        var $el;
        var options;
        var timer;
        var stopTypingInterval = 1000;
        var typing = false;

        /**
         * Función para asignar los event listeners al campo de texto
         * 
         * @returns {undefined}
         */
        var init = function(){

            $el.keydown(function(e){
                var key = e.keyCode || e.which;

                if(checkKeyCode(key)){
                    clearTimeout(timer);
                    if($el.val){
                        if(typing === false){
                            typing = true;
                            onStarTyping();
                        }
                    }
                }
            });

            $el.keyup(function(e){
                var key = e.keyCode || e.which;

                if(checkKeyCode(key)){
                    clearTimeout(timer);
                    if(typing === true){
                        timer = setTimeout(function(){
                            typing = false;
                            onStopTyping();
                        }, stopTypingInterval);
                    }                    
                }
                else if(key === 13){
                    if(!e.shiftKey){
                        stopTyping();
                    }
                }
            });
        };
        
        /**
         * Función que verifica si el código de tecla es válido para considerarlo como tecla de escritura
         * 
         * @param {Integer} keyCode código de tecla
         * @returns {Boolean}
         */
        var checkKeyCode = function(keyCode){
            var fn_keys = [8,9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,42,45,46,91,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145,225];
            
            if(fn_keys.indexOf(keyCode) !== -1){
                return false;
            }
            
            return true;
        };
        
        /**
         * Función que se ejecuta cuando se inicia a escribir en el campo de texto
         * 
         * @returns {undefined}
         */
        var onStarTyping = function(){
            if(typeof options.onStartTyping === "function"){
                options.onStartTyping();
            }
        };
        
        /**
         * Función que se ejecuta cuando se deja de escribir en el campo de texto
         * 
         * @returns {undefined}
         */
        var onStopTyping = function(){
            if(typeof options.onStopTyping === "function"){
                options.onStopTyping();
            }
        };
        
        /**
         * Función para forzar la detención de la escritura
         * 
         * @returns {undefined}
         */
        var stopTyping = function(){
            clearTimeout(timer);
            typing = false;
            onStopTyping();
        };
        
        return {
            init: function(element, opts){
                $el = $(element);
                options = opts;
                
                init();
            }
        };
    }();
    
    $.fn.typing= function(options, args){        
        var element = this;
        
        if(Typing[options]){
            return Typing[options](args);
        }
        else if(typeof(options) === "object" || !options){
            
            options = $.extend({}, $.fn.typing.defaults, options);
            
            return Typing.init(element, options, args);
        }
    };
    
    $.fn.typing.defaults = {
        
    };
    
})(jQuery);