package com.fabricate.controller;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fabricate.module.UserBean;
import com.fabricate.module.UserBeanCustom;
import com.fabricate.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;

@Controller
@ResponseBody
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private Gson gson;

	final private String msgt = "{\"msg\":true}";
	final private String msgf = "{\"msg\":false}";

	// 用户登录
	@RequestMapping("/userLogin")
	
	public  String userLogin(UserBean userBean) {
		
		
		int rows = userService.userLogin(userBean);
		if (rows == 1) {
			return msgt;
		} else
			return msgf;
	}

	// 用户查询
	@RequestMapping("/queryUsers")
	public String queryUser(UserBeanCustom userBeanCustom, @RequestParam(value = "pn", defaultValue = "1") int pn
			) {
		PageHelper.startPage(pn, 10);
		List<UserBeanCustom> lists = userService.userQuery(userBeanCustom);
		PageInfo<UserBeanCustom> page = new PageInfo<UserBeanCustom>(lists);
		return gson.toJson(page);
//		return page;
	}

	@RequestMapping("/queryById")
	public String queryById(UserBeanCustom userBeanCustom) {
		ArrayList<UserBeanCustom> list = userService.queryById(userBeanCustom);
		return gson.toJson(list);

	}

	// 用户修改
	@RequestMapping("/updateUser")
	public String updateUsers(UserBeanCustom userBeanCustom) {
		int rows = userService.updateUsers(userBeanCustom);
		if (rows == 1) {
			return msgt;
		} else {
			return msgf;
		}
	}

	// 删除用户
	@RequestMapping("/delUsers")
	public String deleteUsers(UserBeanCustom userBeanCustom) {
		int rows = userService.deleteUsers(userBeanCustom);
		if (rows == userBeanCustom.getDelIds().length) {
			return msgt;
		} else {
			return msgf;
		}

	}

	// 添加用户
	@RequestMapping("/insertUsers")
	public String  insertUsers(UserBeanCustom userBeanCustom) {
		int rows = userService.insertUsers(userBeanCustom);
		if (rows == 1) {
			return "{\"msg\":1}";
		} else {
			return "{\"msg\":2}";
		}
	}

	// 验证邮箱是否存在
	@RequestMapping("/hasEmail")
	public String hasEmail(UserBeanCustom userBeanCustom) {
		int rows = userService.hasEmail(userBeanCustom);
		if (rows == 0) {
			return msgt;
		} else {
			return msgf;
		}
	}

}
