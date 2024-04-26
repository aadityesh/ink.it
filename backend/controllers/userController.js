import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import { User } from "../schemas/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"


export const register = catchAsyncErrors(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length == 0) {
        return next(new ErrorHandler("User avatar is required!", 400))
    }

    const { avatar } = req.files
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"]

    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("Allowed File formats - png/jpeg/jpg/webp", 400))
    }

    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role || !avatar) {
        return next(new ErrorHandler("Please provide all the details", 400))
    }

    const user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User already exists", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown cloudinary error");
    }

    await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })


    const userBody = { email, password, role }

    const token = jwt.sign(userBody, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    })

    res.status(200).cookie('token', token).json({
        "message": "User registered success!",
    })

})

export const login = catchAsyncErrors(async (req, res, next) => {

    const { email, password, role } = req.body
    const userBody = { email, password, role }

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide all the details", 400))
    }

    const user = await User.findOne({ email })
    const checkPassword = await bcrypt.compare(password, user.password)
    const isRole = (role === user.role)

    if (!user || !checkPassword || !isRole) {
        return next(new ErrorHandler("email/password/role is incorrect", 400))
    }

    const token = jwt.sign(userBody, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    })


    res.status(200).cookie('token', token).json({
        "message": "User login success!",
    })

})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .json({
            "message": "User logout success!",
        })
})

export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = req.user
    res.status(200).json({
        "message": "get operation worked!",
        user,
    })
})
export const getAllAuthors = catchAsyncErrors(async (req, res, next) => {
    const authors = await User.find({ role: "Author" })
    res.status(200).json({
        authors,
        success: true,
    })
})





