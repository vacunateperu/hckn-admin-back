import Persona from "../models/Persona";
import { Request, Response } from 'express';
import { sequelize } from "../config/database";
const { Op } = require("sequelize");

export async function getVulnerablePorDepartamento(req: Request, res: Response) {
    try {
        const personas = await Persona.findAll({
            attributes: [
                [sequelize.literal('SUBSTRING(id_distrito, 1, 2)'), 'id_departamento'],
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            group: sequelize.literal('SUBSTRING(id_distrito, 1, 2)')
        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}

export async function getVulnerablePorProvincia(req: Request, res: Response) {
    try {
        const personas = await Persona.findAll({
            attributes: [
                [sequelize.literal('SUBSTRING(id_distrito, 1, 4)'), 'id_provincia'],
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            group: sequelize.literal('SUBSTRING(id_distrito, 1, 4)')

        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}

export async function getVulnerablePorDistrito(req: Request, res: Response) {
    try {
        const personas = await Persona.findAll({
            attributes: ['id_distrito',
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            group: 'id_distrito'
        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}


export async function getVulnerablePorProvinciaByDepartamento(req: Request, res: Response) {
    try {
        const { id_departamento } = req.params;
        const personas = await Persona.findAll({
            attributes: [
                [sequelize.literal('SUBSTRING(id_distrito, 1, 4)'), 'id_provincia'],
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            where: {
                id_distrito: {
                    [Op.like]: `${id_departamento}%`
                }
            },
            group: sequelize.literal('SUBSTRING(id_distrito, 1, 4)')

        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}

export async function getVulnerablePorDistritoByProvincia(req: Request, res: Response) {
    try {
        const { id_provincia } = req.params;
        const personas = await Persona.findAll({
            attributes: ['id_distrito',
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            where: {
                id_distrito: {
                    [Op.like]: `${id_provincia}%`
                }
            },
            group: 'id_distrito'

        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}

// -----------------------------------------------------------------------------------------------------
export async function getVulnerablesDepartamentos(req: Request, res: Response) {
    try {
        const personas = await Persona.findAll({
            attributes: [
                [sequelize.literal('SUBSTRING(id_distrito, 1, 2)'), 'id_departamento'],
                [sequelize.fn('COUNT', sequelize.col('id_persona')), 'personas'],'sexo',
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            group: sequelize.literal('SUBSTRING(id_distrito, 1, 2), sexo'),
            order: sequelize.literal('SUBSTRING(id_distrito, 1, 2)')
        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}
// -----------------------------------------------------------------------------------------------------
export async function getVulnerablesProvincias(req: Request, res: Response) {
    try {
        const { id_departamento } = req.params;
        const personas = await Persona.findAll({
            attributes: [
                [sequelize.literal('SUBSTRING(id_distrito, 1, 4)'), 'id_provincia'],
                [sequelize.fn('COUNT', sequelize.col('id_persona')), 'personas'],'sexo',
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            where: {
                id_distrito: {
                    [Op.like]: `${id_departamento}%`
                }
            },
            group: sequelize.literal('SUBSTRING(id_distrito, 1, 4), sexo'),
            order: [sequelize.literal('SUBSTRING(id_distrito, 1, 4)')]
        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}
// -----------------------------------------------------------------------------------------------------
export async function getVulnerablesDistritos(req: Request, res: Response) {
    try {
        const { id_provincia } = req.params;
        const personas = await Persona.findAll({
            attributes: [
                'id_distrito',
                [sequelize.fn('COUNT', sequelize.col('id_persona')), 'personas'],'sexo',
                [sequelize.fn('avg', sequelize.col('prob_vulnerabilidad')), 'prom_vulnerabilidad']
            ],
            where: {
                id_distrito: {
                    [Op.like]: `${id_provincia}%`
                }
            },
            group: ['id_distrito','sexo'],
            order: ['id_distrito']
        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}

export async function getRangosByDistrito(req: Request, res: Response) {    

    try {
        const { id_distrito} = req.params;

        const personas = await Persona.findAll({
            attributes:[
                [sequelize.literal(`case 
                when prob_vulnerabilidad between 0.0 and 0.1 then '0.0-0.1'
                when prob_vulnerabilidad between 0.1 and 0.2 then '0.1-0.2'
                when prob_vulnerabilidad between 0.2 and 0.3 then '0.2-0.3'
                when prob_vulnerabilidad between 0.3 and 0.4 then '0.3-0.4'
                when prob_vulnerabilidad between 0.4 and 0.5 then '0.4-0.5'
                when prob_vulnerabilidad between 0.5 and 0.6 then '0.5-0.6'
                when prob_vulnerabilidad between 0.6 and 0.7 then '0.6-0.7'
                when prob_vulnerabilidad between 0.7 and 0.8 then '0.7-0.8'
                when prob_vulnerabilidad between 0.8 and 0.9 then '0.8-0.9'
                when prob_vulnerabilidad between 0.9 and 1.0 then '0.9-1.0'
                end`),'nombre'],
                [sequelize.literal(`count(*)`),'prom_vulnerabilidad'] //NOMBRES FAKE PARA LA GRAFICA BARRA
            ],
            where: {
                id_distrito
            },
            group: 
             [sequelize.literal(`1`)],
            raw: true

        });


        res.json({
            data: personas
        })

    }catch(e){
        console.log(e)
    }

    
}