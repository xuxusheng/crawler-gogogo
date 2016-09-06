let cheerio = require('cheerio')
let rp = require('request-promise')

let options = {
    uri: 'http://www.zhongchou.com/deal-show/id-288286',
    transform: function (body) {
        return cheerio.load(body)
    }
}


export default async(url) => {

    let result = {}
    // 进入 getProjectInfo 函数
    console.log('进入 getProjectInfo 函数')
    options.uri = url

    try{
        result = Object.assign({}, result, await request(options))
    }catch(err) {
        result = {"err": "请求出错"}
        console.log(err)
    }

    return result
}


async function request(options) {
    // 开始 请求
    let result = {}
    let $ = await rp(options)

    let $jlxqOuterBox = $('#jlxqOuterBox')

    // 项目 ID
    result.project_ID = $jlxqOuterBox.attr('data-dealid')
    // 发起人 ID
    result.fundraiser_ID = $jlxqOuterBox.attr('data-userid')

    // 项目标题
    result.title = $('#move').text()

    let $jlxqTitleText = $('.jlxqTitleText')
    // 项目类别
    result.category = $jlxqTitleText.find('.gy a').text()
    // 省份
    result.province = $jlxqTitleText.find('.addr a').eq(0).text()
    // 城市
    result.city = $jlxqTitleText.find('.addr a').eq(1).text()
    // result.keywords = $jlxqTitleText.find('.label a').reduce((last, current) => {
    //     return last + ',' + current
    // })
    // 关键词
    result.keywords = []
    $jlxqTitleText.find('.label a').each((index, item) => {
        result.keywords.push($(item).text())
    })

    // 目标筹款
    result.goal = $('.xqRatioOuterBox .xqRatioText .rightSpan b').text()

    // 已筹款
    result.money_raised = $('.xqDetailDataBox .xqDetailData:nth-of-type(2) .ftP').text()

    // 支持数
    result.nbackers = $('.xqDetailDataBox .xqDetailData:nth-of-type(1) .ftP').text()

    // 评论数
    result.ncomments = $('#xqTabNav_ul li[data-scrollto=plOuterBox] b').text()

    // 项目进展，项目发起人一共更新了多少次状态
    result.nupdates = $('#xqTabNav_ul li[data-scrollto="zxjzBox"] b').text()

    // 项目描述中图片总数
    result.npictures = $('#xmxqBox img').length

    // 项目描述中是否有视频
    result.video = $('#left .play-box').length > 0

    // 投多少钱可以参与抽奖
    // result.lottery_price =

    // 可以获得奖品的人数
    // result.lottery_prize

    // 满多少人开始抽奖
    // result.lottery_base

    $('.zcjeOuterBox .zcje_ItemBox').each((index, item) => {
        let price = $(item).find('h3 b').text()
        let price_cnt_price_limit = $(item).find('h3').text()
        result['price' + (index + 1)] = price
        result['price_cnt_price_limit' + (index + 1)] = price_cnt_price_limit
    })








    return result
}

