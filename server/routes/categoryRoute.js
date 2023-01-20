import { Router } from "express";
import { verifyToken } from "../controllers/HelperFunctions/verifyToken.js";
import Category from "../models/Category.js";
export const categoryRoute = Router()

categoryRoute.post('/create', (req, res) => {
    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json("Not logged in!")

        const category = req.body.category

        Category.findOneAndUpdate({ username: userInfo.username }, {
            $push: { categoryList: category.toLowerCase() }
        })
            .then(response => {
                return res.status(200).json([...response.categoryList || []])
            })
            .catch(err => {

            })
        return res.status(200).json('ok')
    })
})

categoryRoute.get('/fetch', async (req, res) => {
    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json("Not logged in!")


        Category.findOne({ username: userInfo.username })
            .then(response => {
                return res.status(200).json([...response.categoryList || []])
            })
            .catch(err => {
                return res.status(400).json("Failed to find categories.")
            })
    })
})


categoryRoute.delete('/remove', async (req, res) => {
    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(401).json("Not logged in!")

        const category = req.body.toLowerCase()

        Category.findOneAndUpdate({ username: userInfo.username }, {
            $pull: { categoryList: category }
        })
            .then(response => {
                return res.status(200).json("Category removed")
            })
            .catch(err => {
                return res.status(400).json("Failed to remove category.")
            })
    })
})

