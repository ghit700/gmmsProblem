var db;

var DATABASE = 'gmms_fire_task';
//数据库名称
/**
 *服务器地址配置表
 */
var TB_service_addr = 'ar_service_addr';
/**
 * 用户信息表
 */
var TB_user = 'ss_user';
//任务维护实体
var TB_task_vindicate = 'task_vindicate';
var TB_task_vindicate_content = 'task_vindicate_content';
var TB_task_item = 'task_item';
var TB_task_item_value = 'task_item_value';
var TB_task_detail = 'task_detail';
var TB_task_master = 'task_master';
var TB_standard_task = 'standard_task';
var TB_device_place = 'device_place';
var TB_road_line = 'road_line';
var TB_component = 'component';
var TB_item = 'item';
var TB_zone = 'zone';
var TB_permission_item = 'permission_item';
var TB_business_todo = 'business_todo';
var TB_business = 'business';
var TB_infomation_map_user = 'infomation_map_user';
var TB_problem = 'problem';
//基本变量
/**
 * 龙岩机电获取的任务类型
 */
var lyxfCheckItemName = "日常检查";
/**
 * 龙岩机电夜间巡查任务类型
 */
var lyxfNightCheckItemName = "夜间检修";
/**
 * 初始化
 */
function fnInitDB() {
    db = api.require('db');
};
/**
 *打开数据库
 */
function fnOpenDatabase() {
    db = api.require('db');
    var ret = db.openDatabaseSync({
        name: DATABASE,
    });
    if (ret.status) {
        //创建服务器地址表
        var listMap = '[{"attr":"id","dataType":"INTEGER"},' + //编号
            ' {"attr":"server_addr","dataType":"VARCHAR(100)"},' + //服务器地址
            ' {"attr":"arcgis_addr","dataType":"VARCHAR(100)"},' + //arcgis服务地址
            '	{"attr":"rember_name","dataType":"VARCHAR(30)"},' + //记住用户名
            '	{"attr":"rember_pwd","dataType":"VARCHAR(50)"}' + //记住密码
            ']';
        ret = fnCreateTBSync(TB_service_addr, $api.strToJson(listMap));
        if (ret.status) {
            ret = fnSelectSync('SELECT * FROM ' + TB_service_addr);
            if (ret.status && ret.data.length <= 0) {//如果不存在则新增一条默认值
                var listMap = '[{"name":"id","val":1},' + '{"name":"server_addr","val":"http://117.29.161.2:4881/gmms/"},' + '{"name":"arcgis_addr","val":"http://117.29.161.2:4080/getgpsservice/location2Mile"}' + ']';
                fnInsertSync(TB_service_addr, $api.strToJson(listMap));
            }
        }
        //任务明细
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"startDate","dataType":"FLOAT"},' +
            '{"attr":"endDate","dataType":"FLOAT"},' +
            '{"attr":"itemName","dataType":"VARCHAR(100)"},' +
            '{"attr":"taskMasterId","dataType":"INTEGER"}' +
            ']';
        ret = fnCreateTBSync(TB_task_detail, $api.strToJson(listMap));
        //年度任务
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"frequencyUnit","dataType":"INTEGER"},' +
            '{"attr":"taskTypeId","dataType":"INTEGER"},' +
            '{"attr":"taskTypeName","dataType":"VARCHAR(20)"},' +
            '{"attr":"standardTaskId","dataType":"INTEGER"}' +
            ']';
        ret = fnCreateTBSync(TB_task_master, $api.strToJson(listMap));
        //标准任务
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"isCode","dataType":"INTEGER"}' +
            ']';
        ret = fnCreateTBSync(TB_standard_task, $api.strToJson(listMap));
        //任务维护实体
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"taskId","dataType":"INTEGER"},' +
            '{"attr":"status","dataType":"INTEGER"},' +
            '{"attr":"uploadStatus","dataType":"INTEGER"},' +
            ' {"attr":"annexIds","dataType":"VARCHAR(500)"},' +
            ' {"attr":"devicePlaceId","dataType":"INTEGER"},' +
            ' {"attr":"type","dataType":"VARCHAR(20)"},' +
            ' {"attr":"updateTime","dataType":"FLOAT"},' +
            ' {"attr":"lat","dataType":"FLOAT"},' +
            ' {"attr":"lon","dataType":"FLOAT"},' +
            ' {"attr":"bd_lat","dataType":"FLOAT"},' +
            ' {"attr":"bd_lon","dataType":"FLOAT"}' +
            ']';
        ret = fnCreateTBSync(TB_task_vindicate, $api.strToJson(listMap));
        //任务维护内容
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"taskId","dataType":"INTEGER"},' +
            '{"attr":"devicePlaceIds","dataType":"VARCHAR(200)"},' +
            '{"attr":"taskItemId","dataType":"INTEGER"}' +
            ']';
        ret = fnCreateTBSync(TB_task_vindicate_content, $api.strToJson(listMap));
        //维护项目
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"inspectionItemId","dataType":"INTEGER"},' +
            '{"attr":"inspectionItemName","dataType":"VARCHAR(20)"},' +
            '{"attr":"unit","dataType":"VARCHAR(20)"},' +
            '{"attr":"resultType","dataType":"INTEGER"},' +
            '{"attr":"taskTypeId","dataType":"INTEGER"},' +
            '{"attr":"isNoShowRemark","dataType":"INTEGER"},' +
            '{"attr":"remarkOtherName","dataType":"VARCHAR(20)"},' +
            '{"attr":"type","dataType":"VARCHAR(20)"},' +
            '{"attr":"desc","dataType":"VARCHAR(20)"},' +
            '{"attr":"resultValue","dataType":"VARCHAR(200)"}' +
            ']';
        ret = fnCreateTBSync(TB_task_item, $api.strToJson(listMap));
        //维护项目值
        listMap = '[{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"taskId","dataType":"INTEGER"},' +
            '{"attr":"devicePlaceId","dataType":"INTEGER"},' +
            '{"attr":"creator","dataType":"INTEGER"},' +
            '{"attr":"taskItemId","dataType":"INTEGER"},' +
            '{"attr":"remark","dataType":"VARCHAR(50)"},' +
            '{"attr":"resultType","dataType":"INTEGER"},' +
            '{"attr":"resultValue","dataType":"VARCHAR(50)"},' +
            '{"attr":"lesseeId","dataType":"INTEGER"},' +
            '{"attr":"inspectionItemId","dataType":"INTEGER"},' +
            '{"attr":"isNormal","dataType":"INTEGER"},' +
            '{"attr":"type","dataType":"VARCHAR(20)"},' +
            '{"attr":"createTime","dataType":"FLOAT"},' +
            '{"attr":"files","dataType":"VARCHAR(500)"},' +
            '{"attr":"status","dataType":"INTEGER"}' +
            ']';
        ret = fnCreateTBSync(TB_task_item_value, $api.strToJson(listMap));
        //功能位置
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"name","dataType":"VARCHAR(50)"},' +
            '{"attr":"roadLineId","dataType":"INTEGER"},' +
            '{"attr":"beginMile","dataType":"FLOAT"},' +
            '{"attr":"endMile","dataType":"FLOAT"},' +
            '{"attr":"componentId","dataType":"INTEGER"},' +
            '{"attr":"itemId","dataType":"INTEGER"},' +
            '{"attr":"parentId","dataType":"INTEGER"},' +
            '{"attr":"code","dataType":"VARCHAR(20)"},' +
            '{"attr":"ibeacon","dataType":"VARCHAR(50)"}' +
            ']';
        ret = fnCreateTBSync(TB_device_place, $api.strToJson(listMap));

        //构件
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"name","dataType":"VARCHAR(50)"}' +
            ']';
        ret = fnCreateTBSync(TB_component, $api.strToJson(listMap));
        //编目
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"zoneId","dataType":"INTEGER"},' +
            '{"attr":"treeName","dataType":"VARCHAR(2048)"},' +
            '{"attr":"name","dataType":"VARCHAR(50)"}' +
            ']';
        ret = fnCreateTBSync(TB_item, $api.strToJson(listMap));
        //养护区域
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"code","dataType":"VARCHAR(10)"},' +
            '{"attr":"name","dataType":"VARCHAR(50)"}' +
            ']';
        ret = fnCreateTBSync(TB_zone, $api.strToJson(listMap));
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"treeCode","dataType":"VARCHAR(50)"},' +
            '{"attr":"beginMile","dataType":"FLOAT"},' +
            '{"attr":"endMile","dataType":"FLOAT"},' +
            '{"attr":"code","dataType":"VARCHAR(10)"},' +
            '{"attr":"type","dataType":"INTEGER"},' +
            '{"attr":"name","dataType":"VARCHAR(50)"}' +
            ']';
        ret = fnCreateTBSync(TB_road_line, $api.strToJson(listMap));
        //增加编目treeName字段
        ret = fnSelectSync("select sql from sqlite_master where tbl_name='" + TB_item + "' and type='table'");
        if (ret.status) {
            if (ret.data[0].sql.indexOf('treeName') < 0) {
                fnExecuteSync("ALTER TABLE " + TB_item + " ADD treeName VARCHAR(2048)");
            }
        }
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"itemName","dataType":"VARCHAR(100)"},' +
            '{"attr":"keyName","dataType":"VARCHAR(100)"},' +
            '{"attr":"icon","dataType":"VARCHAR(200)"},' +
            '{"attr":"isOutline","dataType":"VARCHAR(1)"}' +
            ']';
        ret = fnCreateTBSync(TB_permission_item, $api.strToJson(listMap));
        if (ret.status) {
            db.executeSql({
                name: DATABASE,
                sql: 'CREATE UNIQUE INDEX IF NOT EXISTS ' + TB_permission_item + '_unique_index on ' + TB_permission_item + '(id)'
            }, function (ret, err) {
                if (ret.status) {
                }
                else
                    alert(JSON.stringify(err));
            });
        }
        listMap = '[' +
            '{"attr":"bsnum","dataType":"VARCHAR(100)"},' +
            '{"attr":"flowId","dataType":"VARCHAR(100)"},' +
            '{"attr":"name","dataType":"VARCHAR(100)"},' +
            '{"attr":"createTime","dataType":"FLOAT"},' +
            '{"attr":"endTime","dataType":"FLOAT"},' +
            '{"attr":"authorId","dataType":"INTEGER"},' +
            '{"attr":"status","dataType":"VARCHAR(1)"},' +
            '{"attr":"lesseeId","dataType":"VARCHAR(20)"},' +
            '{"attr":"authorName","dataType":"VARCHAR(50)"}' +
            ']';
        ret = fnCreateTBSync(TB_business, $api.strToJson(listMap));
        if (ret.status) {
            db.executeSql({
                name: DATABASE,
                sql: 'CREATE UNIQUE INDEX IF NOT EXISTS ' + TB_business + '_unique_index on ' + TB_business + '(bsnum)'
            }, function (ret, err) {
                if (ret.status) {
                }
                else
                    alert(JSON.stringify(err));
            });
        }
        listMap = '[' +
            '{"attr":"todoid","dataType":"VARCHAR(100)"},' +
            '{"attr":"flowId","dataType":"VARCHAR(100)"},' +
            '{"attr":"itemId","dataType":"INTEGER"},' +
            '{"attr":"pname","dataType":"VARCHAR(100)"},' +
            '{"attr":"bsnum","dataType":"VARCHAR(100)"},' +
            '{"attr":"createTime","dataType":"FLOAT"},' +
            '{"attr":"currentNodeName","dataType":"VARCHAR(64)"},' +
            '{"attr":"prevNode","dataType":"VARCHAR(100)"},' +
            '{"attr":"prevActor","dataType":"INTEGER"},' +
            '{"attr":"handler","dataType":"INTEGER"},' +
            '{"attr":"status","dataType":"VARCHAR(1)"},' +
            '{"attr":"openFlag","dataType":"VARCHAR(1)"},' +
            '{"attr":"tempidea","dataType":"VARCHAR(200)"},' +
            '{"attr":"remark","dataType":"VARCHAR(200)"},' +
            '{"attr":"beback","dataType":"VARCHAR(1)"},' +
            '{"attr":"lesseeId","dataType":"VARCHAR(50)"},' +
            '{"attr":"currentNode","dataType":"VARCHAR(100)"}' +
            ']';
        ret = fnCreateTBSync(TB_business_todo, $api.strToJson(listMap));
        if (ret.status) {
            db.executeSql({
                name: DATABASE,
                sql: 'CREATE UNIQUE INDEX IF NOT EXISTS ' + TB_business_todo + '_unique_index on ' + TB_business_todo + '(todoid)'
            }, function (ret, err) {
                if (ret.status) {
                } else
                    alert(JSON.stringify(err));
            });
        }
        listMap = '[' +
            '{"attr":"infomationId","dataType":"INTEGER"},' +
            '{"attr":"title","dataType":"VARCHAR(100)"},' +
            '{"attr":"sendTime","dataType":"FLOAT"},' +
            '{"attr":"accepterId","dataType":"INTEGER"},' +
            '{"attr":"openFlag","dataType":"VARCHAR(1)"},' +
            '{"attr":"sender","dataType":"VARCHAR(100)"},' +
            '{"attr":"infoType","dataType":"VARCHAR(10)"}' +
            ']';
        ret = fnCreateTBSync(TB_infomation_map_user, $api.strToJson(listMap));
        listMap = '[' +
            '{"attr":"id","dataType":"INTEGER"},' +
            '{"attr":"zoneId","dataType":"INTEGER"},' +
            '{"attr":"zoneName","dataType":"VARCHAR(100)"},' +
            '{"attr":"bsnum","dataType":"VARCHAR(20)"},' +
            '{"attr":"discoverTime","dataType":"FLOAT"},' +
            '{"attr":"discoverNames","dataType":"VARCHAR(100)"},' +
            '{"attr":"description","dataType":"VARCHAR(4096)"},' +
            '{"attr":"exigenceGrade","dataType":"VARCHAR(10)"},' +
            '{"attr":"treeName","dataType":"VARCHAR(1024)"},' +
            '{"attr":"problemStatus","dataType":"VARCHAR(5)"},' +
            '{"attr":"handlerId","dataType":"INTEGER"},' +
            '{"attr":"nodeName","dataType":"VARCHAR(20)"}' +
            ']';
        ret = fnCreateTBSync(TB_problem, $api.strToJson(listMap));
        if (ret.status) {
            db.executeSql({
                name: DATABASE,
                sql: 'CREATE UNIQUE INDEX IF NOT EXISTS ' + TB_problem + '_unique_index on ' + TB_problem + '(id)'
            }, function (ret, err) {
                if (ret.status) {
                } else
                    alert(JSON.stringify(err));
            });
        }
    }
}

