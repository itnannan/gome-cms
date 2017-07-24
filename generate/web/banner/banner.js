
function platform(platform,banner,detail){
    let list = '';
    for(let i = 0; i < detail.length; i++){
        list += versionList(detail[i])
    }

    if(platform == 'windows'){
        return `<div class="windows-content show">
            <div class="download">
                <p class="title">${banner.title}</p>
                <p class="slogan">${banner.summary}</p>
                <p class="size-version"><span class="size">大小：${banner.size}</span><span class="version">版本：${banner.version}</span></p>
                <p class="system-time"><span class="system">适应系统：${banner.system}</span><span class="time">发布日期： ${banner.time}</span></p>
                <a href="${banner.address}" class="download-btn"><span>Windows版</span></a>
            </div>
            <div class="version-list">
                <p class="title">更新日志</p>
                <ul>`
                + list +
                `</ul>
                <a class="more" href="../versionList/versionList.html#windows">查看更多>></a>
            </div>
        </div>`
    }else if(platform == 'mac'){
        return `<div class="mac-content">
            <div class="download">
                <p class="title">${banner.title}</p>
                <p class="slogan">${banner.summary}</p>
                <p class="size-version"><span class="size">大小：${banner.size}</span><span class="version">版本：${banner.version}</span></p>
                <p class="system-time"><span class="system">适应系统：${banner.system}</span><span class="time">发布日期： ${banner.time}</span></p>
                <a href="${banner.address}" class="download-btn"><span>Mac版</span></a>
            </div>
            <div class="version-list">
                <p class="title">更新日志</p>
                <ul>`
                + list +
                `</ul>
                <a class="more" href="../versionList/versionList.html#mac">查看更多>></a>
            </div>
        </div>`
    }else if(platform == 'android'){
        return `<div class="android-content">
            <div class="download">
                <p class="title">${banner.title}</p>
                <p class="slogan">${banner.summary}</p>
                <p class="size-version"><span class="size">大小：${banner.size}</span><span class="version">版本：${banner.version}</span></p>
                <p class="system-time"><span class="system">适应系统：${banner.system}</span><span class="time">发布日期： ${banner.time}</span></p>
            </div>
            <div class="version-list">
                <p class="title">更新日志</p>
                <ul>`
                 + list +   
                `</ul>
                <a class="more" href="../versionList/versionList.html#android">查看更多>></a>
            </div>
        </div>`
    }else if(platform == 'ios'){
        return `<div class="ios-content">
            <div class="download">
                <p class="title">${banner.title}</p>
                <p class="slogan">${banner.summary}</p>
                <p class="size-version"><span class="size">大小：${banner.size}</span><span class="version">版本：${banner.version}</span></p>
                <p class="system-time"><span class="system">适应系统：${banner.system}</span><span class="time">发布日期： ${banner.time}</span></p>
            </div>
            <div class="version-list">
                <p class="title">更新日志</p>
                <ul>`
                 + list +   
                `</ul>
                <a class="more" href="../versionList/versionList.html#ios">查看更多>></a>
            </div>
        </div>`
    }
}

function versionList(data){
    data.href = '/detail/' + data.platform + '-' + data.version + '.html'
    return `<li><a href="${data.href}">${data.title}<span class="time">${data.time}</span></a></li>`
}

function footer(){
    return `</div>
            <script src="/js/main.js"></script>
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
                <link rel="stylesheet" type="text/css" href="/css/main.css">
                <title>国美互联网企业云</title>
            </head>
            <body>
            <div class="header-box">
                <div class="header">
                    <div class="fl clearfix">
                        <a class="fl title" href="/main/main.html">国美互联网企业云</a>
                        <a href="/main/main.html" class="fl header-btn active">下载</a>
                    </div>
                    <div class="fr">
                        <a class="fl login-btn" href="/login.html">登录</a>
                        <a class="fl create-company-btn" href="/createCompany/createCompany.html" >创建公司</a>
                    </div>
                </div>
            </div>
            <div class="nav" id="nav">
                <span class="window-btn active">Windows</span>
                <span class="mac-btn">Mac</span>
                <span class="android-btn">Android</span>
                <span class="ios-btn">iOS</span>
            </div>
            <div class="content-box" id="contentBox">`
}

module.exports = function(banners,details){
    let html = ''
    //拼接头部
    html += header()
    //拼接banner
    html += platform('windows',banners.windows, details.windows)
    html += platform('mac',banners.mac, details.mac)
    html += platform('android',banners.android, details.android)
    html += platform('ios',banners.ios, details.ios)
    //拼接footer
    html += footer()

    return html
}