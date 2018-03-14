function log(msg) {
	console.log(msg);
}

//> TOOLS
var moduleSec;
function initDragged() {
   moduleSec = $('.module_sec');	
  //> SIZE MODULE 
   $(moduleSec).addClass('ui-widget-content');
   $(moduleSec).resizable({
   		maxWidth: 960,
   });
   //< SIZE MODULE

   //> DRAGGABLE SEC MODULE
     $(moduleSec).addClass('ui-state-default');
	 $('.modules').sortable();
	 $('.modules').disableSelection();
	   //< DRAGGABLE SEC MODULE

	//HOVER SEC MODULE
	$(moduleSec).hover(function () {
		$(this).css({
			"box-shadow": "#2d4e6b 0 0 15px"
		});
	}, function () {
		$(this).css({
			"box-shadow": "#2d4e6b 0 0 0"
		});
	});
}

function destroyDragged () {
	$(moduleSec).resizable('destroy');
	$('.modules').sortable('destroy');
	$('.modules').disableSelection('destroy');
}
var draggedSecModule = true;
$(function() {
///	initDragged(); 

	$('body').on('keydown', function (e) {
		//F1
		if (e.keyCode === 112) {
			if (draggedSecModule === true) {
				//destroyDragged();
			//	draggedSecModule = false;
			} else {
				//initDragged();
			}
			e.preventDefault();
		}

	});
});

//< TOOLS
//SET TEXT LI A

//< TOP NAV A
var defAText;
$('.top-nav li a').on('click', function () {
	defAText = $(this).html();
	$(this).attr('contenteditable', 'true');
});
$('.top-nav li a').on('blur', function () {
	if ($(this).html() === '') {
		$(this).html(defAText)
	}
	$(this).attr('contenteditable', 'false');
});
//> TOP NAV A

//> TOP NAV PHONE
var defPhoneTopNav;
$('.top-nav .phone a').on('click', function (event) {
	defPhoneTopNav = $(this).text();
	$(this).attr('contenteditable', 'true');
	 event.preventDefault();
});
$('.top-nav phone a').on('blur', function () {
	if ($(this).text() === '') {
		$(this).text(defPhoneTopNav);
	}
	$(this).attr('contenteditable', 'false');
});
//<TOP NAV PHONE

//> TOP NAV BTN
var defBtnTopNav;
$('.top-nav [class*="btn_"]').on('click', function (event) {
	defBtnTopNav = $(this).html();
	$(this).attr('contenteditable', 'true');
});
$('.top-nav [class*="btn_"]').on('blur', function () {
	if ($(this).text() === '') {
		$(this).text(defBtnTopNav);
	}
	$(this).attr('contenteditable', 'false');
});
//< TOP NAV BTN

//> MODULE BUNNER HEADER
var defBunnerTitle;
$('.header-bunner .bunner-title-wrapper').on('click', function () {
	defBunnerTitle = $(this).html();
	$(this).focus();
	$(this).attr('contenteditable', 'true');
});
//< MODULE BUNNER HEADER
