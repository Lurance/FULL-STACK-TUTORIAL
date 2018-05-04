const http = require('http')

const server = http.createServer()

const Laf = require('./store/laf')

const laf = new Laf();

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