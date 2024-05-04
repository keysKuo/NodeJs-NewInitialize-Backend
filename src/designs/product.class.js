'use strict';

const {
	productModel,
	clothingModel,
	electronicModel,
    furnitureModel,
} = require("../models/product.model");

class Product {
	constructor({
		productName,
		thumbnail,
		desc,
		price,
		quantity,
		productType,
		shop,
		attributes,
	}) {
		this.productName = productName;
		this.thumbnail = thumbnail;
		this.desc = desc;
		this.price = price;
		this.quantity = quantity;
		this.productType = productType;
		this.shop = shop;
		this.attributes = attributes;
	}

	async createProduct() {
		return await productModel.create(this);
	}
}

class Electronic extends Product {
	async createProduct() {
		const newElectronic = await electronicModel.create(this.attributes);
		if (!newElectronic) {
			throw new BadRequestError(`❌ Error: Create Clothing Fail!`);
		}
		const newProduct = await super.createProduct();
		if (!newProduct) {
			throw new BadRequestError(`❌ Error: Create Product Fail!`);
		}

		return newProduct;
	}
}

class Clothing extends Product {
	async createProduct() {
		const newClothing = await clothingModel.create(this.attributes);
		if (!newClothing) {
			throw new BadRequestError(`❌ Error: Create Clothing Fail!`);
		}

		const newProduct = await super.createProduct();
		if (!newProduct) {
			throw new BadRequestError(`❌ Error: Create Product Fail!`);
		}

		return newProduct;
	}
}

class Furniture extends Product {
	async createProduct() {
		const newFurniture = await furnitureModel.create(this.attributes);
		if (!newFurniture) {
			throw new BadRequestError(`❌ Error: Create Furniture Fail!`);
		}

		const newProduct = await super.createProduct();
		if (!newProduct) {
			throw new BadRequestError(`❌ Error: Create Product Fail!`);
		}

		return newProduct;
	}
}


module.exports = { Product, Clothing, Electronic, Furniture };
