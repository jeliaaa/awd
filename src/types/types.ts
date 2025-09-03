export interface INews {
    id: number;
}

export interface IAbout {
    title: string;
    content: TrustedHTML | string;
}

export interface IMember {
    id: number;
    firstname: string;
    lastname: string;
    position: string;
    image: string;
}

export interface IProject {
    id: number;
    name: string;
    location: string;
    date: string;
    description: string;
    duration: string;
    image: string;
}

export interface IEvent {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description?: string;
    color?: string
}