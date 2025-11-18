import React, {useState, useEffect, use} from 'react';
import type { MyEvent } from '../types';

interface EventModalProps {
    isOpen: boolean;
    selectedDate: string;
    onClose: () => void;
    onSave: (newEventData: {
        title: string;
        start: string;
        end: string;
    }) => void;
}

export default function EventModal({ isOpen, selectedDate, onClose, onSave }: EventModalProps) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("10:00");

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setStart("09:00");
            setEnd("10:00");
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!title) {
            alert('タイトルを入力してください。');
            return;
        }

        const startDateTime = `${selectedDate}T${start}:00`;
        const endDateTime = `${selectedDate}T${end}:00`;

        onSave({
            title: title,
            start: startDateTime,
            end: endDateTime,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>新しいイベントを追加</h2>
                <p>{ selectedDate } の名前</p>

                <div>
                    <label>タイトル:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>開始時間:</label>
                    <input
                        type="time"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>

                <div>
                    <label>終了時間:</label>
                    <input
                        type="time"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>

                <div className="modal-buttons">
                    <button onClick={onClose}>キャンセル</button>
                    <button onClick={handleSave}>保存</button>
                </div>
                
            </div>
        </div>
    );
}
