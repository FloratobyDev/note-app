import * as mongoose from 'mongoose'

const TaskContainerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    taskList: Array
})

export default mongoose.model('TaskContainerSchema', TaskContainerSchema, 'task-container')