import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, []);

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Users</h1>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100"><tr><th className="text-left p-4">Name</th><th className="text-left p-4">Email</th><th className="text-left p-4">Role</th><th className="text-left p-4">Action</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-4">{user.name}</td><td className="p-4">{user.email}</td><td className="p-4"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">{user.role}</span></td>
                    <td className="p-4"><button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <p className="p-6 text-center text-gray-500">No registered users.</p>}
          </div>
        </main>
      </div>
    </div>
  );
}
export default AdminUsers;