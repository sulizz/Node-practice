import mongoose from "mongoose";

//define my model

var newsSchema = mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        url: { type: String },
        imageUrl:{type: String},
        category:{type: String}
    },
    {
        timestamps: true,
    },
    {
        collection: "news",
    }
);

export default mongoose.model("news", newsSchema);
