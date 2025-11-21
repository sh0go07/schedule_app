import React, { useState, useEffect } from "react";
import type { MyTask } from "../types";

interface TaskModalProps {
    isOpen: boolean;
    selectedDate: string;
    taskToEdit?: MyTask | null;
    onClose: () => void;
    onSave: (newTaskData: {
        title: string;
        dueDate: string;
        dueTime: string;
        description?: string;
    }) => void;
    onDelete: () => void;
}

export default function TaskModal({ isOpen, selectedDate, taskToEdit, onClose, onSave, onDelete }: TaskModalProps) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (taskToEdit) {
                setTitle(taskToEdit.title);
                setDescription(taskToEdit.description || "");

                const iso = taskToEdit.dueDate;
                if (iso.includes('T')) {
                    const parts = iso.split('T');
                    setDueDate(parts[0]);
                    setDueTime(parts[1]);
                } else {
                    setDueDate(iso);
                    setDueTime("12:00");
                }
            } else {
                setTitle("");
                setDueDate(selectedDate);
                setDueTime("12:00");
                setDescription("");
            }
        }
    }, [isOpen, taskToEdit]);

    const handleSave = () => {
        if (!title) {
            alert('タイトルを入力してください。');
            return;
        }

        onSave({
            title: title,
            dueDate: dueDate,
            dueTime: dueTime,
            description: description,
        });
    };

    const handleDelete = () => {
        if (window.confirm('本当にこのタスクを削除しますか？')) {
            onDelete();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="modal-content">
                <h2>{taskToEdit ? "タスクの編集" : "新しいタスクの追加"}</h2>

                <div>
                    <label>タイトル</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>締め切り:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>時間:</label>
                    <input
                        type="time"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                    />
                </div>

                <div>
                    <label>説明:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="modal-buttons">
                    <button onClick={onClose}>キャンセル</button>

                    {taskToEdit && (
                        <button
                            onClick={handleDelete}
                            className="delete-button"
                        >
                            削除
                        </button>
                    )}
                    <button onClick={handleSave}>
                        {taskToEdit ? "更新" : "追加"}
                    </button>
                </div>

            </div>
        </div>
    )
}
