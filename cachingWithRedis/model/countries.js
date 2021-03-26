import mongoose from "mongoose";

//define my model

var countriesSchema = mongoose.Schema({
    title: { type: String },
    text: {type: String}
});

export default mongoose.model("countries", countriesSchema);