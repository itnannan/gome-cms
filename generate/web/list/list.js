

function versionList(platform,details){
    const str = function(){
      if(platform == 'ios'){
        return 'iOS平台'
      }else if(platform == 'windows'){
        return 'Windows平台'
      }else if(platform == 'android'){
        return 'Android平台'
      }else if(platform == 'mac'){
        return 'Mac平台'
      }
    }

    const listText = list(details)
    return `<ul class="ver-ul" id="${platform}">
        <li class="first-li">
          <a href="javascript:;">`
            + str()+
            `<span></span>
          </a>
        </li>`
       + listText + 
      `</ul>`
}

function list(details){
    let text = ''
    for(let i=0; i<details.length; i++){
      if(i == details.length-1){
        text += `<li class="ver-li last-li">
          <a href="/detail/${details[i].platform}-${details[i].version}.html" class="ver-li-a">
            ${details[i].title}
            <span></span>
          </a>
          <p>发布日期：${details[i].time}</p>
        </li>`
      }else{
        text += `<li class="ver-li">
          <a href="/detail/${details[i].platform}-${details[i].version}.html" class="ver-li-a">
            ${details[i].title}
            <span></span>
          </a>
          <p>发布日期：${details[i].time}</p>
        </li>`
      }
    }
    return text
}

function footer(){
    return `</div>
          </div>
          <div>
        </div>
        <script src="/js/versionList.js"></script>
        </body>
        </html>`
}
function header(){
    return `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
              <title>国美互联网企业云－－登录</title>
              <link rel="stylesheet" type="text/css" href="/css/versionList.css">
            </head>
            <body>
            <div class="main clearfix">
             <div class="header-box">
                <div class="header">
                  <div class="fl clearfix">
                    <a class="fl title" href="/main/main.html">国美互联网企业云</a>
                  </div>
                  <a href="/main/main.html" class="fc">下载</a>
                  <div class="fr">
                    <a class="fl login-btn" href="/login.html">登录</a>
                    <a class="fl create-company-btn" href=/createCompany/createCompany.html" >创建公司</a>
                  </div>
                </div>
              </div>
              <div class="ver-bottom clearfix">
                <div class="ver-bottom-box clearfix">
                  <h3>美办更新日志</h3>`
}

/*data = {
  windows:[
    {}
  ],
  ios:[{}],
  ...
}*/
module.exports = function(data){
    let html = ''
    //拼接头部
    html += header()
    //拼接列表
    html += versionList('ios', data.ios)
    html += versionList('android', data.android)
    html += versionList('mac', data.mac)
    html += versionList('windows', data.windows)
    //拼接footer
    html += footer()

    return html
}