import ItemCard from "./ItemCard";

function ItemList({ items, loading, onEdit, onDelete }) {
  if (loading) return <p className="info-text">Loading items...</p>;

  return (
    <section>
      <h2>All Reported Items ({items.length})</h2>

      {items.length === 0 ? (
        <p className="info-text">No items reported yet.</p>
      ) : (
        <div className="cards-grid">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ItemList;