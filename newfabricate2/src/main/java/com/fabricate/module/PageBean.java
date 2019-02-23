package com.fabricate.module;

public class PageBean {
	private short pageSize=10;// 每页显示行数
	private int currentPage;// 当前页
	private int totalPage;// 总页数
	private int startIndex;// 起始索引
	private int totalRecords;// 总记录数

	public short getPageSize() {
		return pageSize;
	}

	public void setPageSize(short pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPage() {

		return totalPage;

	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public void setTotalPage(int totalPage) {

		this.totalPage = (int) Math.ceil(totalRecords / pageSize);

	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

}
