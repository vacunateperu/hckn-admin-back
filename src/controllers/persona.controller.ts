import Persona from "../models/Persona";
import { Request, Response } from 'express';
import { sequelize } from "../config/database";
const { Op } = require("sequelize");

export async function getVulnerablePorDepartamento(req: Request, res: Response) {
    try {
        const personas = await Persona.findAll({
            where: {
                prob_vulnerabilidad:{
                    [Op.gt]: 0.5
                }
            },
            order:[
                ['id_distrito','DESC']
            ]
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
            where:{
                visible: true
            },
            order:[
                ['pre','DESC']
            ]
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
            attributes:['id_distrito',
                [ sequelize.fn('avg',sequelize.col('prob_vulnerabilidad')),'prom_vulnerabilidad']
            ]       ,
            group: 'id_distrito'
        });
        res.json({
            data: personas
        });
    } catch (e) {
        console.log(e);
    }
}