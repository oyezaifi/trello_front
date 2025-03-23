// components/TaskModal.jsx
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const TaskModal = ({ isOpen, onClose, boardId, columns, onCreateTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    try {
      await onCreateTask({
        title: formData.title,
        description: formData.description,
        boardId: boardId,
        dueDate: formData.dueDate,
        priority: formData.priority,
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Create New Task
            </Dialog.Title>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                required
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="w-full p-2 border rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Create Task
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
export default TaskModal;
