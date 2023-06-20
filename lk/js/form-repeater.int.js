$(document).ready(function() {
	"use strict";
	$(".repeater").repeater({
		defaultValues: {
			"textarea-input": "foo",
			"text-input": "bar",
			"select-input": "B",
			"checkbox-input": ["A", "B"],
			"radio-input": "B"
		},
		show: function() {
			$(this).slideDown()
		},
		hide: function(e) {			
			 if(confirm('Вы уверенны, что хотите удалить?')) {			 	
			 	var type  = $(this).attr('data-type');  	
			 	var id  = $(this).attr('data-id');
			 	console.log(type);  	
			 	console.log(id);  
			 	
			 	    $.ajax({
                type: 'POST',              
                data: {delItem:1, id:id, type:type},
            }).done(function (data) {   
                 $(this).slideUp(e);
            })       
			 	
			 		
     		
   			}
		},
		isFirstItemUndeletable: true,
		ready: function(e) {}
	}), window.outerRepeater = $(".outer-repeater").repeater({
		defaultValues: {
			"text-input": "outer-default"
		},
		show: function() {
			$(this).slideDown()
		},
		hide: function(e) {
			 $(this).slideUp(e)
		},
		repeaters: [{
			selector: ".inner-repeater",
			defaultValues: {
				"inner-text-input": "inner-default"
			},
			show: function() {
				 $(this).slideDown()
			},
			hide: function(e) {
				 $(this).slideUp(e)
			}
		}]
		
	})
});