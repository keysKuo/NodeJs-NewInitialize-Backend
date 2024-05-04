"use strict";

const { model, Schema, Types } = require("mongoose");

const ProductTypes = ["Electronic", "Clothing", "Furniture"];

const Product = new Schema(
	{
		productName: { type: String, required: true },
		thumbnail: { type: String, required: true },
		desc: { type: String },
		price: { type: Number, required: true, default: 0 },
		quantity: { type: Number, required: true, default: 0 },
		productType: { type: String, required: true, enum: ProductTypes },
		shop: { type: Types.ObjectId, ref: "User", required: true },
		attributes: { type: Schema.Types.Mixed, required: true },
	},
	{
		timestamps: true,
	}
);

const Clothing = new Schema(
	{
		brand: { type: String, required: true },
		size: String,
		material: String,
	},
	{
		timestamps: true,
	}
);

const Electronic = new Schema(
	{
		manufacturer: { type: String, required: true },
		model: String,
		color: String,
	},
	{
		timestamps: true,
	}
);

const Furniture = new Schema({
    brand: String,
    origin: String,
    expiry: Number
}, {
    timestamps: true
})

module.exports = {
	productModel: model("Product", Product),
	clothingModel: model("Clothing", Clothing),
	electronicModel: model("Electronic", Electronic),
    furnitureModel: model("Furniture", Furniture)
};
