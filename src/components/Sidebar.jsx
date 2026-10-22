import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium ${
      isActive
        ? "bg-indigo-50 text-indigo-700 shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 md:min-h-[calc(100vh-4rem)] md:w-60 md:border-r md:border-b-0 lg:w-64">
      <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400 md:mb-5">
        Workspace
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:grid-cols-1">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
        {user?.role !== "admin" && <NavLink to="/cart" className={linkClass}>Cart</NavLink>}
        <NavLink to="/profile" className={linkClass}>Profile</NavLink>
        {user?.role === "admin" && <NavLink to="/users" className={linkClass}>Users</NavLink>}
      </div>
    </aside>
  );
}

export default Sidebar;