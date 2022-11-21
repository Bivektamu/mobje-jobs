import { connectDB } from "../../../datalayer/connectDB";
import User from "../../../datalayer/schema/User";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    res.status(200).json({ message: "All Users deleted" });

    try {
      const isConnected = connectDB();
      if (isConnected) {
        await User.deleteMany();
        if (error) res.status(200).json({ message: "All Users deleted" });
      } else {
        throw "DB error";
      }
    } catch (error) {
      if (error) res.status(500).json({ message: error.messages });
    }
  }
}
