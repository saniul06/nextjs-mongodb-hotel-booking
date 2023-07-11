import cloudinary from 'cloudinary'
import User from '../models/user'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// Register user   =>   /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {

    const { name, email, password, role, avatar } = req.body;

    console.log('req.body: ', req.body)

    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        },
        role
    });

    res.status(200).json({
        success: true,
        message: 'Account Registered successfully'
    })

})

// Cuurent user profile   =>   /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })

})


export {
    registerUser,
    currentUserProfile
}