import { connectDB } from "../../../../datalayer/connectDB";
import User from "../../../../datalayer/schema/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const isConnected = await connectDB();
      if (isConnected) {
        if (req.query.id) {
          const user = await User.findById(req.query.id);
          if (user) res.status(200).json({ user: user });
          else throw new Error("User not found");
        } else {
          throw new Error("No Id");
        }
      } else {
        throw new Error("Database Error");
      }
    } catch (error) {
      if (error) res.status(500).json({ message: error });
    }
  }
}
