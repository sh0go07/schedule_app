import React from 'react';
import type { MyEvent } from '../types';
import type { DateClickArg } from '@fullcalendar/interaction';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/common/main.css';

interface CalendarProps {
  events: MyEvent[];
  onDateDoubleClick: (info: DateClickArg) => void;
}

function Calendar({ events, onDateDoubleClick }: CalendarProps) {
    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                initialView="dayGridMonth"

                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}

                events={events}
                selectable={false}
                dateClick={(info) => {
                    if (info.jsEvent.detail === 2) { // ダブルクリックを検出
                        onDateDoubleClick(info);
                    }
                }}
                
                locale="ja"
                weekends={true}

            />
        </div>
    )
}

export default Calendar;
