import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';
import { Project, Status } from '../DTOs/projects.dto';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private storage: Storage) {
        this.init();
    }
    private _storage: Storage | null = null;

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    async clear() {
        await this._storage.clear();
    }

    async setProject(pro_name) {
        let pro: Project = {
            name: pro_name,
            id: uuidv4(),
            createAt: Date.now(),
            status: Status.active
        }
        await this._storage.set(pro.id, pro);
    }

    async setItem(id, item) {
        let pro = await this._storage.get(id);
        pro.items = pro.items || []
        pro.items = [
            ...pro.items,
            item
        ]
        console.log('como puede ser ', pro)
        await this._storage.set(pro.id, pro);
    }

    async getPro(id) {
        return await this._storage.get(id);
    }

    async deleteProByID(id) {
        let pro = await this._storage.get(id);
        pro.status = Status.deleted
    }

    async getProjects() {
        let list = []
        await this._storage.forEach((key, value) => {
            list.push({ value, key })
        });
        console.log(list)
        return list
            .filter(x => x.key.status == Status.active)
            .sort((x, y) => x.key.createAt - y.key.createAt)
            .map(x => x.key)
    }

}
