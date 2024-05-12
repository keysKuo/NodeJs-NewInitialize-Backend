"use strict";

const { SuccessResponse } = require("../middlewares/success.res");
const ProductFactoryService = require("../services/product.service");

class ProductController {
	// [POST] -> /v1/api/product/createProduct
	static createProduct = async (req, res, next) => {
		return new SuccessResponse({
			code: 201,
			message: "✔️ Created Product Success!",
			metadata: await ProductFactoryService.createProduct({
				...req.body,
			}),
		}).send(res);
	};

	/**
	 * @url /v1/api/product/findAllDraftsForShop
	 * @method  GET
	 * @desc Get all drafts for shop
	 * @param {Number} limit
	 * @param {Number} skip
	 * @return {JSON}
	 */
	static findAllDraftsForShop = async (req, res, next) => {
		return new SuccessResponse({
			code: 200,
			message: "✔️ Find All Drafts For Shop Success!",
			metadata: await ProductFactoryService.findAllDraftsForShop({
				...req.query,
				shopId: req.userId,
			}),
		}).send(res);
	};
}

module.exports = ProductController;
