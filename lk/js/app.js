!function(s)
{"use strict";var e,t=localStorage.getItem("language"),n="en";function a(e)
	{
	}function c()
	{
		for (var e=document.getElementById("topnav-menu-content").getElementsByTagName("a"),t=0,s=e.length;t<s;t++)
			"nav-item dropdown active"===e[t].parentElement.getAttribute("class")&&(e[t].parentElement.classList.remove("active"),null!==e[t].nextElementSibling&&e[t].nextElementSibling.classList.remove("show"))
	}function r(e)
	{}function l()
	{
		document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement||(console.log("pressed"),s("body").removeClass("fullscreen-enable"))
	}s("#side-menu").metisMenu(),s("#vertical-menu-btn").on("click",function(e)
	{e.preventDefault(),s("body").toggleClass("sidebar-enable"),992<=s(window).width()?s("body").toggleClass("vertical-collpsed"):s("body").removeClass("vertical-collpsed")}),s("#sidebar-menu a").each(function()
	{var e=window.location.href.split(/[?#]/)[0];this.href==e&&(s(this).addClass("active"),s(this).parent().addClass("mm-active"),s(this).parent().parent().addClass("mm-show"),s(this).parent().parent().prev().addClass("mm-active"),s(this).parent().parent().parent().addClass("mm-active"),s(this).parent().parent().parent().parent().addClass("mm-show"),s(this).parent().parent().parent().parent().parent().addClass("mm-active"))}),s(document).ready(function()
	{var e;0<s("#sidebar-menu").length&&0<s("#sidebar-menu .mm-active .active").length&&(300<(e=s("#sidebar-menu .mm-active .active").offset().top)&&(e-=300,s(".vertical-menu .simplebar-content-wrapper").animate({scrollTop:e},"slow")))}),s(".navbar-nav a").each(function()
	{var e=window.location.href.split(/[?#]/)[0];this.href==e&&(s(this).addClass("active"),s(this).parent().addClass("active"),s(this).parent().parent().addClass("active"),s(this).parent().parent().parent().addClass("active"),s(this).parent().parent().parent().parent().addClass("active"),s(this).parent().parent().parent().parent().parent().addClass("active"),s(this).parent().parent().parent().parent().parent().parent().addClass("active"))}),s('[data-bs-toggle="fullscreen"]').on("click",function(e)
	{e.preventDefault(),s("body").toggleClass("fullscreen-enable"),document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement?document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen():document.documentElement.requestFullscreen?document.documentElement.requestFullscreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.webkitRequestFullscreen&&document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)}),document.addEventListener("fullscreenchange",l),document.addEventListener("webkitfullscreenchange",l),document.addEventListener("mozfullscreenchange",l),s(".right-bar-toggle").on("click",function(e)
	{s("body").toggleClass("right-bar-enabled")}),s(document).on("click","body",function(e)
	{0<s(e.target).closest(".right-bar-toggle, .right-bar").length||s("body").removeClass("right-bar-enabled")}),function()
	{
		if (document.getElementById("topnav-menu-content"))
		{
			for (var e=document.getElementById("topnav-menu-content").getElementsByTagName("a"),t=0,s=e.length;t<s;t++)
				e[t].onclick=function(e)
			{"#"===e.target.getAttribute("href")&&(e.target.parentElement.classList.toggle("active"),e.target.nextElementSibling.classList.toggle("show"))};window.addEventListener("resize",c)}}(),[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e)
	{return new bootstrap.Tooltip(e)}),[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e)
	{return new bootstrap.Popover(e)}),[].slice.call(document.querySelectorAll(".offcanvas")).map(function(e)
	{return new bootstrap.Offcanvas(e)}),window.sessionStorage&&((e=sessionStorage.getItem("is_visited"))?(s(".right-bar input:checkbox").prop("checked",!1),s("#"+e).prop("checked",!0),r(e)):sessionStorage.setItem("is_visited","light-mode-switch")),s("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch").on("change",function(e)
	{r(e.target.id)}),s("#password-addon, #password-addon2").on("click",function()
	{0<s(this).siblings("input").length&&("password"==s(this).siblings("input").attr("type")?s(this).siblings("input").attr("type","input"):s(this).siblings("input").attr("type","password"))}),null!=t&&t!==n&&a(t),s(".language").on("click",function(e)
	{a(s(this).attr("data-lang"))}),s(window).on("load",function()
	{s("#status").fadeOut(),s("#preloader").delay(350).fadeOut("slow")}),Waves.init(),s("#checkAll").on("change",function()
	{s(".table-check .form-check-input").prop("checked",s(this).prop("checked"))}),s(".table-check .form-check-input").change(function()
	{s(".table-check .form-check-input:checked").length==s(".table-check .form-check-input").length?s("#checkAll").prop("checked",!0):s("#checkAll").prop("checked",!1)})}(jQuery);

$('.input-pin').keydown(function(e)
{
	$(this).val('');
});

$('.input-pin').keyup(function(e)
{
	var $wrap = $(this).closest('.pincode');
	var $inputs = $wrap.find('.input-pin');
	var val = $(this).val();

	// Ввод только цифр
	if (val == val.replace(/[0-9]/, ''))
	{
		$(this).val('');
		return false;
	}

	// Передача фокуса следующему innput
	$inputs.eq($inputs.index(this) + 1).focus();

	// Заполнение input hidden
	var fullval = '';
	$inputs.each(function()
	{
		fullval = fullval + (parseInt($(this).val()) || '0');
	});
	$wrap.find('#pincode').val(fullval);
});



function deleteFile(id, path)
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
		if (result.value)
		{
			$.post("/cabinet/" + path, { delete_file_id: id}, function(data)
			{
				var res = JSON.parse(data);
				if (res.success == 1)
				{
					Swal.fire(
					'Удалено!',
					'Файл ' + res.filename + ' успешно удален!',
					'success'
					);
					$('#'+id).remove();
				}
			});
		}
	})
}

function deleteFileName(path, uid)
{
	console.log($(this));
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
		if (result.value)
		{
		   $.ajax({
        type: 'POST',
  
        data: {
            delete_file_name: path,     userid: uid
        },
    }).done(function(data) {
    	var res = JSON.parse(data);
       if (res.success == 1)
				{
					/*Swal.fire(
					'Удалено!',
					'Файл ' + res.filename + ' успешно удален!',
					'success'
					);
					$(this).parent("li").remove();*/
					window.location.reload();
					
				}
     
     
    
	});
		}
	})
}
if ($('.popup-iframe').length)
{
	$('.popup-iframe').magnificPopup({
		type: 'iframe'
	});
}

$(".categories-list").on('click', 'a', function () {   
 $(this).addClass("opener");
 $(this).parent("li").children("ul").show();
});


$(".categories-list").on('click', 'a.opener', function () {    
 $(this).parent("li").children("ul").hide();
 $(this).removeClass("opener");
});


$(window).on('load', function () {   
    $('#preloader').fadeOut('slow');
});


