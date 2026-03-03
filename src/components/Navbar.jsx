import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">Smart Task Manager</h1>
      {user && (
        <div>
          <span className="mr-4">{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
<Link to="/dashboard" className="mr-4">Dashboard</Link>
<Link to="/" className="mr-4">Tasks</Link>

export default Navbar;
