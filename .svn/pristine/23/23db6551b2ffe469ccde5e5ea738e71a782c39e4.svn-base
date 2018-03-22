var header, headerHeight = 0;

function fnReadyHeader() {
    header = $api.byId('header');
    if (header) {
        $api.fixStatusBar(header);
        headerHeight = $api.offset(header).h;
    }
};

function getHeaderHeight() {
    var header = $api.byId('header');
    $api.fixStatusBar(header);
    headerHeight = $api.offset(header).h;
    return headerHeight;
}

function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function () {
            api.closeWin();
        };
    }
    api.parseTapmode();
};

function fnReadyKeybackTo(toWinName) {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function () {
            api.closeToWin({
                name: toWinName
            });
        };
    }
    api.parseTapmode();
}

function fnReadyRightBack() {
    var keybacks = $api.domAll('#right_btn');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function () {
            api.closeWin();
        };
    }
    api.parseTapmode();
}

function fnReadyKeyback(frameName, closeID) {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function () {
            api.historyBack({
                frameName: frameName
            }, function (ret, err) {
                if (!ret.status) {
                    api.closeWin();
                } else {
                    if (closeID != null) {
                        $('#' + closeID).show();
                    }
                }
            });
        };
    }
    ;
    if (closeID != null) {
        $api.dom('#' + closeID).onclick = function () {
            api.closeWin();
        }
    }

    api.parseTapmode();
}

//初始化标题栏
function initHeader() {
    var header = $api.byId('header');
    if (header) {
        $api.fixStatusBar(header);
    }
    if (api.systemType == 'android') {
        $('#header').height($('#header').height() + 25);
        $('.mui-content').css({
            paddingTop: $api.offset(header).h
        });
    } else {
        $('#header').height($('#header').height() + 20);
        $('.mui-content').css({
            paddingTop: $api.offset(header).h
        });
    }
    headerHeight=$('#header').height();
    return $('#header').height();
}

function closeWin() {
    api.closeWin();
}
function fnHeaderWin(title, frameName, url, pageParam) {
    pageParam.frameName = frameName;
    pageParam.url = "widget://html" + url;
    pageParam.name = title;

    api.openWin({
        name: frameName + '-win',
        url: 'widget://html/base/base-header.html',
        reload: true,
        pageParam: pageParam
    });
}

/**
 * 格式化当前日期（yyyy-MM-dd HH:mm:ss）
 */
function fnGetNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 * 格式化时间戳（yyyy-MM-dd HH:mm:ss）
 */
function fnFormatDate(timetemp) {
    var date = new Date();
    date.setTime(timetemp);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 * 格式化桩号值
 */
function fnFormatMile(mile) {
    try {
        var mileInt = parseInt(mile / 1000);
        var mileDec = 0;
        if (mile % 1000 == 0) {
            mileDec = 0;
        } else {
            mileDec = mile - mileInt * 1000;
        }
        mileDec = Number(mileDec).toFixed(2);
        var mileIntStr = "";
        if (mileInt < 0)
            mileIntStr = mileInt + "";
        else {
            if (mileInt < 100) {
                mileIntStr += "0";
            }
            if (mileInt < 10) {
                mileIntStr += "0";
            }
            mileIntStr += mileInt + "";
        }
        var mileDecStr = "";
        var d = mileDec;
        var int_mile = parseInt(d);
        if (int_mile < 0)
            mileDecStr = int_mile + "";
        else {
            if (mileDec < 100) {
                mileDecStr += "0";
                if (mileDec < 10) {
                    mileDecStr += "0";
                }
            }
            if (d - int_mile > 0)
                mileDecStr += mileDec + "";
            else
                mileDecStr = mileDecStr + int_mile + "";
        }
        var mileStr = "K" + mileIntStr + "+" + mileDecStr;
        return mileStr;
    } catch (e) {
        return '';
    }
}

/**
 * 获取UUID
 */
function fnGetUUID() {
    var len = 32;
    //32长度
    var radix = 16;
    //16进制
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

var PI = Math.PI;
var x_pi = PI * 3000.0 / 180.0;
/**
 * 百度经纬度转火星坐标
 */
function fnGGLocation(bd_lat, bd_lon) {
    var x = Number(bd_lon) - 0.0065;
    var y = Number(bd_lat) - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lat = z * Math.sin(theta);
    var gg_lon = z * Math.cos(theta);
    var gglatlng = {};
    gglatlng.lat = gg_lat;
    gglatlng.lon = gg_lon;
    return gglatlng;
}

var EARTH_RADIUS = 6378137.0;
//地球半径（单位M）
function getRad(d) {
    return d * PI / 180.0;
}

/**
 * 计算两经纬度间的距离
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function fnGetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);
    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    return s;
}
//返回创建时间
function returnCreateTime() {
    var time = new Date();
    time.setTime($api.getStorage('systemTime'));
    var date = new Date();
    time.setHours(date.getHours());
    time.setMinutes(date.getMinutes());
    time.setSeconds(date.getSeconds());
    return time.getTime();
}
function fnReadyHeader2() {
    header = $api.byId('header');
    if (header) {
        $api.fixStatusBar(header);
        headerHeight = $api.offset(header).h;
    }
};
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * 将form表单封装成json
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    //console.log(JSON.stringify(o))
    return o;
};
