import mongoose from 'mongoose';
import RoomModel from '../models/room';

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    })
        .then(con => {
            console.log('Connected to local database. ');
            RoomModel();
        })
        .catch(err => console.log('Database connection error. ', err));
}

export default dbConnect;