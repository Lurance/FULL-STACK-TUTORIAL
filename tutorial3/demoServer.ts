import Application = require("koa")

import {Context} from "koa"

import "reflect-metadata"

import * as json from "koa-json"

import * as md5 from "js-md5"

import * as cors from "koa2-cors"

import {Get, JsonController, Param, Render, useKoaServer} from "routing-controllers"
import * as views from "koa-views"


// -----------------------
// Controllers
@JsonController()
class DemoApiController {
    constructor() {
    }

    @Get('user/:id')
    demouserApi(@Param('id') id: string) {
        switch (id) {
            case '1':
                return {
                    _id: '1',
                    usertype: 2,
                    username: 'Mikey',
                    meta: {
                        createdAt: '2018-05-30T10:19:22.255Z'
                    }
                }
            case '2':
                return {
                    _id: '2',
                    usertype: 2,
                    username: 'Peggy',
                    meta: {
                        createdAt: '2018-05-30T14:19:22.305Z'
                    }
                }
        }
    }

    @Get('')
    @Render('index.html')
    index() {
    }
}


// END Controllers
// -----------------------


export const createServer = (PORT) => {
    const app = new Application()

    app.use(cors())

    app.use(json())

    app.use(views(__dirname + '/views'))


    useKoaServer(app, {
        routePrefix: '/',
        controllers: [
            DemoApiController
        ]
    })


    app.listen(PORT, () => {
        console.log(`Demo Server is running on PORT: ${PORT}`)
    })
}


createServer(3000)