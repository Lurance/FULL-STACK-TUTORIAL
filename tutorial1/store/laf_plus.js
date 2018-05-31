// 持久化文件存储LAF

const fs = require('fs')

class BaseFileDB {
    constructor(dbPath) {
        this.splitChar = '\n'
        this.data = []
        this.dbPath = dbPath
        this.preUnsealize()
    }

    preUnsealize() {
        let _this = this
        fs.readFile(this.dbPath, function (err, data) {
            if (err) throw err
            data.toString().split(_this.splitChar).forEach(function (e) {
                if (e !== '') _this.data.push(_this.unserialize(e))
            })
        })
    }

    serialize(obj) {
        this.data.push(obj)
        fs.appendFile(this.dbPath, JSON.stringify(obj) + '\n')
    }

    unserialize(str) {
        try {
            return JSON.parse(str)
        } catch (e) {
            throw e
        }
    }
}

class LAFPlus extends BaseFileDB {
    constructor() {
        super(__dirname + '/laf.db')
    }

    getLafs() {
        return this.data
    }

    createLaf(username, item) {
        this.serialize({
            username: username,
            item: item
        })
    }
}

module.exports = LAFPlus