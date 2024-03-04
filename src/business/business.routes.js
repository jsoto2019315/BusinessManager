import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from '../middlewares/validate-fields.js';

import { validateJWT } from '../middlewares/validate-jws.js';
import { existentBusinessName } from "../helpers/db-validators.js";
import { businessPost, getBusinessAZ, getBusinessByCategory, getBusinessByYear, getBusinessZA, putBusiness } from "./business.controler.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("businessName", "The name of Business is required").not().isEmpty(),
        check("businessName").custom(existentBusinessName),
        check("impactLevel", "Required field").not().isEmpty(),
        check("category", "Required field").not().isEmpty(),
        check("years", "You must give the years of your business").not().isEmpty(),
        validateFields
    ], businessPost
);

/*
    NOTA: Para evitar problemas de plagio especificamos que con los compañeros:
        Jose David Soto Puac - 2019315
        Brandon Steev Mendoza Peres - 2019349
        Alejandro Benjamin Max López - 2019189

        Nos reunimos en una llamada para trabajar en conjunto para poder realizar 
        las validaciones de filtros de A-Z, Z-A, Años, se puede evidenciar que los 
        tres trabajamos en conjunto y los tres realizamos aportes significativos para
        realizar estas validaciones. 
*/

router.get(
    "/years",
    validateJWT,
    getBusinessByYear
);

router.get(
    "/A-Z",
    validateJWT,
    getBusinessAZ
)

router.get(
    "/Z-A",
    validateJWT,
    getBusinessZA
)

router.get(
    "/category",
    validateJWT,
    getBusinessByCategory
)

router.put(
    "/",
    [
        validateJWT,
        check("businessName", "The name of Business is required, is used to search your business").not().isEmpty(),
        check("impactLevel", "Required field").not().isEmpty(),
        check("category", "Required field").not().isEmpty(),
        check("years", "You must give the years of your business").not().isEmpty(),
        validateFields
    ], putBusiness
);


export default router;