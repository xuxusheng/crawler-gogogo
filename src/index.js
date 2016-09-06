import  getProjectUrl from './lib/getAllProjectUrl'
import getProjectInfo from './lib/getProjectInfo'

var fs = require('fs');
var path = require('path');

(async () => {
    console.log('================== start =======================')
    console.time('请求 1 个 project的url共耗时(默认排序）')
    console.log(await getProjectUrl(1))
    console.timeEnd('请求 1 个 project的url共耗时(默认排序）')
    console.log('==================  end  =======================')

    console.log('================== start =======================')
    console.time('请求 11 个 project的url共耗时（最新上线排序')
    console.log(await getProjectUrl(11, '最新上线'))
    console.timeEnd('请求 11 个 project的url共耗时（最新上线排序')
    console.log('==================  end  =======================')

    console.log('================== start =======================')
    console.time('请求 55 个 project的url共耗时（目标金额排序）')
    console.log(await getProjectUrl(55, '目标金额'))
    console.timeEnd('请求 55 个 project的url共耗时（目标金额排序）')
    console.log('==================  end  =======================')

    // try {
    //     await getProjectInfo('http://www.zhongchou.com/deal-show/id-391372')
    // } catch(err) {
    //     console.log(err)
    // }

})()