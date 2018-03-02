/**
 * Created by wzn on 2018/1/17.
 */
/**
 * 数据管理js（主要处理基础数据的下载，任务数据的下载，数据的上传）
 */
//载入基础数据
function loadBaseData() {
    var sql = "select id from " + TB_zone + " t ";
    var ret = fnSelectSync(sql);
    if (ret.data != undefined && ret.data.length > 0) {
        return true;
    } else {
        api.confirm({
            title: '提示',
            msg: '正常使用前，请先下载基础数据。',
            buttons: ['确定', '取消']
        }, function (ret, err) {
            if (ret.buttonIndex == 1) {
                api.showProgress({
                    title: '下载基础数据中...',
                    modal: true
                });
                download("/modules/mobile/task/fire-task!downAllZoneData.action", {
                    userId: $api.getStorage('user').id
                }, function (ret) {
                    insertBaseData(ret);
                    api.hideProgress();
                    alert("基础数据下载完成");
                    loadNewTask(5);
                }, function (err) {
                    api.hideProgress();
                    if (err != undefined) {
                        alert("下载基础数据失败," + err);
                    } else {
                        alert("下载基础数据失败");
                    }
                });
            }
        });
        return false;
    }

}

//获取新的任务
function loadNewTask(type) {
    var sql = "select id from " + TB_task_detail + " t ";
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var taskIds = "";
        $.each(ret.data, function (i, task) {
            taskIds += "," + task.id;
        });
        if (taskIds.length > 0) {
            post("/modules/mobile/task/fire-task!isNewTask.action", {
                userId: $api.getStorage('user').id,
                taskIds: taskIds.substring(1),
                type: type
            }, function (ret) {
                var taskType="";
                switch (type){
                    case 1:
                        break;
                    case 1:
                        break;
                    case 1:
                        break;
                    case 1:
                        break;
                    case 1:
                        break;
                }
                if (ret != undefined && ret.success && ret.count > 0) {
                    api.confirm({
                        title: '提示',
                        msg: '正常使用前，请先下载任务数据。',
                        buttons: ['确定', '取消']
                    }, function (ret, err) {
                        if (ret.buttonIndex == 1) {
                            downloadTaskData(taskIds.substring(1), type);
                        }
                    });
                }
            }, function (err) {

            });

        }
    } else {
        var taskIds = "";
        post("/modules/mobile/task/fire-task!isNewTask.action", {
            userId: $api.getStorage('user').id,
            taskIds: taskIds,
            type: type
        }, function (ret) {
            if (ret != undefined && ret.success && ret.count > 0) {
                api.confirm({
                    title: '提示',
                    msg: '正常使用需下载任务数据,是否下载？',
                    buttons: ['确定', '取消']
                }, function (ret, err) {
                    if (ret.buttonIndex == 1) {
                        downloadTaskData(taskIds, type);
                    }
                });
            }
        }, function (err) {

        });
    }
}
//下载任务基础数据
function downloadBaseData(taskIds) {
    api.showProgress({
        title: '下载数据中...',
        modal: true
    });
    download("/modules/mobile/task/fire-task!downloadData.action", {
        userId: $api.getStorage('user').id,
        systemId: $api.getStorage('systemId'),
        downloadTaskIds: taskIds
    }, function (ret) {
        insertBaseData(ret);
        api.hideProgress();
        alert("下载完成");
    }, function (err) {
        api.hideProgress();
        if (err != undefined) {
            alert("下载数据失败," + err);
        } else {
            alert("下载数据失败");
        }
    });
}
//下载任务数据
function downloadTaskData(taskIds, type) {
    api.showProgress({
        title: '下载任务数据中...',
        modal: true
    });
    download("/modules/mobile/task/fire-task!downloadTaskData.action", {
        userId: $api.getStorage('user').id,
        type: type,
        downloadTaskIds: taskIds
    }, function (ret) {
        insertBaseData(ret);
        api.hideProgress();
        alert("任务数据下载完成");
        api.execScript({
            name: 'check-zone-header',
            frameName: 'check-zone',
            script: 'loadData();'
        });
    }, function (err) {
        api.hideProgress();
        if (err != undefined) {
            alert("下载任务数据失败," + err);
        } else {
            alert("下载任务数据失败");
        }
    });
}

//删除已过期任务数据
function deleteOldTask() {
    var time = $api.getStorage('systemTime');
    var sql = "select t.id from " + TB_task_detail + " t where t.endDate <" + time;
    var ret = fnSelectSync(sql);
    if (ret.status && ret.data.length > 0) {
        $.each(ret.data, function (i, task) {
            //1.任务明细
            deleteTableByCondition(TB_task_detail, " t.id=" + task.id);
            //2.任务维护实体
            deleteTableByCondition(TB_task_vindicate, " t.taskId=" + task.id + " and (t.uploadStatus=1 or t.uploadStatus is null)");
            //3.任务维护内容
            deleteTableByCondition(TB_task_vindicate_content, " t.taskId=" + task.id);
            //4.任务维护值表
            deleteTableByCondition(TB_task_item_value, " t.taskId=" + task.id + " and (t.status=1 or t.status is null)");
        });
    }
}

