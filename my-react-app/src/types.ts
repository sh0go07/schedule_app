export interface MyEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay?: boolean;
}

export interface MyTask {
    id: string;
    title: string;
    description?: string;
    dueDate: Date;
    isDone: boolean;
}
