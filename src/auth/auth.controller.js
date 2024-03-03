import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

let exportedToken = '';

export const login = async (req, res) => {
    try {
        let user;
        const { email, password } = req.body;

        user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Email hasn't been register"
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "Email doesn't exist in DB",
            });
        }

        const validPassword = await User.findOne({ password })
        if (!validPassword) {
            return res.status(400).json({
                msg: "Incorrect password"
            });
        }

        const token = await generateJWT(user.id);
        exportedToken = token;
        // console.log(exportedToken);

        res.status(200).json({
            msg: `You've logged in, welcome ${user.userName}. Your token is:  ${token}`
        });

    } catch (e) {
        console.log("Contact the admin")
        throw new Error(e);
    }
}

export { exportedToken };


