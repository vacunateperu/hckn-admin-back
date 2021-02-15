const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database')

const Persona = sequelize.define('persona',{
    id_persona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombres:{
        type: DataTypes.STRING(50)
    },
    apellido_paterno:{
        type: DataTypes.STRING(50)
    },
    apellido_materno:{
        type: DataTypes.STRING(50)
    },
    f_nacimiento: {
        type: DataTypes.DATEONLY
    },
    sexo: {
        type: DataTypes.STRING(1)
    },
    direccion_domicilio: {
        type: DataTypes.STRING(500)
    },
    correo_electronico: {
        type: DataTypes.STRING(100)
    },
    documento_identidad: {
        type: DataTypes.STRING(8)
    },
    f_registro: {
        type: DataTypes.DATEONLY
    },
    id_distrito: {
        type: DataTypes.STRING(6)
    },
    code_ocupacion: {
        type: DataTypes.STRING(3)
    },
    prob_vulnerabilidad: {
        type: DataTypes.FLOAT(5)
    }
},{
    timestamps: false,
    freezeTableName: true
}
);

export default Persona;