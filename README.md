## Intro
- This package is suitable for using the fs base API in node-red
- 此包适用于在node-red中使用fs基础api

## Package
node-red-contrib-fs-base

## Install
### ``二选一``

- ### Dashboard Install
![install](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/install.png)

- ### Console Install
```javascript
cd ~/.node-red
npm install node-red-contrib-fs-base
```

## Examples
### 1. fs-read-dir
### NodeJs API: [``fs.readdirSync``](https://nodejs.cn/api/fs.html#fsreaddirsyncpath-options)
### ``读取指定目录资源``

![fs-read-dir](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-read-dir.png)

![fs-read-dir-example1](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-read-dir-1.png)

### 2. fs-exists
### NodeJs API: [``fs.existsSync``](https://nodejs.cn/api/fs.html#fsexistssyncpath)
### ``检测指定资源是否存在``

![fs-exists](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-exists.png)

![fs-exists-example1](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-exists-1.png)

### 3. fs-unlink
### NodeJs API: [``fs.unlinkSync``](https://nodejs.cn/api/fs.html#fsunlinksyncpath)
### ``删除指定文件``

![fs-unlink](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-unlink.png)

![fs-unlink-example1](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-unlink-1.png)

### 4. fs-rm
### NodeJs API: [``fs.rmSync``](https://nodejs.cn/api/fs.html#fsrmsyncpath-options)
### ``删除指定资源``

![fs-unlink](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-rm.png)

![fs-unlink-example1](https://raw.githubusercontent.com/sunny-nie/image-store/main/node/node-red-plugins/node-red-contrib-fs-base/fs-rm-1.png)