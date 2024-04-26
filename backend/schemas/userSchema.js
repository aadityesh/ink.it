import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [50, "Name cannot exceed 50 characters"],

    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: [9, "Password must contain atleast 9 characters"],
        maxLength: [80, "Password cannot exceed 80 characters"],
    },
    role: {
        type: String,
        required: true,
        enum: ["Reader", "Author"]
    },
    avatar: {

        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
})

export const User = mongoose.model("User", userSchema)

