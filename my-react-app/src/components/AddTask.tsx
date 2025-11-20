import React, {useState, useEffect, use} from "react";
import type { MyTask } from "../types";

interface TaskModalProps {
    isOpen: boolean;
    selectedDate: string;
    onClose: () => void;
    onSave: (newTaskData: {
        title: string;
        dueDate: string;
        dueTime: string;
        description?: string;
    }) => void;
}

export default function TaskModal({ isOpen, selectedDate, onClose, onSave }: TaskModalProps) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDueDate(selectedDate);
            setDueTime("12:00");
        }
    }, [isOpen]);

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

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>新しいタスクを追加</h2>
                <p>{ selectedDate } の名前</p>

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
                    <button onClick={handleSave}>保存</button>
                </div>

            </div>
        </div>
    )
}
