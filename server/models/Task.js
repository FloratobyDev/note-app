import * as mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    createdAt: String,
    description: String,
    categoryType: String,
    completed: Boolean
})

export default mongoose.model('TaskSchema', TaskSchema, 'tasks')