/******************************上传数据*****************************************/
var isUpload = false;
//上传全部内容
function uploadAllData(callback) {
    if ($api.getStorage('online') != 0) {
        if (isUpload == false) {
            isUpload = true;
            var sql = "select * from " + TB_task_vindicate + " t where t.uploadStatus=0 and t.status=2";
            var ret = fnSelectSync(sql);
            if (ret != undefined && ret.status && ret.data.length > 0) {
                uploadTaskVindicate(ret.data[0], 0, ret.data, callback);
            } else {
                uploadFailData();
                if (callback != undefined) {
                    api.hideProgress();
                }
            }
        } else {
            if (callback != undefined) {
                api.hideProgress();
                api.toast({
                    msg: '正在上传数据中...',
                    duration: 2000,
                    location: 'bottom'
                });
            }
        }
    } else {
        if (callback != undefined) {
            api.hideProgress();
            api.toast({
                msg: '没有网络无法上传',
                duration: 2000,
                location: 'bottom'
            });
        }

    }

}
//上传检查项目和功能位置检查
function uploadTaskItemValue(tiv, index, lstTivs, tv, lstTvs, tvIndex, callback) {
    if (index == lstTivs.length) {
        if (isUploadTaskItemValueAll(tv.devicePlaceId, tv.taskId)) {
            var files;
            if (tv.annexIds != "") {
                files = $api.strToJson(tv.annexIds);
            }
            upload("/modules/mobile/task/fire-task!syncAllTunnelEventNormalLyxf.action", {
                dpId: tv.devicePlaceId,
                taskId: tv.taskId,
                lat: tv.lat,
                lon: tv.lon,
                bd_lat: tv.bd_lat,
                bd_lon: tv.bd_lon,
                userId: $api.getStorage('user').id,
                type: tv.type,
                time: tv.updateTime
            }, files, function (json) {
                var listMap = [{name: 'uploadStatus', val: 1}, {name: 'annexIds', val: ""}];
                fnUpdateSync(TB_task_vindicate, listMap, " id=" + tv.id);
//                    //删除图片
                if (files != undefined && files.tvPhotos != undefined) {
                    $.each(files.tvPhotos, function (i, path) {
                        var sql = "select count(*) as count  from " + TB_task_vindicate + " t where t.annexIds like '%" + path + "%' and (t.uploadStatus is null or t.uploadStatus=0)";
                        var ret = fnSelectSync(sql);
                        if (ret.status && ret.data.length > 0 && ret.data[0].count == 0) {
                            deleteFile(path);
                        }
                    });
                }
                if (lstTvs != undefined) {
                    tvIndex++;
                    uploadTaskVindicate(lstTvs[tvIndex], tvIndex, lstTvs, callback);
                }
                queryNonUploadDataCount();
            }, function (err) {
                if (lstTvs != undefined) {
                    tvIndex++;
                    uploadTaskVindicate(lstTvs[tvIndex], tvIndex, lstTvs, callback);
                }
            });
        } else if (lstTvs != undefined) {
            tvIndex++;
            uploadTaskVindicate(lstTvs[tvIndex], tvIndex, lstTvs, callback);
        }
        return;
    }
    var files;
    if (tiv.files != "") {
        files = $api.strToJson(tiv.files);
    }
    upload("/modules/mobile/task/fire-task!syncTunnelEventLyxf.action", {
        taskDetailId: tiv.taskId,
        devicePlaceId: tiv.devicePlaceId,
        creator: tiv.creator,
        taskItem: tiv.taskItemId,
        remark: tiv.remark,
        resultType: tiv.resultType,
        resultValue: tiv.resultValue,
        lesseeId: tiv.lesseeId,
        inspectionItemId: tiv.inspectionItemId,
        componentId: tiv.componentId,
        isNormal: tiv.isNormal,
        time: tiv.createTime,
        type: tiv.type
    }, files, function (json) {
        var taskItemSQL = "taskItemId=" + tiv.taskItemId;
        if (tiv.taskItemId == "" || tiv.taskItemId == null) {
            taskItemSQL = "taskItemId is null ";
        }
        var listMap = [{name: 'status', val: 1}, {name: 'files', val: ""}];
        fnUpdateSync(TB_task_item_value, listMap, " taskId =" + tiv.taskId + " and devicePlaceId=" + tiv.devicePlaceId + " and " + taskItemSQL);
        if (files != undefined && files.image != undefined) {
            $.each(files.image, function (i, path) {

                deleteFile(path);

            });
        }
        index++;
        uploadTaskItemValue(lstTivs[index], index, lstTivs, tv, lstTvs, tvIndex, callback);

    }, function (err) {
        tvIndex++;
        uploadTaskVindicate(lstTvs[tvIndex], tvIndex, lstTvs, callback);
    });
}

