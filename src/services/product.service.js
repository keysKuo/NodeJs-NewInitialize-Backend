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
		return await queryProduct({
			query: { shop: shopId, isDraft: true },
			skip,
			limit,
		});
	};

	static findAllPublishForShop = async ({ shopId, limit = 50, skip = 0 }) => {
		return await queryProduct({
			query: { shop: shopId, isPublished: true },
			skip,
			limit,
		});
	};

	static publishProductByShop = async ({ shopId, productId }) => {
		const updatedProduct = await productModel.findOneAndUpdate(
			{ _id: productId, shop: shopId, isDraft: true, isPublished: false },
			{ $set: { isDraft: false, isPublished: true } },
			{ returnOriginal: false }
		);
		if (!updatedProduct) {
			throw new BadRequestError("❌ Error: Update Product Error!", 403);
		}

		return updatedProduct;
	};

	static unPublishProductByShop = async ({ shopId, productId }) => {
		const updatedProduct = await productModel.findOneAndUpdate(
			{ _id: productId, shop: shopId, isDraft: false, isPublished: true },
			{ $set: { isDraft: true, isPublished: false } },
			{ returnOriginal: false }
		);
		if (!updatedProduct) {
			throw new BadRequestError("❌ Error: Update Product Error!", 403);
		}

		return updatedProduct;
	};

	static searchProducts = async ({ keySearch }) => {
		const regexSearch = new RegExp(keySearch);
		console.log(regexSearch);
		return await productModel
			.find(
				{ isPublished: true, $text: { $search: regexSearch } },
				{ score: { $meta: "textScore" } }
			)
			.sort({ score: { $meta: "textScore" } })
			.lean();
	};
}

const queryProduct = async ({ query, limit, skip }) => {
	return await productModel
		.find(query)
		.populate("shop", "fullname email -_id")
		.sort({ updatedAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean();
};

module.exports = ProductFactoryService;
