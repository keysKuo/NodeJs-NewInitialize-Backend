'use strict';
const express = require('express');
const ProductController = require('../controllers/product.controller');
const catchAsync = require('../helpers/catchAsync');
const { authToken } = require('../auth/auth.verify');
const router = express.Router();

router.use(catchAsync(authToken));
router.post('/createProduct', catchAsync(ProductController.createProduct));

router.get('/findAllDraftsForShop', catchAsync(ProductController.findAllDraftsForShop));

module.exports = router;
