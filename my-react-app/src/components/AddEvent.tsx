import React, {useState, useEffect} from 'react';
import type { MyEvent } from '../types';

interface EventModalProps {
    isOpen: boolean;
    selectedDate: string;
    eventToEdit?: MyEvent | null;
    onClose: () => void;
    onSave: (newEventData: {
        title: string;
        description?: string;
        start: string;
        end: string;
    }) => void;
    onDelete: () => void;
}

const COLORS = ['#3788d8', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6']

export default function EventModal({ isOpen, selectedDate, eventToEdit, onClose, onSave, onDelete }: EventModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("10:00");
    const [selectedColor, setSelectedColor] = useState(COLORS[0])

    useEffect(() => {
        if (isOpen) {
            if (eventToEdit) {
                setTitle(eventToEdit.title);

                const startIso = eventToEdit.start;
                const endIso = eventToEdit.end;

                setStart(startIso.includes('T') ? startIso.split('T')[1].substring(0,5) : "09:00");

                if (endIso) {
                    setEnd(endIso.includes('T') ? endIso.split('T')[1].substring(0,5) : "10:00");
                }

                setSelectedColor(eventToEdit.color || COLORS[0]);
            } else {
                setTitle('');
                setStart("09:00");
                setEnd("10:00");
                setSelectedColor(COLORS[0]);
            }
        }
    }, [isOpen, eventToEdit]);

    const handleSave = () => {
        if (!title) {
            alert('タイトルを入力してください。');
            return;
        }

        let targetDate = "";
        if (eventToEdit) {
            targetDate = eventToEdit.start.split('T')[0];
        } else if (selectedDate) {
            targetDate = selectedDate;
        }

        const startDateTime = `${selectedDate}T${start}:00`;
        const endDateTime = `${selectedDate}T${end}:00`;

        onSave({
            title: title,
            start: startDateTime,
            end: endDateTime,
            description: description,
            color: selectedColor,
        });
    };

    const handleDelete = () => {
        if (window.confirm("本当にこの予定を削除しますか？")) {
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
                <h2>{eventToEdit ? "イベントの編集" : "新しいイベントの追加"}</h2>
                <p>
                    {eventToEdit
                        ? eventToEdit.start.split('T')[0]
                        : selectedDate
                    } の予定
                </p>

                <div>
                    <label>タイトル:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>色:</label>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '12px',
                            marginTop: '8px',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {COLORS.map((c) => (
                            <div
                                key={c}
                                onClick={() => setSelectedColor(c)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: c,
                                    cursor: 'pointer',
                                    
                                    border: selectedColor === c ? '3px solid white' : '2px solid transparent',
                                    boxShadow: selectedColor === c ? '0 0 0 2px #007bff' : '0 2px 4px rgba(0,0,0,0.2)',
                                    transform: selectedColor === c ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'all 0.2s',
                                    flexShrink: 0
                                }}
                            />
                        ))}
                    </div>
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

                    {eventToEdit && (
                        <button
                            onClick={handleDelete}
                            className="delete-button"
                        >
                            削除
                        </button>
                    )}

                    <button onClick={handleSave}>
                        {eventToEdit ? "更新" : "追加"}
                    </button>
                </div>
                
            </div>
        </div>
    );
}
