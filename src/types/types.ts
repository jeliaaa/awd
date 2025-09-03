export interface INews {
    id: number;
}

export interface IEvent {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description?: string;
    color?: string
}