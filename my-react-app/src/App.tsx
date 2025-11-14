import React, { useState } from 'react'
import './App.css'
import type { MyEvent, MyTask } from './types.ts'
import type { DateSelectArg } from '@fullcalendar/core'
import Calendar from './Calendar.tsx'
import TaskList from './Tasklist.tsx'

function App() {
  const [events, setEvents] = useState<MyEvent[]>([
    {
      id: '1',
      title: '会議',
      start: new Date('2025-11-14T10:00:00'),
      end: new Date('2025-11-14T11:00:00'),
      allDay: false,
    },
  ]);

  const [tasks, setTasks] = useState<MyTask[]>([
    {
      id: '1',
      title: 'レポート作成',
      description: '月次レポートを作成して提出する',
      dueDate: new Date('2025-11-15'),
      isDone: false,
    },
    {
      id: '2',
      title: 'コードレビュー',
      dueDate: new Date('2025-11-16'),
      isDone: true,
    },
  ]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('イベントのタイトルを入力してください:');

    if (title) {
      const newEvent: MyEvent = {
        id: crypto.randomUUID(),
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      setEvents([...events, newEvent]);
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>スケジュール管理アプリ</h1>
        </header>

        // カレンダーを表示
        <Calendar
          events={events}
          onDateSelect={handleDateSelect}
        />

        // タスクリストを表示
        <TaskList
          tasks={tasks}
        />
      </div>
    </>
  )
}

export default App;