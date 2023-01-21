import User from "../models/User.js"
import TaskContainer from "../models/TaskContainer.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import Category from "../models/Category.js"
import Achievement from "../models/Achievement.js"

export const registerController = async (req, res) => {

    const { username, email, password } = req.body
    console.log('logging query')
    console.log(req.query)
    console.log(req.params)

    User.findOne({ $or: [{ username: username }, { email: email }] }, null, null, async (err, user) => {
        if (!user) {

            const genSalt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, genSalt)

            await User.create({
                username: username,
                email: email,
                password: hashedPassword,
                role: 'member'
            }, async (err, user) => {
                console.log(err)
                if (err) return res.status(400).json("Unable to create user")

                await TaskContainer.create({
                    username: username,
                    taskList: []
                }).catch(err => {
                    console.log("Not able to create user container")
                })

                await Achievement.create({
                    username: username,
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json('Unable to create achievements')
                    })

                await Category.create({
                    username: username
                }).catch(err => {
                    console.log(err)
                    return res.status(400).json('Unable to create category for user')
                })

                const token = jwt.sign({
                    userID: user._id,
                    role: user.role,
                    username: user.username
                }, process.env.SECRET_KEY)

                res.cookie('accessToken', token, {
                }).status(200).json("User created successfully")
            })
        }
        else {
            return res.status(400).json("Username or Email already exists!")
        }
    })
}