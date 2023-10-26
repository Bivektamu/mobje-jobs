import { connectDB } from "../../../datalayer/connectDB";
import User from "../../../datalayer/schema/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log('asdf')
      const isConnected = await connectDB();
      if (isConnected) {
        const user = await User.find(req.id);
        console.log(user)
        if(user)
          res.status(200).json({ user: user });
        else
          throw new Error('User not found')
      }
      else {
        throw new Error('Database Error')
      }

    } catch (error) {
        if(error) res.status(500).json({ message: error });
    }
  }
}
