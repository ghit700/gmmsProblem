//图片缓存，增加了判断文件是否存在
var fileDir = 'fs://gmmsTunnel/cache/';
function cacheImg(url, callback) {
    var RealFileDir = api.fsDir + "/gmmsTunnel/cache/";
    if (url.indexOf('gmmsTunnel/cache') == -1) {
        //对url进行加密编码成为字符串
        var signature = api.require('signature');
        var fs = api.require('fs');
        signature.md5({
            data: url
        }, function (ret, err) {
            if (ret != undefined && ret.status) {
                var fsRet = fs.existSync({
                    path: fileDir + ret.value + ".jpg"
                });
                if (fsRet.exist) {
                    callback(RealFileDir + ret.value + ".jpg");
                } else {
                    api.download({
                        url: url,
                        savePath: fileDir + ret.value + ".jpg",
                        cache: true,
                        allowResume: true,
                    }, function (ret, err) {
                        if (ret != undefined && ret.state == 1) {
                            callback(ret.savePath);
                        }
                    });
                }
            } else {
                callback(url);
            }

        });
    } else {
        callback(url);
    }
}

function cacheImages(lstImg, imgId, imgType, index, isSmallImage) {
    var imgUrl = lstImg[index];
    if (isSmallImage) {
        imgUrl += '&smallImage=true&width=200&height=200';
    }
    cacheImg(imgUrl, function (url) {
        if (imgType == 'src') {
            $('#' + imgId).attr('src', url);
        } else if (imgType == 'css') {
            $('#' + imgId).css('background-image', 'url(' + url + ')');
        }
        $('#' + imgId).on('click', function (e) {
            if(isSmallImage){
                cacheImg(lstImg[index],function (url) {
                    lstImg[index]=url;
                });
            }
            showImages(lstImg,index);
        });
    });
}
function showImages(lstImg, index) {
    var imageBrowser = api.require('imageBrowser');
    imageBrowser.openImages({
        showList: false,
        activeIndex: index,
        tapClose: true,
        imageUrls: lstImg
    });
}

function cacheImage(url, imgId, imgType, isSmallImage) {
    var lstImg=new Array;
    lstImg[0]=url;
    cacheImages(lstImg,imgId,imgType,0,isSmallImage);
}

