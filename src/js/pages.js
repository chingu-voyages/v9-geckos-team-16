$(document).ready(function () {

	// TOGGLE ON/OFF SETTINGS PAGE
	$("#settings-button").click(function () {
		$(".settings-page").addClass("show");
	});

	$("#settings-back-button").click(function () {
		$(".settings-page").removeClass("show");
	});
});