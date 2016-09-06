var fs = require('fs')
var path = require('path')

import getProjectInfo from './lib/getProjectInfo'


let allProjectUrl = {};
export default async() => {
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
        if (!result.err || (result.err && !oldProjectInfo[url])) {
            let newProjectInfo = Object.assign({}, oldProjectInfo, result)
            fs.writeFileSync(path.join(__dirname, 'data', 'projectInfo.json'), JSON.stringify(newProjectInfo))
        }
    }

    return result
}

async function wait () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('等了三秒了哈')
        }, 3000)
    })
}