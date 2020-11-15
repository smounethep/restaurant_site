/**
 * builderParallax for row/column/subrow
 */
;
(function ($,Themify,window,document) {
    'use strict';
    
    const $window = $(window),
        is_mobile = Themify.device==='mobile',
        className = 'builder-parallax-scrolling',
        def = {
            xpos: '50%',
            speedFactor:.1
        },
        scrollEvent=function(){
			for (let i=items.length-1;i>-1;--i) {
                if(items[i] && items[i]['element']){
                    items[i].update(i);
                }
                else{
                    destroy(i);
                }
            }  
        },
        resize=function(e){
            if(e){
                wH = e.h;
            }
            for (let i=items.length-1;i>-1;--i) {
                if(items[i] && items[i]['element']){
                    items[i].top = items[i].element.offset().top;
                    items[i].update(i);
                }
                else{
                    destroy(i);
                }
            }
            
        },
        destroy=function(index){
            if (items[index]) {
                if(items[index].classList){
                    items[index].classList.remove(className);
                }
                items.splice(index, 1);
                if (items.length===0) {
                    Themify.off('tfsmartresize',resize);
                    window.removeEventListener('scroll', scrollEvent,{passive:true,capture: true});
                    isInitialized = null;
                }
            }
		},
        items=[];
    let wH = null,
        isInitialized = null;
    function Plugin(element) {
        this.element = element;
        this.init();
    }
    Plugin.prototype = {
        top: 0,
        init() {
            this.top = this.element.offset().top;
            items.push(this);
            if (isInitialized===null) {
                wH = Themify.h;
                Themify.on('tfsmartresize',resize);
                window.addEventListener('scroll', scrollEvent,{passive:true,capture: true});
                isInitialized = true;
            }
            this.update();
        },
        update(i) {
        	if (document.body.contains(this.element[0]) === false || !this.element[0].classList.contains(className)) {
                destroy(i);
                return;
            }
            const pos = $window.scrollTop(),
                    top = this.element.offset().top,
                    outerHeight = this.element.outerHeight(true);
            // Check if totally above or totally below viewport
            if ((top + outerHeight) < pos || top > (pos + wH)) {
                return;
            }
			let posY=(top - pos) * def.speedFactor;
            if (is_mobile) {
                /* #3699 = for mobile devices increase background-size-y in 30% (minimum 400px) and decrease background-position-y in 15% (minimum 200px) */
                const outerWidth = this.element.outerWidth(true);
                let dynamicDifference = outerHeight > outerWidth ? outerHeight : outerWidth;
                dynamicDifference = Math.round(dynamicDifference * .15);
                if (dynamicDifference < 200) {
                    dynamicDifference = 200;
                }
				posY-=dynamicDifference;
				this.element[0].style['backgroundSize']='auto ' + Math.round(outerHeight + (dynamicDifference * 2)) + 'px';
            }
			this.element[0].style['backgroundPositionY']=Math.round(posY)+'px';
        }
    };
    Themify.on('tb_parallax_init',function(items){
		if(items instanceof jQuery){
			items=items.get();
		}
		if(items.length===undefined){
			items=[items];
		}
		for(let i=items.length-1;i>-1;--i){
			let el=$(items[i]);
			if(! el.data('plugin_builderParallax')){
				el.data('plugin_builderParallax', new Plugin(el));
			}
		}
    })
	.LoadCss(ThemifyBuilderModuleJs.cssUrl + 'parallax.css',null,null,(tbLocalScript['is_parallax']==='m'?'screen and (min-width:' + tbLocalScript.breakpoints.tablet[1] + 'px)':null));

})(jQuery,Themify,window,document);
