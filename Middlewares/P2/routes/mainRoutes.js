const express = require("express");
const router = express.Router();

const mainContrller = require("../controllers/maincontroller");


router.get("/", mainContrller.index);

router.get("/registro", mainContrller.register);

router.get("/login", mainContrller.login);




module.exports = router;



