/**
 * Created by nan on 2017/2/28.
 */


var navHeight;
//添加底部导航菜单
// function addBottomNev() {
//     var user = $api.getStorage('user');
//     if (user.authority != "") {
//         var bottomHtml = "";
//         var authoritys = user.authority.split(",");
//         var url = "";
//         var name = "";
//         var bottomNevArray = [];
//         $.each(authoritys, function (i, authority) {
//             var tempUrl = "";
//             var tempName = "";
//             var nevName = "";
//             var activeHtml = "";
//             var tempBottomHtml;
//             var icon = "";
//             //菜单顺序
//             var index = -1;
//             switch (authority) {
//                 case "ROLE_QD_PROBLEM_REPAIR":
//                     tempUrl = "./electro.html";
//                     tempName = "electro";
//                     nevName = "维修";
//                     icon = "mui-icon-home";
//                     index = 1;
//                     if (bottomNevArray[index] != undefined) {
//                         index = bottomNevArray.length;
//                     }
//                     break;
//                 case "ROLE_QD_ELECTROMECHANICAL":
//                     tempUrl = "./electro.html";
//                     tempName = "electro";
//                     nevName = "检查";
//                     icon = "mui-icon-home";
//                     index = 0;
//                     if (bottomNevArray[index] != undefined) {
//                         index = bottomNevArray.length;
//                     }
//                     $api.setStorage('systemId', 3);
//                     break;
//                 case "ROLE_QD_PROBLEM_REPORT":
//                     tempUrl = "./report/report.html";
//                     tempName = "report";
//                     nevName = "报表";
//                     icon = "icon-show";
//                     index = 2;
//                     if (bottomNevArray[index] != undefined) {
//                         index = bottomNevArray.length;
//                     }
//                     break;
//             }
//             if (index == 0) {
//                 name = tempName;
//                 url = tempUrl;
//                 activeHtml = "mui-active";
//             } else {
//                 activeHtml = "";
//             }
//             tempBottomHtml = ' <a class="mui-tab-item  ' + activeHtml + '" onclick="switchframe(\'' + tempUrl + '\',\'' + tempName + '\',' + index + ')"> <span class="mui-icon ' + icon + '"> </span><span class="mui-tab-label">' + nevName + '</span> </a>';
//             bottomNevArray[index] = tempBottomHtml;
//         });
//         if (bottomNevArray.length == 0) {
//             stopLocation();
//             unbind();
//             $api.rmStorage('user');
//             $api.rmStorage('systemId');
//             api.openWin({
//                 name: 'login',
//                 url: '../login/login.html',
//                 slidBackEnabled: false
//             });
//             api.closeWin({
//                 name: 'main'
//             });
//         } else {
//             $.each(bottomNevArray, function (i, html) {
//                 if (html != undefined) {
//                     bottomHtml += html;
//                 }
//             });
//             bottomHtml += ' <a class="mui-tab-item "  onclick="switchframe(\'./my/my.html\',\'my\',' + (authoritys.length ) + ')"> <span class="mui-icon icon-my"></span> <span class="mui-tab-label">设置</span> </a>';
//             $('.mui-bar-tab').html(bottomHtml);
//
//         }
//     }
// }
function initBottom() {
    navHeight = $('.mui-bar-tab').height();
    openframeinstance('./home/home-header.html', 'home', false);
}
var currentIndex = 0;
var isHomeOpen = false;
var isContactsOpen = false;
var isMyOpen = false;
function switchframe(url, name, _index) {
    if (currentIndex == _index) {
        return;
    }
    currentIndex = _index;
    hideAllFrame();
    randomSwitchBtn(_index);
    openframeinstance(url, name, false);
}

//打开frame
function openframeinstance(url, name, isReload) {
    if (name == 'home' && isHomeOpen || name == 'contacts' && isContactsOpen || name == 'my' && isMyOpen) {
        showframe(name);
        return;
    }
    api.openFrame({
        name: name,
        url: url,
        bounces: false,
        pageParam: {
            name: api.pageParam.name,
            navHeight: navHeight
        },
        reload: isReload,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: api.winHeight - navHeight,
        },
        vScrollBarEnabled: false
    });
    if (name == 'home') {
        isHomeOpen = true;
    } else if (name == 'contacts') {
        isContactsOpen = true
    } else if (name == 'my') {
        isMyOpen = true;
    }

}

// 隐藏所有的一级frame
function hideAllFrame() {
    api.setFrameAttr({
        name: 'home',
        hidden: true
    });
    api.setFrameAttr({
        name: 'contacts',
        hidden: true
    });
    api.setFrameAttr({
        name: 'my',
        hidden: true
    });
    api.setFrameGroupAttr({
        name: 'three_frame_group',
        hidden: true
    });
}

// 随意切换按钮
function randomSwitchBtn(index) {
    var lis = $api.domAll('.mui-tab-item');
    var i = 0, len = lis.length;
    var curLi = lis[index];
    for (i; i < len; i++) {
        var thisLi = lis[i];
        if (thisLi === curLi) {
            $api.addCls(thisLi, 'mui-active');
            $api.addCls(thisLi, 'mui-active' + index);
            continue;
        } else {
            if ($api.hasCls(thisLi, 'mui-active')) {
                $api.removeCls(thisLi, 'mui-active');
                $api.removeCls(thisLi, 'mui-active' + i);
            }
        }
    }
}

function showframe(name) {
    api.setFrameAttr({
        name: name,
        hidden: false
    });
    if (name == 'contacts') {
        api.setFrameGroupAttr({
            name: 'three_frame_group',
            hidden: false
        });
    }
}