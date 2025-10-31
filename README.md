# PC项目

## 注意事项

需要安装依赖，注意node版本不要太高，我使用的是node 14

1. 降级 npm `npm i -g npm@6.14.18`
2. 卸载 node 高版本
3. [安装 node 14](https://nodejs.org/en/download/current)
4. `npm i`
5. `npm run serve`

```js
npm i
```
```
<-- 改，2022.10.16，新增style -->
```

## Development

```bash
$ npm run serve
```

## Build

```bash
$ npm run build
```

## Deploy
注：部署前需要编译，并打包为zip，项目名后需要添加日期，如exchange-vue-server-ex-2022-10-16.zip

0. 登录服务器
1. cd /data/versions/
2. 上传exchange-vue-server-ex-2022-10-16.zip
3. rm -rf exchange-vue-server-ex
4. unzip exchange-vue-server-ex-2022-10-16.zip
5. tar -czf exchange-vue-server-ex.tar.gz exchange-vue-server-ex
6. cp exchange-vue-server-ex.tar.gz /data/store/ex-public-ssl-slb-docker/web/exchange-vue-server-ex.tar.gz
7. cd /data/store/
8.  ./install-public-ssl-slb.sh

## Tips

1. 本地运行该项目，会出现没有数据的情况
解决办法：将此文件中/node_module/BlockChain-ui-privatization/PC/vuex/baseData.js，注释478--496行代码，取消注释500--4037行代码

注：此方法为临时解决办法，编译时需要恢复

或者使用proxy与测试服务器进行连接获取数据

2. 当前仅保证线上显示homepage，初始查询接口都已更换为静态数据，具体更换有：
1）\app\view\src\pages\ex-home\App.vue
    69-2290行 替换了 2291-2297行；
2）\app\view\src\components\BlockChain-ui-privatization\PC\vuex\baseData.js
    新增 194-196行；
    206-219行 替换了 220-227行；
    4096-4101行 替换了 4102-4110行；
    4242-4340行 替换了 4341-4350行；