/**
 * 执行sql语句
 * @param {Object} sqlStr
 */
function fnExecuteSync(sqlStr) {
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: sqlStr
    });
    return ret;
}

/**
 * 删除表
 */
function fnDropTBSync(tableName) {
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'DROP TABLE ' + tableName
    });
    return ret;
}

/**
 * 删除数据
 */
function fnDeleteSync(sqlStr) {
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: sqlStr
    });
    return ret;
}

/**
 * 查询语句
 */
function fnSelectSync(sqlStr) {
    var ret = db.selectSqlSync({
        name: DATABASE,
        sql: sqlStr
    });
    return ret;
}

/**
 * 创建表(异步)
 * @param {Object} tableName 表名
 * @param {Object} listMap    包含字段的json数组
 */
function fnCreateTB(tableName, listMap) {
    if (listMap.length <= 0)
        return null;
    var attrStr = '';
    for (var i = 0; i < listMap.length; i++) {
        attrStr += ',' + listMap[i].attr + ' ' + listMap[i].dataType;
    }
    db.executeSql({
        name: tableName,
        sql: 'CREATE TABLE IF NOT EXISTS ' + tableName + '(' + attrStr.substring(1) + ')'
    }, function (ret, err) {
        //		if (ret.status) {
        //	        alert(JSON.stringify(ret));
        //	    } else {
        //	        alert(JSON.stringify(err));
        //	    }
    });
}

/**
 * 创建表(同步)
 * @param {Object} tableName 表名
 * @param {Object} listMap    包含字段的json数组
 */
function fnCreateTBSync(tableName, listMap) {
    if (listMap.length <= 0)
        return null;
    var attrStr = '';
    for (var i = 0; i < listMap.length; i++) {
        attrStr += ',' + listMap[i].attr + ' ' + listMap[i].dataType;
    }
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'CREATE TABLE IF NOT EXISTS ' + tableName + '(' + attrStr.substring(1) + ')'
    });
    return ret;
}

/**
 * 新增记录(异步)
 * @param {Object} tableName 表名
 * @param {Object} listMap 字段名与字段值的json数组
 */
function fnInsert(tableName, listMap) {
    if (listMap.length <= 0)
        return null;
    var attrName = '';
    var attrVal = '';
    for (var i = 0; i < listMap.length; i++) {
        attrName += ',' + listMap[i].name;
        if (isNaN(listMap[i].val)) {
            if (listMap[i].val != 'null' && listMap[i].val != undefined)
                attrVal += ',\'' + listMap[i].val + '\'';
            else
                attrVal += ',null';
        } else {
            if (listMap[i].val != '' && listMap[i].val != null)
                attrVal += ',' + listMap[i].val;
            else
                attrVal += ',null';
        }
    }
    var sqlStr = 'REPLACE INTO ' + tableName + '(' + attrName.substring(1) + ') VALUES(' + attrVal.substring(1) + ')';
    db.executeSql({
        name: DATABASE,
        sql: sqlStr
    }, function (ret, err) {

    });
}

/**
 * 新增记录(同步)
 * @param {Object} tableName 表名
 * @param {Object} listMap 字段名与字段值的json数组
 */
function fnInsertSync(tableName, listMap) {
    if (listMap.length <= 0)
        return null;
    var attrName = '';
    var attrVal = '';
    for (var i = 0; i < listMap.length; i++) {
        attrName += ',' + listMap[i].name;

        if (isNaN(listMap[i].val)) {
            if (listMap[i].val != 'null' && listMap[i].val != undefined)
                attrVal += ',\'' + listMap[i].val + '\'';
            else
                attrVal += ',null';
        } else {
            if (String(listMap[i].val) != '' && listMap[i].val != null)
                attrVal += ',' + listMap[i].val;
            else
                attrVal += ',null';
        }
    }

    var sqlStr = 'REPLACE INTO ' + tableName + '(' + attrName.substring(1) + ') VALUES(' + attrVal.substring(1) + ')';
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: sqlStr
    });

    return ret;
}

/**
 * 更新记录 (同步)
 * @param {Object} tableName 表名
 * @param {Object} updateMap 字段与值的json数组
 * @param {Object} whereStr 条件语句
 */
function fnUpdateSync(tableName, updateMap, whereStr) {
    if (updateMap.length <= 0)
        return null;
    var updateStr = '';
    for (var i = 0; i < updateMap.length; i++) {
        if (isNaN(updateMap[i].val)) {
            if (updateMap[i].val != 'null' && updateMap[i].val != undefined)
                updateStr += ',' + updateMap[i].name + '=\'' + updateMap[i].val + '\'';
            else
                updateStr += ',' + updateMap[i].name + '=null';
        } else {
            if (String(updateMap[i].val) != '' && updateMap[i].val != null)
                updateStr += ',' + updateMap[i].name + '=' + updateMap[i].val;
            else
                updateStr += ',' + updateMap[i].name + '=null';
        }
    }
    var sqlStr = 'UPDATE ' + tableName + ' SET ' + updateStr.substring(1);

    if (whereStr != null && whereStr != '')
        sqlStr += ' WHERE ' + whereStr;
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: sqlStr
    });
    return ret;
}
//判断是否存在该记录，通过id
function isExistsById(tableName, id) {
    var ret = fnSelectSync("SELECT * FROM " + tableName + " where id=" + id);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        return true;
    } else {
        return false;
    }
}
function deleteTable(tableName) {
    var ret = fnDeleteSync("delete from " + tableName);
    if (ret != undefined && ret.status) {
        return true;
    } else {
        return false;
    }
}
function deleteTableByCondition(tableName, condition) {
    var sql = "delete from " + tableName + " t where " + condition;
    var ret = fnDeleteSync(sql);
    if (ret != undefined && ret.status) {
        return true;
    } else {
        return false;
    }
}

