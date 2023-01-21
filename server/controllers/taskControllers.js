import { verifyToken } from "./HelperFunctions/verifyToken.js"
import TaskContainer from "../models/TaskContainer.js"
import TaskCompleted from "../models/TaskCompleted.js"
import Achievement from "../models/Achievement.js"
import AchievementInfo from "../models/AchievementInfo.js"

export const createTask = async (req, res) => {
    verifyToken(req, (err, userInfo) => {
        if (err) return res.status(400).json("Not logged in!")

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
}

export const fetchTask = async (req, res) => {

    verifyToken(req, (err, userInfo) => {
        TaskContainer.findOne({ username: userInfo.username })
            .then(response => {
                res.status(200).json([...response.taskList])
            })
            .catch(err => {
                res.status(400).json("Unable to fetch task group")
            })
    })
}

export const removeTask = async (req, res) => {

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
}

export const updateTask = async (req, res) => {

    verifyToken(req, async (err, userInfo) => {

        const currentDate = new Date()

        if (req.query.renew === 'true') {

            console.log('renewing task')
            const { renew, ...info } = req.body

            TaskContainer.findOneAndUpdate({
                username: userInfo.username, "taskList": {
                    $elemMatch: {
                        "taskID": info.taskID
                    }
                }
            }, { $set: { "taskList.$.isStale": false, "taskList.$.createdAt": currentDate.toISOString() } })
                .then(response => {
                    console.log('Succeeded on renewing task.')
                    return res.status(200).json("Successfully updated task.")
                })
                .catch(err => {
                    return res.status(400).json("Failed to update task")
                })
        }
        else {
            const { createdAt, ...info } = req.body
            const dateCreated = new Date(createdAt)

            //Sets state of the document to STALE.

            if (dateCreated.getDate() < currentDate.getDate()) {
                console.log('setting task to stale')

                TaskContainer.findOneAndUpdate({
                    username: userInfo.username, "taskList": {
                        $elemMatch: {
                            "taskID": info.taskID
                        }
                    }
                }, { $set: { "taskList.$.isStale": true } })
                    .then(response => {
                        return res.status(200).json("Successfully updated task.")
                    })
                    .catch(err => {
                        return res.status(400).json("Failed to update task")
                    })
            }
            else {
                // Pulls the task out and saves it into the task completed collection.

                const { renew, createdAt, ...otherInfo } = req.body

                /**
                 * Pulls an old task out from the task container. 
                 */

                // await Achievement.findOne({ username: userInfo.username })
                // .then(response => {
                //     const lastDate = new Date(response.lastDateFinishedTask)

                //     if (lastDate.getDate() < currentDate.getDate()){
                //         Achievement.findOneAndUpdate()
                //     }
                //  })


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
                        // return res.status(200).json("Task completed successfully")
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json("Something went wrong when trying to add task to completed")
                    })

                const categoryField = "categoricalAchievements." + otherInfo.category

                await Achievement.findOneAndUpdate({ username: userInfo.username }, {
                    $inc: { [categoryField]: 1 }
                }).catch(err => {
                    console.log(err)
                    console.log('--not able to increment category--')
                })



                const date = new Date()
                date.setHours(23, 59, 59, 0)

                await Achievement.findOneAndUpdate({
                    $and: [{ username: userInfo.username }, {
                        lastDateFinishedTask: { $lt: currentDate }
                    }]
                }, {
                    $inc: { streak: 1 },
                    lastDateFinishedTask: date
                }, { new: true })
                    .then(response => {

                        AchievementInfo.find({ $and: [{ streakRequired: { $lte: parseInt(response?.streak) } }, { _id: { $nin: response?.achievementsAcquired } }] })
                            .then(response => {
                                Achievement.findOneAndUpdate({ username: userInfo.username }, {
                                    $push: { achievementsAcquired: response._id }
                                })

                                const { _id, ...other } = response
                                return res.status(200).json(response)
                            })
                            .catch(err => {
                                // console.log(err)
                                // console.log('no achievements found atm')
                                res.status(400).json("No achievements found")
                            })

                    })
                    .catch(err => {
                        // console.log(err)
                        console.log('Achievements is up to date.')
                        res.status(400).json('Achievements are up to date.')
                    })
            }
        }
    })
}

