import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import { authReducer, loadedUserReducer } from "./userReducers";

const reducers = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
});

export default reducers;