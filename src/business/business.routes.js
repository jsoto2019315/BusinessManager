import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from '../middlewares/validate-fields.js';

import { validateJWT } from '../middlewares/validate-jws.js';
import { existentBusinessName } from "../helpers/db-validators.js";
import { businessPost } from "./business.controler.js";

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


export default router;