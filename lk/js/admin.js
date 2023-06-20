
$(document).on("focus", '.data-copy-on-click', function() {
	$("*").copyOnClick();
		
});




$('.select2-hotels').select2({

	ajax: {
		url: '/control/user',
		type: 'POST',
		dataType: 'json',
		delay: 250,
		processResults: function (data) {
			return {
				results: data.msg
			};
		},
	},
	language: "ru",
	minimumInputLength: 2

});


$('#square-switch3').on("change", function() {
	if ($(this).is(":checked")) {
		$('#hoteldata').hide();
		$('#hotelnew').show();
	} else {
		$('#hotelnew').hide();
		$('#hoteldata').show();
	}
});

$('body').on("click", '.sendpath', function() {
	var uplpath = $(this).attr('data-path');
	$('#upl_path').val(uplpath);
	$('#upl_path2').val(uplpath);
});


$('form.createfolder').submit(function(e) {
	var $form = $(this);
	$.ajax({
		type: $form.attr('method'),
		url: '/dev/get_files',
		data: $form.serialize(),
	}).done(function(data) {
		var ret = JSON.parse(data);
		$form[0].reset();
		$('#createfolder').modal('toggle');	
		GetFile(ret.path, ret.name);
	})
	e.preventDefault();
});


 Dropzone.autoDiscover = false;
$(document).ready(function () {
	var dZUpload =  $("#my-drop").dropzone({
		maxFiles: 5000,
		maxFilesize: 15,
		success: function (file, response) {		
			$('#tbodyfile').prepend(response);
			$('#file_upload').modal('toggle');			
				setTimeout(function() {
				dZUpload[0].dropzone.removeAllFiles();
			},3000);	
		},
		complete: function(file, response) {			
			setTimeout(function() {
				  dZUpload[0].dropzone.removeAllFiles();
			},3000);			 
		},
	});

})
$('body').on("click", '#newfoldername', function() {
   $.fn.editableform.buttons = '<button type="submit" class="btn btn-success editable-submit btn-sm waves-effect waves-light"><i class="mdi mdi-check"></i></button>',
$("#newfoldername").editable({
	type: "text",
	pk: 1,
	name: "newfoldername",
	mode: "inline",
	inputclass: "form-control-sm mw-100"
});
});

function GetFile(path, name)
{
	var oAjax = new AJAPH;
	oAjax.send("POST", "/dev/get_files", "path="+path+'&name='+name+'&action=getlist').setResponseHtml("filesarea");
}

function Rename(path, name)
{
	var oAjax = new AJAPH;
	oAjax.send("POST", "/dev/get_files", "path="+path+'&name='+name+'&action=rename').getResponseText();
}



function RemoveDIr(file, id)
{
	Swal.fire({
		title: 'Вы уверены?',
		text: "Папку с файлами нельзя будет восстановить!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Удалить',
		cancelButtonText: 'Отмена'

	}).then((result) => {
		if (result.value) {
			$.ajax({
				type: 'POST',
				url:'/dev/get_files',
				data: {
					file: file, action: "deletet"
				},
			}).done(function(data) {
				if (data == "ok") {
					$('#'+id).remove();
				} else {

					Swal.fire(
					'Ошибка!',
					'Не удалось удалить папку.',
					'error'
					);
				}
			});
		}
	})
}

function Remove(file, id)
{
	Swal.fire({
		title: 'Вы уверены?',
		text: "Удаленный файл нельзя будет восстановить!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Удалить',
		cancelButtonText: 'Отмена'

	}).then((result) => {
		if (result.value) {
			$.ajax({
				type: 'POST',
				url:'/dev/get_files',
				data: {
					file: file, action: "deletet"
				},
			}).done(function(data) {

				if (data == "ok") {
					
					$('#'+id).remove();
				} else {

					Swal.fire(
					'Ошибка!',
					'Не удалось удалить файл.',
					'error'
					);
				}
			});
		}
	})
}