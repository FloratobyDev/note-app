import * as mongoose from 'mongoose'

const TaskCompletedSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    createdAt: Number,
    totalTaskScore: Number,
    taskList: Array
})

export default mongoose.model('TaskCompletedSchema', TaskCompletedSchema, 'taskcompleted')