//插入基础数据到本地
function insertBaseData(ret) {
    var progress = 0;
    var count = queryBaseDataCount(ret);

    //任务
    if (ret != undefined && ret.lstTaskData != undefined && ret.lstTaskData.length > 0) {
        $.each(ret.lstTaskData, function (i, taskData) {
            //任务明细
            var listMap = [
                {name: 'id', val: taskData.task.id},
                {name: 'startDate', val: taskData.task.startDate},
                {name: 'itemName', val: taskData.task.itemName},
                {name: 'taskMasterId', val: taskData.task.taskMasterId},
                {name: 'endDate', val: taskData.task.endDate},
            ];
            if (!isExistsById(TB_task_detail, taskData.task.id)) {
                fnInsertSync(TB_task_detail, listMap);
            } else {
                fnUpdateSync(TB_task_detail, listMap, " id=" + taskData.task.id);
            }

            showProgress(count, progress++, "下载任务数据中...");

            //年度任务
            var listMap = [
                {name: 'id', val: taskData.taskMaster.id},
                {name: 'frequencyUnit', val: taskData.taskMaster.frequencyUnit},
                {name: 'standardTaskId', val: taskData.taskMaster.standardTaskId},
                {name: 'taskTypeName', val: taskData.taskMaster.taskTypeName},
                {name: 'taskTypeId', val: taskData.taskMaster.taskTypeId},
            ];
            if (!isExistsById(TB_task_master, taskData.taskMaster.id)) {
                fnInsertSync(TB_task_master, listMap);
            } else {
                fnUpdateSync(TB_task_master, listMap, " id=" + taskData.taskMaster.id);
            }

            showProgress(count, progress++, "下载任务数据中...");

            //标准任务
            var listMap = [
                {name: 'id', val: taskData.standardTask.id},
                {name: 'isCode', val: taskData.standardTask.isCode ? 1 : 0},
            ];
            if (!isExistsById(TB_standard_task, taskData.standardTask.id)) {
                fnInsertSync(TB_standard_task, listMap);
            } else {
                fnUpdateSync(TB_standard_task, listMap, " id=" + taskData.standardTask.id);
            }

            showProgress(count, progress++, "下载任务数据中...");

            //任务维护实体
            if (taskData != undefined && taskData.lstTaskVindicates != undefined && taskData.lstTaskVindicates.length > 0) {
                $.each(taskData.lstTaskVindicates, function (i, tv) {
                    var listMap = [
                        {name: 'id', val: tv.id},
                        {name: 'taskId', val: tv.taskId},
                        {name: 'status', val: tv.status},
                        {name: 'devicePlaceId', val: tv.devicePlaceId},
                    ];
                    var tvRet = fnSelectSync("select * from " + TB_task_vindicate + " t where t.id=" + tv.id + " and t.uploadStatus is null ");
                    if (!isExistsById(TB_task_vindicate, tv.id)) {
                        fnInsertSync(TB_task_vindicate, listMap);
                    } else if (tvRet.status && tvRet.data.length > 0) {
                        fnUpdateSync(TB_task_vindicate, listMap, " id=" + tv.id);
                    }

                    showProgress(count, progress++, "下载任务数据中...");

                });
            }

            //任务维护实体内容
            if (taskData != undefined && taskData.lstTvcs != undefined && taskData.lstTvcs.length > 0) {
                $.each(taskData.lstTvcs, function (i, tvc) {
                    var listMap = [
                        {name: 'id', val: tvc.id},
                        {name: 'taskId', val: tvc.taskId},
                        {name: 'devicePlaceIds', val: tvc.devicePlaceIds},
                        {name: 'taskItemId', val: tvc.taskItemId},
                    ];
                    if (!isExistsById(TB_task_vindicate_content, tvc.id)) {
                        fnInsertSync(TB_task_vindicate_content, listMap);
                    } else {
                        fnUpdateSync(TB_task_vindicate_content, listMap, " id=" + tvc.id);
                    }

                    showProgress(count, progress++, "下载任务数据中...");

                });
            }
            //维护项目值
            if (taskData != undefined && taskData.lstTivs != undefined && taskData.lstTivs.length > 0) {
                $.each(taskData.lstTivs, function (i, tiv) {
                    var listMap = [
                        {name: 'id', val: tiv.id},
                        {name: 'taskId', val: tiv.taskId},
                        {name: 'devicePlaceId', val: tiv.devicePlaceId},
                        {name: 'creator', val: tiv.creator},
                        {name: 'taskItemId', val: tiv.taskItemId},
                        {name: 'remark', val: tiv.remark},
                        {name: 'resultType', val: tiv.resultType},
                        {name: 'resultValue', val: tiv.resultValue},
                        {name: 'lesseeId', val: tiv.lesseeId},
                        {name: 'inspectionItemId', val: tiv.inspectionItemId},
                        {name: 'isNormal', val: tiv.isNormal},
                        {name: 'status', val: tiv.status},
                        {name: 'createTime', val: tiv.createTime},
                    ];
                    var sql = "SELECT * FROM " + TB_task_item_value + " where taskId=" + tiv.taskId + " and devicePlaceId=" + tiv.devicePlaceId + " and taskItemId=" + tiv.taskItemId;
                    if (tiv.taskItemId == "" || tiv.taskItemId == null) {
                        sql = "SELECT * FROM " + TB_task_item_value + " where taskId=" + tiv.taskId + " and devicePlaceId=" + tiv.devicePlaceId + " and taskItemId is null";
                    }
                    var ret = fnSelectSync(sql);
                    if (ret != undefined && ret.status && ret.data.length == 0) {
                        fnInsertSync(TB_task_item_value, listMap);
                    }

                    showProgress(count, progress++, "下载任务数据中...");

                });
            }

        });
    }

    //基础数据

    if (ret.data != null && ret.data != undefined) {
        $.each(ret.data, function (i, data) {
            //养护区域
            if (data != undefined) {
                var listMap = [
                    {name: 'id', val: data.id},
                    {name: 'name', val: data.name},
                    {name: 'code', val: data.code},
                ];
                if (!isExistsById(TB_zone, data.id)) {
                    fnInsertSync(TB_zone, listMap);
                } else {
                    fnUpdateSync(TB_zone, listMap, " id=" + data.id);
                }
                showProgress(count, progress++, "下载基础数据中...");

            }
            //功能位置
            if (data.dpData != undefined && data.dpData.length > 0) {
                $.each(data.dpData, function (i, dp) {
                    var listMap = [
                        {name: 'id', val: dp.id},
                        {name: 'name', val: dp.name},
                        {name: 'ibeacon', val: dp.ibeacon},
                        {name: 'roadLineId', val: dp.roadLineId},
                        {name: 'beginMile', val: dp.beginMile},
                        {name: 'endMile', val: dp.endMile},
                        {name: 'itemId', val: dp.itemId},
                        {name: 'componentId', val: dp.componentId},
                        {name: 'parentId', val: dp.parentId},
                    ];
                    if (!isExistsById(TB_device_place, dp.id)) {
                        fnInsertSync(TB_device_place, listMap);
                    } else {
                        fnUpdateSync(TB_device_place, listMap, " id=" + dp.id);
                    }

                    showProgress(count, progress++, "下载基础数据中...");

                });
            }

            //构件
            if (data != undefined && data.componentData != undefined && data.componentData.length > 0) {
                $.each(data.componentData, function (i, c) {
                    var listMap = [
                        {name: 'id', val: c.id},
                        {name: 'name', val: c.name},
                    ];
                    if (!isExistsById(TB_component, c.id)) {
                        fnInsertSync(TB_component, listMap);
                    } else {
                        fnUpdateSync(TB_component, listMap, " id=" + c.id);
                    }

                    showProgress(count, progress++, "下载基础数据中...");

                });
            }

            //编目
            if (data != undefined && data.itemData != undefined && data.itemData.length > 0) {
                $.each(data.itemData, function (i, item) {
                    var listMap = [
                        {name: 'id', val: item.id},
                        {name: 'name', val: item.name},
                        {name: 'treeName', val: item.treeName},
                        {name: 'zoneId', val: item.zoneId},
                    ];
                    if (!isExistsById(TB_item, item.id)) {
                        fnInsertSync(TB_item, listMap);
                    } else {
                        fnUpdateSync(TB_item, listMap, " id=" + item.id);
                    }

                    showProgress(count, progress++, "下载基础数据中...");

                });
            }

            //检查项目
            if (data != undefined && data.taskItemData != undefined && data.taskItemData.length > 0) {
                $.each(data.taskItemData, function (i, taskitem) {
                    var listMap = [
                        {name: 'id', val: taskitem.id},
                        {name: 'remarkOtherName', val: taskitem.remarkOtherName},
                        {name: 'unit', val: taskitem.unit},
                        {name: 'desc', val: taskitem.desc},
                        {name: 'resultType', val: taskitem.resultType},
                        {name: 'resultValue', val: taskitem.resultValue},
                        {name: 'taskTypeId', val: taskitem.taskTypeId},
                        {name: 'inspectionItemId', val: taskitem.inspectionItemId},
                        {name: 'inspectionItemName', val: taskitem.inspectionItemName},
                        {
                            name: 'isNoShowRemark',
                            val: taskitem.isNoShowRemark == null ? null : taskitem.isNoShowRemark ? 1 : 0
                        },
                    ];
                    if (!isExistsById(TB_task_item, taskitem.id)) {
                        fnInsertSync(TB_task_item, listMap);
                    } else {
                        fnUpdateSync(TB_task_item, listMap, " id=" + taskitem.id);
                    }

                    showProgress(count, progress++, "下载基础数据中...");

                });
            }

            //路段
            if (data != undefined && data.roadLineData != undefined && data.roadLineData.length > 0) {
                $.each(data.roadLineData, function (i, roadLine) {
                    var listMap = [
                        {name: 'id', val: roadLine.id},
                        {name: 'name', val: roadLine.name},
                        {name: 'treeCode', val: roadLine.treeCode},
                        {name: 'beginMile', val: roadLine.beginMile},
                        {name: 'endMile', val: roadLine.endMile},
                        {name: 'type', val: roadLine.type},
                        {name: 'code', val: roadLine.code},
                    ];
                    if (!isExistsById(TB_road_line, roadLine.id)) {
                        fnInsertSync(TB_road_line, listMap);
                    } else {
                        fnUpdateSync(TB_road_line, listMap, " id=" + roadLine.id);
                    }
                    showProgress(count, progress++, "下载基础数据中...");
                });
            }
        });

    }

    //隧道信息
    if (ret != undefined && ret.tunnelData != undefined && ret.tunnelData.lstItems.length > 0) {
        $.each(ret.tunnelData.lstItems, function (i, item) {
            var listMap = [
                {name: 'id', val: item.id},
                {name: 'name', val: item.name},
                {name: 'zoneId', val: item.zoneId},
            ];
            if (!isExistsById(TB_item, item.id)) {
                fnInsertSync(TB_item, listMap);
            }

            showProgress(count, progress++, "下载数据中...");

        });
    }

}
//计算基础数据总数
function queryBaseDataCount(ret) {
    var count = 0;
    //任务数据
    if (ret != undefined && ret.lstTaskData != undefined && ret.lstTaskData.length > 0) {
        $.each(ret.lstTaskData, function (i, taskData) {
            count += 3;
            if (taskData != undefined && taskData.lstTaskVindicates != undefined && taskData.lstTaskVindicates.length > 0) {
                count += taskData.lstTaskVindicates.length;
            }
            if (taskData != undefined && taskData.lstTaskVindicates != undefined && taskData.lstTvcs.length > 0) {
                count += taskData.lstTvcs.length;
            }
            if (taskData != undefined && taskData.lstTaskVindicates != undefined && taskData.lstTivs.length > 0) {
                count += taskData.lstTivs.length;
            }
        });
    }
    //基础数据
    if (ret.data != undefined && ret.data.length > 0) {
        $.each(ret.data, function (i, data) {
            count++;
            if (data != undefined && data.dpData != undefined && data.dpData.length > 0) {
                count += data.dpData.length;
            }
            if (data != undefined && data.componentData != undefined && data.componentData.length > 0) {
                count += data.componentData.length;
            }
            if (data != undefined && data.itemData != undefined && data.itemData.length > 0) {
                count += data.itemData.length;
            }
            if (data != undefined && data.zone != undefined && data.zone.length > 0) {
                count += data.zone.length;
            }
            if (data != undefined && data.taskItemData != undefined && data.taskItemData.length > 0) {
                count += data.taskItemData.length;
            }
            if (data != undefined && data.roadLineData != undefined && data.roadLineData.length > 0) {
                count += data.roadLineData.length;
            }
        });
    }

    if (ret.tunnelData != undefined && ret.tunnelData.lstItems != undefined && ret.tunnelData.lstItems.length > 0) {
        count += ret.baseData.lstItems.length;
    }
    return count;
}
//显示进度
function showProgress(count, progress, msg) {
    api.showProgress({
        title: msg,
        text: '' + Math.floor(progress / count * 100) + '%',
        modal: true
    });
}
//删除任务数据更新数据
function deleteTaskMsg(type) {
    if (type == 'task' || type == 'all') {
        deleteTable(TB_task_detail);
        deleteTable(TB_task_master);
        deleteTable(TB_standard_task);
        deleteTable(TB_task_vindicate_content);
        fnDeleteSync("delete from " + TB_task_vindicate + "  where uploadStatus=1 or  uploadStatus is null");
        fnDeleteSync("delete from " + TB_task_item_value + "  where status =1");
    }
    if (type == 'base' || type == 'all') {
        deleteTable(TB_device_place);
        deleteTable(TB_component);
        deleteTable(TB_item);
        deleteTable(TB_zone);
        deleteTable(TB_task_item);
        deleteTable(TB_road_line);
    }
}

