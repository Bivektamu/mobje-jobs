const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	postedJobs: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	appliedJobs: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	resume: {
		type: String,
	},
})

export default mongoose.models?.User || mongoose.model("User", UserSchema)
