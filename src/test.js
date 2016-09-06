/**
 * Created by xs206 on 2016/9/6.
 */

import getAllInfo from './getAllInfo'

(async () => {
    try {
        let result = await getAllInfo()
        console.log('请求 over')
    } catch(err) {
        console.(err)
    }
})();