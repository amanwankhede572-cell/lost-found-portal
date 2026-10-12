function Home({ changePage }) {
  return (
    <section className="home">
      <h2>Lost &amp; Found Portal</h2>
      <p>
        Lost something on campus? Found something that belongs to someone else?
        Report it here and help everyone get their belongings back.
      </p>
      <div className="home-buttons">
        <button className="btn btn-primary" onClick={() => changePage("report")}>
          Report an Item
        </button>
        <button className="btn btn-secondary" onClick={() => changePage("items")}>
          View All Items
        </button>
      </div>
    </section>
  );
}

export default Home;