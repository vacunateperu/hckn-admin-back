import express from 'express';
import morgan from 'morgan';
//import path from 'path';
//var bodyParser = require('body-parser');

var cors = require('cors');

const app = express();

// -----------------------------------------------------------------------
//                              ROUTES IMPORTS
// -----------------------------------------------------------------------
import indexRoutes from './routes/index.route';

// -----------------------------------------------------------------------
//                              CONFIGURACIÓN
// -----------------------------------------------------------------------
app.set('port', process.env.PORT || 4000);

// -----------------------------------------------------------------------
//                                MIDDLEWARES
// -----------------------------------------------------------------------
app.use(morgan('dev')); // Sirve para identificar las rutas, incluso si hay un error
app.use(cors());
app.use(express.json());

// -----------------------------------------------------------------------
//                             USO DE LAS RUTAS
// -----------------------------------------------------------------------
app.use('/api', indexRoutes);


// Folder para almacenar archivos públicos (No se utilizará)
//app.use('/uploads', express.static(path.resolve('uploads')));


export default app;