//获取检查项目分类
function queryTaskVindicateStatus(param) {
    var result;

    //判断是否存在异常项
    var isNormal = true;
    if (isHasParentAndHasChild(param.dpId)) {
        var sql = " select t.id from " + TB_device_place + " t where t.parentId=" + param.dpId;
        var childRet = fnSelectSync(sql);
        if (childRet.status && childRet.data.length > 0) {
            $.each(childRet.data, function (i, dp) {
                sql = "select count(*) as count from " + TB_task_item_value + " t where t.taskId=" + param.taskId + " and t.devicePlaceId=" + dp.id + " and t.isNormal=0";
                var ret = fnSelectSync(sql);
                if (ret.status && ret.data.length > 0 && ret.data[0].count > 0) {
                    isNormal = false;
                    return;
                }
            });
        }
    } else {
        var sql = "select count(*) as count from " + TB_task_item_value + " t where t.taskId=" + param.taskId + " " +
            "and t.devicePlaceId=" + param.dpId + " and t.isNormal=0";
        var ret = fnSelectSync(sql);
        if (ret != undefined && ret.status && ret.data.length > 0 && ret.data[0].count > 0) {
            isNormal = false;
        }

    }
    //任务维护实体检查状态和照片
    var status = 0;
    var photots;
    var sql = "select t.status,t.annexIds from " + TB_task_vindicate + " t where t.taskId=" + param.taskId + " and t.devicePlaceId=" + param.dpId;
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        status = ret.data[0].status;
        var annexIds = ret.data[0].annexIds;
        if (annexIds != "") {
            photots = $api.strToJson(annexIds).tvPhotos;
        }
    }

    result = {
        success: true,
        status: status,
        photots: photots,
        isNormal: isNormal
    };
    return result;
}

