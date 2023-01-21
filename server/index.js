import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { taskRoute } from './routes/taskRoute.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { loginController } from './controllers/loginController.js'
import { registerController } from './controllers/registerController.js'
import cookieParser from 'cookie-parser'
import { categoryRoute } from './routes/categoryRoute.js'
import { calendarRoute } from './routes/calendarRoute.js'
import { registerAdminController } from './controllers/registerAdminController.js'
import { fetchAchievement } from './controllers/achievementsControllers.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(morgan('tiny'))

dotenv.config()

mongoose.set('strictQuery', true)
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@notecluster.fwsaolb.mongodb.net/noteDB`
mongoose.connect(uri)
    .then(() => {
        console.log("Connected successfully to mongodb")
    })

app.get('/authenticate', (req, res) => {

    const cookies = req.cookies?.accessToken;

    if (cookies) {
        jwt.verify(cookies, process.env.SECRET_KEY, async (err, user) => {
            if (!user) return res.status(401).json("Unauthorized")
            return res.status(200).json("Welcome")
        })
    }
    else {
        return res.status(401).json("Not logged in")
    }
})
app.get('/authenticate/admin', (req, res) => {

    const cookies = req.cookies?.accessToken;

    if (cookies) {

        jwt.verify(cookies, process.env.SECRET_KEY, async (err, user) => {
            console.log(user)
            if (!user) return res.status(401).json("Unauthorized")
            if (user.role !== 'admin') return res.status(401).json("Page for authorized personnel only")
            return res.status(200).json("Welcome")
        })
    }
    else {
        return res.status(401).json("Not logged in")
    }
})


app.get('/achievement', fetchAchievement)
app.post('/login', loginController)
app.post('/register', registerController)
app.post('/register/admin', registerAdminController)
app.use('/tasks', taskRoute)
app.use('/category', categoryRoute)
app.use('/calendar', calendarRoute)
app.listen(process.env.PORT, () => {
    console.log('Connected');
})