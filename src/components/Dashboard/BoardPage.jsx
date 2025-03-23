import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KanbanBoard from './kanbanboard';

const API_URL = 'http://localhost:5000';

const BoardPage = () => {
  const { boardId } = useParams();
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(`${API_URL}/board/${boardId}`);
        const data = await response.json();

        setColumns(prevColumns =>
          prevColumns.map(col => ({
            ...col,
            tasks: data.columns.find(apiCol => apiCol.id === col.id)?.tasks || []
          }))
        );
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  const handleAddTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task), // Sending all fields
      });

      const createdTask = await response.json();

      setColumns(prev =>
        prev.map(col =>
          col.id === task.columnId
            ? { ...col, tasks: [...col.tasks, createdTask] }
            : col
        )
      );
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return <KanbanBoard columns={columns} onDragEnd={() => {}} onAddTask={handleAddTask} />;
};

export default BoardPage;
