import * as mongoose from 'mongoose'

const AchievementInfoSchema = mongoose.Schema({
    streakRequired: Number,
    achievementTitle: String
})


export default mongoose.model('AchievementInfoSchema', AchievementInfoSchema, 'achievement-info')