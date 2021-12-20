const express = require("express");
const router = express.Router();

const userController = require("../controllers/usercontroller");



router.get("/list", userController.list);

router.get("/search", userController.search);

router.get("/registro", userController.register);


router.post("/registro", userController.create);

router.get("/edit/:idUser",userController.edit);

router.put("/edit", function(req,res){
    res.send("Fui por PUT")
})

router.delete("/delete/:idUser", function(req,res){
    res.send("Fui por DELETE")
})




module.exports = router;