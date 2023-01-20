import * as mongoose from 'mongoose'

const AchievementSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    streak: Number,
    dateLastShown: String,
    lastDateFinishedTask: String,
    achievementChart: Array
})

export default mongoose.model('AchievementSchema', AchievementSchema, 'achievements')