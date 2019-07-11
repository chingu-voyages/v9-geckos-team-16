$(document).ready(function () {

	// TOGGLE ON/OFF SETTINGS PAGE
	$("#settings-button").click(function () {
		$(".settings-page").addClass("show");
	});

	$("#settings-back-button").click(function () {
		$(".settings-page").removeClass("show");
	});

	// SLIDE UP/DOWN the TO-DO LIST PAGE
	$("#todo-open-button").click(function () {
		$(".todo-page").addClass("show");
		$(".todo-page-nav").addClass("show");
	});

	$("#todo-close-button").click(function () {
		$(".todo-page").removeClass("show");
		$(".todo-page-nav").removeClass("show");
	});

	// TOGGLE ON/OFF EDIT MODE in the TO-DO LIST
	$("#todo-edit-button").click(function () {
		if ($("#todo-edit-button").hasClass("edit-on")) {
			$("#todo-edit-button").removeClass("edit-on");
			$(".update_list_img").removeClass("show");
			$(".delete_list_img").removeClass("show");
			$(".update_list_item_img").removeClass("show");
			$(".delete_list_item_img").removeClass("show");
			$(".todo-add-task-button").addClass("hide");
		} else {
			$("#todo-edit-button").addClass("edit-on");
			$(".update_list_img").addClass("show");
			$(".delete_list_img").addClass("show");
			$(".update_list_item_img").addClass("show");
			$(".delete_list_item_img").addClass("show");
			$(".todo-add-task-button").removeClass("hide");
		};
	});

});