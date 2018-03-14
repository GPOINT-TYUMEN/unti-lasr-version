$(function () {
	//> SEC ADVANTAGES
	var adv1 = $('.catalog .advantages-content-wrapper');
	    adv1Html1 = $(adv1).html();
	    owlAdv1 = $(adv1),
	    owlAdv1Options = {
	        loop:true,
	        margin: 0,
	        nav: false,
	        dots: false,
	        items: 1,
	        lazyLoad: true,
	        responsive:{
	             0:{
	                items:1,
	                nav: false,
	            },


	            524: {
	                items: 2,
	                nav: false
	            },

	            748:{
	                items: 1,
	                nav: false,
	            },

	            960:{
	                items: 3,
	                nav: false,
	            }
	        }        
	    }; 
	        

	function startOwlAdv1() {
	    $(owlAdv1).addClass('owl-carousel');
	      owlAdv1.owlCarousel(owlAdv1Options);
	}

	startOwlAdv1();
	//< SEC ADVANTAGES
});