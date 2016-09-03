import  getProjectUrl from './lib/getAllProjectUrl'

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
})()