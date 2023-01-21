import { Router } from "express";
import { verifyToken } from "../controllers/HelperFunctions/verifyToken.js";
import TaskCompleted from "../models/TaskCompleted.js";
export const calendarRoute = Router()

calendarRoute.get('/fetch', (req, res) => {
    verifyToken(req, (err, userInfo) => {
        const date = parseInt(req.query.currentDate)
        TaskCompleted.findOne({ $and: [{ username: userInfo.username }, { createdAt: date }] })
            .then(response => {
                return res.status(200).json(response.taskList)
            })
            .catch(err => {
                return res.status(400).json("Not able to find data")
            })
    })
})