//获取检查项目列表
function queryCheckTaskItemValues(param) {
    var result;
    var sql = "select d.* from " + TB_task_vindicate_content + " t ," + TB_task_item + " d ," + TB_task_detail + " k ," + TB_task_master + " q " +
        "where t.taskId=k.id and k.id=" + param.taskDetailId + " and d.taskTypeId=q.taskTypeId and k.taskMasterId=q.id and d.id=t.taskItemId and " +
        " t.devicePlaceIds like '%" + Number(param.devicePlaceId) + "%' ";
    var ret = fnSelectSync(sql);
    var count = 0;
    if (ret != undefined && ret.status) {
        var dataArray = new Array;
        if (ret.data.length > 0) {
            var childList;
            if (isHasParentAndHasChild(param.devicePlaceId)) {
                sql = "select t.name,t.id from " + TB_device_place + " t where t.parentId=" + param.devicePlaceId;
                var childRet = fnSelectSync(sql);
                if (childRet != undefined && childRet.status && childRet.data.length > 0) {
                    childList = childRet.data;
                }
            }

            $.each(ret.data, function (i, data) {
                if (childList != undefined && childList.length > 0) {
                    $.each(childList, function (i, childDp) {
                        var ti;
                        var lstTivs = queryTaskItemValue(param.taskDetailId, childDp.id, data.id);
                        if (lstTivs != "") {
                            var time = "";
                            var isNormal = "";
                            var result = "";
                            $.each(lstTivs, function (i, tiv) {
                                if (tiv.isNormal == 0) {
                                    isNormal += ";false";
                                } else {
                                    isNormal += ";true";

                                }
                                time += ";" + fnFormatDate(tiv.createTime);
                                if (tiv.resultValue != undefined && tiv.resultValue != "") {
                                    if (data.resultType != undefined && data.resultType == 4) {
                                        var valueArray = tiv.resultValue.split(";");
                                        var itemNameArray = data.resultValue.split(",");
                                        $.each(itemNameArray, function (i, itemName) {
                                            result += "," + itemName + valueArray[i];
                                            if (data.unit != undefined && data.unit != null) {
                                                result += data.unit.split(",")[0];
                                            }
                                        });
                                        if (tiv.remark != undefined && tiv.remark != "") {
                                            result += "，" + tiv.remark.replace("!", "");
                                        }
                                    } else {
                                        var valueArray = tiv.resultValue.split(";");
                                        var remarkArray = "";
                                        if (tiv.remark != undefined && tiv.remark != "") {
                                            remarkArray = tiv.remark.split(";");
                                        }
                                        result += ":";
                                        $.each(valueArray, function (i, value) {
                                            if (i != 0) {
                                                result += ";";
                                            }
                                            result += value;
                                            if (remarkArray != "" && remarkArray.length > 0 && remarkArray.length > i
                                                && remarkArray[i] != "" && remarkArray[i] != undefined) {
                                                result += remarkArray[i];
                                            }
                                        });
                                    }
                                }

                            });
                            ti = {
                                id: count++,
                                name: childDp.name + data.desc,
                                taskItemId: data.id,
                                resultType: data.resultType,
                                devicePlaceId: childDp.id,
                                time: time.substring(1),
                                isNormalArray: isNormal.substring(1),
                                result: result.substring(1),
                            }
                        } else {
                            ti = {
                                id: count++,
                                name: childDp.name + data.desc,
                                insepctionItemId: null,
                                taskItemId: data.id,
                                resultType: data.resultType,
                                devicePlaceId: childDp.id,
                                result: "进行检查",
                            };
                        }
                        dataArray.push(ti);
                    });

                } else {
                    var ti;
                    var lstTivs = queryTaskItemValue(param.taskDetailId, param.devicePlaceId, data.id);
                    if (lstTivs != "") {
                        var time = "";
                        var isNormal = "";
                        var result = "";
                        $.each(lstTivs, function (i, tiv) {
                            if (tiv.isNormal == 0) {
                                isNormal += ";false";
                            } else {
                                isNormal += ";true";

                            }
                            time += ";" + fnFormatDate(tiv.createTime);
                            if (tiv.resultValue != undefined && tiv.resultValue != "") {
                                if (data.resultType != undefined && data.resultType == 4) {
                                    var valueArray = tiv.resultValue.split(";");
                                    var itemNameArray = data.resultValue.split(",");
                                    $.each(itemNameArray, function (i, itemName) {
                                        result += "," + itemName + valueArray[i];
                                        if (data.unit != undefined && data.unit != null) {
                                            result += data.unit.split(",")[0];
                                        }
                                    });
                                    if (tiv.remark != undefined && tiv.remark != "") {
                                        result += "，" + tiv.remark.replace("!", "");
                                    }
                                } else {
                                    var valueArray = tiv.resultValue.split(";");
                                    var remarkArray = "";
                                    if (tiv.remark != undefined && tiv.remark != "") {
                                        remarkArray = tiv.remark.split(";");
                                    }
                                    result += ":";
                                    $.each(valueArray, function (i, value) {
                                        if (i != 0) {
                                            result += ";";
                                        }
                                        result += value;
                                        if (remarkArray != "" && remarkArray.length > 0 && remarkArray.length > i
                                            && remarkArray[i] != "" && remarkArray[i] != undefined) {
                                            result += remarkArray[i];
                                        }
                                    });
                                }
                            }

                        });
                        ti = {
                            id: count++,
                            name: data.desc,
                            taskItemId: data.id,
                            resultType: data.resultType,
                            devicePlaceId: param.devicePlaceId,
                            time: time.substring(1),
                            isNormalArray: isNormal.substring(1),
                            result: result.substring(1),
                        }
                    } else {
                        ti = {
                            id: count++,
                            name: data.desc,
                            insepctionItemId: data.insepctionItemId,
                            taskItemId: data.id,
                            resultType: data.resultType,
                            devicePlaceId: param.devicePlaceId,
                            result: "进行检查",
                        };
                    }
                    dataArray.push(ti);
                }
            });
            var lstTiv = queryTaskItemValue(param.taskDetailId, param.devicePlaceId, null);
            var ti;
            if (lstTiv != "") {
                var data = lstTiv[0];
                ti = {
                    id: count++,
                    name: '其他',
                    insepctionItemId: null,
                    taskItemId: null,
                    resultType: data.resultType,
                    devicePlaceId: param.devicePlaceId,
                    time: fnFormatDate(data.createTime),
                    result: data.resultValue,
                };
            } else {
                ti = {
                    id: count++,
                    name: '其他',
                    insepctionItemId: null,
                    taskItemId: null,
                    resultType: 1,
                    devicePlaceId: param.devicePlaceId,
                    result: "进行检查",
                };
            }
            dataArray.push(ti);
        }
        //去除name里面的回车
        $.each(dataArray, function (i, ti) {
            ti.name = ti.name.replace(/[\r\n]/g, "");
        });
        result = {
            success: true,
            data: dataArray
        };
    } else {
        if (ret != undefined && ret.status && ret.data.length == 0) {
            result = {
                success: false,
                errorMsg: '未找到检查项目信息，请重新下载任务数据。'
            };
        } else {
            result = {
                success: false,
                errorMsg: ret.msg
            };
        }
    }
    return result;
}
function queryCheckRegisterType(param) {
    var result;
    var sql = "select * from " + TB_task_item + " t where t.id=" + param.taskItem;
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status || param.taskItem == null) {
        var dataArray = new Array;
        if (ret.data.length > 0) {
            var taskItem = ret.data[0];
            var lstTiv = queryTaskItemValue(param.taskDetailId, param.devicePlaceId, param.taskItem);
            if (lstTiv == "") {
                dataArray = [{
                    resultValue: taskItem.resultValue,
                    resultType: taskItem.resultType,
                    unit: taskItem.unit,
                    status: 1,
                    isNoShowRemark: taskItem.isNoShowRemark == 1,
                    remarkOtherName: taskItem.remarkOtherName,
                }];

            } else {
                var tiv = lstTiv[0];
                var photos = new Array;
                if (tiv.files != "") {
                    photos = $api.strToJson(tiv.files).image;
                }
                dataArray = [{
                    resultValueAll: taskItem.resultValue,
                    resultType: taskItem.resultType,
                    unit: taskItem.unit,
                    status: 2,
                    isNoShowRemark: taskItem.isNoShowRemark == 1,
                    remarkOtherName: taskItem.remarkOtherName,
                    isNormal: tiv.isNormal,
                    resultValue: tiv.resultValue,
                    remark: tiv.remark,
                    photos: photos
                }];
            }
        } else if (param.taskItem == null) {
            var lstTiv = queryTaskItemValue(param.taskDetailId, param.devicePlaceId, param.taskItem);
            if (lstTiv != "") {
                var tiv = lstTiv[0];
                var photos = new Array;
                if (tiv.files != "") {
                    photos = $api.strToJson(tiv.files).image;
                }
                dataArray = [{
                    resultValueAll: '其他',
                    resultType: 1,
                    unit: null,
                    status: 2,
                    isNoShowRemark: null,
                    remarkOtherName: null,
                    isNormal: true,
                    resultValue: tiv.resultValue,
                    remark: tiv.remark,
                    photos: photos
                }];
            } else {
                dataArray = [{
                    resultValue: '正常',
                    resultType: 1,
                    unit: null,
                    status: 1,
                    isNoShowRemark: null,
                    remarkOtherName: null,
                }];
            }

        }
        result = {
            success: true,
            data: dataArray
        };
    } else {
        result = {
            success: false,
            errorMsg: ret.msg
        };

    }
    return result;
}
//上传检查项目结果
function syncTunnelEvent(param, files) {
    var taskItemSQL = "taskItemId=" + param.taskItem;
    if (param.taskItem == null) {
        taskItemSQL = "taskItemId is null";
    }
    var sql = "select 1 from " + TB_task_item_value + " t where t.taskId=" + param.taskDetailId + " and " + taskItemSQL + " and t.devicePlaceId=" + param.devicePlaceId;
    var ret = fnSelectSync(sql);
    var status = 0;
    var tiv = [
        {name: 'taskId', val: param.taskDetailId},
        {name: 'devicePlaceId', val: param.devicePlaceId},
        {name: 'creator', val: param.creator},
        {name: 'taskItemId', val: param.taskItem},
        {name: 'remark', val: param.remark},
        {name: 'resultType', val: param.resultType},
        {name: 'resultValue', val: param.resultValue},
        {name: 'lesseeId', val: param.lesseeId},
        {name: 'inspectionItemId', val: param.inspectionItemId},
        {name: 'isNormal', val: param.isNormal ? 1 : 0},
        {name: 'type', val: param.type},
        {name: 'createTime', val: returnCreateTime()},
        {name: 'status', val: status},
        {name: 'files', val: $api.jsonToStr(files)}];
    if (ret != undefined && ret.status && ret.data.length > 0) {
        ret = fnUpdateSync(TB_task_item_value, tiv, " taskId=" + param.taskDetailId + " and " + taskItemSQL + " and devicePlaceId=" + param.devicePlaceId);
    } else {
        ret = fnInsertSync(TB_task_item_value, tiv);
    }
    saveCheckTaskStatus(param.taskDetailId, param.devicePlaceId, false);
    var result;
    if (ret != undefined && ret.status) {
        result = {
            success: true
        }
    } else {
        result = {
            success: false,
            errorMsg: ret.msg
        }
    }
    return result;
}
//同步子功能位置还未检查的所有检查项目为正常
function syncAllTunnelEventNormal(param, files) {
    var sql;
    var ret;
    var result;
    if (isHasParentAndHasChild(param.dpId)) {
        sql = "select t.* from " + TB_task_item + " t ," + TB_task_vindicate_content + " s where " +
            "s.taskId=" + param.taskId + " and s.devicePlaceIds like '%" + param.dpId + "%' and t.id=s.taskItemId ";
        ret = fnSelectSync(sql);
        if (ret.status && ret.data.length > 0) {
            sql = "select t.name,t.id from " + TB_device_place + " t where t.parentId=" + param.dpId;
            var childRet = fnSelectSync(sql);
            if (childRet != undefined && childRet.status && childRet.data.length > 0) {
                $.each(childRet.data, function (i, dp) {
                    $.each(ret.data, function (i, taskItem) {
                        sql = "select 1 from " + TB_task_item_value + " t where t.taskItemId=" + taskItem.id + " and t.devicePlaceId=" + dp.id + " and t.taskId=" + param.taskId;
                        var isExitRet = fnSelectSync(sql);
                        if (isExitRet.status && isExitRet.data.length == 0) {
                            var tiv = [
                                {name: 'taskId', val: param.taskId},
                                {name: 'devicePlaceId', val: dp.id},
                                {name: 'creator', val: $api.getStorage('user').id},
                                {name: 'taskItemId', val: taskItem.id},
                                {name: 'resultType', val: taskItem.resultType},
                                {
                                    name: 'resultValue',
                                    val: taskItem.resultValue == undefined || taskItem.resultValue == "" ? "正常" : taskItem.resultValue.split(",")[0]
                                },
                                {name: 'lesseeId', val: $api.getStorage('user').lesseeId},
                                {name: 'inspectionItemId', val: taskItem.inspectionItemId},
                                {name: 'isNormal', val: 1},
                                {name: 'type', val: param.type},
                                {name: 'status', val: 0},
                                {name: 'createTime', val: returnCreateTime()},
                            ];
                            fnInsertSync(TB_task_item_value, tiv);
                        }
                    });
                });
            }
        }
    } else {
        sql = "select t.* from " + TB_task_item + " t ," + TB_task_vindicate_content + " s where " +
            "s.taskId=" + param.taskId + " and s.devicePlaceIds like '%" + param.dpId + "%' and t.id=s.taskItemId and t.id not in(" +
            "select d.taskItemId from " + TB_task_item_value + " d where d.taskItemId is not null and  d.taskId=" + param.taskId + " and d.devicePlaceId=" + param.dpId + ")";
        ret = fnSelectSync(sql);
        if (ret != undefined && ret.status) {
            if (ret.data.length > 0) {
                //没有异常项的检查项目全部正常
                $.each(ret.data, function (i, taskItem) {
                    var tiv = [
                        {name: 'taskId', val: param.taskId},
                        {name: 'devicePlaceId', val: param.dpId},
                        {name: 'creator', val: $api.getStorage('user').id},
                        {name: 'taskItemId', val: taskItem.id},
                        {name: 'resultType', val: taskItem.resultType},
                        {
                            name: 'resultValue',
                            val: taskItem.resultValue == undefined || taskItem.resultValue == "" ? "正常" : taskItem.resultValue.split(",")[0]
                        },
                        {name: 'lesseeId', val: $api.getStorage('user').lesseeId},
                        {name: 'inspectionItemId', val: taskItem.inspectionItemId},
                        {name: 'isNormal', val: 1},
                        {name: 'type', val: param.type},
                        {name: 'status', val: 0},
                        {name: 'createTime', val: returnCreateTime()},
                    ];
                    ret = fnInsertSync(TB_task_item_value, tiv);
                });

            }

        } else {
            result = {
                success: false,
                errorMsg: ret.msg
            };
        }
    }
    sql = "select * from " + TB_task_item_value + " t where t.taskItemId is null and t.devicePlaceId=" + param.dpId + " and t.taskId=" + param.taskId;
    ret = fnSelectSync(sql);
    if (ret.status && ret.data.length == 0) {
        var tiv = [
            {name: 'taskId', val: param.taskId},
            {name: 'devicePlaceId', val: param.dpId},
            {name: 'creator', val: $api.getStorage('user').id},
            {name: 'resultType', val: 1},
            {
                name: 'resultValue',
                val: "正常"
            },
            {name: 'lesseeId', val: $api.getStorage('user').lesseeId},
            {name: 'inspectionItemId', val: null},
            {name: 'isNormal', val: 1},
            {name: 'type', val: param.type},
            {name: 'status', val: 0},
            {name: 'createTime', val: returnCreateTime()},
        ];
        fnInsertSync(TB_task_item_value, tiv);
    }

    saveCheckTaskStatus(param.taskId, param.dpId, true);
    sql = "select * from " + TB_task_vindicate + " t where t.taskId=" + param.taskId + " and t.devicePlaceId=" + param.dpId;
    ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var geo = $api.getStorage('geo');
        var gglatlng = fnGGLocation(geo.lat, geo.lon);
        var tv = [
            {name: 'annexIds', val: $api.jsonToStr(files)},
            {name: 'uploadStatus', val: 0},
            {name: 'lon', val: gglatlng.lon},
            {name: 'lat', val: gglatlng.lat},
            {name: 'bd_lon', val: geo.lon},
            {name: 'bd_lat', val: geo.lat},
            {name: 'type', val: param.type},
            {name: 'updateTime', val: returnCreateTime()},
            {name: 'status', val: 2}
        ];
        ret = fnUpdateSync(TB_task_vindicate, tv, " id=" + ret.data[0].id);
        result = {
            success: true
        };

    } else {
        result = {
            success: false,
            errorMsg: ret.msg
        };
    }

    return result;
}

