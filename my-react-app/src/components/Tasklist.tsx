import React from "react";
import type { MyTask } from "../types";

interface TaskListProps {
  tasks: MyTask[];
  onAddClick: () => void;
}

function TaskList({ tasks, onAddClick }: TaskListProps) {
  return (
    <div className="tasklist-container">
      <h2>タスクリスト</h2>

      <button className="add-task-button" onClick={onAddClick}>
        タスクを追加
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} readOnly />
            {task.title} - {task.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
