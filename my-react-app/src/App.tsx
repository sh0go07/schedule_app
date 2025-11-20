import React, { useState } from 'react'
import './App.css'
import type { MyEvent, MyTask } from './types.ts'
import type { DateClickArg } from '@fullcalendar/interaction';
import type { EventClickArg } from '@fullcalendar/core';

import Calendar from './components/Calendar.tsx'
import TaskList from './components/Tasklist.tsx'
import EventModal from './components/AddEvent.tsx';
import TaskModal from './components/AddTask.tsx';

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
  const [selectedDateStr, setSelectedDateStr] = useState("");
  
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);


  const handleDateDoubleClick = (info: DateClickArg) => {
    setEditingEvent(null);
    setSelectedDateStr(info.dateStr);
    setIsEventModalOpen(true);
  } 

  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = info.event;

    const toIsoStringLocal = (date: Date | null) => {
      if (!date) return "";
      const pad = (n: number) => n < 10 ? '0' + n : n;
      return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes());
    };

    const eventData: MyEvent = {
      id: clickedEvent.id,
      title: clickedEvent.title,
      start: toIsoStringLocal(clickedEvent.start),
      end: toIsoStringLocal(clickedEvent.end),
      allDay: clickedEvent.allDay,
    };

    setEditingEvent(eventData);
    setIsEventModalOpen(true);
  }

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
  }

  const handleEventModalSave = (newEventData: { title: string, start: string, end: string }) => {
    if (editingEvent) {
      setEvents(events.map(ev => 
        ev.id === editingEvent.id 
          ? { ...ev, ...newEventData }
          : ev
      ));
    } else {
      const newEvent: MyEvent = {
        id: crypto.randomUUID(),
        title: newEventData.title,
        start: newEventData.start,
        end: newEventData.end,
        allDay: false,
      };
      setEvents([...events, newEvent]);
    }
    setIsEventModalOpen(false);
  }


  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleTaskAddClick = () => {
    setIsTaskModalOpen(true);
  }

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
  }

  const handleTaskSave = (newTaskData: { title: string, dueDate: string, description: string }) => {
    const newTask: MyTask = {
      id: crypto.randomUUID(),
      title: newTaskData.title,
      dueDate: newTaskData.dueDate,
      dueTime: "12:00",
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
          onEventClick={handleEventClick}
        />

        <TaskList
          tasks={tasks}
          onAddClick={handleTaskAddClick}
        />
      </div>


      <EventModal 
        isOpen={isEventModalOpen}
        selectedDate={selectedDateStr}
        eventToEdit={editingEvent}
        onClose={handleEventModalClose}
        onSave={handleEventModalSave}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleTaskModalClose}
        onSave={handleTaskSave}
      />
    </>
  )
}

export default App;
