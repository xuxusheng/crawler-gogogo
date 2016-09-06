import  getProjectUrl from './lib/getAllProjectUrl'

var fs = require('fs');
var path = require('path');

(async () => {
    let result = {}
    try {
        result = await getProjectUrl()
    } catch (err) {
        console.log(err)
    }
    console.log('抓取完成，共有' + Object.keys(result).length + '个project')
    fs.writeFileSync(path.join(__dirname, 'data', 'projectUrl.json'), JSON.stringify(result))
})()