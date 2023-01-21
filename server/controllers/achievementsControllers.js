import Achievement from "../models/Achievement.js"
import { verifyToken } from "./HelperFunctions/verifyToken.js"

export const fetchAchievement = async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json("Not logged in")
        Achievement.findOne({ username: userInfo.username })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    })
}