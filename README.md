gome-cms
======================================
# src 
	
	录入页 源码

# dist
	
	录入页 打包后

# generate
	
	/dist   生成的 最终代码


	/web   用于生成 web端页面 

# db 
	数据库

# api
	
>## web端接口
	/api/web/.....
>>### 更新 下载主页信息

	/api/web/main (确定)
	
	/api/web/main/get (获取数据,回填form表单)

	/api/web/main/preview  (预览-提交)

>>### 新增 版本列表条目
	/api/web/versionList/add
>>### 修改 版本列表页条目
	/api/web/versionList/update
>>### 新增版本详情页
	/api/web/versionDetail/add
>>### 修改版本详情页
	/api/web/versionoDetail/update

>## h5端接口
	/api/h5/.....
