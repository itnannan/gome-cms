module.exports = {
    windows: function(data){
        return `<div class="windows-content show">
            <div class="download">
                <p class="title">${data.title}</p>
                <p class="slogan">${data.summary}</p>
                <p class="size-version"><span class="size">大小：${data.size}</span><span class="version">版本：${data.version}</span></p>
                <p class="system-time"><span class="system">适应系统：${data.system}</span><span class="time">发布日期： ${data.date}</span></p>
                <a href="${data.address}" class="download-btn"><span>Windows版</span></a>
            </div>
            <div class="version-list">
                <p class="title">更新日志</p>
                <ul>
                    <li><a href="../detail/windows-v1.1.1.html">美办1.1.1 for Windows 优化版本更新机制；支持消息复制，删除，撤回等操作<span class="time">待定</span></a></li>
                    <li><a href="../detail/windows-v1.1.0.html">美办1.1.0 for Windows 优化群聊人员管理，优化消息提醒<span class="time">2017-5-12</span></a></li>
                    <li><a href="../detail/windows-v1.0.1.html">美办1.0.1 for Windows 新增文件传输，搜索功能实现<span class="time">2017-3-30</span></a></li>
                    <li><a href="../detail/windows-v1.0.0.html">美办1.0.0 for Windows 企业通讯录展示，支持单聊群聊<span class="time">2017-3-9</span></a></li>
                </ul>
                <a class="more" href="../versionList/versionList.html#Windows">查看更多>></a>
            </div>
        </div>
        </div>
            <script src="main.js"></script>
        </body>
        </html>`
    }
};