$(function(){
	var view = $(".view");
	console.log("test");
	$('.nav-button').click(function(){
		if(view.hasClass('showindex')) {
			view.removeClass("showindex").addClass("showcontent");
		}
		else if(view.hasClass('showcontent')) {
			view.removeClass("showcontent").addClass("showindex");
		}
	});
	$(".sidebar, .content")
		.on("swipeleft", function(event) {
			if(view.hasClass('showindex')) {
				view.removeClass("showindex").addClass("showcontent");
			}
		})
		.on("swiperight", function(event) {
			if(view.hasClass('showcontent')) {
				view.removeClass("showcontent").addClass("showindex");
			}
		});
});


/*
$(document).on("pagecreate", ".view", function() {
	var view = $(".view");
	console.log("test2");
	$(".nav-swipe").on("swipeleft", function(event) {
		if(view.hasClass('showindex')) {
			view.removeClass("showindex").addClass("showcontent");
		}
	});
	$(".nav-swipe").on("swiperight", function(event) {
		if(view.hasClass('showcontent')) {
			view.removeClass("showcontent").addClass("showindex");
		}
	});
});
*/
