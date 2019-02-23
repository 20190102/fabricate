package com.fabricate.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.fabricate.module.UserBeanCustom;
import com.fabricate.service.UserService;
import com.github.pagehelper.PageHelper;

public class TestMain {

	public TestMain() {
		// TODO Auto-generated constructor stub
		
	}

	@Test
	public void queryUsertest() {
		ApplicationContext conn = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
		UserService userService = (UserService) conn.getBean("userService");
		PageHelper.startPage(0, 10);
		UserBeanCustom userBeanCustom = new UserBeanCustom();
		List<UserBeanCustom> lists = userService.userQuery(userBeanCustom);
		for (UserBeanCustom list : lists) {
			System.out.println(list);
		}
	}

}
