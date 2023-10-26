import { connectDB } from "../../../datalayer/connectDB";
import User from "../../../datalayer/schema/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const isConnected = connectDB();
      console.log('asdf')

      if (isConnected) {
        const allUsers = await User.find();
        const userId = (allUsers.map(user => (user._id).toString()))
        res.status(200).json({userId: userId})
        
      } else {
        throw new Error('Database Error');
      }
    } catch (error) {
      if (error) res.status(500).json({ message: error.messages });
    }
  }
}
