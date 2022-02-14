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
const faker_1 = __importDefault(require("faker"));
const crypto_1 = require("crypto");
const order_entity_1 = require("../entity/order.entity");
const order_item_entity_1 = require("../entity/order-item-entity");
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepository = (0, typeorm_1.getManager)().getRepository(order_entity_1.Order);
    const OrderItemRepository = (0, typeorm_1.getManager)().getRepository(order_item_entity_1.OrderItem);
    for (let i = 0; i < 30; i++) {
        const order = yield orderRepository.save({
            first_name: faker_1.default.name.firstName(),
            last_name: faker_1.default.name.lastName(),
            email: faker_1.default.internet.email(),
            created_at: faker_1.default.date.past(2).toDateString()
        });
        for (let j = 0; j < (0, crypto_1.randomInt)(1, 5); j++) {
            yield OrderItemRepository.save({
                order,
                product_title: faker_1.default.lorem.words(2),
                price: (0, crypto_1.randomInt)(10, 100),
                quantity: (0, crypto_1.randomInt)(1, 5)
            });
        }
    }
    process.exit(0);
}));
