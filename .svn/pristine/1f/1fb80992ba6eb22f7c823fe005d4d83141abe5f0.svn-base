//定位
var onlineTimer;
//开始定位
function startLocation() {
    var map = api.require('bMap');
    if (api.systemType == 'android') {
        getLocation();
    } else {
        getLocation();
        map.initMapSDK(function (ret, err) {
            if (ret.status) {
                getLocation();
            }
        });
    }

    // baiduLocation = api.require('baiduLocation');
    // baiduLocation.startLocation({
    //     accuracy: '100m',
    //     filter: 1,
    //     autoStop: true
    // }, function (ret, err) {
    //     saveLocation(ret);
    // });
    //
    // var rate = 10 * 1000;
    // onlineTimer = window.setInterval(function () {
    //     baiduLocation.getLocation(function (ret, err) {
    //         saveLocation(ret);
    //     });
    // }, rate);
}
function getLocation() {
    var bMap = api.require('bMap');
    bMap.getLocationServices(function (ret, err) {
        if (ret.enable) {
            onlineTimer = window.setInterval(function () {
                bMap.getLocation({
                    accuracy: '100m',
                    autoStop: true,
                    filter: 1
                }, function (ret, err) {
                    alert(JSON.stringify(ret));
                    saveLocation(ret);
                });
            }, 20000);

        } else {
            alert("未开启定位功能！");
        }
    });
}
function getLastLocation(func) {
    var bMap = api.require('bMap');
    bMap.getLocationServices(function (ret, err) {
        if (ret.enable) {
            if (api.systemType == 'android') {
                bMap.getLocation({
                    accuracy: '100m',
                    autoStop: true,
                    filter: 1
                }, function (ret, err) {
                    saveLocation(ret, func);
                });
            }else{
                bMap.initMapSDK(function (ret, err) {
                    if (ret.status) {
                        bMap.getLocation({
                            accuracy: '100m',
                            autoStop: true,
                            filter: 1
                        }, function (ret, err) {
                            saveLocation(ret, func);
                        });
                    }
                });
            }

        } else {
            alert("未开启定位功能！");
        }
    });
}

function saveLocation(ret, func) {
    if (ret.status) {
        var geo = {
            lat: ret.lat,
            lon: ret.lon
        };
        $api.setStorage('geo', geo);
        func();
        var gglatlng = fnGGLocation(geo.lat, geo.lon);
        var geturl = $api.getStorage("arcgis_url") + '?x=' + gglatlng.lon + '&y=' + gglatlng.lat;
        api.ajax({
            url: geturl,
            timeout: 10,
            dataType: 'text'
        }, function (result, err) {
            var mile = 0;
            if (result) {
                var info = result.split(',');
                var code = info[0];
                mile = info[1];
                var arcgis = {
                    code: code,
                    mile: mile
                };
                $api.setStorage('arcgis', arcgis);
            } else {
            }
        });
    }
}

//停止定位
function stopLocation() {
    window.clearInterval(onlineTimer);
    var bMap = api.require('bMap');
    bMap.stopLocation();

}
//返回距离
function distance(code, beginMile, endMile) {
    var arcgis = $api.getStorage('arcgis');
    if (arcgis != undefined) {
        if (code == arcgis.code) {
            var beginDistance = Math.abs(beginMile - arcgis.mile);
            var endDistance = Math.abs(endMile - arcgis.mile);
            return beginDistance > endDistance ? endDistance : beginDistance;
        } else {
            return -1;
        }
    } else {
        return -1;
    }
}



