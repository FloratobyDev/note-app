import User from "../models/User.js"
import TaskContainer from "../models/TaskContainer.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import Category from "../models/Category.js"

export const registerController = async (req, res) => {

    const { username, email, password } = req.body

    User.findOne({ $or: [{ username: username }, { email: email }] }, null, null, async (err, user) => {
        if (!user) {

            const genSalt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, genSalt)

            await User.create({
                username: username,
                email: email,
                password: hashedPassword
            }, async (err, user) => {

                if (err) return res.status(400).json("Unable to create user")

                await TaskContainer.create({
                    username: username,
                    taskList: []
                }).catch(err => {
                    console.log("Not able to create user container")
                })

                await Category.create({
                    username: username,
                    categoryList: []
                })

                const token = jwt.sign({
                    userID: user._id,
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