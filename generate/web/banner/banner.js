
/*

{
    platform:'winodws,ios,android,mac',                 //平台  String
    versionList:[
        {version:...,title:...,time:...}
    ],                                                  //平台更新列表   Array
    title: '我是一个大标题',                            //banner中的标题    String
    summary: '我是一个简介',                            //banner中的简介   String
    size:'12.3M'                                        //安装包的大小    String
    version:'V1.1.1'                                    //版本号   String    
    system:'Win7及以上'                                 //适应系统  String
    address:'https://work.gomeplus.com......'           //下载地址  String
    date:'2017-3-30'                                    //发布日期  String
}

 */


function platform(data){
    let list = '';
    for(let i = 0; i < data.versionList.length; i++){
        data.versionList[i].platform = data.platform
        list += versionList(data.versionList[i])
    }

    return `<div class="${data.platform}-content `
            + (data.platform == "windows"?"show":"hide") +`">
                <div class="download">
                    <p class="title">${data.title}</p>
                    <p class="slogan">${data.summary}</p>
                    <p class="size-version"><span class="size">大小：${data.size}</span><span class="version">版本：${data.version}</span></p>
                    <p class="system-time"><span class="system">适应系统：${data.system}</span><span class="time">发布日期： ${data.date}</span></p>
                    <a href="${data.address}" class="download-btn"><span>Windows版</span></a>
                </div>
                <div class="version-list">
                    <p class="title">更新日志</p>
                    <ul>`
                    + list +   
                    `</ul>
                    <a class="more" href="../versionList/versionList.html#Windows">查看更多>></a>
                </div>
            </div>`
}


/*

{
    version:...,
    title:...,
    time:...,
    platform:...
}   

 */

function versionList(data){
    data.href = '/detail/' + data.platform + '-' + data.version + '.html'
    return `<li><a href="${data.href}">${data.title}<span class="time">${data.time}</span></a></li>`
}

function footer(){
    return `</div>
            <script src="main.js"></script>
            </body>
            </html>`
}
function header(){
    return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="author" content="下载" />
            <link rel="stylesheet" type="text/css" href="main.css">
            <title>国美互联网企业云</title>
        </head>
        <body>
        <div class="header-box">
            <div class="header">
                <div class="fl clearfix">
                    <a class="fl title" href="/pages/main/main.html">国美互联网企业云</a>
                    <a href="/pages/main/main.html" class="fl header-btn active">下载</a>
                </div>
                <div class="fr">
                    <a class="fl login-btn" href="/login.html">登录</a>
                    <a class="fl create-company-btn" href="/pages/createCompany/createCompany.html" >创建公司</a>
                </div>
            </div>
        </div>`
}

function buttons(){
    return `<div class="nav" id="nav">
            <span class="window-btn active">Windows</span>
            <span class="mac-btn">Mac</span>
            <span class="android-btn">Android</span>
            <span class="ios-btn">iOS</span>
        </div>
        <div class="content-box" id="contentBox">`
}

//{widonws:{},ios:{},mac:{},android:{}}

module.exports = function(data){
    let html = ''
    //拼接头部
    html += header()
    //拼接按钮
    html += buttons()
    //拼接banner
    html += platform(data.windows)
    html += platform(data.mac)
    html += platform(data.android)
    html += platform(data.ios)
    //拼接footer
    html += footer()

    return html
}