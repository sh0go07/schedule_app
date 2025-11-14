import React from 'react';
import type { MyEvent } from './types';
import type { DateSelectArg } from '@fullcalendar/core';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/common/main.css';

interface CalendarProps {
  events: MyEvent[];
  onDateSelect: (selectInfo: DateSelectArg) => void;
}

function Calendar({ events, onDateSelect }: CalendarProps) {
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
                selectable={true}
                select={onDateSelect}
                
                locale="ja"
                weekends={true}

                dateClick={(info) => {
                    console.log('Date clicked: ', info.dateStr);
                }}
            />
        </div>
    )
}

export default Calendar;
