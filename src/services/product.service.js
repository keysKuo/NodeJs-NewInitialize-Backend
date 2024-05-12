"use strict";

const { BadRequestError } = require("../middlewares/error.res");
const { Product } = require("../designs/product.class");
const { productModel } = require("../models/product.model");
const ProductTypes = Product.existedProductTypes();

class ProductFactoryService {
	static createProduct = async (payload) => {
		if (!ProductTypes.hasOwnProperty(payload.productType)) {
			throw new BadRequestError("❌ Error: ProductType Not Exists!", 300);
		}

		return new ProductTypes[payload.productType](payload).createProduct();
	};

	static findAllDraftsForShop = async ({ shopId, limit = 50, skip = 0 }) => {
		return await productModel
			.find({ shop: shopId, isDraft: true })
			.populate("shop", "name email -_id")
			.sort({ updatedAt: -1 })
			.skip(skip)
			.limit(limit)
			.lean();
	};
}

module.exports = ProductFactoryService;
