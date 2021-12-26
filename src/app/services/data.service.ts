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

    async deleteAllProjects() {
        await this._storage.clear();
    }

    async deleteAllItems(proId) {
        let pro = await this._storage.get(proId);
        pro.items = []
        await this._storage.set(pro.id, pro);
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

    async setItem(id, itemName) {
        let pro = await this._storage.get(id);
        pro.items = pro.items || []
        let item = {
            name: itemName,
            createAt: Date.now(),
            id: uuidv4(),
            status: Status.active
        }
        pro.items = [
            ...pro.items,
            item
        ]

        await this._storage.set(pro.id, pro);
    }

    async getPro(id) {
        return await this._storage.get(id);
    }

    async deleteProByID(id) {
        await this._storage.remove(id);
    }

    async removeProById(id) {
        let pro = await this._storage.get(id);
        pro.status = Status.remove
    }

    async changeProStatus(proId, type, id?) {

        let pro = await this._storage.get(proId);
        if (type != 'item') {
            pro.status = Status.remove
            return await this._storage.set(id, pro)
        }
        let item = pro.items.filter(x => x.id == id)
        let index = pro.items.findIndex(x => x.id === id)
        pro.items[index] = {
            ...item,
            status: Status.remove
        }
        await this._storage.set(pro.id, pro);
    }

    async getProjects(filter?) {
        let list = []
        await this._storage.forEach((key, value) => {
            list.push({ value, key })
        });
        return list
            .filter(x => x.key.status == (filter || Status.active))
            .sort((x, y) => x.key.createAt - y.key.createAt)
            .map(x => x.key)
    }

}
