import Business from "../business/business.model.js";

export const existentBusinessName = async (businessName = '') => {
    const existentBusinessName = await Business.findOne({ businessName});
    if (existentBusinessName) {
        throw new Error(`Business with name ${businessName} already exists on DB`);
    }
}