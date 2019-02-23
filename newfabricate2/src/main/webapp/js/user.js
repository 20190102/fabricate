$(function() {
	var flag = 1;
	queryUsers(1, null, null);
	// var height = $("table").outerWidth();

	// 搜索
	$("#searchButton").click(function() {
		var qMode = $("#searchRule option:selected").val();
		var qContent = $("#searchInput").val();
		queryUsers(1, qMode, qContent);
	});

	//关闭遮罩层
	$(".back").click(function() {
		$(".cover").css("display", "none");
		$("#operation").css("display", "none");
	});


	// 全选
	$(".chooseAll").click(function() {

		if ($(this).prop("checked")) {
			$("input:checkbox").prop("checked", true);
		} else {
			$("input:checkbox").prop("checked", false);
		}

	});

});

// 查询/搜索用户
function queryUsers(pn, qMode, qContent) {

	$.ajax({
		type : "GET",
		url : "../queryUsers",
		dataType : "json",
		data : {
			pn : pn,
			qMode : qMode,
			qContent : qContent
		},
		success : function(data) {
			controller(data, qMode, qContent);
		},
		error : function(jqXHR) {
			// alert("失败" + jqXHR.status);
		}
	});
}

//控制器，由该方法处理获得的数据和调度需要的其他方法
function controller(data, qMode, qContent){
	$("tbody").empty();

	if (data.list == "") {
		var nodata = "<tr> <td  colspan='7'>未查询到内容</td></tr>";
		$("table").append(nodata);
		$("#footer").css("display", "none");
	} else {
		$("#footer").css("display", "block");
		
		//构建表格数据显示
		create_Table(data.pageNum,data.list, qMode, qContent);
		
		//构建翻页显示
		create_page_nav(data, qMode, qContent);
	}
}


// 构建显示数据的table
function create_Table(pn,list, qMode, qContent) {
	$.each(list, function(index, item) {
		
		var checkboxtd = $("<td></td>").append("<input type='checkbox' value='"+item.id+"' >");
		var idtd = $("<td></td>").append(item.id);
		var emailtd = $("<td></td>").append(item.email);
		var unametd = $("<td></td>").append(item.username);
		var birthdaytd = $("<td></td>").append(typeof(item.birthday)=="undefined"?"":item.birthday);
		var sextc = $("<td></td>").append(item.sex);
		var updatebtn = $("<button>修改</button>");
		var detailbtn = $("<button>详情</button>");
		var operationtd = $("<td></td>").append(updatebtn).append(detailbtn);
		$("<tr></tr>").append(checkboxtd).append(idtd).append(emailtd).append(
				unametd).append(birthdaytd).append(sextc).append(operationtd)
				.appendTo("tbody");

		// 构建详情页面
		detailbtn.click(function() {
			$(".info_btn").unbind();
			$(".l_radio:not(:first-child) span").css("margin-left","0px");
			//打开遮罩层，显示页面
			$(".cover").css("display", "block");
			$("#operation").css("display", "block");
			
			//数据显示
			$(".o_id").text(item.id);
			$(".o_email").text(item.email);
			$(".o_username").text(item.username);
			$(".o_userintro").text(typeof(item.userintro) == "undefined" ?"":item.userintro);
			$(".o_birthday").text(typeof(item.birthday)=="undefined"?"":item.birthday);
			//显示性别并选中，隐藏其他性别
			var sex=item.sex!="男"?item.sex!="女"?item.sex!="保密"?"":"保密":"女":"男";
			$except=$("input[name='sex'][value!='"+sex+"']");
			$except.attr("checked",false);
			$except.next().css("display","none");
			$choose=$("input[name='sex'][value='"+sex+"']");
			$choose.next().css("display","block");
			$choose.attr("checked",true);
			$(".operation_btn").text("修改");
			
			udpate_btn(item,pn, qMode, qContent);
		
		});
		
		// 主页的修改按钮
		updatebtn.click(function() {
			
			update_input(item);
			udpate_btn(item,pn, qMode, qContent);
		});
		
	});
}
// 构建页码跳转,删除点击事件
function create_page_nav(data, qMode, qContent) {
	$("#footer button").unbind();
	$("th button").unbind();
	$("#page_label").text(data.pageNum + "/" + data.pages);

	// 下一页
	if (data.hasNextPage) {
		$("#next").click(function() {
			queryUsers(data.pageNum + 1, qMode, qContent);
		});
	}

	// 上一页
	if (data.hasPreviousPage) {
		$("#last").click(function() {
			queryUsers(data.pageNum - 1, qMode, qContent);
		});
	}

	// 首页
	$("#first").click(function() {
		queryUsers(1, qMode, qContent);
	});

	// 尾页
	$("#end").click(function() {
		queryUsers(data.pages, qMode, qContent);
	});

	// 删除按钮
	$("#delete").click(function() {
		var delId = [];
		$choose = $("input:checkbox:checked");
		if ($choose.val() != null) {
			$choose.each(function() {
				delId.push($(this).val());
			});
			if (confirm("是否确认删除")) {
				del_user(delId, data.pageNum, qMode, qContent);
			}
		} else {
			alert("请选择需要删除的用户");
		}

	});
}


