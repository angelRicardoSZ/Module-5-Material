const express = require('express');

const app = express();

const session = require("express-session");


const cookieParser = require('cookie-parser');

const recrdarmeMd = require("./middlewares/cookieAuthMiddleware");

app.use(session({secret:"secret"}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(recrdarmeMd);

app.use(express.static('./public'));
app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));

// Template Engine
app.set('view engine', 'ejs');

// Routers
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', mainRoutes);
app.use('/user', userRoutes);
