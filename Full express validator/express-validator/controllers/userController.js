const { validationResult } = require('express-validator');

const controller = {
	register: (req, res) => {
		return res.render('userRegisterForm');
	},
	processRegister: (req, res) => {
		 const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('userRegisterForm', {
				errors: resultValidation.mapped(), // array to object
				oldData: req.body
			});
		}

		return res.send('Ok, las validaciones se pasaron y no tienes errores'); 
		//return res.send(resultValidation);
	},
	login: (req, res) => {
		return res.render('userLoginForm');
	},
	profile: (req, res) => {
		return res.render('userProfile');
	},
}

module.exports = controller;