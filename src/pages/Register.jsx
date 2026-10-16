import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError("Please fill all fields");
    const result = register(form.name, form.email, form.password, form.role);
    if (!result.success) return setError(result.message);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border p-3 rounded" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-3 rounded" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-3 rounded" />
          <select name="role" value={form.role} onChange={handleChange} className="w-full border p-3 rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="text-center mt-5">Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link></p>
      </div>
    </div>
  );
}
export default Register;