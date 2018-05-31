"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application = require("koa");
require("reflect-metadata");
const json = require("koa-json");
const cors = require("koa2-cors");
const routing_controllers_1 = require("routing-controllers");
const views = require("koa-views");
let DemoApiController = class DemoApiController {
    constructor() {
    }
    demouserApi(id) {
        switch (id) {
            case '1':
                return {
                    _id: '﻿5b0e7aaaa19daf090b2bc3ca',
                    usertype: 2,
                    username: 'Mikey',
                    meta: {
                        createdAt: '2018-05-30T10:19:22.255Z'
                    }
                };
            case '2':
                return {
                    _id: '﻿5b0e7aaaa19daf090b2bc3cd',
                    usertype: 2,
                    username: 'Peggy',
                    meta: {
                        createdAt: '2018-05-30T14:19:22.305Z'
                    }
                };
        }
    }
    index() {
    }
};
__decorate([
    routing_controllers_1.Get('/user/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemoApiController.prototype, "demouserApi", null);
__decorate([
    routing_controllers_1.Get('/'),
    routing_controllers_1.Render('index.html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemoApiController.prototype, "index", null);
DemoApiController = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], DemoApiController);
exports.createServer = (PORT) => {
    const app = new Application();
    app.use(cors());
    app.use(json());
    app.use(views(__dirname + '/views'));
    routing_controllers_1.useKoaServer(app, {
        routePrefix: '',
        controllers: [
            DemoApiController
        ]
    });
    app.listen(PORT, () => {
        console.log(`Demo Server is running on PORT: ${PORT}`);
    });
};
exports.createServer(3000);
//# sourceMappingURL=demoServer.js.map