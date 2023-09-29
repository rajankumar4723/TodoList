import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [category, setCategory] = useState("work");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Please enter a task before submitting.");
      return;
    }

    if (editIndex !== -1) {
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex].title = title;
      updatedTasks[editIndex].category = category;
      setMainTask(updatedTasks);
      setEditIndex(-1);
    } else {
      setMainTask([...mainTask, { title, category }]);
    }
    setTitle("");
  };

  const deleteHandler = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(i, 1);
    setMainTask(updatedTasks);
    if (i === editIndex) {
      setEditIndex(-1);
    }
  };

  const editHandler = (i) => {
    setTitle(mainTask[i].title);
    setCategory(mainTask[i].category);
    setEditIndex(i);
  };

  const toggleCompletion = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setMainTask(updatedTasks);
  };

  const categoryOptions = ["work", "personal", "health", "grocery"];

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className="flex">
        <div>
          <h5
            className={`text-2x1 font-semibold ${
              t.completed ? "completed" : ""
            }`}
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={t.completed}
              onChange={() => toggleCompletion(i)}
            />
            {t.title} - {t.category}
          </h5>
          {/* Display the category */}
        </div>
        <button onClick={() => deleteHandler(i)} className="bg-red delete">
          Delete
        </button>
        <button onClick={() => editHandler(i)} className="Z">
          Edit
        </button>
      </li>
    ));
  }

  return (
    <>
      <h1 className="bg-black text-white p-10 text-center font-bold">
        TO DO LIST
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2x1 border-zinc-800 border-2 m input-box"
          placeholder="Enter The Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-2x1 border-zinc-800 border-2 m input-box"
        >
          {categoryOptions.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="bg-black text-2x1 text-white rounded-md px-6 buttons">
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </button>
      </form>
      <div className="p-8 bg-slate-200">
        <ul className="task-list">{renderTask}</ul>
      </div>
    </>
  );
}

export default App;
