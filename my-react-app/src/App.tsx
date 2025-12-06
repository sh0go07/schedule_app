import React, { useEffect, useState } from 'react'
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
    const clickedInfo = info.event;

    if (clickedInfo.extendedProps.isTask) {
      const foundTask = tasks.find(t => t.id === clickedInfo.id);
      if (foundTask) {
        setEditingTask(foundTask);
        setIsTaskModalOpen(true);
      }
    } else {
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
        id: clickedInfo.id,
        title: clickedInfo.title,
        start: toIsoStringLocal(clickedInfo.start),
        end: toIsoStringLocal(clickedInfo.end),
        allDay: clickedInfo.allDay,
        color: clickedInfo.backgroundColor,
      };

      setEditingEvent(eventData);
      setIsEventModalOpen(true);
    }
  }

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
  }

  const handleEventModalSave = (newEventData: { title: string, start: string, end: string, color: string }) => {
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
        color: newEventData.color,
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
  const [editingTask, setEditingTask] =useState<MyTask | null>(null);

  const handleTaskAddClick = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }

  const handleTaskClick = (task: MyTask) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
  }

  const handleTaskSave = (newTaskData: { title: string, dueDate: string, description: string }) => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id
          ? { ...t, ...newTaskData }
          : t
      ));
    } else {
      const newTask: MyTask = {
        id: crypto.randomUUID(),
        title: newTaskData.title,
        dueDate: newTaskData.dueDate,
        dueTime: "12:00",
        description: newTaskData.description,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
    }

    setIsTaskModalOpen(false); 
  }

  const handleTaskDelete = () => {
    if (editingTask) {
      setTasks(tasks.filter(t => t.id !== editingTask.id));
      setIsTaskModalOpen(false);
      setEditingTask(null);
    }
  }

  const taskEvents = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: `${task.dueDate}T${task.dueTime}`,
    backgroundColor: '#ff7556',
    borderColor: '#ff7556',
    extendedProps: {
      isTask: true,
    },
  }));

  const calendarDisplayEvents = [...events, ...taskEvents];


  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>スケジュール管理アプリ</h1>
        </header>

        <Calendar
          events={calendarDisplayEvents}
          onDateDoubleClick={handleDateDoubleClick}
          onEventClick={handleEventClick}
        />

        <TaskList
          tasks={tasks}
          onAddClick={handleTaskAddClick}
          onTaskClick={handleTaskClick}
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
        onDelete={handleTaskDelete}
        taskToEdit={editingTask}
      />
    </>
  )
}

export default App;
