import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { User } from "../schemas/userSchema.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler("User is not logged in", 400))
    }
    const verify = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ email: verify.email })
    next()
})

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`User role ${req.user.role} is not authorized to access this resource`, 400))

        }
        next()
    }
}