import ErrorHandler from "../utils/errorHandler";

const errors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`
        err.message = message;
        err.statusCode = 400
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(item => item.message)
        err.message = message;
        err.statusCode = 400
    }

    console.log('error is: ', err);

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode
    })
}

export default errors;