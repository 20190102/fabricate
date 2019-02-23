package com.fabricate.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fabricate.module.UserBean;
import com.fabricate.module.UserBeanCustom;
import com.fabricate.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;

@Controller
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private Gson gson;

	final private String msgt = "{\"msg\":true}";
	final private String msgf = "{\"msg\":false}";

	// 用户登录
	@RequestMapping("userLogin")
	public void userLogin(UserBean userBean, PrintWriter writer) {
		
		
		int rows = userService.userLogin(userBean);
		if (rows == 1) {
			writer.print(msgt);
		} else
			writer.print(msgf);
	}

	// 用户查询
	@RequestMapping("/queryUsers")
	public void queryUser(UserBeanCustom userBeanCustom, @RequestParam(value = "pn", defaultValue = "1") int pn,
			PrintWriter writer) {
		PageHelper.startPage(pn, 10);
		List<UserBeanCustom> lists = userService.userQuery(userBeanCustom);
		PageInfo<UserBeanCustom> page = new PageInfo<UserBeanCustom>(lists);
		writer.println(gson.toJson(page));
	}

	@RequestMapping("queryById")
	public void queryById(UserBeanCustom userBeanCustom, PrintWriter writer) {
		ArrayList<UserBeanCustom> list = userService.queryById(userBeanCustom);
		writer.print(gson.toJson(list));

	}

	// 用户修改
	@RequestMapping("updateUser")
	public void updateUsers(UserBeanCustom userBeanCustom, PrintWriter writer) {
		int rows = userService.updateUsers(userBeanCustom);
		if (rows == 1) {
			writer.print(msgt);
		} else {
			writer.print(msgf);
		}
	}

	// 删除用户
	@RequestMapping("delUsers")
	public void deleteUsers(UserBeanCustom userBeanCustom, PrintWriter writer) {
		int rows = userService.deleteUsers(userBeanCustom);
		if (rows == userBeanCustom.getDelIds().length) {
			writer.print(msgt);
		} else {
			writer.print(msgf);
		}

	}

	// 添加用户
	@RequestMapping("insertUsers")
	public void insertUsers(UserBeanCustom userBeanCustom, PrintWriter writer) {
		int rows = userService.insertUsers(userBeanCustom);
		if (rows == 1) {
			writer.print("{\"msg\":1}");
		} else {
			writer.print("{\"msg\":2}");
		}
	}

	// 验证邮箱是否存在
	@RequestMapping("hasEmail")
	public void hasEmail(UserBeanCustom userBeanCustom, PrintWriter writer) {
		int rows = userService.hasEmail(userBeanCustom);
		if (rows == 0) {
			writer.print("{\"msg\":true}");
		} else {
			writer.print("{\"msg\":false}");
		}
	}

}
