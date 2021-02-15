import Persona from "../models/Persona";
import { Request, Response } from 'express';
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