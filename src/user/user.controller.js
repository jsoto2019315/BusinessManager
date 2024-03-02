import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from "./user.model.js";

export const getUser = async (res) => {
    try {
        const defaultUser = new User();

        const salt = bcryptjs.genSaltSync();
        const user = new User({
            userName: defaultUser.userName,
            email: defaultUser.email,
            password: defaultUser.password = bcryptjs.hashSync(salt),
        })

        await defaultUser.save();

        res.status(200).json({
            msg: 'Default user is:',
            user,
            important: 'This a default user, his default password unencrypted is: 123456'
        })
    } catch (e) {
        console.error("Error trying to get the user:", e);
        return res.status(500).json({ message: "Internal service error" });
    }
};