// const mongoose = require("mongoose")
import mongoose from "mongoose"

export async function connectDB() {

	if (process.env.DBTYPE === "MONGODB") {
		const username = process.env.USER_NAME
		const password = process.env.PASSWORD
		const dbName = process.env.DBNAME

		if (global.dbConnected === true) {
			console.log("DB already connected")
			return global.dbConnected
		}

		const uri = `mongodb+srv://${username}:${password}@${dbName}.9mppcaj.mongodb.net/?retryWrites=true&w=majority`
		console.log(uri)
		try {
			await mongoose.connect(uri)
			console.log("DB Connected")
			return (global.dbConnected = true)
		} catch (error) {
			console.log(error.message)
			return (global.dbConnected = false)
		}
	}
}
