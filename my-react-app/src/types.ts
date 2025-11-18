export interface MyEvent {
    id: string;
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay?: boolean;
}

export interface MyTask {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    isDone: boolean;
}
