package com.fabricate.mapper;

import java.util.ArrayList;

import com.fabricate.module.UserBean;
import com.fabricate.module.UserBeanCustom;
import com.fabricate.module.UserQueryVo;

public interface UserMapper {
	
	//用户登录
	public int userLogin(UserBean userBean);
	
	//查询/搜索用户
	public ArrayList<UserBeanCustom> userQuery(UserBeanCustom userBeanCustom);
	
	//根据id查询用户
	public ArrayList<UserBeanCustom> queryById(UserBeanCustom userBeanCustom);
	
	//修改
	public int updateUsers(UserBeanCustom userBeanCustom);
	
	//删除
	public int deleteUsers(UserBeanCustom userBeanCustom);
	
	//添加
	public int insertUsers(UserBeanCustom userBeanCustom);
	
	//验证邮箱是否存在
	public int hasEmail(UserBeanCustom userBeanCustom);
}
