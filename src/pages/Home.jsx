import { Link } from "react-router-dom";

const previewProducts = [
  { name: "Studio headphones", category: "Audio", price: "$129.00", icon: "H", tone: "gold" },
  { name: "Everyday backpack", category: "Accessories", price: "$84.00", icon: "B", tone: "stone" },
  { name: "Wireless keyboard", category: "Electronics", price: "$96.00", icon: "K", tone: "olive" }
];

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <Link to="/" className="home-brand" aria-label="Products Cart home">
          <span className="home-brand-mark">P</span>
          <span>Products <span className="home-brand-accent">Cart</span></span>
        </Link>
        <nav className="home-nav" aria-label="Main navigation">
          <Link to="/login" className="home-nav-login">Log in</Link>
          <Link to="/register" className="home-button home-button-small">
            Create account <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-copy">
            <div className="home-eyebrow">
              <span className="home-eyebrow-dot" />
              YOUR BUSINESS, IN GOOD ORDER
            </div>
            <h1>
              Make room for
              <span> better business.</span>
            </h1>
            <p className="home-description">
              One clear place to manage your products, keep an eye on stock, and build your next great order.
            </p>
            <div className="home-actions">
              <Link to="/register" className="home-button">
                Get started <span aria-hidden="true">→</span>
              </Link>
              <Link to="/login" className="home-secondary-button">
                Sign in to your account
              </Link>
            </div>
            <div className="home-benefits" aria-label="Dashboard features">
              <span><b aria-hidden="true">✓</b> Product catalog</span>
              <span><b aria-hidden="true">✓</b> Stock at a glance</span>
              <span><b aria-hidden="true">✓</b> Simple cart</span>
            </div>
          </div>

          <section className="home-preview" aria-label="Product dashboard preview">
            <div className="home-preview-glow" aria-hidden="true" />
            <div className="home-dashboard">
              <div className="home-dashboard-header">
                <div className="home-window-dots" aria-hidden="true"><i /><i /><i /></div>
                <span>YOUR WORKSPACE</span>
                <span className="home-live"><i /> LIVE</span>
              </div>
              <div className="home-dashboard-content">
                <div className="home-preview-title">
                  <div>
                    <span className="home-overline">OVERVIEW</span>
                    <h2>Good morning.</h2>
                  </div>
                  <span className="home-date">PRODUCTS</span>
                </div>

                <div className="home-stats">
                  <article>
                    <span>CATALOG</span>
                    <strong>All yours<span>.</span></strong>
                    <small>Products in one place</small>
                  </article>
                  <article className="home-stat-highlight">
                    <span>STOCK</span>
                    <strong>In view<span>.</span></strong>
                    <small>Know what is on hand</small>
                  </article>
                  <article>
                    <span>ORDERS</span>
                    <strong>Ready<span>.</span></strong>
                    <small>Your cart, within reach</small>
                  </article>
                </div>

                <div className="home-list">
                  <div className="home-list-heading">
                    <div>
                      <span className="home-overline">THE CATALOG</span>
                      <h3>Featured products</h3>
                    </div>
                    <span className="home-list-count">03 ITEMS</span>
                  </div>
                  {previewProducts.map((product) => (
                    <div className="home-product-row" key={product.name}>
                      <span className={`home-product-icon ${product.tone}`} aria-hidden="true">{product.icon}</span>
                      <span className="home-product-name">
                        <strong>{product.name}</strong>
                        <small>{product.category}</small>
                      </span>
                      <span className="home-product-price">{product.price}</span>
                    </div>
                  ))}
                </div>
                <div className="home-dashboard-foot">
                  <span><i /> Everything is in order</span>
                  <span>MADE SIMPLE</span>
                </div>
              </div>
            </div>
            <div className="home-floating-note">
              <span className="home-note-check" aria-hidden="true">✓</span>
              <span><strong>Less busywork.</strong><small>More room to grow.</small></span>
            </div>
          </section>
        </section>
      </main>

      <footer className="home-footer">
        <span>PRODUCTS CART <i>©</i> 2026</span>
        <span>Clear the clutter. Focus on what matters.</span>
      </footer>
    </div>
  );
}

export default Home;
