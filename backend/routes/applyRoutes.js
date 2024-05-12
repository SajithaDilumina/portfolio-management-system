const express = require("express");
const router = express.Router();
const {applyJob} = require("../controllers/applyController")

router.route("/").post(applyJob);

module.exports = router;
