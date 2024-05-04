"use strict";

const { BadRequestError } = require("../middlewares/error.res");

const { Product, Clothing, Electronic, Furniture } = require("../designs/product.class");

const ProductTypes = {
	Electronic: Electronic,
	Clothing: Clothing,
    Furniture: Furniture
};

class ProductFactoryService {
	static createProduct = async (type, payload) => {
		if (!ProductTypes.hasOwnProperty(type)) {
			throw new BadRequestError("❌ Error: ProductType Not Exists!", 300);
		}

		return new ProductTypes[type](payload).createProduct();
	};
}

module.exports = ProductFactoryService;
