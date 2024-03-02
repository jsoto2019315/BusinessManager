import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '30d'
            },
            (err, token) => {
                err ? (console.log(err), reject('Token cannot be added')) : resolve(token)
            }
        )
    })
}