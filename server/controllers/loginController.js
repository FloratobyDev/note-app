import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginController = async (req, res) => {
    const { username, password } = req.body

    User.findOne({ username: username })
        .then(user => {

            const isPasswordValid = bcrypt.compareSync(password, user.password)

            if (isPasswordValid) {

                const token = jwt.sign({
                    userID: user._id,
                    username: user.username,
                    role: user.role
                }, process.env.SECRET_KEY)

                res.cookie('accessToken', token, {
                    httpOnly: true,
                    sameSite: true,
                }).status(200).json("Accepted")

            }

            else {
                return res.status(400).json("Password is shit. Try again loser.")
            }
        })
        .catch(err => {
            return res.status(404).json("User not found")
        })
}