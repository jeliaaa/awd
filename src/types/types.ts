

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
    partner?: IPartner
}

export interface IEvent {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description?: string;
    color?: string
}

export interface IBlogImage {
    id: number,
    image: string,
    alt_text: string,
    is_primary: boolean,
    uploaded_at: string
}


export interface IBlog {
    id: number,
    title: string,
    description: string,
    created_at: string,
    updated_at: string
    cover_image?: IBlogImage,
    images: IBlogImage[],
}


export interface IActivity {
    id: number,
    blog_id: number,
    blog_title: string,
    created_at: string,
    updated_at: string
}


export interface IPartner {
    description: string,
    id: number,
    image: string,
    link: string
    name: string
}

export interface IVideo {
    id: number,
    title: string,
    description: string,
    url: string,
    created_at: string,
    updated_at: string,
}