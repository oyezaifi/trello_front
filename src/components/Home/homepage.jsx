import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from "../Home/home";
import Sidebar from "../Home/sidebar";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([
    { _id: '1', name: 'Project Board', tasksCount: 5 },
    { _id: '2', name: 'Marketing Plan', tasksCount: 3 }
  ]);

  const handleCreateBoard = () => {
    const boardName = prompt('Enter board name:');
    if (boardName) {
      const newBoard = {
        _id: Date.now().toString(),
        name: boardName,
        tasksCount: 0
      };
      setBoards(prev => [...prev, newBoard]);
    }
  };

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <div className="ml-64 flex-1 p-8">
        <Dashboard 
          boards={boards}
          onCreateBoard={handleCreateBoard}
          onBoardClick={handleBoardClick}
        />
      </div>
    </div>
  );
};

export default DashboardPage;