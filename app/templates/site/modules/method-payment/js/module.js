$(function () {
	var numberItems1 = $('.method-payment .items-wrapper'),
	    numberItems1Html =  $(numberItems1).html();
	var owlnumberItems1 = numberItems1,
	    owlnumberItems1Options = {
	        loop:true,
	        margin: 0,
	        nav: false,
	        items: 1,
	        lazyLoad: true      
	    }; 
	            
	if ($(window).width() < 620) {
	    startOwlnumberItems1();
	}

	$(window).resize(function () {
	    if ($(window).width() > 620) {
	        owlnumberItems1.trigger('destroy.owl.carousel');
	        $(owlnumberItems1).removeClass('owl-carousel');
	        $(numberItems1).html(numberItems1Html);
	    } else {
	        if (!$(owlnumberItems1).hasClass("owl-carousel")) {
	            startOwlnumberItems1();            
	        }
	    }
	}); 

	function startOwlnumberItems1() {
	    $(owlnumberItems1).addClass('owl-carousel');
	    owlnumberItems1.owlCarousel(owlnumberItems1Options);
	}	
});