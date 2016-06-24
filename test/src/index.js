

$(window).on('load', function() {
	$('.sidebar-content').children().clone().appendTo($('#mobile-navigation'));
});
$(window).on('load resize', function() {
	if (document.documentElement.clientWidth < 900) {
	//if (screen.width < 900px) {
		$('.sidebar-content').css('display', 'none');
		}
	else {
		$('.sidebar-content').css('display', 'block');
		}
});

$(function(){
	$('#mobile-button').click(function(){
		var nav = $("#mobile-navigation");
		if(nav.hasClass('show')) {
			//$(".page").animate({
			$(".page").children().animate({
				marginLeft: "0%"
				},
				700, function() {
				});
			$("#mobile-navigation").animate({
				left: "-100%"
				},
				700, function() {
				});
			nav.removeClass("show");
		}
		else {
			//$(".page").animate({
			$(".page").children().animate({
				marginLeft: "100%"
				},
				700, function() {
				});
			$("#mobile-navigation").animate({
				left: "0%"
				},
				700, function() {
				});
			nav.addClass("show");
		}
	});
});



