/**
 * Created by xs206 on 2016/9/6.
 */

var fs = require('fs')
var path = require('path')

import getAllInfo from './getAllInfo'

(async () => {
    try {
        let result = await getAllInfo()
        console.log('请求 over')

        // fs.writeFileSync(path.join(__dirname, 'data', 'projectInfo.json'), JSON.stringify(result))
    } catch(err) {
        console.log(err)
    }

})();