const mongoose = require("mongoose");

// Schema = ek item ka structure (kaun-kaun si fields hongi)
const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["Lost", "Found"],
        message: "Type must be Lost or Found",
      },
    },
  },
  { timestamps: true } // createdAt aur updatedAt automatic add ho jayenge
);

// Model = schema se bana hua tool jisse hum database operations karte hain
// "Item" ka collection MongoDB mein "items" naam se banega
module.exports = mongoose.model("Item", itemSchema);