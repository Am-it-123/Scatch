const express = require('express');
const app = express();

const cookieparser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const expressSession = require('express-session');
const Flash = require('connect-flash');

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const loginRoute = require('./routes/index');





require('dotenv').config();

const db = require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");
app.use(expressSession(
    {
        resave :false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    }
));

app.use(Flash());

app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/",loginRoute);


app.listen(3000);


