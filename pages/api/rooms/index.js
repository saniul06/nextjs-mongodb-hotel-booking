import dbConnect from "../../../config/dbConnect";
import { allRooms, newRoom } from "../../../controllers/roomControllers";
import createRouter from "next-connect";
import onError from '../../../middlewares/errors'

dbConnect();

const router = createRouter({ onError })
    .get(allRooms)
    .post(newRoom)

export default router;