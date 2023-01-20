import jwt from 'jsonwebtoken'

export const verifyToken = (req, callback) => {
    const token = req.cookies.accessToken

    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
        callback(err, userInfo)
    })
}

