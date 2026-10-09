require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const nonceMiddleware = require('./middlewares/nonce');
const {manejadorErrores,manejadorNotFound} = require('./middlewares/errorHandler');

const routerPrincipal = require('./routes');

const app = express();


app.use(nonceMiddleware);
app.use(
    helmet({
        contentSecurityPolicy:{
            directives:{
                defaultSrc:["'self'"],
                styleSrc:[
                    "'self'",
                    (req, res) => `'nonce-${res.locals.nonce}'`,
                    'https://cdn.jsdelivr.net', 
                    'https://cdn.datatables.net/2.3.7/css/dataTables.dataTables.css'
                ],
                scriptSrc:[
                    "'self'",
                    (req, res) => `'nonce-${res.locals.nonce}'`,
                    'https://cdn.jsdelivr.net',
                    'https://code.jquery.com/jquery-4.0.0.min.js',
                    'https://cdn.datatables.net/2.3.7/js/dataTables.js',
                    'https://unpkg.com/'
                ],
                fontSrc:["'self'",'https://cdn.jsdelivr.net', 'data:'],
                imgSrc:["'self'",'data:'],
                connectSrc:["'self'"],
                frameSrc:["'self'"],
                objectSrc:["'self'"],
                frameAncestors:["'self'"], //refuerza la protección anti-clickjacking
            },
        },
        //Se fuerza a HTTPS en producción mediante HSTS
        hsts: process.env.NODE_ENV === 'production',
    })
);


const origenesPermitidos = (process.env.CORS_ORIGIN || '').split(',').map((o) => o.trim());
app.use(
    cors({
        origin:origenesPermitidos,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended: true, limit:'1mb'}));
app.use(cookieParser());

app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',routerPrincipal);

app.use(manejadorNotFound);
app.use(manejadorErrores);

module.exports = app;