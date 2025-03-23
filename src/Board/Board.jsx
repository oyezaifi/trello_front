import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskModal from "../components/task/taskModal";
import api from "../utils/axiosInstance/axiosInstance";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // components/Board.jsx
  // components/Board.jsx
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await api.get(`/columns/board/${boardId}`);
        if (response.data.success) {
          setColumns(response.data.data);
        }
      } catch (err) {
        console.error("Fetch columns error:", err);
        setError(err.response?.data?.error || "Failed to load columns");
        if (err.response?.status === 404) {
        }
      }
    };
    fetchColumns();
  }, [boardId, navigate]);
  const handleTaskCreate = async (taskData) => {
    try {
      await api.post("/tasks/create", taskData);
      const response = await api.get(`/tasks/board/${boardId}`);
      setColumns(response.data.data || []); // Update with correct data path
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
    }
  };

  const handleTaskMove = async (taskId, newColumnId) => {
    try {
      await api.put(`/tasks/${taskId}/move`, { newColumnId });
      const response = await api.get(`/tasks/board/${boardId}`);
      setColumns(response.data.data || []); // Update with correct data path
    } catch (err) {
      setError(err.response?.data?.error || "Failed to move task");
    }
  };

  //   if (loading)
  //     return (
  //       <div className="text-center p-8 text-gray-500">Loading board...</div>
  //     );
  if (error)
    return (
      <div className="text-center p-8 text-red-500 flex items-center justify-center">
        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
        {error}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Board View</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {Array.isArray(columns) &&
          columns.map((column) => (
            <div key={column._id} className="w-72 bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">{column.title}</h3>
              {Array.isArray(column.tasks) &&
                column.tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-4 rounded mb-2 shadow"
                  >
                    <div className="flex justify-between items-center">
                      <span>{task.title}</span>
                      <input
                        type="checkbox"
                        checked={column.title === "Done"}
                        onChange={() => {
                          const currentIndex = columns.findIndex(
                            (c) => c._id === task.column
                          );
                          const newColumn =
                            columns[
                              currentIndex + (column.title === "Done" ? -1 : 1)
                            ];
                          if (newColumn)
                            handleTaskMove(task._id, newColumn._id);
                        }}
                      />
                    </div>
                    {task.dueDate && (
                      <div className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boardId={boardId}
        columns={columns}
        onCreateTask={handleTaskCreate}
      />
    </div>
  );
};

export default Board;
