import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Message from "./components/Message";
import "./App.css";

// Backend ka address. Yeh backend ke port se match hona chahiye.
const API_URL = "http://localhost:5000/api/items";

function App() {
  const [page, setPage] = useState("home");              // kaun sa page dikhana hai
  const [items, setItems] = useState([]);                // database se aaye items
  const [editingItem, setEditingItem] = useState(null);  // jo item edit ho raha hai
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Success / error message 3 second ke liye dikhao
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // GET: saare items laao
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Server error while loading items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      showMessage("Could not load items. Is the backend running?", "error");
    } finally {
      setLoading(false);
    }
  };

  // Page pehli baar khulte hi (ya refresh par) items load karo
  useEffect(() => {
    fetchItems();
  }, []);

  // POST (naya) ya PUT (edit) -- dono yahan handle hote hain
  const saveItem = async (formData) => {
    const isEdit = editingItem !== null;
    try {
      const response = await fetch(isEdit ? `${API_URL}/${editingItem._id}` : API_URL, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      showMessage(isEdit ? "Item updated successfully!" : "Item reported successfully!");
      setEditingItem(null);
      await fetchItems();
      setPage("items");
    } catch (error) {
      if (error instanceof TypeError) {
        showMessage("Cannot connect to server. Is the backend running?", "error");
      } else {
        showMessage(error.message, "error");
      }
    }
  };

  // DELETE: confirmation ke baad delete
  const deleteItem = async (id) => {
    const sure = window.confirm("Are you sure you want to delete this item?");
    if (!sure) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not delete item");

      showMessage("Item deleted successfully!");
      await fetchItems();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  // Edit button dabane par form page kholo
  const startEdit = (item) => {
    setEditingItem(item);
    setPage("report");
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setPage("items");
  };

  // Navbar se page badalne par edit mode band karo
  const changePage = (newPage) => {
    setEditingItem(null);
    setPage(newPage);
  };

  return (
    <div className="app">
      <Navbar page={page} changePage={changePage} />
      <Message message={message} />

      <main className="container">
        {page === "home" && <Home changePage={changePage} />}

        {page === "report" && (
          <ItemForm
            onSubmit={saveItem}
            editingItem={editingItem}
            onCancel={cancelEdit}
          />
        )}

        {page === "items" && (
          <ItemList
            items={items}
            loading={loading}
            onEdit={startEdit}
            onDelete={deleteItem}
          />
        )}
      </main>

      <footer className="footer">Lost & Found Portal | College Mini Project</footer>
    </div>
  );
}

export default App;