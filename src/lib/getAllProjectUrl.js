let cheerio = require('cheerio')
let rp = require('request-promise')

// 存放发起 request 请求时的配置项
let options = {
    uri: '',
    transform: function (body) {
        return cheerio.load(body)
    }
}
let urlPrefix = ''
let currentTime = ''

// 抛出一个方法，接受参数 url 待抓取的网址，默认为 http://wwww.zhongchou.com/browser
// sort 表示项目的 排序方式，支持的有‘默认’‘最新上线’‘目标金额’‘支持人数’‘筹款额’，不支持正序和逆序的选择。
// num 表示需要抓取的项目的数量。
// TODO: 并没有支持根据大分类或者小分类来进行抓取，后期考虑加入
export default async(num = 0, sort = '默认', url = 'http://www.zhongchou.com/browse') => {

    // TODO： 需要判断传入的是否是合法的 url 吗？？？？

    let sorts = {
        '默认': '/p',
        '最新上线': '/sb-p',
        '目标金额': '/sm-p',
        '支持人数': '/si_c-p',
        '筹款额': '/si_m-p'
    }
    if (Object.keys(sorts).indexOf(sort) === -1) {
        sort = '默认'
    }
    url += sorts[sort]

    if (!Number.isInteger(num) || num < 0) {
        throw new Error('需要抓取的项目 url 的数量只能为正整数,或 0（代表抓取所有）')
    }

    currentTime = new Date().getTime()

    return await gogogo(url, sort, num)
}

// 开始抓取
async function gogogo(url, sort, num) {

    // 存放最终获取到的结果，形式为 { url+date ： url }
    let result = {}

    // 这个网站默认每页显示的项目数量为 24 个
    let perPageNum = 24

    if (num !== 0) {
        // 不抓取所有，这个时候就需要计算一下具体要抓取到第几页的第几个
        let {grabPageNum, lastPageProjectNum} = calc(perPageNum, num)

        for (let i = 0; i < grabPageNum; i++) {
            options.uri = `${url}${i + 1}`
            result = Object.assign({}, result, await request(options))
        }

        // 如果所有要抓取的数量不能被每页的数量整除，那么最后一页就得单独请求一下了
        if (lastPageProjectNum !== 0) {
            options.uri = `${url}${grabPageNum + 1}`
            result = Object.assign({}, result, await request(options, lastPageProjectNum))
        }
    } else {
        // 抓取所有的 project 啦，来个死循环
        for (let i = 1; i > 0; i++) {
            options.uri = `${url}${i}`
            let newResult = await request(options)
            if (!newResult) {
                break
            }
            result = Object.assign({}, result, newResult)

            console.log('================== start ===================')
            console.log('抓取第' + i + '页')
            console.log('已抓取' + Object.keys(result).length + '个 projectUrl')
            console.log('================== end ===================')
        }
    }

    return result
}

// options 为请求的配置项
// num 为当前页面中具体捕获几个 project 的 url，默认为所有
async function request(options, num = '') {
    let $ = await rp(options)
    let url = null
    let key = null
    let $siteCardItemImgA = $('.siteCardItemImgA')
    let result = {}

    if ($siteCardItemImgA.length === 0) {
        // 这一页未抓取到任何数据，说明已经抓过了最后一页（这个网站比较坑爹，就算抓取到的页码数已经不存在了，依然正常的返回，只是没有数据），并不会跳转到 404 页面去
        return null
    }

    $siteCardItemImgA.each((index, item) => {
        if (!!num && num === index) {
            return false
        }
        url = $(item).attr('href')
        key = url + '_' + currentTime
        result[key] = url
    })

    return result
}

function calc(perPageNum, num) {
    if (num <= perPageNum) {
        return {
            grabPageNum: 0,
            lastPageProjectNum: num
        }
    }

    // 除了最后一页，需要抓取的页数
    let grabPageNum = num % perPageNum
    // 最后一页需要抓取的 project 数量
    let lastPageProjectNum = num - grabPageNum * perPageNum

    return {
        grabPageNum,
        lastPageProjectNum
    }
}









