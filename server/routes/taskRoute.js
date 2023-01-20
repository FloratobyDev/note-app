import { Router } from "express";
import { verifyToken } from "../controllers/HelperFunctions/verifyToken.js";
import Task from '../models/Task.js'
import TaskCompleted from "../models/TaskCompleted.js";
import TaskContainer from "../models/TaskContainer.js";
export const taskRoute = Router()

taskRoute.post('/create', (req, res) => {
    console.log("Creating new task ? ")
    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(400).json("Not logged in!")

        console.log(req.body)
        TaskContainer.findOneAndUpdate({ username: userInfo?.username }, {
            $push: { taskList: req.body }
        })
            .then(response => {
                console.log("Task added.")
                res.status(200).json("Task added.")
            })
            .catch(err => {
                res.status(400).json("Unable to add task.")
            })
    })

    // TaskContainer.findOneAndUpdate({})
    // console.log(req.body)
    // Task.create({
    //     ...req.body,
    //     taskList: req.body.taskData,
    //     userID: new ObjectId(2015)
    // }, (err, user) => {
    //     if (!err) return res.status(404).json("No results found")
    //     return res.status(200).json("Success")
    // })
})

taskRoute.patch('/update', async (req, res) => {
    // console.log('hi')
    verifyToken(req, async (err, userInfo) => {

        const currentDate = new Date()

        if (req.query.renew === true) {
            console.log('renewing task')
            const { renew, ...info } = req.body
            const createdAtField = `taskList.${info.taskID}.created_at`
            const isStaleField = `taskList.${info.taskID}.isStale`

            TaskContainer.findOneAndUpdate({ username: userInfo.username }, {
                $set: { [createdAtField]: currentDate.toISOString(), [isStaleField]: false }
            })
                .then(response => {
                    return res.status(200).json("Successfully updated task.")
                })
                .catch(err => {
                    return res.status(400).json("Failed to update task")
                })
        }
        else {

            const { created_at, ...info } = req.body
            const staleField = `taskList.${info.taskID}.isStale`
            const dateCreated = new Date(created_at)

            if (dateCreated.getDate() < currentDate.getDate()) {
                TaskContainer.findOneAndUpdate({ username: userInfo.username }, {
                    $set: { [staleField]: true }
                })
                    .then(response => {
                        return res.status(200).json("Successfully updated task.")
                    })
                    .catch(err => {
                        return res.status(400).json("Failed to update task")
                    })
            }
            else {
                const { renew, createdAt, ...otherInfo } = req.body

                /**
                 * Pulls an old task out from the task container. 
                 */
                console.log(otherInfo)
                await TaskContainer.findOneAndUpdate({ username: userInfo.username }, {
                    $pull: { taskList: { taskID: otherInfo.taskID } }
                })
                    .catch(err => {
                        return res.status(400).json("Failed to update task")
                    })

                /**
                 * If a taskcompleted container has been created, then the new task completed is pushed to the taskArray.
                 * Otherwise, it creates a new task completed container and pushes the current task.
                 */


                const dateCreated = new Date(createdAt)
                const month = dateCreated.getMonth()

                //TODO : Be wary ofo this when you start implementing Calendar.
                const createAtDayMonthYear = dateCreated.getDate() + dateCreated.getFullYear() + month

                await TaskCompleted.findOneAndUpdate({ $and: [{ username: userInfo.username }, { createdAt: createAtDayMonthYear }] }, {
                    $push: { taskList: otherInfo },
                    $inc: { totalTaskScore: otherInfo.difficulty }
                }, { upsert: true })
                    .then(response => {
                        console.log(response)
                        return res.status(200).json("Task completed successfully")
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json("Something went wrong when trying to add task to completed")
                    })
            }
        }
    })
})

taskRoute.get('/fetch', async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        TaskContainer.findOne({ username: userInfo.username })
            .then(response => {
                res.status(200).json([...response.taskList])
            })
            .catch(err => {
                res.status(400).json("Unable to fetch task group")
            })
    })

})

taskRoute.delete('/remove', async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        TaskContainer.findOneAndUpdate({ username: userInfo?.username }, {
            $pull: { taskList: { taskID: req.body.taskID } }
        })
            .then(response => {
                res.status(200).json("Success")
            })
            .catch(err => {
                res.status(400).json("Unable to remove task")
            })
    })
})

