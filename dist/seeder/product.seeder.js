"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../entity/product.entity");
const faker_1 = __importDefault(require("faker"));
const crypto_1 = require("crypto");
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(product_entity_1.Product);
    for (let i = 0; i < 30; i++) {
        yield repository.save({
            title: faker_1.default.lorem.words(2),
            description: faker_1.default.lorem.words(20),
            image: faker_1.default.image.imageUrl(200, 200, '', true),
            price: (0, crypto_1.randomInt)(10, 100)
        });
    }
    process.exit(0);
}));
