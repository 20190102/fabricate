//设置登录与注册按钮状态
var flag=1;//1登录，2注册，3管理员

$(function(){
	//输入框获得光标效果
	$(".put_in").focus(function(){
		$(this).css({
					"border":"3px solid #475570",
					"padding":"8px 8px 8px 38px",
					"background-position":"5px"
					})
				.attr('placeholder','');
	});
	
	//邮箱输入框失去光标
	$("#email_text").blur(function(){
		//边框恢复
		reborder($(this));
		
		//邮箱验证
		var email=$(this).val();
		if(email==""){
			$("#email_error").text("");
			$(this).attr('placeholder','邮箱');
			$("#email_error").text("请输入邮箱");
		}
		else if(email.length>0){
			if(flag==1||flag==3){
				email_test();
			}
			else if(flag==2){
				email_test();
				hasemail();
			}
		}
	});
	
	//密码输入框失去光标
	$("#password_text").blur(function(){
		//边框恢复
		reborder($(this));
		//密码验证
		var password=$(this).val();
		if(password==""){
			$(this).attr('placeholder','密码(6-16位)');
			$("#password_error").text("请输入密码");
		}
		if(password.length>0){
			password_test();
		}
	});
	
	
	$("#user_text").blur(function(){
		reborder($(this));
		var user=$(this).val();
		if(user==""){
			$(this).attr('placeholder','昵称');
			$("#user_error").text("请输入昵称");
		}
		else if(user.length>0){
			$("#user_error").text("");
		}
	});
	//--------------------------------------------------------------------------------------

	
	
	//注册按钮
	$("#reg_bn").click(function(){
		if(flag==2){
			if(email_test()&password_test()&hasemail()){
				addUser();
			}
		}
		else{
			
			$("#login_bn").animate({width:'52px'},490);
			$(this).animate({width:'247px'},510);
			$("#set_up").slideUp("slow");
			setTimeout(function(){
				reset();
				$("#user_div").slideDown(400);
				$("#user_error").slideDown(400);
			},400);
			
			flag=2;
		}

	});

	//登录按钮
	$("#login_bn").click(function(){
		if(flag==1){
			if(email_test()&password_test()){
				
					ajax_user();
			}
		}
		else if(flag==3){
			ajax_admin();
		}
		else{
			
			$("#user_div").slideUp("slow");
			$("#user_error").slideUp("slow");
			$("#reg_bn").animate({width:'52px'},490);
			$(this).animate({width:'247px'},510);
			setTimeout(function(){
				reset();
				$("#set_up").slideDown(400);
			},400);
			
			flag=1;
		}
	});
	
	//管理员回车键登录
	$("body").keydown(function(){
		if(flag==1||flag==3){
			if (event.keyCode == "13"){
				ajax_admin();
			}
		}

	});
	//点击管理员登录
	$("#admin_login").click(function(){
		$("#reg").animate({width:'hide'},510);
		$("#login_bn").animate({width:'300px'},510);
		$("#set_up").slideUp("slow");
		$("#email_text").attr("placeholder","请输入用户名");
		flag=3;
	});

});

//失去光标后边框效果恢复
function reborder(b){
	b.css({
		"border":"1px solid #5B6A81",
		"padding":"10px 10px 10px 40px",
		"background-position":"7px"
		});
}

//所有数据设为空
function reset(){
	$("input").val("");
	$(".info").next().text("");
	$("#email_text").attr("placeholder","邮箱");
	$("#password_text").attr("placeholder","密码(6-16位)");
	$("#user_text").attr("placeholder","昵称");
	$("#error_tips").text("");
}

//普通用户登录
function ajax_user() {
	$.ajax({
		type : "POST",
		url : "userLogin",
		dataType : "json",
		data : {
			email : $("#email_text").val(),
			password : $("#password_text").val(),
		},
		success : function(data) {
			if (data.msg) {
				$(window).attr("location", "static/page/user.html");
			} else {
				$("#error_tips").text("邮箱或密码错误");
			}
		},
		error : function(jqXHR) {
			$("#error_tips").text("服务器错误，请稍后重试");
		}

	});
}
//管理员登录ajax
function ajax_admin() {
	$.ajax({
		type : "POST",
		url : "adminLogin/a/ab",
		dataType : "json",
		data : {
			uname : $("#email_text").val(),
			password : $("#password_text").val(),
		},
		success : function(data) {
			if (data.key) {
				$(window).attr("location", "page/manage.html");
			} else {
				$("#error_tips").text("邮箱或密码错误");
			}
		},
		error : function(jqXHR) {
			
			$("#error_tips").text("服务器错误，请稍后重试");
		}

	});
}
//用户注册
function addUser() {
	$.ajax({
		type : "POST",
		url : "insertUsers",
		dataType : "json",
		data : {
			email : $("#email_text").val(),
			password : $("#password_text").val(),
			username : $("#user_text").val(),
		},
		success : function(data) {
			if (data.msg == 1) {
				$("#error_tips").text("注册成功,请登录");
			} else if (data.msg == 3) {
				$("#email_error").text("该邮箱已存在,请登录或重新输入");
			}
		},
		error : function(jqXHR) {

		}
	});
}



//邮箱验证
function email_test() {
	var email = $("#email_text").val();

	var email_error = $("#email_error");

	var regular = /[\w_]{6,11}[@][a-zA-Z]+[.][a-zA-Z]{2,4}/;
	if (email != "") {
		if (!regular.test(email)) {
			email_error.text("邮箱格式错误");
			return false;
		} else {
			email_error.text("");
			return true;
		}

	} else {
		email_error.text("请输入邮箱");
		return false;
	}
}
//邮箱是否已存在验证
function hasemail(){
	var hasemail=false;
	$.ajax({
		type : "POST",
		url : "hasEmail",
		dataType : "json",
		async:false,
		data : {
			email : $("#email_text").val(),
		},
		success : function(data) {
			if (!data.msg) {
				$("#email_error").text("该邮箱已存在,请重新输入");
				
			}
			else if(data.msg){
				hasemail=true;
			}
		},
		error : function(jqXHR) {
			$("#error_tips").text("服务器错误，请稍后重试");

		}
	});
	
	return hasemail;

}
//密码验证
function password_test() {
	var password = $("#password_text").val();
	var password_error = $("#password_error");
	if (password != "") {
		if (password.length >= 6 && password.length <= 16) {
			$("#password_error").text("");
			return true;
		} else {
			password_error.text("密码(6~16位)");
			return false;
		}

	} else {
		password_error.text("请输入密码");
		return false;
	}

}

