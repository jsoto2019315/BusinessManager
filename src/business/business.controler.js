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