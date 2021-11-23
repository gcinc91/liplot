import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Popover } from '../components/popover/popover.component';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(
        private data: DataService,
        private popoverController: PopoverController
    ) { }
    addProject = false
    project_list = []
    pro_name = ''
    edit = false

    refresh(ev) {
        setTimeout(() => {
            ev.detail.complete();
        }, 3000);
    }

    async ionViewWillEnter() {
        await this.updateProjectList()
    }

    async updateProjectList() {
        this.project_list = await this.data.getProjects()
    }

    async setProject() {
        this.addProject = true
    }

    trackByFn() {
        return this.project_list;
    }
    async clearProjects() {
        await this.data.clear()
        await this.updateProjectList()
    }

    async addNewProject() {
        this.addProject = false
        await this.data.setProject(this.pro_name)
        this.pro_name = ''
        await this.updateProjectList()
    }

    async editing() {
        this.edit = !this.edit
    }

    async presentPopover(id) {
        const popover = await this.popoverController.create({
            component: Popover,
            translucent: true,
            animated: true,
            componentProps: { id }
        });
        await popover.present();
    }


    async sayHello() {
        console.log('hello!')
    }
}
