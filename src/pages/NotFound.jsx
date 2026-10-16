import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-500 mt-4">Page not found</p>
      <Link to="/" className="mt-6 bg-blue-600 text-white px-5 py-2 rounded">Go Home</Link>
    </div>
  );
}
export default NotFound;