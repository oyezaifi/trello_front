import React, { useEffect, useState } from "react";
import useBoards from "../hooks/getBoards";
import { PlusIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import CreateBoardModal from "./BoardModal";
import { Link } from "react-router-dom";

const BoardList = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { boards, loading, error } = useBoards(refreshTrigger);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creationError, setCreationError] = useState("");

  const handleCreateBoard = async (name) => {
    try {
      const response = await fetch("http://localhost:5000/api/boards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create board");
      }

      // Trigger refresh of board list
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      setCreationError(error.message);
      throw error;
    }
  };

  if (loading)
    return (
      <div className="text-center p-8 text-gray-500">Loading boards...</div>
    );

  if (error)
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <>
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCreationError("");
        }}
        onCreate={handleCreateBoard}
      />

      {creationError && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          {creationError}
        </div>
      )}

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-40 flex flex-col items-center justify-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-500 hover:text-blue-600 group"
          >
            <PlusIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Create New Board</span>
          </button>

          {boards.map((board) => (
            <Link to={`/boards/${board._id}`} key={board._id}>
              <div
                key={board._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border border-gray-200 hover:border-blue-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {board.name}
                  </h3>
                  {board.isOwner && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      Owner
                    </span>
                  )}
                </div>

                <div className="flex justify-between gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg flex-1">
                    <div className="text-gray-500 text-sm">📋 Tasks</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {board.tasksCount}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1">
                    <div className="text-gray-500 text-sm">👥 Members</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {board.membersCount}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Created{" "}
                  {new Date(board.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardList;
