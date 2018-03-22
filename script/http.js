/**
 * Created by wzn on 2017/2/27.
 */
function post(relativeUrl, param, success, errFun) {
    api.ajax({
        url: $api.getStorage('gmms_url') + relativeUrl,
        method: 'post',
        timeout: 20,
        dataType: 'json',
        returnAll: false,
        data: {
            values: param,
        }
    }, function (ret, err) {
        dealMsg(ret, err, success, errFun);
        api.hideProgress();
    });
}
function postNone(relativeUrl, param, callback) {
    api.ajax({
        url: $api.getStorage('gmms_url') + relativeUrl,
        method: 'post',
        timeout: 20,
        dataType: 'json',
        returnAll: false,
        data: {
            values: param,
        }
    }, function (ret, err) {
        callback(ret, err);
    });
}

function upload(relativeUrl, param, files, success, errFun) {
    api.ajax({
        url: $api.getStorage('gmms_url') + relativeUrl,
        method: 'post',
        timeout: 30,
        dataType: 'json',
        returnAll: false,
        data: {
            values: param,
            files: files
        }
    }, function (ret, err) {
        dealMsg(ret, err, success, errFun);
    });
}

function download(relativeUrl, param, success, errFun) {
    api.ajax({
        url: $api.getStorage('gmms_url') + relativeUrl,
        method: 'post',
        timeout: 100,
        dataType: 'json',
        returnAll: false,
        data: {
            values: param
        }
    }, function (ret, err) {
        dealMsg(ret, err, success, errFun);

    });
}

function dealMsg(ret, err, success, errFun) {
    if (ret != undefined && ret.success) {
        success(ret);
    } else if (errFun != undefined && typeof (errFun) == "function") {
        if (ret != undefined && ret.errorMsg != undefined && ret.errorMsg != "") {
            errFun(ret.errorMsg);
        } else {
            errFun(err.msg);
        }
    } else {
        if (ret != undefined && ret.errorMsg != undefined && ret.errorMsg != "") {
            api.toast({
                msg: ret.errorMsg,
                duration: 2000,
                location: 'bottom'
            });
        } else {
            api.toast({
                msg: err.msg,
                duration: 2000,
                location: 'bottom'
            });
        }
    }
}

