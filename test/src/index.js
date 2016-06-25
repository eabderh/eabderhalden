

$(window).on('load', function() {
	$('.sidebar-content').children().clone().appendTo($('#mobile-navigation'));
	var test = document.documentElement.clientWidth;
	var pattern = Trianglify({
		width: test,
		height: test,
		cell_size: 40,
		palette: Trianglify.colorbrewer,
		color_space: 'lab',
		x_colors: Trianglify.colorbrewer.YIOrRd,
		y_colors: 'match_x',
		seed: 'asdfg'});
	$('.test').append(pattern.svg())
});
$(window).on('resize', function() {
	if (document.documentElement.clientWidth < 900) {
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


