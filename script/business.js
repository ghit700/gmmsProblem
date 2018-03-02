/**
 * Created by wzn on 2018/1/11.
 */
//下载待办
function downloadAllMsg(fun) {
    post("/modules/mobile/business/business-deal!queryAllBusinessTodo.action", {
        userId: $api.getStorage('user').id
    }, function (ret) {
        $.each(ret.itemList, function (i, item) {
            var ret = fnAddPermissionItem(item);
        });
        $.each(ret.businessList, function (i, business) {
            var ret = fnAddBusiness(business);

        });
        $.each(ret.todoList, function (i, todo) {
            var ret = fnAddBusinessTodo(todo);
        });
        $.each(ret.mailList, function (i, mail) {
            var ret = fnAddMail(mail);
        });
        deleteTable(TB_problem);
        $.each(ret.problemList, function (i, problem) {
            var ret = fnAddProblem(problem);
        });
        fun();
    });
}

//获取功能列表
function queryMsg(model) {
    //审批
    var sql = "select bs.*,item.itemName from " + TB_business_todo + " bs," + TB_permission_item + " item " +
        "where bs.status=0 and bs.handler=" + $api.getStorage('user').id + " and bs.itemId=item.id  order by bs.createTime desc";
    var ret = fnSelectSync(sql);

    if (ret.status && ret.data.length > 0) {
        var todo = ret.data[0];
        model.todoTitle = todo.itemName;
        model.todoContent = todo.pname;
        model.todoTime = tranTime(todo.createTime);
        model.todoCount = ret.data.length;
    } else {
        model.todoTitle = '审批';
        model.todoContent = '暂无审批';
        model.todoTime = '';
        model.todoCount = 0;
    }
    //故障
    sql = "select * from " + TB_problem + " t where t.handlerId=" + $api.getStorage('user').id;
    ret = fnSelectSync(sql);
    if (ret.status && ret.data.length > 0) {
        var problem=ret.data[0];
        model.problemCount=ret.data.length;
        model.problemContent=problem.description;
        model.problemTime=tranTime(problem.discoverTime);
    }else {
        model.problemContent = '暂无故障';
        model.problemTime = '';
        model.problemCount = 0;
    }
    //邮件
    sql = "select * from " + TB_infomation_map_user + " t where t.accepterId=" + $api.getStorage('user').id;
    ret = fnSelectSync(sql);

    if (ret.status && ret.data.length > 0) {
        var infomation_map_user = ret.data[0];
        model.mailTitle = infomation_map_user.sender;
        model.mailContent = infomation_map_user.title;
        model.mailTime = tranTime(infomation_map_user.sendTime);
        model.todoCount = 0;
    } else {
        model.mailTitle = '邮件';
        model.mailContent = '暂无邮件';
        model.mailTime = '';
        model.todoCount = 0;
    }
}
function fnAddBusinessTodo(todo) {
    deleteTable(TB_business_todo);
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'REPLACE INTO ' + TB_business_todo + '(todoid, flowId, itemId, pname, bsnum, createTime, currentNode ,currentNodeName ,prevNode ,prevActor,handler,status,openFlag,tempidea,remark,beback,lesseeId)  VALUES ' +
        '("' + todo.todoid + '","' + todo.flowId + '","' + todo.item.id + '","' + todo.pname + '","' + todo.bsnum + '","' + todo.createTime + '","' + todo.currentNode + '","' + todo.currentNodeName + '","' + todo.prevNode + '","'
        + todo.prevActor + '","' + todo.handler + '","' + todo.status + '","' + todo.openFlag + '","' + todo.tempidea + '","' + todo.remark + '","' + todo.beback + '","' + todo.lesseeId + '")'
    });
    return ret;
};
function fnAddBusiness(bs) {
    deleteTable(TB_business);
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'REPLACE INTO ' + TB_business + '(bsnum, flowId, name, createTime, endTime ,authorId, authorName ,status,lesseeId)  VALUES ("' + bs.bsnum + '","' + bs.flowId + '","' + bs.name + '","' + bs.createTime + '","' + bs.endTime + '","' + bs.authorId + '","' + bs.authorName + '","' + bs.status + '","' + bs.lesseeId + '")'
    });
    return ret;
}
function fnAddPermissionItem(item) {
    deleteTable(TB_permission_item);

    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'REPLACE INTO ' + TB_permission_item + ' (id, itemName, keyName, icon, isOutline) VALUES ("' + item.id + '","' + item.itemName + '","' + item.keyName + '","' + item.icon + '","' + item.isOutline + '")'
    });

    return ret;
}
function fnAddMail(mail) {
    deleteTable(TB_infomation_map_user);
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'REPLACE INTO ' + TB_infomation_map_user + ' (infomationId, title, sendTime, openFlag, sender,infoType,accepterId) VALUES ("' + mail.infomationId + '","' + mail.title + '","' + mail.sendTime + '","' + mail.openFlag + '","' + mail.sender + '","' + mail.infoType + '","' + mail.accepterId + '")'
    });

    return ret;
}
function fnAddProblem(problem) {
    var ret = db.executeSqlSync({
        name: DATABASE,
        sql: 'REPLACE INTO ' + TB_problem +
        ' (id, zoneId, zoneName,bsnum,discoverTime,discoverNames,description,exigenceGrade,treeName,problemStatus,handlerId,nodeName) VALUES ' +
        '("' + problem.id + '","' + problem.zoneId + '","' + problem.zoneName + '","' + problem.bsnum
        + '","' + problem.discoverTime + '","' + problem.discoverNames + '","' + problem.description + '","' + problem.exigenceGrade + '","' + problem.treeName + '","' + problem.problemStatus + '","' + problem.handlerId + '","' + problem.nodeName + '")'
    });
    return ret;
}