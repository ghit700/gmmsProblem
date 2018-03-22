//绑定用户
function bind() {
    var ajpush = api.require('ajpush');
    if (api.systemType == 'android') {
        ajpush.init(function (ret) {
            if (ret != undefined && ret.status) {
            }
        });
    }
    ajpush.bindAliasAndTags({
        alias: api.deviceId.replace(/-/g, ""),
    }, function (ret) {
    });

    //恢复推送
    ajpush.isPushStopped(function (ret) {
        if (ret != undefined && ret.isStopped == 1) {
            ajpush.resumePush(function (ret) {
                if (ret && ret.status) {

                }
            });
        }
    });

}

//设置监听
function pushListener() {
    var ajpush = api.require('ajpush');
    ajpush.setListener(function (ret) {
        api.execScript({
            name: 'main',
            frameName: 'main-body',
            script: 'fnRefreshTask();'
        });
        api.notification({
            notify: {
                title: api.appName, //标题，默认值为应用名称，只Android有效
                content: ret.content, //内容，默认值为'有新消息'
                extra: ret.extra
            },

        }, function (ret, err) {
            var id = ret.id;
        });

    });

}

//解除绑定
function unbind() {
    var ajpush = api.require('ajpush');
    ajpush.stopPush(function (ret) {
    });
}

