var fs = require("fs");
var _ = require("lodash");

module.exports = function (RED) {
    function FsExists(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.path = config.path;
        this.pathType = config.pathType;
        this.useReplace = config.useReplace;
        this.replaceText = config.replaceText;
        this.replaceTextType = config.replaceTextType;
        var node = this;
        node.on('input', function (msg, send, done) {
            // prev node's msg
            // console.log(msg);
            node.warn(msg);
            // this node info
            console.log(node)
            // node.warn(node);

            // msg.payload = [];

            var path = undefined;
            if (node.pathType == "str") {
                path = node.path;
            } else if (node.pathType == "msg") {
                // path = msg[node.path] || undefined;
                path = _.get(msg, node.path, undefined);
            } else if (node.pathType == "flow") {
                path = node.context().flow.get(node.path);
            } else if (node.pathType == "global") {
                path = node.context().global.get(node.path);
            } else {
                // node.error(RED._("fs-read-dir.info.select"));
                node.status({ fill: "red", shape: "dot", text: "fs-read-dir.info.select" });
                return;
            }

            if (path == undefined) {
                node.status({ fill: "red", shape: "dot", text: "fs-read-dir.info.select" });
                return;
            }

            var exists = fs.existsSync(path);

            // en: use replace field function
            // zh: 启用替换字段功能
            if (node.useReplace) {
                var replaceText = node.replaceText.trim();
                if (node.replaceTextType == "str") {
                    if (replaceText == "") {
                        msg.payload = exists;
                    } else {
                        msg[replaceText] = exists;
                    }
                } else if (node.replaceTextType == "msg") {
                    // replaceText = msg[node.replaceText].trim();
                    replaceText = _.get(msg, node.replaceText, "").trim();
                    if (replaceText == "") {
                        msg.payload = exists;
                    } else {
                        msg[replaceText] = exists;
                    }
                } else {
                    msg.payload = exists;
                    node.status({ fill: "red", shape: "dot", text: "fs-read-dir.info.select" });
                }
            } else {
                msg.payload = exists;
            }
            send(msg);
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("fs exists", FsExists);
}