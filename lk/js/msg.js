

$(document).ready(function() {
	setTimeout(function() {
	$(".toast, toast-success, .toast-danger").on("click",function() {
		$(this).fadeOut('fast');
		
	});
	$(".toast, toast-success, .toast-danger").fadeOut('fast');
	}, 3000);
});