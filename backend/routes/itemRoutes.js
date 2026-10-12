const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// Validation / ID errors ko handle karne ka helper
const handleError = (error, res, defaultMessage) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
    return res.status(400).json({ message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid item ID" });
  }
  console.error(error);
  return res.status(500).json({ message: defaultMessage });
};

// READ: GET /api/items  -> saare items (naye pehle)
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    handleError(error, res, "Could not fetch items");
  }
});

// CREATE: POST /api/items  -> naya item add
router.post("/", async (req, res) => {
  try {
    const { itemName, category, location, description, type } = req.body;
    const newItem = new Item({ itemName, category, location, description, type });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    handleError(error, res, "Could not save item");
  }
});

// UPDATE: PUT /api/items/:id  -> item edit
router.put("/:id", async (req, res) => {
  try {
    const { itemName, category, location, description, type } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { itemName, category, location, description, type },
      { new: true, runValidators: true } // new:true = updated item wapas do
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    handleError(error, res, "Could not update item");
  }
});

// DELETE: DELETE /api/items/:id  -> item delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    handleError(error, res, "Could not delete item");
  }
});

module.exports = router;