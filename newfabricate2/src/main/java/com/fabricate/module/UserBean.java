package com.fabricate.module;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class UserBean {
	private int id;
	private String email;
	private String username;
	private String password;
	private String imgpath;
	private String userintro;
	private Date sqlDate;
	private String birthday;
	private String sex = "男";

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImgpath() {
		return imgpath;
	}

	public void setImgpath(String imgpath) {
		this.imgpath = imgpath;
	}

	public String getUserintro() {
		return userintro;
	}

	public void setUserintro(String userintro) {
		this.userintro = userintro;
	}

	public Date getSqlDate() {
		return sqlDate;
	}

//	public void setSqlDate(Date sqlDate) {
//		this.sqlDate = sqlDate;
//	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		if(birthday=="") {
			SimpleDateFormat s=new SimpleDateFormat("yyyy-MM-dd");
			this.sqlDate=Date.valueOf(s.format(new java.util.Date()));
		}
		else {
			this.sqlDate=Date.valueOf(birthday);
		}
		this.birthday = birthday;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	@Override
	public String toString() {
		return "UserBean [id=" + id + ", email=" + email + ", username=" + username + ", password=" + password
				+ ", imgpath=" + imgpath + ", userintro=" + userintro + ", birthday=" + birthday + ", sex=" + sex + "]";
	}

}
