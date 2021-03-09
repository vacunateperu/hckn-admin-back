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

