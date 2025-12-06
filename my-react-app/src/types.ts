export interface MyEvent {
    id: string;
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay?: boolean;
    color?: string;
}

export interface MyTask {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    dueTime: string;
    isDone: boolean;
}
