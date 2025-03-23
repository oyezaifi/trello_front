import { Link } from 'react-router-dom';
import { 
  HomeIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon as LogoutIcon,
  DocumentTextIcon as BoardIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="w-64 bg-white shadow-lg fixed h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Task Manager</h2>
        <nav className="space-y-2">
          <Link
            to="/home"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-gray-700"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/boards"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-gray-700"
          >
            <BoardIcon className="w-5 h-5" />
            My Boards
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-gray-700"
          >
            <UserIcon className="w-5 h-5" />
            Profile
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-red-600"
          >
            <LogoutIcon className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;