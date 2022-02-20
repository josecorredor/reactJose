"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, typeorm_1.createConnection)().then(connection => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    // const allowedOrigins = ['http://localhost:3000'];
    const allowedOrigins = ['http://3.26.18.43:3000'];
    const options = {
        credentials: true,
        origin: "allowedOrigins"
    };
    (0, routes_1.routes)(app);
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log('Listening to port 8000');
    });
});
