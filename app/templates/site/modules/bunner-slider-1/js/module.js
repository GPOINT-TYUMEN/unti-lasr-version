$(function () {
	//> BUNNER-SLIDER-1
	var owlBunnerSlider1 = $('.bunner-slider-1'),
	    owllBunnerSlider1 = {
	        loop:true,
	        margin: 0,
	        nav: false,
	        dots:true,
	        items: 1,
	        lazyLoad: true     
	    }; 
	    $(owlBunnerSlider1).addClass('owl-carousel');
	    owlBunnerSlider1.owlCarousel(owllBunnerSlider1);

	$('.bunner-slider-1 .route-right').click(function() {
	    $('.bunner-slider-1 .owl-next').trigger('click');
	});
	//BACK SLIDE
	$('.bunner-slider-1 .route-left').click(function() {
	    $('.bunner-slider-1 .owl-prev').trigger('click');
	});  
	   
	 //> BUNNER-SLIDER-1
	var owlBunnerSlider1Mobile = $('.bunner-slider-mobile .items'),
	    owllBunnerSlider1Mobile = {
	        loop:true,
	        margin: 0,
	        nav: false,
	        dots:true,
	        items: 1,
	        lazyLoad: true     
	    }; 
	    $(owlBunnerSlider1Mobile).addClass('owl-carousel');
	    owlBunnerSlider1Mobile.owlCarousel(owllBunnerSlider1Mobile);  
//< BUNNER-SLIDER-1	
});