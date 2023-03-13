import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Create a new task with a random id, don't allow creating if the title is empty.
  function handleCreateNewTask() {
    // if (!newTaskTitle.trim()) return; // Checks if the title is empty or contains only whitespace

    // Checks if the title contains the same name
    const hasTaskWithTitle = tasks.find((task) => task.title === newTaskTitle);
    if (hasTaskWithTitle) {
      alert("Já existe uma tarefa com este título!");
      return;
    } else if (!newTaskTitle.trim()) {
      alert(
        "Não é possível gerar tarefa com name vazio, por favor dê um nome!"
      );
      return;
    }

    const newTask: Task = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  // alter between `true` or `false` the 'isComplete' field of a task with the id field
  function handleToggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  // Remove a task from the list by ID
  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
