"use strict";

const express = require("express");
const ApiKeyController = require("../controllers/apikey.controller");
const catchAsync = require("../helpers/catchAsync");
const router = express.Router();

router.post("/create", catchAsync(ApiKeyController.createApiKey));
router.delete("/delete/:userId", catchAsync(ApiKeyController.deleteApiKey));

module.exports = router;
