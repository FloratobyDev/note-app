import { Router } from "express";
import { createTask, fetchTask, removeTask, updateTask } from "../controllers/taskControllers.js";

export const taskRoute = Router()
taskRoute.post('/create', createTask)
taskRoute.patch('/update', updateTask)
taskRoute.get('/fetch', fetchTask)
taskRoute.delete('/remove', removeTask)

