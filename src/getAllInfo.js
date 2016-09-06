var fs = require('fs')
var path = require('path')

import getProjectInfo from './lib/getProjectInfo'

let allProjectUrl = {};
export default async() => {

    // 读取所有的 projectUrl
    allProjectUrl = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projectUrl.json'), 'utf-8'));
    return await gogogo()
}

async function gogogo() {

    console.log('开始请求')
    let result = {}

    for (let item of Object.keys(allProjectUrl)) {
        // 获取旧的文件内容
        let oldProjectInfo = {}
        try {
            oldProjectInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projectInfo.json')))
        } catch(err) {
            oldProjectInfo = {}
            // console.log(err)
        }

        let url = allProjectUrl[item]

        console.log('====================== start ==========================')
        console.log('当前请求第' + (Object.keys(allProjectUrl).indexOf(item) + 1) + '个project')
        console.log('请求的url为' + url)
        result[url] = await getProjectInfo(url)
        console.log('请求的结果为' + JSON.stringify(result[url]))
        console.log(await wait())
        console.log('====================== end ==========================')

        // 写入新的文件内容
        // TODO 愿意是希望，当请求没出错时，写入文件中，当请求错误而文件中并没有当前这个url索引时，同样写入这个错误信息，但是代码设计的好像有点问题。。。
        if (!result.err || (result.err && !oldProjectInfo[url])) {
            let newProjectInfo = Object.assign({}, oldProjectInfo, result)
            fs.writeFileSync(path.join(__dirname, 'data', 'projectInfo.json'), JSON.stringify(newProjectInfo))
        }
    }

    return result
}

// 延迟个几秒再请求
async function wait () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('等了五秒了哈')
        }, 5000)
    })
}