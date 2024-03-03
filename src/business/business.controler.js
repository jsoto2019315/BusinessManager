import { response, request } from "express";
import Business from "./business.model.js";

export const businessPost = async (req, res) => {
    try {
        const { businessName, impactLevel, category, years } = req.body;

        const userId = req.user._id;

        const business = new Business({ businessName, impactLevel, category, years, userId });

        const msg = (`The business ${businessName} was added`)

        business.save();

        res.status(200).json({
            msg
        })
    } catch (e) {
        console.log("Errors in the require");
        console.log(e);
    }
}

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

export const getBusinessByYear = async (req, res) => {
    try {
        let { startYear, endYear } = req.query;

        if (!startYear) {
            startYear = endYear;
        }

        // Validación: Si endYear está vacío, tomar el valor de startYear
        if (!endYear) {
            endYear = startYear;
        }

        const query = {
            years: {
                $gte: startYear,
                $lte: endYear
            }
        };
        const business = await Business.find(query).exec();

        res.status(200).json({
            business
        })
    } catch (e) {
        res.status(500).json({
            message: error.message
        });

    }
}

export const getBusinessAZ = async (req, res) => {
    try {
        const business = await Business.find().sort({ businessName: 1 });
        res.status(200).json(business);
    } catch (error) {
        console.error("Error getting companies in ascending order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}