$(document).ready(function(){

	//lists counter
	var lists_created = 0;


	var list_item_layout = '<tr><td><input class ="list_item_inputs" type="text"  placeholder="Task"></td><td><button class="add_list_item_btn">Add Task</button></td><td><button class="update_list_item_btn">Update Task</button></td><td><button class="delete_list_item_btn">Delete Task</button></td></tr>';

	

	// points to the container where a new list is to be dumped
	var lists_container = $(".lists_container");
	
	// an input box to enter a new list name 
	var list_name_input = $("#list_name_input");


	// when user clicks create a list 
	$('#create_list_btn').on("click", function(){

		var new_list_element = '<div id="list' + (lists_created + 1).toString() + '"><input type="text" class="list_name_inputs" id="list_name' +  (lists_created + 1).toString() + '" placeholder="Name your list"> <button class="update_list_btn">Update List</button><button class="delete_list_btn">Delete List</button></div>';


		//add a new list element with empty input 
		lists_container.append(new_list_element);
		lists_created++; //increment number of lists created 


		




	});



/******************  MANIPULATING LISTS ******************************/

	//when user types new list name 
	$(".lists_container").on('keyup', ".list_name_inputs", function (e) {
		 // see if user has pressed Enter 
		    if (e.keyCode == 13) {

		         
	        var list_number = (this.id).substring(9);
	        var list_number_id = "#list" + list_number;
	        var list_name = $("#"+(this.id)).val();

	        if(list_name.length > 3){

	        	//disable the input
	        	$("#"+(this.id)).attr('disabled','disabled');

	        	 //insert  a table for adding tasks to list
				var check_list_table_layout  = '<table id="tasks_table' + list_number + '">' + list_item_layout +'</table>'; 
	        	$(list_number_id).append(check_list_table_layout);
	        }
	        else{
	        	$("#"+(this.id)).attr("placeholder","Name is too short").val("");
	        }


		    }
	});

	//when user clicks update list 
	$(".lists_container").on("click", ".update_list_btn", function(){

			// get closest input for this button 
			var list_name_input_to_update = $(this).closest('div').find( ".list_name_inputs" );
			list_name_input_to_update.removeAttr('disabled');


	});


	//when user clicks delete list 
	$(".lists_container").on("click", ".delete_list_btn", function(){

			// get div container for this button 
			$(this).closest('div').remove();

	});



/******************         MANIPULATING LIST ITEMS ******************************/
	//when user clicks add new list item to a task 
	$(".lists_container").on("click", ".add_list_item_btn", function(){

			// get table container for this button 
			var parent_table = $(this).closest('table');
			parent_table.append(list_item_layout);

	});

	//when user presses enter on the new list item 
	$(".lists_container").on('keyup', ".list_item_inputs", function(e){
			 if (e.keyCode == 13) {
			 	if($(this).val().length > 3)
					$(this).attr('disabled','disabled');
			}

	});


	//when user clicks update list item on a task 
	$(".lists_container").on("click", ".update_list_item_btn", function(){

			// get closest input 
			var item_input_to_update = $(this).closest('tr').find( "input" );
			item_input_to_update.removeAttr('disabled');

	});


	//when user clicks delete list item from a task 
	$(".lists_container").on("click", ".delete_list_item_btn", function(){

			// get closest input 
			var item_input_to_update = $(this).closest('tr').remove();

	});








});