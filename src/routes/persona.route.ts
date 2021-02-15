import { Router } from 'express';

// -----------------------------------------------------------------------
//                       FUNCIONES DEL CONTROLADOR
// -----------------------------------------------------------------------
import { getVulnerablePorDepartamento, getVulnerablePorProvincia, getVulnerablePorDistrito } from '../controllers/persona.controller';


const router = Router();

// -----------------------------------------------------------------------
//                                 RUTAS
// -----------------------------------------------------------------------
router.route('/dept')
    .get(getVulnerablePorDepartamento);

router.route('/prov')
    .get(getVulnerablePorProvincia);

router.route('/dist')
    .get(getVulnerablePorDistrito);


export default router;