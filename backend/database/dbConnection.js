import mongoose from "mongoose";

// connection to db
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("DB connected");
    }).catch(error => {
        console.log("DB not connected");
    })
}