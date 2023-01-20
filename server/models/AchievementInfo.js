import * as mongoose from 'mongoose'

const AchievementInfoSchema = mongoose.Schema({
    streakRequired: Number,
    achievementAcquired: Boolean,
    achievementTitle: String
})

export default mongoose.model('AchievementInfoSchema', AchievementInfoSchema, 'achievement-info')