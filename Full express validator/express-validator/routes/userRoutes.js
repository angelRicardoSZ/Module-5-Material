const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { body } = require('express-validator');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/avatars');
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage });

const usersController = require('../controllers/userController');

const validations = [
	body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('country').notEmpty().withMessage('Tienes que elegir un país'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]


const validations2 = [
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	
]


// Formulario de registro
router.get('/register', usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', usersController.login);

router.post('/login', validations2, usersController.processLogin);


// Perfil de Usuario
router.get('/profile/:userId', usersController.profile);

router.get("/check", function(req,res){
	if(req.session.usrlogueado == undefined){
		res.send("No estas logueado");
	} else {
		res.send("El usuario logueado es " + req.session.usrlogueado.email);
	}
})

module.exports = router;