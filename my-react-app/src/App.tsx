import React, { useState } from 'react'
import './App.css'
import type { MyEvent, MyTask } from './types.ts'
import type { DateClickArg } from '@fullcalendar/interaction'
import Calendar from './components/Calendar.tsx'
import TaskList from './components/Tasklist.tsx'
import EventModal from './components/AddEvent.tsx'
import TaskModal from './components/AddTask.tsx'

function App() {
  const [events, setEvents] = useState<MyEvent[]>([
    {
      id: '1',
      title: '会議',
      start: '2025-11-14T10:00:00',
      end: '2025-11-14T11:00:00',
      allDay: false,
    },
  ]);

  const [tasks, setTasks] = useState<MyTask[]>([
    {
      id: '1',
      title: 'レポート作成',
      description: '月次レポートを作成して提出する',
      dueDate: '2025-11-15',
      isDone: false,
    },
    {
      id: '2',
      title: 'コードレビュー',
      dueDate: '2025-11-16',
      isDone: true,
    },
  ]);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  const handleDateDoubleClick = (info: DateClickArg) => {
    setIsEventModalOpen(true);
    setSelectedDateStr(info.dateStr);
  }

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
  }

  const handleEventModalSave = (newEventData: { title: string; start: string; end: string }) => {
    const newEvent: MyEvent = {
      id: crypto.randomUUID(),
      title: newEventData.title,
      description: undefined,
      start: newEventData.start,
      end: newEventData.end,
      allDay: false,
    };

    setEvents([...events, newEvent]);
    setIsEventModalOpen(false);
  }

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleTaskAddClick = () => {
    setIsTaskModalOpen(true);
  }

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
  }

  const handleTaskModalSave = (newTaskData: { title: string, dueDate: string, description?: string }) => {
    const newTask: MyTask = {
      id: crypto.randomUUID(),
      title: newTaskData.title,
      dueDate: newTaskData.dueDate,
      description: newTaskData.description,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setIsTaskModalOpen(false);
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>スケジュール管理アプリ</h1>
        </header>

        <Calendar
          events={events}
          onDateDoubleClick={handleDateDoubleClick}
        />

        <TaskList
          tasks={tasks}
          onAddClick={handleTaskAddClick}
        />
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        selectedDate={selectedDateStr}
        onClose={handleEventModalClose}
        onSave={handleEventModalSave}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        selectedDate={selectedDateStr}
        onClose={handleTaskModalClose}
        onSave={handleTaskModalSave}
      />
    </>
  )
}

export default App;
