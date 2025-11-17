import React from "react";
import type { MyTask } from "../types";

interface TaskListProps {
  tasks: MyTask[];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="tasklist-container">
      <h2>タスクリスト</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.isDone ? "done" : ""}>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>期限: {task.dueDate.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
