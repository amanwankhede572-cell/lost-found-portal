import { useState } from "react";

const categories = [
  "Electronics",
  "Documents",
  "Wallet",
  "Keys",
  "Bag",
  "Clothing",
  "Books",
  "Other",
];

const emptyForm = {
  itemName: "",
  category: "",
  location: "",
  description: "",
  type: "Lost",
};

function ItemForm({ onSubmit, editingItem, onCancel }) {
  // Edit mode mein purani values bharo, warna khali form
  const [formData, setFormData] = useState(
    editingItem
      ? {
          itemName: editingItem.itemName,
          category: editingItem.category,
          location: editingItem.location,
          description: editingItem.description,
          type: editingItem.type,
        }
      : emptyForm
  );
  const [formError, setFormError] = useState("");

  // Har input ke liye ek hi function: name ke hisaab se state update
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // page reload hone se rokta hai

    if (
      !formData.itemName.trim() ||
      !formData.category ||
      !formData.location.trim() ||
      !formData.description.trim()
    ) {
      setFormError("Please fill in all the fields.");
      return;
    }

    setFormError("");
    onSubmit(formData);
  };

  return (
    <section className="form-section">
      <h2>{editingItem ? "Edit Item" : "Report an Item"}</h2>

      <form className="item-form" onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="e.g. Black Wallet"
        />

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Library, Canteen, Room 204"
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Colour, brand, any special mark..."
        />

        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        {formError && <p className="form-error">{formError}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingItem ? "Update Item" : "Submit"}
          </button>
          {editingItem && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ItemForm;