import User from '../models/user'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// Register user   =>   /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {

    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'pulicid',
            url: 'url'
        },
        role
    });

    res.status(200).json({
        success: true,
        message: 'Account Registered successfully'
    })

})


export {
    registerUser,
}