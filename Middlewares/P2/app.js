const express = require("express");
const methodOverride = require("method-override");

const app =express();

const mainRoutes =require("./routes/mainRoutes");

const userRoutes =require("./routes/user");

app.use(express.static("./public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));

app.use(express.json());


app.use(methodOverride("_method"));

app.use("/", mainRoutes);

app.use("/user", userRoutes);

app.use((req,res,next)=>{
    res.status(404).render("not-found")
})

app.listen(3000, ()=> {
    console.log("Servidor levantado en el puerto 3000")
})




