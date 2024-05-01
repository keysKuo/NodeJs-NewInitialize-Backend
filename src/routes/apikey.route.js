"use strict";

const express = require("express");
const { catchAsync } = require("../auth/auth.utils");
const ApiKeyController = require("../controllers/apikey.controller");
const router = express.Router();

router.post('/create', catchAsync(ApiKeyController.createApiKey));
router.delete('/delete/:userId', catchAsync(ApiKeyController.deleteApiKey));

module.exports = router;
