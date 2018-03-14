$(function () {
	var commentsItems2 = $('.comments .items-wrapper'),
	    commentsItems2Html =  $(commentsItems2).html();
	var owlcommentsItems2 = commentsItems2,
	    owlcommentsItems2Options = {
	        loop:true,
	        margin: 0,
	        nav: false,
	        items: 1,
	        lazyLoad: true      
	    }; 
	            
	if ($(window).width() < 620) {
	    startOwlcommentsItems2();
	}

	$(window).resize(function () {
	    if ($(window).width() > 620) {
	        owlcommentsItems2.trigger('destroy.owl.carousel');
	        $(owlcommentsItems2).removeClass('owl-carousel');
	        $(commentsItems2).html(commentsItems2Html);
	    } else {
	        if (!$(owlcommentsItems2).hasClass("owl-carousel")) {
	            startOwlcommentsItems2();            
	        }
	    }
	}); 

	function startOwlcommentsItems2() {
	    $(owlcommentsItems2).addClass('owl-carousel');
	    owlcommentsItems2.owlCarousel(owlcommentsItems2Options);
	}	
});