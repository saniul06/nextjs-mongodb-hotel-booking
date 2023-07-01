import ErrorHandler from "@/utils/errorHandler";
import Room from "../models/room";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ApiFeatures from '../utils/apiFeatures';

const allRooms = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;
    const totalRooms = await Room.countDocuments();
    console.log('req.qeury ', req.query)
    const apiFeatures = new ApiFeatures(Room.find(), req.query).search().filter();
    let rooms = await apiFeatures.query;
    apiFeatures.pagination(resPerPage)
    rooms = await apiFeatures.query.clone();
    res.status(200).json({ success: true, count: rooms.length, rooms, totalRooms })
})

const newRoom = catchAsyncErrors(async (req, res) => {
    const room = await Room.create(req.body);
    res.status(200).json({
        success: true,
        room
    })
})

const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
    const room = await Room.findById(req.query.id);
    if (!room) {
        return next(new ErrorHandler(`Room not found with id ${req.query.id}`, 404))
    }
    res.status(200).json({
        success: true,
        room
    })
})

const updateRoom = catchAsyncErrors(async (req, res, next) => {
    let room = await Room.findById(req.query.id);
    if (!room) {
        return next(new ErrorHandler(`Room not found with id ${req.query.id}`, 404))
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        room
    })
})

const deleteRoom = catchAsyncErrors(async (req, res, next) => {
    const room = await Room.findById(req.query.id);
    if (!room) {
        return next(new ErrorHandler(`Room not found with id ${req.query.id}`, 404))
    }

    await room.deleteOne();

    res.status(200).json({
        success: true,
        message: "Room deleted successfully"
    })
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}