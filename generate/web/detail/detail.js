
function main(details){
    let text = ''
    for(let i = 0; i<details.length; i++){
        text += versionList(details[i])
    }
    return text
}

function versionList(detail){
    return `<div class="det-actual">
        <span>${detail.title}</span>`
        + imgList(detail.fileList) +
        `</div>`
}

function imgList(fileList){
    let img = ''
    for(let i=0; i<fileList.length; i++){
        img += `<img src="${fileList[i].src}" alt="">`
    }
    return img
}

function footer(){
    return `</div>
              </div>
            </div>
            </body>
            </html>`
}
function header(platform,title,time,version){
    return `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
              <title>国美互联网企业云－－登录</title>
              <link rel="stylesheet" type="text/css" href="/css/detail-common.css">
            </head>
            <body>
            <div class="main">
              <div class="header-box">
                <div class="header">
                  <div class="fl clearfix">
                    <a class="fl title" href="/main/main.html">国美互联网企业云</a>
                  </div>
                  <a href="/main/main.html" class="fc">下载</a>
                  <div class="fr">
                    <a class="fl login-btn" href="/login.html">登录</a>
                    <a class="fl create-company-btn" href="/createCompany/createCompany.html" >创建公司</a>
                  </div>
                </div>
              </div>
            <div>
            <div>
              <img src="/img/${platform}-header.png" alt="" class="det-img">
            </div>
            <div class="det-content-box">
                <div class="det-content">
                  <div class="det-title">
                  <div class="det-circle"></div>
                  <span>${title}</span>
                <p class="det-date">发布日期：${time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布版本：${version}</p>
              </div>`
}


module.exports = function(data){
    console.log(data)
    let html = ''
    //拼接头部
    html += header(data.platform, data.title, data.time, data.version)
    //拼接banner
    html += main(data.lists)
    //拼接footer
    html += footer()

    return html
}