const { validationResult } = require('express-validator');
let fs = require("fs");
const bcrypt = require("bcrypt");

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
	processLogin: (req,res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('userLoginForm', {
				errors: resultValidation.mapped(), // array to object
				oldData: req.body
			});
		} else {
			let usersJSON = fs.readFileSync("users.json", {encoding:"utf-8"});
			let usersJS 
			let usrlog =undefined
			if (usersJSON == ""){
				usersJS = [];
			} else {
				usersJS = JSON.parse(usersJSON);
			}
			for(let i=0; i<usersJS.length; i++){
				if(usersJS[i].email ==req.body.email){
					// if(bcrypt.compareSync(req.body.password, usersJS[i].password)){
					// 	let usrlog = usersJS[i];
					// 	req.session.usrlogueado = usrlog;
					// 	break;
					if(req.body.password == usersJS[i].password){
						usrlog = usersJS[i];
						req.session.usrlogueado = usrlog;
						break;
					}
				}
			}
			const errorsP= {errors: [{msg: "Credenciales invalidas"}]}

			if(usrlog ==undefined  ){
				return res.render("userLoginForm",{
					errors2: [{msg: "Credenciales invalidas"}]
					}
				);
			}
			res.send("success");
		}

		
		//return res.send(resultValidation);
	},


	profile: (req, res) => {
		return res.render('userProfile');
	},
}

module.exports = controller;