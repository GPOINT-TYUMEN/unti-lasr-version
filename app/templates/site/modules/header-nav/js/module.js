//DESCTOP NAV
$(".sec-top-nav .burger").click(function () {
	$(".sec-top-nav nav").fadeToggle();
});

// TOP MOBILE NAV
//CHECK BURGER
 $('.mobile-top-nav .burger').click(function () {
 	closeNavMobile();	
});

 //CHECK LI 
 $('.mobile-top-nav nav a').click(function () {
  	closeNavMobile();
 });	
//> TOP MOBILA NAV	

//> TOUCH CLOSE NAV
  var movibileTopNav = $('.mobile-top-nav nav'),
  	  shadeTouchstartNav = $('.mobile-top-nav .shade-touchstart-nav'),
  	  touchX = 0;

 $(movibileTopNav).on('touchstart', function (event) {
	touchX = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
	touchX = touchX.screenX
 });
 $(movibileTopNav).on('touchend', function (event) {
 	var pageX = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

 	pageX = pageX.screenX;
    if ((pageX + 50) < touchX) {
    	closeNavMobile();
    } 
 });
//< TOUCH CLOSE NAV

//> TOUCH START NAV
 $(shadeTouchstartNav).on('touchstart', function (event) {
	touchX = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
	touchX = touchX.screenX
 });
 $(shadeTouchstartNav).on('touchend', function (event) {
 	var pageX = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
 	pageX = pageX.screenX;
    if (pageX > touchX) {
    	closeNavMobile();
    } 
 });
//< TOUCH START NAV
function closeNavMobile() {
   $('.mobile-top-nav nav').toggleClass('active');
   $('.mobile-top-nav .fogging-window').fadeToggle(); 
}