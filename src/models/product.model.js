"use strict";

const { model, Schema, Types } = require("mongoose");
const slugify = require("slugify");

const Product = new Schema(
	{
		productName: { type: String, required: true },
		thumbnail: { type: String, required: true },
		desc: { type: String },
		price: { type: Number, required: true, default: 0 },
		quantity: { type: Number, required: true, default: 0 },
		productType: { type: String, required: true },
		shop: { type: Types.ObjectId, ref: "User", required: true },
		attributes: { type: Schema.Types.Mixed, required: true },
		rating: {
			type: Number,
			default: 4.5,
			max: [5, "Rating must be below 5.0"],
			min: [1, "Rating must be above 1.0"],
			set: (val) => Math.round(val * 10) / 10,
		},
		variations: { type: Array, default: [] },
		isDraft: { type: Boolean, default: true, index: true, select: false },
		isPublished: {
			type: Boolean,
			default: false,
			index: true,
			select: false,
		},
		slug: { type: String },
	},
	{
		timestamps: true,
	}
);

Product.index({ productName: 'text', desc: 'text'});

Product.pre("save", function (next) {
	this.slug = slugify(this.productName, { lower: true });
	next();
});

const Clothing = new Schema(
	{
		shop: { type: Types.ObjectId, ref: "User", required: true },
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
		shop: { type: Types.ObjectId, ref: "User", required: true },
		manufacturer: { type: String, required: true },
		model: String,
		color: String,
	},
	{
		timestamps: true,
	}
);

const Furniture = new Schema(
	{
		shop: { type: Types.ObjectId, ref: "User", required: true },
		brand: String,
		origin: String,
		expiry: Number,
	},
	{
		timestamps: true,
	}
);

module.exports = {
	productModel: model("Product", Product),
	clothingModel: model("Clothing", Clothing),
	electronicModel: model("Electronic", Electronic),
	furnitureModel: model("Furniture", Furniture),
};