function udpate_btn(item,pn, qMode, qContent){
	$(".operation_btn").unbind();
	
	//修改页，详情页使用的同一个按钮，需要判断
	$(".operation_btn").click(function() {
		
		var btntext=$(".operation_btn").text();
		if(btntext=="修改"){
			update_input(item);
			
		}
		if(btntext=="确定"){
			 var uId=$(".o_id").text();
			 var uEmail=$(".o_email input").val();
			 var uUsername=$(".o_username input").val();
			 var uUserintro=$("o_textarea").val();
			 var uBirthday=$(".o_birthday input").val();
			 var uSex=$(".o_sex input[name='sex']:checked").val();
			 if(confirm("是否确认修改")){
				 update_user(uId, uEmail, uUsername, uUserintro, uBirthday, uSex,pn, qMode, qContent);
			 }
			
		}

	});
}

//构建修改页面
function update_input(item){
	
	$(".l_radio:not(:first-child) span").css("margin-left","10px");
	$(".info div").unbind();
	$(".cover").css("display", "block");
	$("#operation").css("display", "block");
	$(".o_id").text(item.id);
	$(".o_email").html("<input type='text' value='"+item.email+"' />");
	$(".o_username").html("<input type='text' value='"+item.username+"'/>");
	$(".o_userintro").html("<textarea>"+(typeof(item.userintro)=="undefined"?"":item.userintro)+"</textarea>");
	$(".o_birthday").html("<input type='date' value='"+(typeof(item.birthday)=="undefined"?"":item.birthday)+"'/>");
	
	var sex=item.sex!="男"?item.sex!="女"?item.sex!="保密"?"":"保密":"女":"男";

	$("input[name='sex'][value='"+sex+"']").attr("checked",true);
	
	$("input[name='sex']").next().css("display","block");

//	$("input[name='sex'][value='"+sex+"']").attr("visible","hidden");
//	$(".regtime").append("<input type='date' value='"+item.regtime+"'/>");
	$(".operation_btn").text("确定");
}

// 删除
function del_user(delId, pn, qMode, qContent) {
	$.ajax({
		type : "GET",
		url : "../delUsers",
		dataType : "json",
		data : {
			delIds : delId,
		},
		traditional : true,
		success : function(data) {
			if (data.msg) {
				alert("删除成功");
				queryUsers(pn, qMode, qContent);
			} else
				alert("删除失败");
		}
	});
}

// 修改
function update_user(uId, uEmail, uUsername, uUserintro, uBirthday, uSex,pn, qMode, qContent) {
	$.ajax({
		type : "POST",
		url : "../updateUser",
		dataType : "json",
		data : {
			id : uId,
			email : uEmail,
			username : uUsername,
			userintro : uUserintro,
			birthday : uBirthday,
			sex : uSex
		},
		success : function(data) {
			if (data.msg) {
				alert("修改成功");
				queryUsers(pn, qMode, qContent);
				$(".cover").css("display", "none");
				$("#operation").css("display", "none");
			} else
				alert("修改失败");
		}

	});
}

// 根据id查询用户信息
//function queryById(id) {
//	$.ajax({
//		type : "GET",
//		url : "../queryById",
//		dataType : "json",
//		data : {
//			id : id,
//		},
//		success : function(data) {
//			if (data != "") {
//				$(".id").text(data.id);
//			}
//		}
//
//	});
//}