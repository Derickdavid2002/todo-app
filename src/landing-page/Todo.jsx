import React, { useState, useEffect } from 'react';
import {
  MdEdit,
  MdDelete,
  MdSave,
  MdCheckCircle,
  MdRadioButtonUnchecked,
} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todo() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    const newTask = { id: Date.now(), text: task, completed: false };
    setTaskList([...taskList, newTask]);
    setTask('');
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = taskList.find((t) => t.id === id);
    if (taskToDelete) {
      toast.error(` We hate to see you delete your task!!!: "${taskToDelete.text}"`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id) => {
    const updated = taskList.map((task) =>
      task.id === id ? { ...task, text: editedText } : task
    );
    setTaskList(updated);
    setEditingId(null);
    setEditedText('');
  };

  const handleToggleComplete = (id) => {
    const updated = taskList.map((task) => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (!task.completed && updatedTask.completed) {
          toast.success(` Congratulations!!! You've Completed Your Task: "${task.text}"`, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
        return updatedTask;
      }
      return task;
    });

    setTaskList(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-800">
      {showWelcome ? (
        <div className="text-white text-3xl font-bold animate-pulse">
          Welcome to My Todo App!
        </div>
      ) : (
        <div className="bg-[#1a0258] p-15 rounded shadow-lg w-[900px] max-w-[700px] transition-opacity duration-1000">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Todo App</h1>

          <div className="flex gap-x-2 mb-4">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task..."
              className="placeholder-[#1a0258] text-white border-purple-500 border-2 p-2 flex-1 rounded-l outline-none"
            />
            <button
              onClick={handleAddTask}
              className="bg-purple-700 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>

          <ul className="space-y-2">
            {taskList.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-[#1a0258] p-2 text-white font-semibold rounded border border-purple-500 shadow-md transition-transform transform hover:scale-105"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className={`${
                      task.completed ? 'text-green-600' : 'text-gray-400'
                    } hover:scale-110 transition`}
                    title="Mark as complete"
                  >
                    {task.completed ? (
                      <MdCheckCircle size={20} />
                    ) : (
                      <MdRadioButtonUnchecked size={20} />
                    )}
                  </button>

                  {editingId === task.id ? (
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-1 border px-2 py-1 rounded"
                    />
                  ) : (
                    <span
                      className={`flex-1 ${
                        task.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3 ml-4">
                  {editingId === task.id ? (
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Save"
                    >
                      <MdSave size={20} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditTask(task.id, task.text)}
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Edit"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <MdDelete size={20} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default Todo;