let fs = require("fs");

const userController = {
    register:(req, res) => {
        return res.render("registro");
    },
    list: (req,res) => {
        
        
        let archivoJSON = fs.readFileSync("usuarios.json", {encoding:"utf-8"});

        let users =JSON.parse(archivoJSON);
        
        res.render("userlist",{"users":users});
    },
    search:(req,res)=> {
        let loQueBuscoElUsuario = req.query.search;
        
        let archivoJSON = fs.readFileSync("usuarios.json", {encoding:"utf-8"});

        let users =JSON.parse(archivoJSON);

        let userResults = [];

        for(let i = 0; i<users.length; i++){
            if(users[i].name.includes(loQueBuscoElUsuario)){
                userResults.push(users[i]);
            }
        }
        res.render("userResults",{userResults:userResults} );
        

    },
    create: (req,res) => {
        let usuario = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            email: req.body.email,
        }
        
        // Read file

        let archivoUsuario = fs.readFileSync("usuarios.json", {encoding: "utf-8"});

        // Check if there is information
        let usuarios;
        if (archivoUsuario == "") {
            usuarios = [];
        } else {
            usuarios = JSON.parse(archivoUsuario);
        }
        
        // Add the new user

        usuarios.push(usuario);
        
        usuariosJSON = JSON.stringify(usuarios);

        fs.writeFileSync("usuarios.json", usuariosJSON)

        res.redirect("/user/list")

   },
   edit: (req,res) => {
       let idUser = req.params.idUser;
       let users =[
        {id:1, name:"Angel"},
        {id:2, name:"Ricardo"},
        {id:3, name:"Juan"},
        {id:4, name:"Pedro"}
        ];
       let UserToEdit =users[idUser];
       res.render("UserToEdit", {UserToEdit:UserToEdit});
   }

};

module.exports = userController;