function uploadTaskVindicate(tv, index, lstTvs, callback) {
    if (callback != undefined) {
        showProgress(lstTvs.length, index, '上传数据中...');
    }
    if (index != lstTvs.length) {
        var sql = "select * from " + TB_task_item_value + " t where t.status=0 and t.taskId=" + tv.taskId +
            " and t.devicePlaceId=" + tv.devicePlaceId;
        var tivRet = fnSelectSync(sql);
        if (tivRet != undefined && tivRet.status && tivRet.data.length > 0) {
            uploadTaskItemValue(tivRet.data[0], 0, tivRet.data, tv, lstTvs, index, callback);
        } else {
            if (isUploadTaskItemValueAll(tv.devicePlaceId, tv.taskId)) {
                var files;
                if (tv.annexIds != "") {
                    files = $api.strToJson(tv.annexIds);
                }
                upload("/modules/mobile/task/fire-task!syncAllTunnelEventNormalLyxf.action", {
                    dpId: tv.devicePlaceId,
                    taskId: tv.taskId,
                    lat: tv.lat,
                    lon: tv.lon,
                    bd_lat: tv.bd_lat,
                    bd_lon: tv.bd_lon,
                    userId: $api.getStorage('user').id,
                    type: tv.type,
                    time: tv.updateTime
                }, files, function (json) {
                    var listMap = [{name: 'uploadStatus', val: 1}, {name: 'annexIds', val: ""}];
                    fnUpdateSync(TB_task_vindicate, listMap, " id=" + tv.id);
                    //删除图片
                    if (files != undefined && files.tvPhotos != undefined) {
                        $.each(files.tvPhotos, function (i, path) {
                            var sql = "select t.id  from " + TB_task_vindicate + " t where t.annexIds like '%" + path + "%' and (t.uploadStatus is null or t.uploadStatus=0)";
                            var ret = fnSelectSync(sql);
                            if (ret.status && ret.data.length > 0 && ret.data[0].count == 0) {
                                deleteFile(path);
                            }
                        });
                    }
                    index++;
                    uploadTaskVindicate(lstTvs[index], index, lstTvs, callback);

                }, function (err) {
                    index++;
                    uploadTaskVindicate(lstTvs[index], index, lstTvs, callback);
                });
            } else {
                index++;
                uploadTaskVindicate(lstTvs[index], index, lstTvs, callback);
            }
        }
        if (isHasParentAndHasChild(tv.devicePlaceId)) {
            sql = "select t.id from " + TB_device_place + " t where t.parentId=" + tv.devicePlaceId;
            var childRet = fnSelectSync(sql);
            if (childRet.status && childRet.data.length > 0) {
                $.each(childRet.data, function (i, dp) {
                    sql = "select * from " + TB_task_item_value + " t where t.status=0 and t.taskId=" + tv.taskId +
                        " and t.devicePlaceId=" + dp.id;
                    var tivRet = fnSelectSync(sql);
                    if (tivRet != undefined && tivRet.status && tivRet.data.length > 0) {
                        uploadTaskItemValue(tivRet.data[0], 0, tivRet.data, tv, undefined, undefined, callback);
                    }
                });
            }
        }
    } else {
        if (callback != undefined) {
            callback();
            api.hideProgress();
        }
        queryNonUploadDataCount();
        isUpload = false;
    }
}

function uploadData() {
    if (queryNonUploadDataCount() > 0) {
        api.showProgress({
            title: '上传中...',
            modal: true
        });
        uploadAllData(function () {
            queryNonUploadDataCount();
        });
    } else {
        uploadFailData();
        api.toast({
            msg: '无上传数据',
            duration: 2000,
            location: 'bottom'
        });
        api.hideProgress();
    }

}
//上传功能位置上传成功项目值表上传失败的项目值表
function uploadFailData() {
    var sql = " select t.* from " + TB_task_item_value + " t where t.status=0 and exists" +
        "(select 1 from " + TB_task_vindicate + " d where d.devicePlaceId=t.devicePlaceId and d.uploadStatus=1" +
        " and d.taskId=t.taskId )";
    var ret = fnSelectSync(sql);
    if (ret.status && ret.data.length > 0) {
        uploadTaskItemValue(ret.data[0], 0, ret.data);
    }
}
//十分钟自动上传数据
function autoUploadData() {
    var rate = 10 * 60 * 1000;
    onlineTimer = window.setInterval(function () {
        if ($api.getStorage('online') != 0 && queryNonUploadDataCount() > 0) {
            uploadAllData();
        }
    }, rate);
}