//还未上传的数据数量
function queryNonUploadDataCount() {
    var sql = "select count(*) as count from " + TB_task_vindicate + " t , " + TB_device_place + " d where ( t.uploadStatus =0) and (t.status=2 or t.status=1) " +
        "and t.devicePlaceId=d.id ";
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        $('#count').html("上传数据(" + ret.data[0].count + ")");
        return ret.data[0].count;
    } else {
        $('#count').html("上传数据");
    }
    return 0;
}
//异常的检查项目
function queryAbnormalTaskItemValue(param) {
    var sql;
    var ret;

    if (isHasParentAndHasChild(param.dpId)) {
        sql = "select t.id from " + TB_device_place + " t where t.parentId=" + param.dpId;
        var childRet = fnSelectSync(sql);
        if (childRet.status && childRet.data.length > 0) {
            ret = {
                status: true,
                data: new Array
            };
            $.each(childRet.data, function (i, dp) {
                sql = "select * from " + TB_task_item_value + " where taskId=" + param.taskId + " and devicePlaceId=" + dp.id + " and isNormal=0";
                var childAbRet = fnSelectSync(sql);

                if (childAbRet.status && childAbRet.data.length > 0) {
                    $.each(childAbRet.data, function (i, childAb) {
                        ret.data.push(childAb);
                    });
                }
            });
        }
    } else {
        sql = "select t.* from " + TB_task_item_value + " t where t.taskId=" + param.taskId + " and t.devicePlaceId=" + param.dpId + " and t.isNormal=0";
        ret = fnSelectSync(sql);
    }
    var result;
    if (ret != undefined && ret.status && ret.data.length >= 0) {
        var dataArray = new Array;
        $.each(ret.data, function (i, tiv) {
            var content = "";
            if (tiv.resultValue != undefined && tiv.resultValue != "") {
                if (isHasParentAndHasChild(param.dpId)) {
                    sql = "select t.name from " + TB_device_place + " t where t.id=" + tiv.devicePlaceId;
                    content += fnSelectSync(sql).data[0].name;
                }
                sql = "select t.desc from " + TB_task_item + " t where t.id=" + tiv.taskItemId;
                content += fnSelectSync(sql).data[0].desc;
                var resultArray = tiv.resultValue.split(";");
                var remarkArray;
                if (tiv.remark != undefined && tiv.remark != "") {
                    remarkArray = tiv.remark.split(";");
                }
                $.each(resultArray, function (i, result) {
                    if (i != 0) {
                        content += ";";
                    }
                    content += result;
                    if (remarkArray != undefined && remarkArray.length > 0 && remarkArray[i] != undefined) {
                        remarkArray[i].replace("!", ",");
                        content += remarkArray[i];
                    }
                });
            }
            content.replace("!", ",");
            var photos = new Array;
            if (tiv.files != "") {
                photos = JSON.parse(tiv.files).image;
            }
            var tivMap = {
                content: content,
                tvId: i,
                time: fnFormatDate(tiv.createTime),
                photos: photos
            };
            dataArray.push(tivMap);
        });
        result = {
            data: dataArray,
            success: true,
        }

    } else {
        result = {
            success: false,
            errorMsg: ret.msg
        };
    }
    return result;
}
//保存检查任务的状态
function saveCheckTaskStatus(taskId, dpId, isCheckFinish) {
    //任务维护实体
    var sql = "select t.id,t.status,d.parentId from " + TB_task_vindicate + " t ," + TB_device_place + " d where d.id=t.devicePlaceId and  t.taskId=" + taskId + " and t.devicePlaceId=" + dpId;
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var id = ret.data[0].id;
        var parentId = ret.data[0].parentId;
        var status = ret.data[0].status;
        if (isCheckFinish || (status != undefined && status == 2)) {
            status = 2;
        } else {
            status = 1;
        }
        var listMap = [
            {name: 'status', val: status},
            {name: 'updateTime', val: returnCreateTime()},
        ];
        fnUpdateSync(TB_task_vindicate, listMap, " id=" + id);

        //父功能位置
        sql = "select t.id,t.status from " + TB_task_vindicate + " t ," + TB_device_place + " d where t.taskId=" + taskId + " and " +
            " d.id=t.devicePlaceId and t.devicePlaceId=" + parentId;
        var ret = fnSelectSync(sql);
        if (ret != undefined && ret.status && ret.data.length > 0) {
            var id = ret.data[0].id;
            var status = ret.data[0].status;
            sql = "select count(*) as count from " + TB_task_vindicate + " t ," + TB_device_place + " d where t.taskId=" + taskId + " and " +
                " d.id=t.devicePlaceId and (t.status=1 or t.status=0 or t.status is null ) and d.parentId=" + parentId;
            ret = fnSelectSync(sql);
            if (ret != undefined && ret.status && ret.data.length > 0 && ret.data[0].count == 0) {
                status = 2;
            } else {
                status = 1;
            }
            var listMap = [
                {name: 'status', val: status},
                {name: 'updateTime', val: returnCreateTime()},
            ];
            fnUpdateSync(TB_task_vindicate, listMap, " id=" + id);
        }
    }
}
//通过任务id,功能位置id,检查项目id获取检查项目值表
function queryTaskItemValue(taskId, dpId, taskItemId) {
    var tivSQL = " and t.taskItemId is null ";
    if (taskItemId != null) {
        tivSQL = " and t.taskItemId=" + taskItemId;
    }
    var sql = "select t.* from " + TB_task_item_value + " t where t.taskId=" + taskId + " and t.devicePlaceId=" + dpId +
        tivSQL + " order by t.createTime desc";
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        return ret.data;
    } else {
        return "";
    }
}

