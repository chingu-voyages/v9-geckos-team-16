
$(document).ready(function(){

	$("#settings-button").click(function(){
		$(".settings-page").addClass("show");
	});

	$("#settings-back-button").click(function(){
		$(".settings-page").removeClass("show");
	});

	$("#todo-open-button").click(function(){
		if ($("#todo-open-button").hasClass("todo-button-close-state")) {
			$(".todo-page").removeClass("show");
			$("#todo-open-button").removeClass("todo-button-close-state");
			$(".todo-page-nav").removeClass("show");
		} else {
			$(".todo-page").addClass("show");
			$("#todo-open-button").addClass("todo-button-close-state");
			$(".todo-page-nav").addClass("show");
		};
	});

});