$(function () {
	var advantagePoint1 = $('.advantage-sec-1 .advantage-wrapper'),
	    advantagePoint1Html =  $(advantagePoint1).html();
	var owladvantagePoint1 = advantagePoint1,
	    owladvantagePoint1Options = {
	        loop:true,
	        margin: 0,
	        nav: false,
	        items: 1,
	        lazyLoad: true      
	    }; 
	            
	if ($(window).width() < 620) {
	    startOwladvantagePoint1();
	}

	$(window).resize(function () {
	    if ($(window).width() > 620) {
	        owladvantagePoint1.trigger('destroy.owl.carousel');
	        $(owladvantagePoint1).removeClass('owl-carousel');
	        $(advantagePoint1).html(advantagePoint1Html);
	    } else {
	        if (!$(owladvantagePoint1).hasClass("owl-carousel")) {
	            startOwladvantagePoint1();            
	        }
	    }
	}); 

	function startOwladvantagePoint1() {
	    $(owladvantagePoint1).addClass('owl-carousel');
	    owladvantagePoint1.owlCarousel(owladvantagePoint1Options);
	}	
});