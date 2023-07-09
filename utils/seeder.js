const mongoose = require('mongoose')
const Room = require('../models/room').default;
const rooms = require('../data/rooms');

mongoose.connect('mongodb://localhost:27017/bookit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})
    .then(con => console.log('Connected to local database. '))
    .catch(err => console.log('Database connection error. ', err));

const seedRooms = async () => {
    await Room.deleteMany();
    await Room.insertMany(rooms);
    process.exit();
}

seedRooms();