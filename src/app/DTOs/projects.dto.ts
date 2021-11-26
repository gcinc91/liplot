
export enum Status {
    active,
    remove,
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
