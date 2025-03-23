import { PlusIcon, DocumentIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const Dashboard = ({ boards, onCreateBoard, onBoardClick }) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Boards</h1>
        <div className="text-gray-600">
          Welcome back, <span className="font-semibold">User</span>!
        </div>
      </div>

      {/* Rest of your existing dashboard UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Board Card */}
        <button
          onClick={onCreateBoard}
          className="h-40 flex flex-col items-center justify-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-500 hover:text-blue-600"
        >
          <PlusIcon className="w-8 h-8 mb-2" />
          <span className="font-medium">Create New Board</span>
        </button>

        {/* Existing Boards */}
        {boards.map((board) => (
          <div
            key={board._id}
            onClick={() => onBoardClick(board._id)}
            className="h-40 flex flex-col justify-between bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
          >
            {/* ... existing board card content ... */}
          </div>
        ))}
      </div>
    </div>
  );
  
};
export default Dashboard
// Keep your existing prop types