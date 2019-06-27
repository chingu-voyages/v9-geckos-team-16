$(document).ready(function () {

	//global variables
	// points to the container where new lists are to be dumped
	var lists_container = $(".lists_container");

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
			} else {

				$(this).attr("placeholder", "Name is too short").val("");
			}
		}
	});

	// when user wishes to update list name  
	lists_container.on('click', ".update_list_img", function () {

		//enable the list name input that corresponds to this list item
		$(this).closest('tr').find("input").removeAttr("disabled");
	});

	// when user wishes to delete a list
	lists_container.on('click', ".delete_list_img", function () {

		//delete this list
		$(this).closest('table').remove();
	});

	/************************* LIST ITEMS MANIPULATIONS ********************************/
	//when user wishes to add a new item to list
	lists_container.on('click', ".add_list_item_img", function () {

		var todo_list_to_append_to = $(this).closest('table');

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
			}
		}
	});

	// when user wishes to update a list ITEM
	lists_container.on('click', ".update_list_item_img", function () {

		//enable the list name input that corresponds to this list item
		$(this).closest('tr').find("input").removeAttr("disabled");
	});

	// when user wishes to delete a list item
	lists_container.on('click', ".delete_list_item_img", function () {

		//delete this list item
		$(this).closest('tr').remove();
	});

	// when user indicates is done with a list item
	lists_container.on('click', ".check_item_img", function () {

		//change the image 
		check_item_img_src = `${component_base_url}images/checked.png`;
		$(this).attr("src", check_item_img_src);

		//change the class of this list item from check to uncheck
		$(this).removeClass("check_item_img");
		$(this).addClass("uncheck_item_img");
	});

	// when user indicates is not done with a list item
	lists_container.on('click', ".uncheck_item_img", function () {

		//change the image 
		uncheck_item_img_src = `${component_base_url}images/unchecked.png`;
		$(this).attr("src", uncheck_item_img_src);

		//change the class of this list item from uncheck to check
		$(this).removeClass("uncheck_item_img");
		$(this).addClass("check_item_img");
	});
});