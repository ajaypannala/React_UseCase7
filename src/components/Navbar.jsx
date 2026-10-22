import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProductStore } from "../stores/productStore";

function Navbar() {
  const { user, logout } = useAuth();
  const cartCount = useProductStore((state) => state.getCartCount());

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
      <Link to="/dashboard" className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white shadow-sm shadow-indigo-200">
          P
        </span>
        Products Cart
      </Link>
      <div className="flex items-center gap-3 sm:gap-5">
        {user?.role !== "admin" && (
          <Link
            to="/cart"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:px-4"
          >
            Cart <span aria-label={`${cartCount} items`}>({cartCount})</span>
          </Link>
        )}
        <span className="hidden text-sm font-medium text-slate-600 sm:block">{user?.name}</span>
        <button
          onClick={logout}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:px-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;