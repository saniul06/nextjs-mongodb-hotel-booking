// export default function handler(req, res) {
//     const { method } = req;
//     switch (method) {
//         case 'GET': getRooms(req, res)
//             break;
//         default: res.json({ error: "not found" })
//     }
// }

// function getRooms(req, res) {
//     res.json({ rooms: 'all rooms' })
// }

import dbConnect from "../../../config/dbConnect";
import { allRooms, newRoom } from "../../../controllers/roomControllers";
import createRouter from "next-connect";
import onError from '../../../middlewares/errors'

dbConnect();

const router = createRouter({ onError })
    .get(allRooms)
    .post(newRoom)

export default router;