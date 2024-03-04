import { response, request } from "express";
import Business from "./business.model.js";
import excel from 'excel4node';

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

export const getBusinessZA = async (req, res) => {
    try {
        const business = await Business.find().sort({ businessName: -1 });
        res.status(200).json(
            business
        );
    } catch (error) {
        console.error("Error getting companies in descending order:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const getBusinessByCategory = async (req, res) => {
    try {
        let { category } = req.query;

        const business = await Business.find({ category });

        res.status(200).json({
            msg: `Companies with Category ${category}:`,
            business,

        });
    } catch (error) {
        console.error("Error fetching companies by businessCategory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const putBusiness = async (req, res) => {
    try {
        const { __v, _id, status, businessName, ...rest } = req.body;

        const business = await Business.findOne({ businessName });

        if (!business) {
            return res.status(404).json({
                msg: 'business not found'
            });
        }

        if (!business.status) {
            return res.status(404).json({
                msg: 'business not found'
            });
        }

        Object.assign(business, rest);

        await business.save();

        res.status(200).json({
            msg: 'Publication update successfully'
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error processing request"
        });
    }
}

export const generateExcelReport = async (req, res) => {
    try {
        const business = await Business.find();

        const wb = new excel.Workbook();
        const ws = wb.addWorksheet('Business Report');

        // Definir encabezados
        const headers = ['Business Name', 'Impact Level', 'Category', 'Years'];
        headers.forEach((header, index) => {
            ws.cell(1, index + 1).string(header);
        });

        // Llenar datos
        business.forEach((business, rowIndex) => {
            ws.cell(rowIndex + 2, 1).string(business.businessName);
            ws.cell(rowIndex + 2, 2).string(business.impactLevel);
            ws.cell(rowIndex + 2, 3).string(business.category);
            ws.cell(rowIndex + 2, 4).number(business.years);
        });

        // Obtener el archivo Excel como un buffer
        const buffer = await wb.writeToBuffer();

        // Configurar respuesta HTTP
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Companies_Report.xlsx');

        // Enviar el archivo Excel como respuesta
        res.send(buffer);

    } catch (error) {
        console.error("Error generating Excel report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


