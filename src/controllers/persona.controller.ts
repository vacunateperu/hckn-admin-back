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