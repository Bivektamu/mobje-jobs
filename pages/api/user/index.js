import { connectDB } from "../../../datalayer/connectDB";
import User from "../../../datalayer/schema/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const isConnected = await connectDB();
      if (isConnected) {
        const users = await User.find();
        res.status(200).json({ Users: users });
      }
      else {
        throw ('Database Error')
      }

    } catch (error) {
        if(error) res.status(500).json({ message: error });
    }
  }
}
