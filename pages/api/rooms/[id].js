import dbConnect from "../../../config/dbConnect";
import { getSingleRoom, updateRoom, deleteRoom } from "../../../controllers/roomControllers";
import createRouter from "next-connect";
import onError from '../../../middlewares/errors'

dbConnect();

const router = createRouter({ onError })
    .get(getSingleRoom)
    .put(updateRoom)
    .delete(deleteRoom)

export default router;