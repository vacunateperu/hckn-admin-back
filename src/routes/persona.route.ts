import { Router } from 'express';

// -----------------------------------------------------------------------
//                       FUNCIONES DEL CONTROLADOR
// -----------------------------------------------------------------------
import { getVulnerablesDepartamentos,getVulnerablePorDepartamento, getVulnerablePorProvincia, getVulnerablePorDistrito, getVulnerablePorProvinciaByDepartamento, getVulnerablePorDistritoByProvincia, getVulnerablesProvincias, getVulnerablesDistritos } from '../controllers/persona.controller';


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

router.route('/tablaDept/')
    .get(getVulnerablesDepartamentos);

router.route('/tablaProv/')
    .get(getVulnerablesProvincias);

router.route('/tablaDist/')
    .get(getVulnerablesDistritos);

export default router;