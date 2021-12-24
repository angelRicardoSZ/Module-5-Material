const fs = require("fs");

function logMiddleware(req,res,next){
    fs.appendFileSync("log.txt", "se ingreso en " + req.url);

    next();
}

module.exports= logMiddleware;