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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = exports.UpdateProduct = exports.GetProduct = exports.CreateProduct = exports.Products = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../entity/product.entity");
const Products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = 15;
    const page = parseInt(req.query.page || '1');
    const repository = (0, typeorm_1.getManager)().getRepository(product_entity_1.Product);
    const [data, total] = yield repository.findAndCount({
        take,
        skip: (page - 1) * take
    });
    res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
});
exports.Products = Products;
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(product_entity_1.Product);
    const product = yield repository.save(req.body);
    res.status(201).send(product);
});
exports.CreateProduct = CreateProduct;
const GetProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(product_entity_1.Product);
    res.send(yield repository.findOne(req.params.id_product));
});
exports.GetProduct = GetProduct;
const UpdateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(product_entity_1.Product);
    yield repository.update(req.params.id_product, req.body);
    res.status(202).send(yield repository.findOne(req.params.id_product));
});
exports.UpdateProduct = UpdateProduct;
const DeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(product_entity_1.Product);
    yield repository.delete(req.params.id_product);
    res.status(204).send(null);
});
exports.DeleteProduct = DeleteProduct;
