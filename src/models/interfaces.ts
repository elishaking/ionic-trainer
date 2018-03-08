export interface Task {
    title: string;
    description: string;
    completed: boolean;
}

export interface TaskGroup{
    date: string;
    updated_date: string;
    tasks: Task[];
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
    isVideo?: boolean;
}

export interface Interview{
    title: string;
    name: string;
    description: string;
    length: string;
    date: string;
    isVideo?: boolean;
}

export interface User{
    email: string;
    password: string;
}

export interface UserDetails{
    id: string;
    name: string;
    sport: string;
    level: string;
    school: string;
    phoneNumber: string;
}

export interface Faith{
    belief: string;
    successReason: string;
}
