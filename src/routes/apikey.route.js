"use strict";

const express = require("express");
const { catchAsync } = require("../auth/auth.utils");
const ApiKeyController = require("../controllers/apikey.controller");
const router = express.Router();

router.post('/createApiKey', catchAsync(ApiKeyController.createApiKey));

module.exports = router;
