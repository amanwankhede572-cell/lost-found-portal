function Navbar({ page, changePage }) {
  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => changePage("home")}>
        🔎 Lost &amp; Found
      </h1>
      <div className="nav-links">
        <button
          className={page === "home" ? "nav-btn active" : "nav-btn"}
          onClick={() => changePage("home")}
        >
          Home
        </button>
        <button
          className={page === "report" ? "nav-btn active" : "nav-btn"}
          onClick={() => changePage("report")}
        >
          Report Item
        </button>
        <button
          className={page === "items" ? "nav-btn active" : "nav-btn"}
          onClick={() => changePage("items")}
        >
          All Items
        </button>
      </div>
    </nav>
  );
}

export default Navbar;