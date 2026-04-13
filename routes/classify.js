// routes/classify.js
const express = require("express");
const router = express.Router();
const classifyController = require("../controllers/classifyController");

router.get("/classify", classifyController);

module.exports = router;