// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from "../../datalayer/connectDB"

export default async function handler(req, res) {
	try {
		const dbRres = await connectDB()
		if (dbRres) {
			res.status(200).json({ message: "Db connected" })
		}
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ error: error.message })
	}
}
