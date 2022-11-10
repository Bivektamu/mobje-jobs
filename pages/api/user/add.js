// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from "../../../datalayer/connectDB"
import bcrypt from 'bcryptjs'
import User from "../../../datalayer/schema/User"

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const connected = await connectDB()
			if (connected) {


				const {email} = req.body


				const userExists = await User.findOne({ email:email})
				
				if(userExists) {
					res.status(200).json({ message: 'User already Exists' })
				}

				const {firstName, lastName, password} = req.body

				const user = new User({
					firstName,
					lastName,
					email,
					password
				})

				const salt = await bcrypt.genSalt(9)
				const hasdedPassword = bcrypt.hash(password, salt)
				res.status(200).json({ message: hasdedPassword })

				await user.save()
				res.status(200).json({ message: "User Created" })
			}
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}
