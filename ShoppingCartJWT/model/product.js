import mongoose from "mongoose";

//define my model
var productsSchema = mongoose.Schema(
    {
        product: { type: String },
        description: { type: String },
        price: { type: String },
    },
    {
        collection: "products",
    }
);

export default mongoose.model("products", productsSchema);
