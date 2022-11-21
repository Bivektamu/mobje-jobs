// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from "../../../datalayer/connectDB"
import bcrypt from 'bcryptjs'
import User from "../../../datalayer/schema/User"

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const connected = await connectDB()
			if (connected) {

				
				const {email, password} = req.body

				const user = await User.findOne({ email:email})
				
				if(!user) {
					return res.status(500).json({ error: 'User account not found' })
				}

				const isMatch = await bcrypt.compare(password, user.password);

				if(isMatch) {
					return res.status(200).json({user: user})
				}
				else {
					return res.status(500).json({ error: 'Password is incorrect' })
				}
			}
			else {
				throw ('Database error')
			}
		} catch (error) {
			if(error) res.status(500).json({ error: error.message })
		}
	}
}
