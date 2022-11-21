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

				console.log(email)

				const userExists = await User.findOne({ email:email})
				
				if(userExists) {
					res.status(500).json({ message: 'User already Exists' })
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
				res.status(200).json({ user })
			}
			else {
				throw ('Database error')
			}
		} catch (error) {
			if(error) res.status(500).json({ message: error.message })
		}
	}
}
