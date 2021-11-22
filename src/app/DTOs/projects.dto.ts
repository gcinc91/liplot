
enum Status {
    active,
    deleted
}

export class Item {
    name: string;
    createAt: Date;
    id: number;
    status: Status
}

export class Project {
    name: string;
    description?: string;
    date?: string;
    createAt: Date;
    id: string;
    items?: Item[]
}