/************************龙岩机电********************************/
//根据路段进行任务分类
function queryCheckTaskLyxfByZone(param) {
    var time = $api.getStorage('systemTime');
    var itemName = lyxfCheckItemName;
    var frequencyUnit = param.type;
    var taskTypeSQL = "";
    var frequencyUnitSQL = "";
    // 1.年 2.季 3.月 4.周 5.天(0为夜间巡查和月巡查频率一样)
    if (frequencyUnit == 0) {
        taskTypeSQL = " and d.taskTypeName='" + lyxfNightCheckItemName + "'";
    } else {
        taskTypeSQL = " and d.taskTypeName!='" + lyxfNightCheckItemName + "'";
        frequencyUnitSQL = " and d.frequencyUnit=" + frequencyUnit;
    }
    var sql = "select distinct a.treeCode from " + TB_task_detail + " t ," + TB_task_master + " d, " +
        TB_device_place + " q," + TB_task_vindicate + " p," + TB_road_line + " a where t.startDate <=" + time + " and t.endDate>=" + time + " and d.id=t.taskMasterId   and p.taskId=t.id and p.devicePlaceId=q.id and " +
        "  a.id=q.roadLineId " + taskTypeSQL + frequencyUnitSQL;
    var ret = fnSelectSync(sql);
    var result;
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var data = [];

        $.each(ret.data, function (i, roadLine) {
            var isNotExit = true;
            $.each(data, function (i, road) {
                if (road.id == roadLine.treeCode.split(",")[1]) {
                    isNotExit = false;
                }
            });
            if (isNotExit) {
                var position = data.length;
                data[position] = {};
                data[position].id = roadLine.treeCode.split(",")[1];
            }
        });
        $.each(data, function (i, road) {
            road.name = queryRoadName(road.id);
            road.status = queryRoadStatus(road.id, param.type, time);
        });
        statusSort(data);
        result = {
            success: true,
            data: data
        }
    } else {
        if (ret != undefined && ret.status && ret.data.length == 0) {
            result = {
                success: false,
                errorMsg: '没有相关执行任务。'
            };
        } else {
            result = {
                success: false,
                errorMsg: ret.msg
            };
        }
    }
    return result;
}
function queryRoadName(roadId) {
    var sql = "select * from " + TB_road_line + " t where t.id=" + roadId;
    var ret = fnSelectSync(sql);
    var name = "";
    if (ret.status && ret.data.length > 0) {
        name = ret.data[0].name;
        sql = "select * from " + TB_road_line + " t where t.id=" + ret.data[0].treeCode.split(",")[0];
        ret = fnSelectSync(sql);
        if (ret.status && ret.data.length > 0) {
            name = ret.data[0].name + name;
        }
    }
    return name;
}
function queryRoadStatus(roadId, frequencyUnit, time) {
    var taskTypeSQL = "";
    var frequencyUnitSQL = "";
    // 1.年 2.季 3.月 4.周 5.天(0为夜间巡查和月巡查频率一样)
    if (frequencyUnit == 0) {
        taskTypeSQL = " and d.taskTypeName='" + lyxfNightCheckItemName + "'";
        frequencyUnit = 3;
    } else {
        taskTypeSQL = " and d.taskTypeName!='" + lyxfNightCheckItemName + "'";
        frequencyUnitSQL = " and d.frequencyUnit=" + frequencyUnit;
    }
    var sql = "select p.status  from " + TB_task_detail + " t ," + TB_task_master + " d, " + TB_standard_task + " s," +
        TB_device_place + " q," + TB_road_line + " z," + TB_task_vindicate + " p where t.startDate <=" + time + " and t.endDate>=" + time +
        " and d.id=t.taskMasterId and d.standardTaskId=s.id  and p.taskId=t.id and p.devicePlaceId=q.id and " +
        "q.roadLineId=z.id  and z.treeCode like '%" + roadId + "%' and q.parentId is null " + taskTypeSQL + frequencyUnitSQL;
    var ret = fnSelectSync(sql);
    var checkedCount = 0;
    var checkIngCount = 0;
    var checkNonCount = 0;
    if (ret != undefined && ret.status && ret.data.length > 0) {
        $.each(ret.data, function (i, tv) {
            if (tv.status == "" || tv.status == 0) {
                checkNonCount++;
            } else if (tv.status == 1) {
                checkIngCount++;
            } else if (tv.status == 2) {
                checkedCount++;
            }
        });
    }

    if (checkedCount > 0 && checkIngCount == 0 && checkNonCount == 0) {
        return 2;
    } else if (checkedCount > 0 || checkIngCount > 0) {
        return 1;
    } else {
        return 0;
    }
}
//获取隧道信息列表
function queryCheckTaskLyxf(param) {
    var time = $api.getStorage('systemTime');
    var itemName = lyxfCheckItemName;
    var frequencyUnit = param.type;
    var taskTypeSQL = "";
    var frequencyUnitSQL = "";
    // 1.年 2.季 3.月 4.周 5.天(0为夜间巡查和月巡查频率一样)
    if (frequencyUnit == 0) {
        taskTypeSQL = " and d.taskTypeName='" + lyxfNightCheckItemName + "'";
    } else {
        taskTypeSQL = " and d.taskTypeName!='" + lyxfNightCheckItemName + "'";
        frequencyUnitSQL = " and d.frequencyUnit=" + frequencyUnit;

    }
    var itemTypeSQL = "";
    // if (param.itemType == 0) {
    //     itemTypeSQL = " and b.name like '%A线%'";
    // } else if (param.itemType == 1) {
    //     itemTypeSQL = " and b.name like '%B线%'";
    // } else if (param.itemType == 2) {
    //     itemTypeSQL = " and b.name like '%配电房%'";
    // }
    itemTypeSQL = " and b.treeName like '%" + param.itemType + "%' ";
    var sql = "select distinct b.name as itemName from " + TB_task_detail + " t ," + TB_task_master + " d, " +
        TB_device_place + " q," + TB_task_vindicate + " p," + TB_road_line + " a," + TB_item + " b where t.startDate <=" + time + " and t.endDate>=" + time +
        " and d.id=t.taskMasterId and p.taskId=t.id and p.devicePlaceId=q.id and " +
        "b.id=q.itemId and  a.id=q.roadLineId and a.treeCode like '%" + param.roadId + "%'" + taskTypeSQL + itemTypeSQL + frequencyUnitSQL;
    var ret = fnSelectSync(sql);
    var result;
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var dataArray = new Array;
        $.each(ret.data, function (i, item) {
            //随便选一个roadline
            var distance = "";
            var roadlineRet = fnSelectSync("select distinct t.treeCode from " + TB_road_line + " t ," + TB_item + " d ," + TB_device_place + " s " +
                "where t.id=s.roadLineId and s.itemId=d.id and d.name ='" + item.itemName + "'");
            if (roadlineRet != undefined && roadlineRet.data != undefined && roadlineRet.data.length > 0) {
                var tunnel = queryTunnelMsgByTreeCode(roadlineRet.data[0].treeCode);
                distance = calculationDistance(tunnel.code, tunnel.beginMile, tunnel.endMile);
            }
            var status = queryTunnelStatus(item.itemName, param.type, time);
            dataArray.push({
                name: item.itemName,
                status: status,
                distance: distance,
                itemName: item.itemName
            });
        });
        statusSort(dataArray);
        distanceSort(dataArray);
        result = {
            success: true,
            data: dataArray
        };
    } else {
        if (ret != undefined && ret.status && ret.data.length == 0) {
            result = {
                success: false,
                errorMsg: '没有相关执行任务。'
            };
        } else {
            result = {
                success: false,
                errorMsg: ret.msg
            };
        }
    }
    return result;
}

