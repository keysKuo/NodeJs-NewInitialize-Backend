"use strict";
const express = require("express");
const ProductController = require("../controllers/product.controller");
const catchAsync = require("../helpers/catchAsync");
const { authToken } = require("../auth/auth.verify");
const router = express.Router();

router.get("/searchProducts/:keySearch", catchAsync(ProductController.searchProducts));

router.use(catchAsync(authToken));

router.post("/createProduct", catchAsync(ProductController.createProduct));

router.get(
	"/findAllDraftsForShop",
	catchAsync(ProductController.findAllDraftsForShop)
);

router.get(
	"/findAllPublishForShop",
	catchAsync(ProductController.findAllPublishForShop)
);

router.put(
	"/publishProductByShop",
	catchAsync(ProductController.publishProductByShop)
);

router.put(
	"/unPublishProductByShop",
	catchAsync(ProductController.unPublishProductByShop)
);

module.exports = router;
