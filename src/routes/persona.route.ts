import { Router } from 'express';

// -----------------------------------------------------------------------
//                       FUNCIONES DEL CONTROLADOR
// -----------------------------------------------------------------------
import { getVulnerablePorDepartamento, getVulnerablePorProvincia, getVulnerablePorDistrito, getVulnerablePorProvinciaByDepartamento, getVulnerablePorDistritoByProvincia, getRangosByDistrito } from '../controllers/persona.controller';


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

router.route('/prov/:id_departamento')
    .get(getVulnerablePorProvinciaByDepartamento);

router.route('/dist/:id_provincia')
    .get(getVulnerablePorDistritoByProvincia);

router.route('/dist/:id_distrito/rango')
    .get(getRangosByDistrito);

export default router;