//获取功能位置信息列表
function queryCheckTaskVindicateLyxf(param) {
    var time = $api.getStorage('systemTime');
    var frequencyUnit = param.type;
    // 1.年 2.季 3.月 4.周 5.天(0为夜间巡查和月巡查频率一样)
    var taskTypeSQL = "";
    var frequencyUnitSQL = "";
    if (frequencyUnit == 0) {
        taskTypeSQL = " and d.taskTypeName='" + lyxfNightCheckItemName + "'";
        frequencyUnit = 3;
    } else {
        taskTypeSQL = " and d.taskTypeName!='" + lyxfNightCheckItemName + "'";
        frequencyUnitSQL = " and d.frequencyUnit=" + frequencyUnit;
    }
    var dpSQL;
    if (param.dpId != undefined) {
        dpSQL = " q.parentId=" + param.dpId;
    } else if (param.itemName != undefined) {
        dpSQL = " m.name='" + param.itemName + "' and q.parentId is null ";
    }
    var itemTypeSQL = "";
    if (param.itemType != undefined) {
        itemTypeSQL = " and m.treeName like '%" + param.itemType + "%' ";
    }
    var sql = "select distinct t.id  as taskId,p.status,s.isCode,q.name,z.name as componentName,q.id as dpId,a.treeCode,a.name as roadLineName,p.annexIds,m.name as itemName  from " + TB_task_detail + " t ," + TB_task_master + " d, " + TB_standard_task + " s," +
        TB_device_place + " q," + TB_task_vindicate + " p ," + TB_component + " z, " + TB_road_line + " a," + TB_item + " m where t.startDate <=" + time + " and t.endDate>=" + time +
        " and d.id=t.taskMasterId  and d.standardTaskId=s.id  and p.taskId=t.id and p.devicePlaceId=q.id and z.id=q.componentId and a.id=q.roadLineId   and m.id=q.itemId and " + dpSQL + taskTypeSQL + frequencyUnitSQL + itemTypeSQL;
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var dataArray = new Array;
        $.each(ret.data, function (i, tv) {
            var tunnel = queryTunnelMsgByTreeCode(tv.treeCode);
            var imgArray;
            if (tv.annexIds != "") {
                var imgArray = $api.strToJson(tv.annexIds).tvPhotos;
            }
            dataArray.push({
                taskId: tv.taskId,
                name: tv.name,
                status: tv.status == null ? 0 : tv.status,
                componentName: tv.componentName,
                isCode: tv.isCode == 1,
                dpId: tv.dpId,
                tunnelBeginMile: tunnel.beginMile,
                tunnelEndMile: tunnel.endMile,
                code: tunnel.code,
                itemName: tv.itemName,
                photos: imgArray,
            });
        });
        statusSort(dataArray);
        result = {
            success: true,
            data: dataArray
        }
    } else {
        if (ret != undefined && ret.status && ret.data.length == 0) {
            result = {
                success: false,
                errorMsg: '没有相关执行任务。'
            };
        } else {
            result = {
                success: false,
                errorMsg: ret.msg
            };
        }
    }
    return result;
}
function queryDevicePlaceInfo(param) {
    var time = $api.getStorage('systemTime');
    var frequencyUnit = param.type;
    var taskTypeSQL = "";
    var frequencyUnitSQL = "";
    if (frequencyUnit == 0) {
        taskTypeSQL = " and d.taskTypeName='" + lyxfNightCheckItemName + "'";
        frequencyUnit = 3;
    } else {
        taskTypeSQL = " and d.taskTypeName!='" + lyxfNightCheckItemName + "'";
        frequencyUnitSQL = " and d.frequencyUnit=" + frequencyUnit;
    }
    var sql = "select distinct t.id  as taskId,p.status,s.isCode,q.name,z.name as componentName,q.id as dpId,b.treeCode,a.name as itemName,b.name as roadLineName  from " + TB_task_detail + " t ," + TB_task_master + " d, " + TB_standard_task + " s," +
        TB_device_place + " q," + TB_task_vindicate + " p ," + TB_component + " z, " + TB_item + " a," + TB_road_line + " b where t.startDate <=" + time + " and t.endDate>=" + time + " and t.itemName='" + lyxfCheckItemName + "'" +
        " and d.id=t.taskMasterId and d.standardTaskId=s.id  and p.taskId=t.id and p.devicePlaceId=q.id and z.id=q.componentId and a.id=q.itemId  and b.id=q.roadLineId and q.id=" + param.dpId
        + taskTypeSQL + frequencyUnitSQL;
    var ret = fnSelectSync(sql);
    var result;
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var tv = ret.data[0];
        var tunnel = queryTunnelMsgByTreeCode(tv.treeCode);
        result = {
            success: true,
            data: {
                taskId: tv.taskId,
                name: tv.name,
                status: tv.status == null ? 0 : tv.status,
                componentName: tv.componentName,
                isCode: tv.isCode == 1,
                dpId: tv.dpId,
                tunnelBeginMile: tunnel.beginMile,
                tunnelEndMile: tunnel.endMile,
                code: tunnel.code,
                itemName: tv.itemName,
            }
        }
    } else {
        if (ret != undefined && ret.status && ret.data.length == 0) {
            result = {
                success: false,
                errorMsg: '没有相关执行任务。'
            };
        } else {
            result = {
                success: false,
                errorMsg: ret.msg
            };
        }
    }
    return result;
}
function queryDevicePlaceIbeaconById(dpId) {
    var sql = "select ibeacon from " + TB_device_place + " t where t.id=" + dpId;
    var ret = fnSelectSync(sql);
    if (ret.status && ret.data.length > 0) {
        return ret.data[0].ibeacon;
    } else {
        return undefined;
    }
}
//将扫描图片插入到任务维护实体中
function insertImgToTaskVindicate(taskId, dpId, imgSrc) {
    if (imgSrc != undefined) {
        var sql = "select * from " + TB_task_vindicate + " t where t.devicePlaceId=" + dpId + " and t.taskId=" + taskId;
        var ret = fnSelectSync(sql);
        if (ret.status && ret.data.length > 0 && ret.data[0].status != 2) {
            var tv = ret.data[0];
            var lstImg = [];
            if (tv.annexIds != "") {
                lstImg = JSON.parse(tv.annexIds).tvPhotos;
                if (lstImg == undefined) {
                    lstImg = [];
                }
            }
            ;
            var isNotExit = true;
            $.each(lstImg, function (i, img) {
                if (img == imgSrc) {
                    isNotExit = false;
                }
            });
            if (isNotExit) {
                lstImg[lstImg.length] = imgSrc;
                var tvPhotos = {
                    tvPhotos: lstImg
                };
                var listMap = [{
                    name: 'annexIds',
                    val: JSON.stringify(tvPhotos)
                }];
                fnUpdateSync(TB_task_vindicate, listMap, " devicePlaceId=" + dpId + " and taskId=" + taskId);
            }
        }
    }

}
//判断是否是第一级功能位置
function isHasChile(dpId) {
    var sql = "select 1 from " + TB_device_place + " t where t.id=" + dpId + " and t.parentId is null and exists(select 1 from " + TB_device_place + " d where d.parentId=t.id)";
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        return true;
    }
    return false;
}
//判断是否是第二级功能位置
function isHasParentChile(dpId) {
    var sql = "select 1 from " + TB_device_place + " t where t.id=" + dpId + " and t.parentId is not null and exists(select 1 from " + TB_device_place + " d where d.id=t.parentId)";
    var ret = fnSelectSync(sql);
    return ret != undefined && ret.status && ret.data.length > 0;
}
//判断是否是有子子功能位置的子功能位置
function isHasParentAndHasChild(dpId) {
    var sql = "select 1 from " + TB_device_place + " t where t.id=" + dpId + " and t.parentId is not null and exists(select 1 from " + TB_device_place + " d where d.id=t.parentId)" +
        "and exists(select 1 from " + TB_device_place + " d where d.parentId=t.id)";
    var ret = fnSelectSync(sql);
    return ret != undefined && ret.status && ret.data.length > 0;
}
//判断是否所有的检查项目都上传完毕
function isUploadTaskItemValueAll(dpId, taskId) {
    var sql = "select count(*) as count from " + TB_task_item_value + " t where t.devicePlaceId=" + dpId + " and t.taskId=" + taskId + " " +
        "and t.status=0";
    var count = fnSelectSync(sql).data[0].count;
    sql = "select count(*) as count from " + TB_task_item_value + " t where  t.taskId=" + taskId +
        " and t.status=0 and t.devicePlaceId in (select d.id from " + TB_device_place + " d where d.parentId=" + dpId + ")";
    count += fnSelectSync(sql).data[0].count;
    if (count > 0) {
        return false;
    } else {
        return true;
    }
}

//获取隧道的检查状态
function queryTunnelStatus(itemName, frequencyUnit, time, checkItemName) {
    var taskTypeSQL = "";
    var frequencyUnitSQL = "";
    // 1.年 2.季 3.月 4.周 5.天(0为夜间巡查和月巡查频率一样)
    if (frequencyUnit == 0) {
        taskTypeSQL = " and d.taskTypeName='" + lyxfNightCheckItemName + "'";
        frequencyUnit = 3;
    } else {
        taskTypeSQL = " and d.taskTypeName!='" + lyxfNightCheckItemName + "'";
        frequencyUnitSQL = " and d.frequencyUnit=" + frequencyUnit;
    }
    var sql = "select p.status  from " + TB_task_detail + " t ," + TB_task_master + " d, " + TB_standard_task + " s," +
        TB_device_place + " q," + TB_item + " z," + TB_task_vindicate + " p where t.startDate <=" + time + " and t.endDate>=" + time +
        " and d.id=t.taskMasterId and d.standardTaskId=s.id   and p.taskId=t.id and p.devicePlaceId=q.id and " +
        "q.itemId=z.id  and z.name='" + itemName + "' and q.parentId is null " + taskTypeSQL + frequencyUnitSQL;
    var ret = fnSelectSync(sql);
    var checkedCount = 0;
    var checkIngCount = 0;
    var checkNonCount = 0;
    if (ret != undefined && ret.status && ret.data.length > 0) {
        $.each(ret.data, function (i, tv) {
            if (tv.status == "" || tv.status == 0) {
                checkNonCount++;
            } else if (tv.status == 1) {
                checkIngCount++;
            } else if (tv.status == 2) {
                checkedCount++;
            }
        });
    }
    if (checkedCount > 0 && checkIngCount == 0 && checkNonCount == 0) {
        return 2;
    } else if (checkedCount > 0 || checkIngCount > 0) {
        return 1;
    } else {
        return 0;
    }
}

//获取隧道的信息
function queryTunnelMsgByTreeCode(treeCode) {
    var sql = "select  * from " + TB_road_line + " t where t.id in (" + treeCode.substring(0, treeCode.length - 1) + ") and t.type=1 order by t.type desc";
    var ret = fnSelectSync(sql);
    if (ret != undefined && ret.status && ret.data.length > 0) {
        var tunnel = {
            code: ret.data[0].code
        };
        sql = "select  * from " + TB_road_line + " t where t.id in (" + treeCode.substring(0, treeCode.length - 1) + ") and (t.type=19 or t.type=4) and t.name like '%行%' order by t.type desc";
        ret = fnSelectSync(sql);
        if (ret.status && ret.data.length > 0) {
            tunnel.beginMile = ret.data[0].beginMile;
            tunnel.endMile = ret.data[0].endMile;
            return tunnel;
        } else {
            return {};
        }
    }
    return {};
}

//返回距离
function calculationDistance(code, beginMile, endMile) {
    var arcgis = $api.getStorage('arcgis');
    if (arcgis != undefined && beginMile != undefined && endMile != undefined) {
        if (code == arcgis.code) {
            var beginDistance = Math.abs(beginMile - arcgis.mile);
            var endDistance = Math.abs(endMile - arcgis.mile);
            return beginDistance > endDistance ? endDistance : beginDistance;
        } else {
            return "";
        }
    } else {
        return "";
    }
}
/**
 * 格式化时间戳（yyyy-MM-dd）
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
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//状态排序
function statusSort(lstTask) {
    lstTask.sort(function (pre, next) {
        return pre.status - next.status;
    });
}
//距离排序
function distanceSort(lstTask) {
    lstTask.sort(function (pre, next) {
        if (pre != "" && next != "") {
            return pre.distance - next.distance;
        }
        if (pre != "" && next == "") {
            return 1;
        }
        if (pre == "" && next != "") {
            return -1;
        }
    });
}

