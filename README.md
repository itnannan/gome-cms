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
>>###
	/api/web/pic (上传图片)  'post'

	/api/web/confirm (确定)  'post'

	/api/web/version/:platform (获取某一个平台的 version列表) 'get'

	/api/web/detail/:platform/:version (获取某一个平台的 某一个版本 的详情) 'get'

	/api/web/edit (编辑)
	method: GET
	
	{
		version: 
		platform:
	}

	/api/web/delete  (删除)
	method: GET
	
	{
		version: 
		platform:
	}


>## h5端接口
	/api/h5/.....
