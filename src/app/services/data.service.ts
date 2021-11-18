import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';

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
        console.log('contructor ', storage)
        this._storage = storage;
    }

    async clear() {
        await this._storage.clear();
    }

    async setValue(pro_name) {
        let pro = {
            name: pro_name,
            id: uuidv4(),
            createAt: Date.now()
        }
        await this._storage.set(pro.name, pro);
    }

    async getValue(pro) {
        const value = await this._storage.get(pro.name);
        return value
    }

    async getProjects() {
        let list = []
        await this._storage.forEach((key, value, index) => {
            list.push({ value, key })
        });
        return list.sort((x, y) => x.key.createAt - y.key.createAt).map(x => x.key)
        // return await this._storage.keys()
    }

    // public getProjectById(id: number): Project {
    //   return this.projects[id];
    // }
}
