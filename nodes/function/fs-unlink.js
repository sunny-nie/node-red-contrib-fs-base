var fs = require("fs");
var path = require("path")

module.exports = function (RED) {
    function FsUnlink(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.file = config.file;
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
            var result = {
                result: false,
                message: ""
            };

            var file = undefined;
            if (node.fileType == "str") {
                file = node.file;
            } else if (node.fileType == "msg") {
                file = msg[node.file] || undefined;
            } else if (node.fileType == "flow") {
                var flowCtx = node.context().flow;
                console.log(flowCtx);
            } else if (node.fileType == "global") {
                var globalCtx = node.context().global;
                console.log(globalCtx);
            } else {
                // node.error(RED._("fs-unlink.info.select"));
                node.status({ fill: "red", shape: "dot", text: "fs-unlink.info.select" });
                return;
            }

            var stat = fs.statSync(file, { throwIfNoEntry: false });
            // console.log(RED._("fs-unlink.info.select"));
            if (stat == undefined) {
                node.status({ fill: "red", shape: "dot", text: "fs-unlink.info.select" });
                return;
            } else {
                node.status({});
            }

            if (!stat.isFile()) {
                result.message = "please select a valid file path";
                console.log(RED._("fs-unlink.info.select"));
                return;
            }

            try {
                fs.unlinkSync(file)
                result.result = true;
                result.message = "unlink file success!"
            } catch (error) {
                result.result = false;
                result.message = "unlink file failure!"
                node.error(error);
            }
            msg.payload = result;
            send(msg);
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("fs unlink", FsUnlink);
}