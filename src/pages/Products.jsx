import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useProductStore } from "../stores/productStore";

function Products() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const loadProducts = useProductStore((state) => state.loadProducts);
  const cart = useProductStore((state) => state.cart);
  const addToCart = useProductStore((state) => state.addToCart);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorySort, setCategorySort] = useState("");
  const [failedImages, setFailedImages] = useState({});
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "" });
  const categories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b)
  );
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (categorySort === "asc") return a.category.localeCompare(b.category);
      if (categorySort === "desc") return b.category.localeCompare(a.category);
      return 0;
    });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!form.name || !form.category || !form.price || !form.stock) return;
    addProduct({ name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock) });
    setForm({ name: "", category: "", price: "", stock: "" });
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">Inventory</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
              <p className="mt-2 text-slate-500">Browse and manage your product catalog.</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700"
              >
                {showForm ? "Close" : "Add Product"}
              </button>
            )}
          </div>
          {isAdmin && showForm && (
            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4 sm:p-6">
              <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              <button type="submit" className="rounded-lg bg-emerald-600 p-3 font-semibold text-white hover:bg-emerald-700 md:col-span-4">Save Product</button>
            </form>
          )}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:flex-1"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-56"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={categorySort}
              onChange={(e) => setCategorySort(e.target.value)}
              aria-label="Sort products by category"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-56"
            >
              <option value="">Default order</option>
              <option value="asc">Category: A–Z</option>
              <option value="desc">Category: Z–A</option>
            </select>
          </div>
          {loading ? (
            <p role="status" className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
              Loading products...
            </p>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              <p>{error}</p>
              <button
                onClick={() => loadProducts()}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Try again
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-6">
                  <div className="mb-5 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                    {product.image && !failedImages[product.id] ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={() => setFailedImages((current) => ({ ...current, [product.id]: true }))}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : (
                      <span className="px-4 text-center text-sm text-gray-500">
                        Image unavailable
                      </span>
                    )}
                  </div>
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                    <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                      {product.category}
                    </span>
                  </div>
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">₹{product.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Stock</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">{product.stock}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock < 1 || (cart.find((item) => item.id === product.id)?.quantity ?? 0) >= product.stock}
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {(cart.find((item) => item.id === product.id)?.quantity ?? 0) >= product.stock
                        ? "Stock limit reached"
                        : "Add to cart"}
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
              No products found.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default Products;