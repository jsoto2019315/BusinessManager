import { response, request } from "express";
import User from "./user.model.js";

export const getUser = async (req, res) => {
    try {
        const defaultUser = new User();

        const userData = {
            userName: defaultUser.userName,
            email: defaultUser.email,
            password: defaultUser.password,
            status: defaultUser.status,
            google: defaultUser.google
        };

        await defaultUser.save();

        res.status(200).json({
            msg: 'Default user is:',
            userData
        })
    } catch (e) {
        console.error("Error trying to get the user:", e);
        return res.status(500).json({ message: "Internal service error" });
    }
};