import React from "react";
import type { MyTask } from "../types";

interface TaskListProps {
  tasks: MyTask[];
  onAddClick: () => void;
  onTaskClick: (info: MyTask) => void;
}

function TaskList({ tasks, onAddClick, onTaskClick }: TaskListProps) {
  return (
    <div className="tasklist-container">
      <h2>タスクリスト</h2>

      <button className="add-task-button" onClick={onAddClick}>
        タスクを追加
      </button>

      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <input type="checkbox" checked={task.isDone} readOnly />

            <span
              onClick={() => onTaskClick(task)}
              style={{ cursor: "pointer", marginLeft: "10px", flex: 1 }}
            >
              {task.title} - {task.dueDate} {task.dueTime}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
