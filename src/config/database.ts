const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
export const sequelize = new Sequelize(
    'vacunatepe', //db_name
    'vacunatepeuser', //username
    'v@cu_nat3p@E', //password
    {
        host: '4.tcp.ngrok.io',
        dialect: 'postgres', 
        port: '15694',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false //VER MENSAJES POR CONSOLA
    }
);