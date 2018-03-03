export interface Task {
    title: string;
    description: string;
}

export interface Log{
    title: string;
    date: string; // advice to be automatic
    details: string;
}

export interface Activity{
    title: string;
    date: string;
}

export interface Routine{
    title: string;
    stepsList: string;
}

export interface Identity{
    athleticDreams: string;
    attitudeSlogan: string;
}

export interface Interview{
    title: string;
    date: string;
    // data: string;
}

export interface Talk{
    title: string;
    name: string;
    length: string;
    date: string;
}

export interface Interview{
    title: string;
    name: string;
    length: string;
    date: string;
    isVideo?: boolean;
}
