import React, { useState, useEffect } from "react";
import {
  MdEdit,
  MdDelete,
  MdSave,
  MdCheckCircle,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [animateList, setAnimateList] = useState(true);
  const [quote, setQuote] = useState("");

  const motivationalQuotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "Don’t wait for opportunity. Create it.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Great things never come from comfort zones.",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Pick a quote based on the current date to keep it consistent per day
    const today = new Date().getDate();
    const index = today % motivationalQuotes.length;
    setQuote(motivationalQuotes[index]);
  }, []);

  const handleAddTask = () => {
    if (task.trim() === "" || category.trim() === "" || dueDate.trim() === "") {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      category,
      priority,
      dueDate,
    };

    setTaskList([...taskList, newTask]);
    setTask("");
    setCategory("");
    setPriority("Medium");
    setDueDate("");
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = taskList.find((t) => t.id === id);
    if (taskToDelete) {
      toast.error(
        `💔We hate to see you delete your task: "${taskToDelete.text}"`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
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
    setEditedText("");
  };

  const handleToggleComplete = (id) => {
    const updated = taskList.map((task) => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (!task.completed && updatedTask.completed) {
          toast.success(`Congratulations!!!🎉🎊 You've completed your task: "${task.text}"`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
        return updatedTask;
      }
      return task;
    });

    setTaskList(updated);
  };

  const handleFilterChange = (newFilter) => {
    setAnimateList(false);
    setTimeout(() => {
      setFilter(newFilter);
      setAnimateList(true);
    }, 50);
  };

  const filteredTasks = taskList.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((task) => task.completed).length;
  const completionRate =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f2d] to-[#1f114d] relative overflow-hidden flex flex-col items-center px-4 py-10 space-y-6">
      {/* Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-80 h-80 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>

      {/* Main Section */}
      {showWelcome ? (
        <div className="text-white text-3xl font-bold animate-pulse z-10 relative mt-10">
          Welcome to My Todo App!
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between w-full  bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl px-6 py-4 mb-6 z-10">
            <div className="flex items-center space-x-4">
              <img
                src="/meai.jpg"
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg"
              />
              <h2 className="text-white text-xl font-semibold">Hi Derick 👋</h2>
            </div>
            <div className="text-sm text-purple-300 hidden sm:block">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Daily Quote */}
          <div className="text-white text-center text-lg italic max-w-2xl z-10 bg-white/10 p-4 rounded-xl shadow border border-white/20">
            <span>💡 Quote of the Day: </span>
            <span className="font-medium text-purple-300">"{quote}"</span>
          </div>

          {/* Progress */}
          <div className="w-full max-w-3xl mt-2 z-10">
            <h3 className="text-white mb-2 font-semibold">🎯 Daily Progress</h3>
            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-4 bg-green-500 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-purple-200 mt-1 text-right">
              {completedTasks}/{totalTasks} tasks completed
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-3xl transition-all duration-500 border border-white/20 relative z-10">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-6 text-center tracking-wide">
              📝 My Todo List
            </h1>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              {["all", "completed", "pending"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`px-4 py-1 rounded-full text-sm transition ${
                    filter === type
                      ? type === "completed"
                        ? "bg-green-600 text-white"
                        : type === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-purple-600 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Input Row */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter your task..."
                  className="h-10 placeholder-white placeholder:text-sm text-white border-purple-400 border-2 px-3 rounded outline-none bg-transparent flex-1"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-10 px-3 rounded border-2 border-purple-400 text-black font-semibold"
                >
                  <option value="">Category *</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="h-10 px-3 rounded border-2 border-purple-400 text-black font-semibold"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-10 px-3 rounded border-2 border-purple-400 text-white font-semibold bg-transparent"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleAddTask}
                  className="h-10 bg-purple-700 text-white px-6 rounded-4xl hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>
            </div>

            {/* Task List */}
            <ul
              className={`space-y-4 transition-all duration-300 ${
                animateList
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-start bg-[#2e1065] p-3 text-white font-semibold rounded-lg border border-purple-400 shadow-lg transition-transform transform hover:scale-[1.01]"
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <button
                        onClick={() => handleToggleComplete(task.id)}
                        className={`mt-1 ${
                          task.completed ? "text-green-400" : "text-gray-400"
                        } hover:scale-110 transition`}
                        title="Mark as complete"
                      >
                        {task.completed ? (
                          <MdCheckCircle size={20} />
                        ) : (
                          <MdRadioButtonUnchecked size={20} />
                        )}
                      </button>
                      <div className="flex-1">
                        {editingId === task.id ? (
                          <input
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="w-full border px-2 py-1 rounded text-white bg-transparent border-purple-300"
                          />
                        ) : (
                          <div>
                            <span
                              className={`block ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.text}
                            </span>
                            <div className="flex flex-col text-sm mt-1 text-purple-300">
                              {task.category && <span>📁 {task.category}</span>}
                              <span
                                className={`font-semibold ${
                                  task.priority === "High"
                                    ? "text-red-400"
                                    : task.priority === "Low"
                                    ? "text-green-400"
                                    : "text-yellow-400"
                                }`}
                              >
                                🚦 {task.priority} Priority
                              </span>
                              {task.dueDate && (
                                <span>📅 Due: {task.dueDate}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      {editingId === task.id ? (
                        <button
                          onClick={() => handleSaveEdit(task.id)}
                          className="text-green-400 hover:text-green-600"
                          title="Save"
                        >
                          <MdSave size={20} />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditTask(task.id, task.text)}
                            className="text-yellow-400 hover:text-yellow-600"
                            title="Edit"
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-400 hover:text-red-600"
                            title="Delete"
                          >
                            <MdDelete size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-white text-sm opacity-70">
                  Hi DERICK, No {filter} tasks to display.
                </p>
              )}
            </ul>
            <ToastContainer />
          </div>

{/* Footer */}
      <footer className="w-full text-center text-sm text-white mt-10 z-10">
        <p className="opacity-70">
          Made with ❤ by Derick · {new Date().getFullYear()}
        </p>
      </footer>

        </>
      )}

      
    </div>
  );
}

export default Todo;
