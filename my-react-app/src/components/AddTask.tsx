import React, {useState, useEffect, use} from "react";
import type { MyTask } from "../types";

interface TaskModalProps {
    isOpen: boolean;
    selectedDate: string;
    onClose: () => void;
    onSave: (newTaskData: {
        title: string;
        dueDate: string;
        description: string;
    }) => void;
}

export default function TaskModal({ isOpen, selectedDate, onClose, onSave }: TaskModalProps) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDueDate(selectedDate);
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
            description: description,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>新しい予定を追加</h2>
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
