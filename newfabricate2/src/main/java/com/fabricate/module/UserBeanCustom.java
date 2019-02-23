package com.fabricate.module;

import java.sql.Date;

//UserBean的扩展类
public class UserBeanCustom extends UserBean {
	private String qMode;// 查询方式，1为精确，2为模糊
	private String qContent;// 查询条件
	private int[] delIds;// 删除的用户id

	public String getqMode() {
		return qMode;
	}

	public void setqMode(String qMode) {
		this.qMode = qMode;
	}

	public String getqContent() {
		return qContent;
	}

	public void setqContent(String qContent) {
		this.qContent = qContent;
	}

	public int[] getDelIds() {
		return delIds;
	}

	public void setDelIds(int[] delIds) {
		this.delIds = delIds;
	}

}
