"use strict";

const { SuccessResponse } = require("../middlewares/success.res");
const ProductFactoryService = require("../services/product.service");

class ProductController {
	/**
	 * @url /v1/api/product/createProduct
	 * @method  POST
	 * @desc Create a new Product
	 * @param {String} productName
	 * @param {String} thumbnail
	 * @param {String} desc
	 * @param {Number} price
	 * @param {String} productType
	 * @param {ObjectId} shop
	 * @param {Mixed} attributes
	 * @return {JSON}
	 */
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

	/**
	 * @url /v1/api/product/findALlPublishForShop
	 * @method  GET
	 * @desc Get all published products for shop
	 * @param {Number} limit
	 * @param {Number} skip
	 * @return {JSON}
	 */
	static findAllPublishForShop = async (req, res, next) => {
		return new SuccessResponse({
			code: 200,
			message: "✔️ Find All Published Products For Shop Success!",
			metadata: await ProductFactoryService.findAllPublishForShop({
				...req.query,
				shopId: req.userId,
			}),
		}).send(res);
	};

	/**
	 * @url /v1/api/product/publishProductByShop
	 * @method  PUT
	 * @desc Publish a draft product by shop
	 * @param {ObjectId} shopId
	 * @param {ObjectId} productId
	 * @return {JSON}
	 */
	static publishProductByShop = async (req, res, next) => {
		return new SuccessResponse({
			code: 200,
			message: "✔️ Publish Product Success!",
			metadata: await ProductFactoryService.publishProductByShop({
				...req.body,
			}),
		}).send(res);
	};

	/**
	 * @url /v1/api/product/unPublishProductByShop
	 * @method  PUT
	 * @desc unPublish a draft product by shop
	 * @param {ObjectId} shopId
	 * @param {ObjectId} productId
	 * @return {JSON}
	 */
	static unPublishProductByShop = async (req, res, next) => {
		return new SuccessResponse({
			code: 200,
			message: "✔️ Unpublish Product Success!",
			metadata: await ProductFactoryService.unPublishProductByShop({
				...req.body,
			}),
		}).send(res);
	};

	static searchProducts = async (req, res, next) => {
		return new SuccessResponse({
			success: 200,
			message: "✔️ Search Product Success!",
			metadata: await ProductFactoryService.searchProducts({...req.params})
		}).send(res);
	}
}

module.exports = ProductController;
