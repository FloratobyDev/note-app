import * as mongoose from 'mongoose'

/**
 *  Streak will get incremented each time the lastDateFinishedTask field is stale. 
 *  At the time of update, the streak field will get compared against 
 */
const defaultDate = new Date("09-09-1998").toISOString()

const AchievementSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    streak: {
        type: Number,
        default: 0
    },
    lastDateFinishedTask: {
        type: String,
        default: defaultDate
    },
    achievementsAcquired: {
        type: Array,
        default: []
    },
    categoricalAchievements: {
        type: Object,
        default: {}
    }
})

export default mongoose.model('AchievementSchema', AchievementSchema, 'achievements')