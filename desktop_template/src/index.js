$(function(){
	var page = $(".page");
	console.log("test");
	$('.nav-button').click(function(){
		if(page.hasClass('showindex')) {
			page.removeClass("showindex").addClass("showcontent");
		}
		else if(page.hasClass('showcontent')) {
			page.removeClass("showcontent").addClass("showindex");
		}
	});
	$(".nav-container").on("swipeleft", function(event) {
		if(page.hasClass('showindex')) {
			page.removeClass("showindex").addClass("showcontent");
		}
	});
	$(".nav-container").on("swiperight", function(event) {
		if(page.hasClass('showcontent')) {
			page.removeClass("showcontent").addClass("showindex");
		}
	});
	//$(document).on('touchmove', function(event) {
	//	event.preventDefault();
	//});
});


/*
$(document).on("pagecreate", ".view", function() {
	var page = $(".page");
	console.log("test2");
	$(".nav-container").on("swipeleft", function(event) {
		if(page.hasClass('showindex')) {
			page.removeClass("showindex").addClass("showcontent");
		}
	});
	$(".nav-container").on("swiperight", function(event) {
		if(page.hasClass('showcontent')) {
			page.removeClass("showcontent").addClass("showindex");
		}
	});
});
*/
