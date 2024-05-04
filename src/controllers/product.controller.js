"use strict";

const { SuccessResponse } = require("../middlewares/success.res");
const ProductFactoryService = require("../services/product.service");

class ProductController {
	static createProduct = async (req, res, next) => {
        const payload = {...req.body};
		return new SuccessResponse({
			code: 201,
			message: "✔️ Created Product Success!",
			metadata: await ProductFactoryService.createProduct(payload.productType, payload),
		}).send(res);
	};
}

module.exports = ProductController;
