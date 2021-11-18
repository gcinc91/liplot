
export class Item {
    name: string;
    createAt: Date;
    id: number;
}


export class Project {
    name: string;
    description?: string;
    date?: string;
    createAt: Date;
    id: string;
    items?: Item[]
}
