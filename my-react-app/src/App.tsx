import React, { use, useEffect, useState } from 'react'
import './App.css'
import type { MyEvent, MyTask } from './types.ts'
import type { DateClickArg } from '@fullcalendar/interaction';
import type { EventClickArg } from '@fullcalendar/core';

import Calendar from './components/Calendar.tsx'
import TaskList from './components/Tasklist.tsx'
import EventModal from './components/AddEvent.tsx';
import TaskModal from './components/AddTask.tsx';

function App() {
  const [events, setEvents] = useState<MyEvent[]>(() => {
    const savedEvents = localStorage.getItem("calendar-events");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    } else {
      return [];
    }
  });

  const [tasks, setTasks] = useState<MyTask[]>(() => {
    const savedEvents = localStorage.getItem("task-list");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    } else {
      return [];
    }
  });


  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState("");
  
  const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);

  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(tasks));
  }, [tasks]);

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

  const handleEventDelete = () => {
    if (editingEvent) {
      setEvents(events.filter(ev => ev.id !== editingEvent.id));
      setIsEventModalOpen(false);
      setEditingEvent(null);
    }
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
        onDelete={handleEventDelete}
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
