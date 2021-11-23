
export enum Status {
    active,
    deleted,
}

export class Item {
    name: string;
    createAt: number;
    id: number;
    status: Status
}

export class Project {
    name: string;
    description?: string;
    date?: string;
    createAt: number;
    id: string;
    items?: Item[];
    status: Status;
}
