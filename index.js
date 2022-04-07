//  const express = require('express')  // forma de common js
import express from 'express' // version de imports
import router from './server/routes/index.js'
import db from './server/config/db.js'

const app = express()

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

// conectar la base de datos
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch( error => console.log('error'))


// habilitar PUG
app.set('view engine', 'pug')

// obtener el año actual
app.use(( req , res , next) => {
    const year = new Date()
    res.locals.actualYear = year.getFullYear()
    res.locals.nombresitio = "Agencia de Viajes"
    return next()
})

// definir la carpeta public
app.use(express.static('public'))

// agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

//agregar router
app.use('/', router);

//puerto y HOST para la app

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, () => {
    console.log(' el servidor esta funcionando')
})