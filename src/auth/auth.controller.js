// import bcryptjs from 'bcryptjs';
// import User from '../user/user.model.js';
// import { generateJWT } from '../helpers/generate-jwt.js';


// export const login = async (req, res) => {

//     try {
//         const { email, password } = req.body;
//         // Buscar usuario por email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ msg: 'Credenciales inválidas' });
//         }

//         // Verificar contraseña
//         const validPassword = await bcryptjs.compare(password, user.password);

//         if (!validPassword) {
//             return res.status(400).json({ msg: 'Credenciales inválidas' });
//         }

//         // Generar token JWT
//         const token = await generateJWT(user.id);

//         res.json({ token });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Error del servidor' });
//     }
// }


import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';
import { validationResult } from 'express-validator';

export const login = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = await generateJWT(user.id);

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}