import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const CreateBoardModal = ({ isOpen, onClose, onCreate }) => {
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!boardName.trim()) {
      setError("Board name is required");
      return;
    }

    try {
      await onCreate(boardName.trim());
      setBoardName("");
      setError("");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Create New Board
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Board Name
              </label>
              <input
                type="text"
                value={boardName}
                onChange={(e) => {
                  setBoardName(e.target.value);
                  setError("");
                }}
                className={`w-full px-3 py-2 border rounded-lg ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter board name"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Board
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateBoardModal;
