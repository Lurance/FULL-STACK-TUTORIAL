const http = require('http')

const server = http.createServer()

const LAF = require('./store/laf')

//-------------------

// 使用基于文件的模拟数据库时（laf_plus.js）用下面这段代码，之后删除laf的定义语句，并将所有的laf改为lafplus

// const LAFPlus = require('./store/laf_plus')

// const lafplus = new LAFPlus();

// -----------------

const laf = new LAF()

const fs = require('fs')

const requestHandle = function(req, res) {
    console.log(req.url)
    console.log(req.method)
    // ------------ //
    switch(req.url) {
        case '/': {
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) throw err
                res.end(data.toString())
            })
            return
        }
        case '/lafs': {
            res.end(JSON.stringify(laf.getLafs()))
            return
        }
        case '/admin': {
            switch(req.method) {
                case 'GET': {
                    fs.readFile(__dirname + '/admin.html', function(err, data) {
                        if (err) throw err
        
                        res.end(data.toString())
                    })
                    return
                }
                case 'POST': {
                    req.on('data', function(data) {
                        const obj = JSON.parse(data.toString())
                        laf.createLaf(obj.username, obj.item)
                        res.end('OK')
                    })
                    return
                }
            }
        }
    }
}

server.on('request', requestHandle)

server.listen(9000)