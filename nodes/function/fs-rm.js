var fs = require("fs");
var _ = require("lodash")

module.exports = function (RED) {
    // 同步删除文件和目录
    function FsRm(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.path = config.path;
        this.pathType = config.pathType;
        this.recursive = config.recursive;
        this.recursiveType = config.recursiveType;
        this.maxRetries = config.maxRetries;
        this.maxRetriesType = config.maxRetriesType;
        this.retryDelay = config.retryDelay;
        this.retryDelayType = config.retryDelayType;
        var node = this;
        node.on('input', function (msg, send, done) {
            // prev node's msg
            node.warn(msg);
            // this node info
            // console.log(node);

            // msg.payload = [];
            var result = {
                result: false,
                message: ""
            };

            var path = undefined;
            if (node.pathType == "str") {
                path = node.path;
            } else if (node.pathType == "msg") {
                path = _.get(msg, node.path, undefined);
                // console.log(path);
            } else if (node.pathType == "flow") {
                path = node.context().flow.get(node.path);
                // console.log(path);
            } else if (node.pathType == "global") {
                path = node.context().global.get(node.path);
            } else {
                node.status({ fill: "red", shape: "dot", text: "fs-rm.info.select" });
                return;
            }
            // console.log(`path: ${path}`);

            if (path == undefined) {
                node.warn(RED._("fs-rm.info.select"));
                node.status({ fill: "red", shape: "dot", text: "fs-rm.info.select" });
                return;
            }
            var stat = fs.statSync(path, { throwIfNoEntry: false });
            if (stat == undefined) {
                node.status({ fill: "red", shape: "dot", text: "fs-rm.info.select" });
                return;
            } else {
                node.status({});
            }

            // 是否递归
            var recursive = undefined;
            if (node.recursiveType == "bool") {
                recursive = node.recursive;
            } else if (node.recursiveType == "msg") {
                recursive = _.get(msg, node.recursive, false);
                // console.log(recursive);
            } else if (node.recursiveType == "flow") {
                recursive = node.context().flow.get(node.recursive);
                // console.log(recursive);
            } else if (node.recursiveType == "global") {
                recursive = node.context().global.get(node.recursive);
            } else {
                recursive = false;
            }
            recursive = Boolean(recursive);
            // console.log(`recursive: ${recursive}`);

            
            // 重试次数
            var maxRetries = undefined;
            if (node.maxRetriesType == "num") {
                maxRetries = node.maxRetries;
            } else if (node.maxRetriesType == "msg") {
                maxRetries = _.get(msg, node.maxRetries, 0);
                // console.log(maxRetries);
            } else if (node.maxRetriesType == "flow") {
                maxRetries = node.context().flow.get(node.maxRetries);
                // console.log(maxRetries);
            } else if (node.maxRetriesType == "global") {
                maxRetries = node.context().global.get(node.maxRetries);
            } else {
                maxRetries = 0;
            }
            // 设置重试次数为自然数
            maxRetries = Number.parseInt(maxRetries);
            if (Number.isNaN(maxRetries) || maxRetries < 0) {
                maxRetries = 0;
            }
            // console.log(`maxRetries: ${maxRetries}`);

            // 重试时间
            var retryDelay = undefined;
            if (node.retryDelayType == "num") {
                retryDelay = node.retryDelay;
            } else if (node.retryDelayType == "msg") {
                retryDelay = _.get(msg, node.retryDelay, 100);
                // console.log(retryDelay);
            } else if (node.retryDelayType == "flow") {
                retryDelay = node.context().flow.get(node.retryDelay);
                // console.log(retryDelay);
            } else if (node.retryDelayType == "global") {
                retryDelay = node.context().global.get(node.retryDelay);
            } else {
                node.status({ fill: "red", shape: "dot", text: "fs-rm.info.select" });
                return;
            }
            // 值无效或者值小于100, 则设置默认值为100
            retryDelay = Number.parseInt(retryDelay);
            if (Number.isNaN(retryDelay) || retryDelay < 100) {
                retryDelay = 100;
            }
            // console.log(`retryDelay: ${retryDelay}`);

            try {
                fs.rmSync(path, { recursive, maxRetries, retryDelay });
                result.result = true;
                result.message = "remove path success!";
            } catch (error) {
                result.result = false;
                result.message = error.message;
                node.error(error);
            }

            msg.payload = result;
            send(msg);
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("fs rm", FsRm);
}