import * as mongoose from 'mongoose'

const CategorySchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    categoryList: Array
})

export default mongoose.model('CategorySchema', CategorySchema, 'userCategories')