/**
 * Created by nan on 2017/5/18.
 */
//删除文件
function deleteFile(path) {
    var fs = api.require('fs');
    fs.exist({
        path: path
    }, function (ret, err) {
        if (ret.exist) {
            fs.remove({
                path: path
            }, function (ret, err) {
            });
        }
    });
}