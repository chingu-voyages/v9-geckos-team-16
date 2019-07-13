$(document).ready(function () {

	//global variables
	// points to the container where new lists are to be dumped
	var lists_container = $(".todo-page .lists_container");

	// points to the list and list-item html layouts
	var component_base_url = './components/todo_app/';
	var list_layout_url = `${component_base_url}html/new_list.html`;
	var list_item_layout_url = `${component_base_url}html/new_list_item.html`


	/************************* LIST MANIPULATIONS ********************************/
	// when user clicks create list
	$('#create_list_btn').on("click", function () {

		//load a new list onto the lists container
		$.get(list_layout_url, function (list_layout, status) {

			if (status == "success") {

				lists_container.append(list_layout);
				loadFirstListItem(); // add a single start item
			}
		}, "html");
	});

	//called to load a new list item to a list that has just been inserted
	function loadFirstListItem() {

		$.get(list_item_layout_url, function (list_item, status) {
			if (status == "success") {

				//get the list that has just been inserted 
				$(".lists_container .todo_list:last-of-type").append(list_item);
			}
		}, "html");
	}

	// when user types a list name and presses enter 
	lists_container.on('keyup', ".list_name_inputs", function (e) {

		// see if user has pressed Enter 
		if (e.keyCode == 13) {

			// get the list name 	
			var list_name = $(this).val();

			//	check if the length is valid enough 
			if (list_name.length > 3) {

				//disable the input
				$(this).attr('disabled', 'disabled');
				$(this).closest('.todo_list_elements').find(".update_list_img").removeClass("fa-check");
				$(this).closest('.todo_list_elements').find(".update_list_img").addClass("fa-pen");
			} else {

				$(this).attr("placeholder", "Name is too short").val("");
			}
		}
	});

	// when user wishes to update list name  
	lists_container.on('click', ".update_list_img", function () {


		if ($(this).hasClass("fa-pen")) {

			//enable the list name input that corresponds to this list item
			$(this).removeClass("fa-pen");
			$(this).addClass("fa-check");
			$(this).closest('.todo_list_elements').find("input").removeAttr("disabled");
			$(this).closest('.todo_list_elements').find("input").focus();

		} else {
			// get the list item
			var list_name = $(this).closest(".todo_list_elements").find("input").val();

			//	check if something has been entered
			if (list_name.length > 3) {
				console.log("list_name.length > 3");
				//disable the input
				$(this).closest('.todo_list_elements').find("input").attr('disabled', 'disabled');
				$(this).removeClass("fa-check");
				$(this).addClass("fa-pen");
			} else {
				$(this).attr("placeholder", "Name is too short").val("");
			}
		}

	});

	// when user wishes to delete a list
	lists_container.on('click', ".delete_list_img", function () {

		//delete this list
		$(this).closest('.todo_list').remove();
	});

	/************************* LIST ITEMS MANIPULATIONS ********************************/
	//when user wishes to add a new item to list
	lists_container.on('click', ".add_list_item_img", function () {

		var todo_list_to_append_to = $(this).closest('.todo_list');

		$.get(list_item_layout_url, function (list_item, status) {

			if (status == "success") {

				//insert a new list item to this table 
				todo_list_to_append_to.append(list_item);
			}
		}, "html");
	});

	// when user types a list item and presses enter 
	lists_container.on('keyup', ".list_item_inputs", function (e) {

		// see if user has pressed Enter 
		if (e.keyCode == 13) {

			// get the list item
			var list_item = $(this).val();

			//	check if something has been entered
			if (list_item.length > 0) {

				//disable the input
				$(this).attr('disabled', 'disabled');
				$(this).closest('.list-item-row').find(".update_list_item_img").removeClass("fa-check");
				$(this).closest('.list-item-row').find(".update_list_item_img").addClass("fa-pen");
			}
		}
	});

	// when user wishes to update a list ITEM
	lists_container.on('click', ".update_list_item_img", function () {


		//check if the item is in "edit mode" or not
		if ($(this).hasClass("fa-pen")) {

			//enable the list name input that corresponds to this list item
			$(this).removeClass("fa-pen");
			$(this).addClass("fa-check");
			$(this).closest('.list-item-row').find("input").removeAttr("disabled");
			$(this).closest('.list-item-row').find("input").focus();

		} else {
			// get the list item
			var list_item = $(this).closest('.list-item-row').find("input").val();

			//	check if something has been entered
			if (list_item.length > 0) {
				console.log("list_item.length > 0");

				//disable the input
				$(this).closest('.list-item-row').find("input").attr('disabled', 'disabled');
				$(this).removeClass("fa-check");
				$(this).addClass("fa-pen");
			}
		}
	});

	// when user wishes to delete a list item
	lists_container.on('click', ".delete_list_item_img", function () {

		//delete this list item
		$(this).closest('.list-item-row').remove();
	});

	// when user indicates is done with a list item
	lists_container.on('click', ".check_item_img", function () {

		//change the image 
		// check_item_img_src = `${component_base_url}images/checked.png`;
		// $(this).attr("src", check_item_img_src);

		//change the class of this list item from check to uncheck
		$(this).removeClass("fas fa-check-circle");
		$(this).addClass("far fa-circle");
		$(this).removeClass("check_item_img");
		$(this).addClass("uncheck_item_img");
	});

	// when user indicates is not done with a list item
	lists_container.on('click', ".uncheck_item_img", function () {

		//change the image 
		// uncheck_item_img_src = `${component_base_url}images/unchecked.png`;
		// $(this).attr("src", uncheck_item_img_src);

		//change the class of this list item from uncheck to check
		$(this).removeClass("far fa-circle");
		$(this).addClass("fas fa-check-circle");
		$(this).removeClass("uncheck_item_img");
		$(this).addClass("check_item_img");
	});

	/********************CHECK FOR INPUT CHANGES*****************************************/
	lists_container.on('change', 'input', function () {

		let firstTodoList = lists_container.children()
			.first().clone(true);

		firstTodoList.find('input').attr('disabled', true);
		$('#list-copy .lists_container').empty().append(firstTodoList);
	});

	/**********************SLIDE UP/DOWN the TO-DO LIST PAGE******************************/
	$("#todo-open-button").click(function () {

		$(".todo-page").addClass("show");
		$(".todo-page-nav").addClass("show");
	});

	$("#todo-close-button").click(function () {

		$(".todo-page").removeClass("show");
		$(".todo-page-nav").removeClass("show");
	});

	/********************** TOGGLE ON/OFF EDIT MODE in the TO-DO LIST ************************/
	$("#todo-edit-button").click(function () {
		if ($("#todo-edit-button").hasClass("edit-on")) {

			$("#todo-close-button").prop('hidden', false);
			$("#todo-edit-button").removeClass("edit-on");
			$(".update_list_img").removeClass("show");
			$(".delete_list_img").removeClass("show");

			$(".update_list_item_img").removeClass("show");
			$(".delete_list_item_img").removeClass("show");
			$(".todo-add-task-button").addClass("hide");
		} else {

			$("#todo-close-button").prop('hidden', true);
			$("#todo-edit-button").addClass("edit-on");
			$(".update_list_img").addClass("show");
			$(".delete_list_img").addClass("show");

			$(".update_list_item_img").addClass("show");
			$(".delete_list_item_img").addClass("show");
			$(".todo-add-task-button").removeClass("hide");
		};
	});
});