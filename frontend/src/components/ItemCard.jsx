function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="card">
      <span className={item.type === "Lost" ? "badge lost" : "badge found"}>
        {item.type}
      </span>

      <h3>{item.itemName}</h3>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p className="card-desc">{item.description}</p>
      <p className="card-date">
        Reported on {new Date(item.createdAt).toLocaleDateString()}
      </p>

      <div className="card-buttons">
        <button className="btn btn-edit" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(item._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;