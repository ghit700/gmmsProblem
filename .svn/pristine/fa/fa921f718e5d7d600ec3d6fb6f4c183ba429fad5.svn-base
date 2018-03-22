/**
 * Created by wzn on 2017/3/27.
 */
var ble;
function initBle(callback) {
    ble = api.require('ble');
    ble.initManager(function (ret) {
        if (callback != undefined) {
            callback(ret);
        }
    });
}

function startBleScan() {
    var ble = api.require('ble');
    ble.scan({}, function (ret) {
        if (!ret.status) {
            startBleScan();
        }
    });
}

function getBleMsg(callback) {
    var ble = api.require('ble');
    ble.getPeripheral(function (ret) {
        callback(ret);
    });
}

function stopBleScan() {
    var ble = api.require('ble');
    ble.stopScan();
}