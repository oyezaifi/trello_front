import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const KanbanBoard = ({ columns, onDragEnd, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    columnId: '',
    boardId: '65fe1e4d4d3c6b001a1c5679', // Example board ID (dynamic)
    dueDate: '',
    priority: 'medium',
    position: 0, // Auto-assign position
  });

  const openModal = (columnId) => {
    const column = columns.find(col => col.id === columnId);
    const taskCount = column ? column.tasks.length : 0; 

    setNewTask({
      ...newTask,
      columnId,
      position: taskCount, // Assign auto position
    });

    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onAddTask(newTask);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`w-72 flex-shrink-0 rounded-lg p-4 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                    <span className="text-sm text-gray-500">{column.tasks.length}</span>
                  </div>

                  <div className="space-y-2">
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 rounded-lg shadow-sm border transition-transform ${
                              snapshot.isDragging ? 'bg-blue-50 scale-105' : 'bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">{task.title}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>

                  <button
                    onClick={() => openModal(column.id)}
                    className="mt-2 flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal for Adding Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

            <input type="text" name="title" value={newTask.title} onChange={handleInputChange} placeholder="Task Title" className="w-full p-2 border rounded mb-2" />
            <textarea name="description" value={newTask.description} onChange={handleInputChange} placeholder="Task Description" className="w-full p-2 border rounded mb-2" />
            
            <input type="text" name="columnId" value={newTask.columnId} disabled className="w-full p-2 border bg-gray-100 rounded mb-2" />
            <input type="text" name="boardId" value={newTask.boardId} disabled className="w-full p-2 border bg-gray-100 rounded mb-2" />
            <input type="number" name="position" value={newTask.position} disabled className="w-full p-2 border bg-gray-100 rounded mb-2" />

            <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />

            <select name="priority" value={newTask.priority} onChange={handleInputChange} className="w-full p-2 border rounded mb-4">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

KanbanBoard.propTypes = {
  columns: PropTypes.array.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

export default KanbanBoard;
