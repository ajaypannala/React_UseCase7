import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useProductStore } from "../stores/productStore";

function Dashboard() {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const loadProducts = useProductStore((state) => state.loadProducts);
  const totalStock = products.reduce((total, product) => total + product.stock, 0);
  const categories = new Set(products.map((product) => product.category)).size;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">Overview</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-2 text-slate-500">Welcome to your product management dashboard.</p>
          </div>
          {loading && <p role="status" className="mb-6 text-slate-500">Loading products...</p>}
          {!loading && error && (
            <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <p>{error}</p>
              <button onClick={() => loadProducts()} className="mt-3 font-semibold underline">
                Try again
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-sm font-medium text-slate-500">Total Products</h2><p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{products.length}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-sm font-medium text-slate-500">Total Stock</h2><p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{totalStock}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-sm font-medium text-slate-500">Categories</h2><p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{categories}</p></div>
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">Recent Products</h2><Link to="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View all</Link></div>
            <div className="divide-y divide-slate-100">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="flex justify-between gap-4 py-3 first:pt-0 last:pb-0"><span className="font-medium text-slate-700">{product.name}</span><span className="font-semibold text-slate-900">₹{product.price}</span></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;