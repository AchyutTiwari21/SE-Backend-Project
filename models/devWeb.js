const mongoose = require("mongoose");

const webSchema = new mongoose.Schema(
    {
        webName: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Web = mongoose.model('Web', webSchema);
module.exports = Web;