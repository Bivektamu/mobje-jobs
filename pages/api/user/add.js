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
					return res.status(500).json({ error: 'User already Exists' })
				}

				const {firstName, lastName, password} = req.body

				const user = new User({
					firstName,
					lastName,
					email,
					password
				})



				const salt = await bcrypt.genSalt(9)
				const hashedPassword = await bcrypt.hash(password, salt)
				user.password = hashedPassword

				await user.save()
				return res.status(200).json({ user})
			}
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
}
