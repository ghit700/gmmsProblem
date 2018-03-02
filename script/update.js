//更新新版本
function checkUpdate() {
    var mam = api.require('mam');
    mam.checkUpdate(function (ret, err) {
        if (ret && ret != undefined) {
            var result = ret.result;
            if (result != undefined && result.update == true) {
                var unitAndDes = result.updateTip.split(';');
                //根据用户单位进行更新(2:LYJD)
                // if (unitAndDes[0] == $api.getStorage('systemId')) {
                    if (result.closed == false) {
                        api.confirm({
                            title: '有新的版本,是否下载并安装 ',
                            msg: unitAndDes[1],
                            buttons: ['确定', '取消']
                        }, function (ret, err) {
                            if (ret.buttonIndex == 1) {
                                downloadAPK(result);
                            }
                        });
                    } else {
                        downloadAPK(result);
                    }
                // }
            }
        } else {
//			api.alert({
//				msg : err.msg
//			});
        }
    });
}

//下载apk
function downloadAPK(result) {
    if (api.systemType == "android") {
        api.download({
            url: result.source,
            savePath: 'fs://' + api.appName + '-' + result.version + '.apk',
            report: true
        }, function (ret, err) {
            if (ret && 0 == ret.state) {/* 下载进度 */
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '正在下载...',
                    text: '' + ret.percent + '%',
                    modal: true
                });
            }
            if (ret && 1 == ret.state) {/* 下载完成 */
                var savePath = ret.savePath;
                api.hideProgress();
                api.closeWidget({
                    silent: true,
                    id: 'A6935441460109'
                });
                api.installApp({
                    appUri: savePath
                });
            }
        });
    }
    if (api.systemType == "ios") {
        api.installApp({
            appUri: result.source
        });
    }
}