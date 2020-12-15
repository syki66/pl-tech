const express = require("express");
const router = express.Router();
const controller = require("./alert.controller");

router.get("/", controller.alert);

module.exports = router;
