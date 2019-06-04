$(document).ready(function(){

	//lists counter
	var lists_created = 0;


	var list_item_layout = '<tr><td><input type="text"  placeholder="Task"></td><td><button class="add_list_item_btn">+</button></td></tr>';

	

	// points to the container where a new list is to be dumped
	var lists_container = $(".lists_container");
	
	// an input box to enter a new list name 
	var list_name_input = $("#list_name_input");


	// when user clicks create a list 
	$('#create_list_btn').on("click", function(){

		var new_list_element = '<div id="list' + (lists_created + 1).toString() + '"><input type="text" class="list_name_inputs" id="list_name' +  (lists_created + 1).toString() + '" placeholder="Name your list"></div>';


		//add a new list element with empty input 
		lists_container.append(new_list_element);
		lists_created++; //increment number of lists created 


		




	});

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


	//when user clicks add new list item to a task 
	$(".lists_container").on("click", ".add_list_item_btn", function(){

			// get table container for this button 
			var parent_table = $(this).closest('table');
			parent_table.append(list_item_layout);

	});





});