var fs = require("fs");
var path = require("path")

module.exports = function (RED) {
    function FsReadDir(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.dir = config.dir;
        // this.recursive = config.recursive;
        // this.withFileTypes = config.withFileTypes;
        this.absolute = config.absolute;
        this.filter = config.filter;
        this.dirType = config.dirType;
        this.useFilter = config.useFilter;
        this.fileType = config.fileType;
        var node = this;
        node.on('input', function (msg, send, done) {
            // prev node's msg
            // console.log(msg);
            node.warn(msg);
            // this node info
            console.log(node)
            // node.warn(node);

            // msg.payload = [];

            var dir = undefined;
            if (node.dirType == "str") {
                dir = node.dir;
            } else if (node.dirType == "msg") {
                dir = msg[node.dir] || undefined;
            } else {
                // node.error(RED._("fs-read-dir.info.select"));
                node.status({ fill: "red", shape: "dot", text: "fs-read-dir.info.select" });
                return;
            }

            var stat = fs.statSync(dir, {
                throwIfNoEntry: false
            });
            // console.log(RED._("fs-read-dir.info.select"));
            if (stat == undefined) {
                node.status({ fill: "red", shape: "dot", text: "fs-read-dir.info.select" });
                return;
            } else {
                node.status({});
            }

            // console.log(stat)
            // if (!fs.existsSync(node.dir)) {
            //     node.status({ fill: "red", shape: "dot", text: "fs-read-dir.info.select" });
            //     return msg;
            // }

            var dirents = fs.readdirSync(node.dir, {
                // withFileTypes: node.withFileTypes == "true"
                withFileTypes: true
            });
            var datas = [];
            console.log(dirents);
            datas = dirents.map(d => {
                return ({
                    path: node.absolute ? path.resolve(dir, d.name) : d.name,
                    name: d.name,
                    basename: (node.fileType == "file") ? d.name.replace(`.${node.filter}`, "") : d.name,
                    isDir: d.isDirectory(),
                    isFile: d.isFile()
                })
            })

            // en: use filter
            // zh: 使用筛选
            if (node.useFilter) {
                // en: filter file
                // zh: 筛选文件
                if (node.fileType == "file") {
                    datas = datas.filter(d => d.isFile && d.name.endsWith(node.filter));
                }
                // en: filter directory
                // zh: 筛选目录
                else if (node.fileType == "directory") {
                    datas = datas.filter(d => d.isDir);
                }
                // en: all
                // zh: 所有
                else {

                }
            }

            msg.payload = datas;
            send(msg);
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("fs read dir", FsReadDir);
}