package com.fabricate.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fabricate.mapper.UserMapper;
import com.fabricate.module.UserBean;
import com.fabricate.module.UserBeanCustom;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

@Service("userService")
public class UserService {
	@Autowired
	private UserMapper userMapper;

	// 登录
	public int userLogin(UserBean userBean) {
		return userMapper.userLogin(userBean);
	}

	// 查询/搜索用户
	public ArrayList<UserBeanCustom> userQuery(UserBeanCustom userBeanCustom) {
		return userMapper.userQuery(userBeanCustom);

	}
	public ArrayList<UserBeanCustom> queryById(UserBeanCustom userBeanCustom){
		return userMapper.queryById(userBeanCustom);
	}

	
	//修改
	public int updateUsers(UserBeanCustom userBeanCustom) {
		return userMapper.updateUsers(userBeanCustom);
	}
	
	//删除
	public int deleteUsers(UserBeanCustom userBeanCustom) {
		return userMapper.deleteUsers(userBeanCustom);
	}
	
	//添加
	public int insertUsers(UserBeanCustom userBeanCustom) {
		return userMapper.insertUsers(userBeanCustom);
	}
	
	//验证邮箱是否存在
	public int hasEmail(UserBeanCustom userBeanCustom) {
		return userMapper.hasEmail(userBeanCustom);
	}
}
