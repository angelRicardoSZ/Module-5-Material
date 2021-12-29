function recrdarmeMd (req, res, next) {
    if(req.cookies.recordame != undefined && req.session.usrlogueado == undefined ){
        let usersJSON = fs.readFileSync("users.json", {encoding:"utf-8"});
		let usersJS 
		let usrlog =undefined
		if (usersJSON == ""){
			usersJS = [];
		} else {
			usersJS = JSON.parse(usersJSON);
		}
		for(let i=0; i<usersJS.length; i++){
			if(usersJS[i].email ==req.cookies.recordame){
                usrlog = usersJS[i];
				// if(bcrypt.compareSync(req.body.password, usersJS[i].password)){
				// 	let usrlog = usersJS[i];
				// 	req.session.usrlogueado = usrlog;
				break;
				
			}
		}
        req.session.usrlogueado = usrlog;
    }

    next();
}
module.exports = recrdarmeMd;