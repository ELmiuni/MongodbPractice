// models/User.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return v.includes("@");
            },
            message: "invalid email format"
        }
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);