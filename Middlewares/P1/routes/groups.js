const express = require('express');
const router = express.Router();
const path =require('path');
const multer =require('multer');
const { body } = require("express-validator");
const controller = require('../controllers/groupsController');

// validation
const ValidateCreateForm = [
    body("name").notEmpty().withMessage("Debes completar el campo de nombre"),
    body("description").notEmpty().withMessage("Debes agregar una descripcion")
];



const storage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(__dirname,'../public/img/groups') )
    },
    filename:(req,file,cb)=>{
        console.log(file)
        const newFilename ='group-' + Date.now() + path.extname(file.originalname); 
        cb(null, newFilename );
    }
});

const upload = multer({storage:storage });
// Todos los grupos
router.get('/', controller.index);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
router.post('/',ValidateCreateForm,upload.single('image'), controller.store);

// Detalle de un grupo
router.get('/:id', controller.show);




module.exports = router;