import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
	name:{
		type: String,
		requried: true,
	},
	description:{
		type: String,
	}
},{
	timestamps: true,
});


const Store = mongoose.model("Store", storeSchema)

export default Store